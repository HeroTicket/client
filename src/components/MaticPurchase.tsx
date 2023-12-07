import React, { useState, useEffect, useRef, useContext } from "react";
import QRCode from "react-qr-code";
import * as P from '@/styles/PolygonID.styles';
import * as T from '@/styles/Ticket.styles';
import { authContext } from '@/context/providers';
import axios from 'axios';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { HeroTicketAbi } from '@/assets/abi/abi';

interface MaticPurchaseProps {
    contractAddress: string;
    ticketPrice: string;
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

interface QRCodeResponse {
    status: number;
    message: string;
    data: QRCodeData;
}

interface SocketEvent {
    name: string;
    status: string;
    data: any;
}

const MaticPurchase = ({
    contractAddress,
    ticketPrice,
    handlePurchaseCallback,
}: MaticPurchaseProps) => {
    const { accessToken } = useContext(authContext);

    const [sessionId, setSessionId] = useState<string>("");
    const [qrCodeData, setQrCodeData] = useState<QRCodeData | null>(null);
    const [onWhitelist, setOnWhitelist] = useState<boolean>(false);
    const [isHandlingVerification, setIsHandlingVerification] = useState<boolean>(false);
    const [verificationCheckComplete, setVerificationCheckComplete] =
        useState<boolean>(false);
    const [verificationMessage, setVerificationMessage] = useState<string>("");
    const [socketEvents, setSocketEvents] = useState<SocketEvent[]>([]);

    const socket = useRef<WebSocket | null>(null);

    const getQrCodeApi = (sessionId: string) => {
        return process.env.NEXT_PUBLIC_SERVER_URL + `/tickets/${contractAddress}/whitelist-qr?sessionId=${sessionId}`;
    }

    const { config } = usePrepareContractWrite({
        address: process.env.NEXT_PUBLIC_HERO_TICKET_ADDRESS as `0x${string}`,
        abi: HeroTicketAbi,
        functionName: 'buyTicketByEther',
        args: [contractAddress as `0x${string}`],
        value: BigInt(ticketPrice),
        enabled: onWhitelist,
    })

    const { data, write, isError, error } = useContractWrite(config);

    const { data: receipt, isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash
    });

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
        const fetchQrCode = async (): Promise<QRCodeData | undefined> => {
            const response = await axios.get<QRCodeResponse>(getQrCodeApi(sessionId), {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            // get qr code data
            if (response.status == 200) {
                return response.data.data;
            }

            // already on whitelist
            if (response.status == 202) {
                return;
            }

            // error
            throw new Error(response.data.message);
        };

        if (sessionId) {
            fetchQrCode().then((data) => {
                if (data) {
                    setQrCodeData(data);
                } else {
                    setOnWhitelist(true);
                    setVerificationMessage("✅ Already on whitelist");
                    setVerificationCheckComplete(true);
                    socket.current?.close();
                }
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

            if (currentSocketEvent.name === 'whitelist-callback') {
                if (currentSocketEvent.status === 'IN_PROGRESS') {
                    setIsHandlingVerification(true);
                } else {
                    setIsHandlingVerification(false);
                    setVerificationCheckComplete(true);
                    if (currentSocketEvent.status === 'DONE') {
                        setVerificationMessage("✅ Updated whitelist");

                        setTimeout(() => {
                            setOnWhitelist(true);
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
            {!onWhitelist && (<P.QRCodeContainer>
                <p>Scan this QR code from your Polygon ID Wallet App to register to whitelist.</p>
                {isHandlingVerification && (
                    <div>
                        <p>Authenticating...</p>
                        {' '}
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
            </P.QRCodeContainer>)}
            {onWhitelist && (
                <>
                    {!isLoading && !isSuccess && (<>
                        <h3>Whitelist Confirmed</h3>
                        <T.TicketBtn onClick={() => { write?.(); }}>
                            Purchase Ticket
                        </T.TicketBtn >
                    </>)}
                    {isLoading && <>
                        <p>Waiting for transaction to be mined...</p>
                        {''}
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
                    </>}
                    {isSuccess && receipt && (
                        <>
                            <p>Transaction successful!</p>
                            <p>Transaction hash: {receipt.transactionHash}</p>
                            <T.TicketBtn onClick={handlePurchaseCallback}>
                                Back to Event
                            </T.TicketBtn >
                        </>
                    )}
                    {isError && error && (
                        <>
                            <p>Transaction failed!</p>
                            <p>{error.message}</p>
                            <T.TicketBtn onClick={handlePurchaseCallback}>
                                Back to Event
                            </T.TicketBtn >
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default MaticPurchase;
