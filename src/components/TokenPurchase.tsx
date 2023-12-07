import React, { useState, useEffect, useRef, useContext } from "react";
import QRCode from "react-qr-code";
import * as P from '@/styles/PolygonID.styles';
import { authContext } from '@/context/providers';
import axios from 'axios';

interface TokenPurchaseProps {
    contractAddress: string;
    handlePurchaseCallback: () => void;
}

interface QRCodeData {
    header: {
        alg: string;
        typ: string;
    };
    body: {
        scope: [
            {
                query: {};
            }
        ];
        message: string;
        reason: string;
        callbackUrl: string;
    };
}

interface SocketEvent {
    name: string;
    status: string;
    data: any;
}

const TokenPurchase = ({
    contractAddress,
    handlePurchaseCallback,
}: TokenPurchaseProps) => {
    const { accessToken } = useContext(authContext);

    const [sessionId, setSessionId] = useState<string>("");
    const [qrCodeData, setQrCodeData] = useState<QRCodeData | null>(null);
    const [isHandlingVerification, setIsHandlingVerification] = useState<boolean>(false);
    const [verificationCheckComplete, setVerificationCheckComplete] =
        useState<boolean>(false);
    const [verificationMessage, setVerificationMessage] = useState<string>("");
    const [socketEvents, setSocketEvents] = useState<SocketEvent[]>([]);

    const socket = useRef<WebSocket | null>(null);

    const getQrCodeApi = (sessionId: string) => {
        return process.env.NEXT_PUBLIC_SERVER_URL + `/tickets/${contractAddress}/token-purchase-qr?sessionId=${sessionId}`;
    }

    // Connect to websocket on component mount
    useEffect(() => {
        const _socket = new WebSocket("wss://api.heroticket.xyz/ws");
        socket.current = _socket;

        _socket.onopen = () => {
            console.log("connected to socket");
        }

        _socket.onclose = () => {
            console.log("disconnected from socket")
        }

        _socket.onmessage = (e) => {
            let msg = JSON.parse(e.data);

            console.log(msg)

            switch (msg.type) {
                // initial message from server with session id
                case "id":
                    setSessionId(msg.id);
                    break;
                // event message from server
                case "event":
                    setSocketEvents((socketEvents) => [...socketEvents, msg.event]);
                    break;
                default:
                    console.log("unknown message type:", msg.type);
            }
        }

        _socket.onerror = (e) => {
            console.log("WebSocket error:", e);
        }
    }, []);

    useEffect(() => {
        const fetchQrCode = async () => {
            const response = await axios.get(getQrCodeApi(sessionId), {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (response.status !== 200) {
                throw new Error("Error fetching QR code");
            }

            return response.data;
        };

        if (sessionId) {
            fetchQrCode().then((data) => {
                setQrCodeData(data.data);
            }).catch((err) => {
                console.error(err);
                setVerificationMessage("❌ Error fetching QR code");
                setIsHandlingVerification(false);
            });
        }
    }, [sessionId]);

    // socket event side effects
    useEffect(() => {
        if (socketEvents.length) {
            const currentSocketEvent = socketEvents[socketEvents.length - 1];

            console.log(currentSocketEvent)

            if (currentSocketEvent.name === 'token-purchase-callback') {
                if (currentSocketEvent.status === 'IN_PROGRESS') {
                    setIsHandlingVerification(true);
                } else {
                    setIsHandlingVerification(false);
                    setVerificationCheckComplete(true);
                    if (currentSocketEvent.status === 'DONE') {
                        setVerificationMessage("✅ Ticket purchased");

                        setTimeout(() => {
                            handlePurchaseCallback();
                        }, 3000);
                        socket.current?.close();
                    } else {
                        setVerificationMessage("❌ Error verifying VC");
                    }
                }
            }
        }
    }, [socketEvents]);

    return (
        <>
            <P.QRCodeContainer>
                <p>Scan this QR code from your Polygon ID Wallet App to purchase a ticket by token.</p>
                {isHandlingVerification && (
                    <div>
                        <p>Authenticating...</p>
                        <P.StyledSpinner viewBox="0 0 50 50">
                            <circle
                                className="path"
                                cx={25}
                                cy={25}
                                r={20}
                                fill="none"
                                strokeWidth={4}
                            />
                        </P.StyledSpinner>
                    </div>
                )}
                {verificationMessage &&
                    <P.LoginCallbackMessage>
                        {verificationMessage}
                    </P.LoginCallbackMessage>
                }
                {qrCodeData &&
                    !isHandlingVerification &&
                    !verificationCheckComplete && (
                        <QRCode value={JSON.stringify(qrCodeData)} />
                    )}
                {!qrCodeData && !verificationMessage && (<P.StyledSpinner viewBox="0 0 50 50">
                    <circle
                        className="path"
                        cx={25}
                        cy={25}
                        r={20}
                        fill="none"
                        strokeWidth={4}
                    />
                </P.StyledSpinner>)}
            </P.QRCodeContainer>
        </>
    );
}

export default TokenPurchase;
