import React, { useState, useEffect, useRef, useContext } from "react";
import QRCode from "react-qr-code";
import * as P from '@/styles/PolygonID.styles';
import * as T from '@/styles/Ticket.styles';
import { authContext } from '@/context/providers';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useTimer } from 'react-timer-hook';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { TicketAbi } from '@/assets/abi/abi';
import Swal from 'sweetalert2';

interface PolygonIDProps {
    contractAddress: string;
    close: () => void;
}

interface QRCodeData {
    header: {
        alg: string;
        typ: string;
    };
    body: {
        scope: [
            {
                query: {
                    type: string;
                };
            }
        ];
        message: string;
        reason: string;
    };
}

interface GetVerifyQRResponse {
    status: number;
    message: string;
    data: QRCodeData;
}

interface SocketEvent {
    name: string;
    status: string;
    data: any;
}

const VerifyCredential = ({ contractAddress, close }: PolygonIDProps) => {
    const [sessionId, setSessionId] = useState<string>("");
    const [qrCodeData, setQrCodeData] = useState<QRCodeData | null>(null);
    const [socketEvents, setSocketEvents] = useState<SocketEvent[]>([]);

    const socket = useRef<WebSocket | null>(null);

    const { accessToken } = useContext(authContext);

    const {
        seconds,
        minutes,
        hours,
        isRunning,
        start,
    } = useTimer({
        expiryTimestamp: new Date(new Date().setHours(new Date().getHours() + 1)),
        onExpire: () => {
            setTimeout(() => {
                close();
            }, 1000);
        }
    });

    const { config } = usePrepareContractWrite({
        address: contractAddress as `0x${string}`,
        abi: TicketAbi,
        functionName: 'claimSettlement',
    })

    const { data, write, isError, error } = useContractWrite(config);

    const { data: receipt, isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash
    });

    const getQrCodeApi = (contractAddress: string, sessionId: string) => {
        return process.env.NEXT_PUBLIC_SERVER_URL + `/tickets/${contractAddress}/verify-qr?sessionId=${sessionId}`;
    }

    const fetchQrCode = async (): Promise<QRCodeData> => {
        const response = await axios.get<GetVerifyQRResponse>(getQrCodeApi(contractAddress, sessionId), {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status !== 200) {
            throw new Error(response.data.message);
        }

        return response.data.data;
    };

    const connectToSocket = () => {
        const _socket = new WebSocket("wss://api.heroticket.xyz/ws");
        socket.current = _socket;

        _socket.onopen = () => {
            console.log("connected to socket");
        }

        _socket.onclose = () => {
            console.log("disconnected from socket")
            setSessionId("");
            setQrCodeData(null);
            setSocketEvents([]);
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
    }

    const claimSettlement = () => {
        if (!write) {
            Swal.fire({
                title: 'Error!',
                text: 'Sale has not ended yet or you are not the owner of this ticket.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }

        write();
    }

    useEffect(() => {
        if (socket.current) {
            return () => {
                socket.current?.close();
            }
        }
    }, [socket.current]);

    useEffect(() => {
        if (sessionId) {
            fetchQrCode().then((data) => {
                setQrCodeData(data);
                start()
            }).catch(console.error);
        }
    }, [sessionId]);

    useEffect(() => {
        if (socketEvents.length) {
            const currentSocketEvent = socketEvents[socketEvents.length - 1];

            console.log(currentSocketEvent)

            if (currentSocketEvent.name === 'verify-callback') {
                if (currentSocketEvent.status === 'DONE') {
                    toast.success("Ownership Verified !", {
                        position: toast.POSITION.TOP_LEFT
                    });
                } else if (currentSocketEvent.status === 'ERROR') {
                    toast.error("Ownership Verification Failed !", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            }
        }
    }, [socketEvents]);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Settlement Claimed !", {
                position: toast.POSITION.TOP_LEFT
            });
        }
    }, [isSuccess]);

    return (
        <>
            <ToastContainer />
            {!sessionId && (<P.QRCodeContainer>
                <T.TicketBtn onClick={connectToSocket}>Verify Ticket</T.TicketBtn>
                <T.TicketBtn disabled={!write} onClick={claimSettlement}>Claim Settlement</T.TicketBtn>
            </P.QRCodeContainer>)}
            {sessionId && (<P.QRCodeContainer>
                <p>Scan this QR code from your Polygon ID Wallet App to prove ticket ownership.</p>
                {qrCodeData && (<QRCode value={JSON.stringify(qrCodeData)} />)}
                {!qrCodeData && (<P.StyledSpinner viewBox="0 0 50 50">
                    <circle
                        className="path"
                        cx={25}
                        cy={25}
                        r={20}
                        fill="none"
                        strokeWidth={4}
                    />
                </P.StyledSpinner>)}
                {isRunning && (
                    <div style={{ fontSize: '1.8rem' }}>
                        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
                    </div>
                )}
            </P.QRCodeContainer>)}
        </>
    );
}

export default VerifyCredential;
