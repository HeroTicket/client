import React, { useState, useEffect, useContext } from 'react';
import * as T from '@/styles/Ticket.styles';
import * as P from '@/styles/PolygonID.styles';
import { authContext } from '@/context/providers';
import axios from 'axios';
import Swal from 'sweetalert2';
import QRCode from 'react-qr-code';

interface ClaimCredentialResponse {
    status: number;
    message: string;
    data: any;
}

interface ClaimCredentialProps {
    contractAddress: string;
}

interface GetCredentialQRResponse {
    status: number;
    message: string;
    data: any;
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

const ClaimCredential = ({ contractAddress }: ClaimCredentialProps) => {
    const { accessToken } = useContext(authContext);

    const [qrCodeData, setQRCodeData] = useState<QRCodeData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const claimCredential = async (): Promise<ClaimCredentialResponse> => {
        if (!accessToken) {
            throw new Error('Access token is not defined');
        }

        const res = await axios.post<ClaimCredentialResponse>(`${process.env.NEXT_PUBLIC_SERVER_URL}/claims/${contractAddress}`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        return res.data;
    }

    const getCredentialQR = async (): Promise<QRCodeData> => {
        if (!accessToken) {
            throw new Error('Access token is not defined');
        }

        const res = await axios.get<GetCredentialQRResponse>(`${process.env.NEXT_PUBLIC_SERVER_URL}/claims/${contractAddress}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        if (res.data.status !== 200) {
            throw new Error(res.data.message);
        }

        return res.data.data;
    }

    const handleClaimCredential = async () => {
        Swal.fire({
            title: 'Claim Credential',
            text: 'Do you want to claim a credential?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Please wait...",
                    icon: "info",
                    didOpen: () => {
                        Swal.showLoading();

                        claimCredential().
                            then((res) => {
                                console.log(res);
                                if (res.status === 202) {
                                    Swal.fire({
                                        title: "Already claimed",
                                        text: "You already claimed this credential.",
                                        icon: "info",
                                    })
                                    return
                                }

                                if (res.status === 201) {
                                    Swal.fire({
                                        title: "Claimed!",
                                        text: "You successfully claimed a credential.",
                                        icon: "success",
                                    })
                                    return
                                }

                                throw new Error(res.message);
                            }).
                            catch((error) => {
                                Swal.fire({
                                    title: "Error",
                                    text: error.message,
                                    icon: "error",
                                    confirmButtonText: "OK",
                                });
                            });
                    }
                });
            }
        })
    }

    const handleGetCredentialQR = async () => {
        setIsLoading(true);

        getCredentialQR().
            then((data) => {
                setQRCodeData(data);
            }).
            catch((error) => {
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }).
            finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <T.PreNextStepContent>
            {isLoading && <T.CardContainer>
                <p>Please wait...</p>
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
            </T.CardContainer>}
            {qrCodeData && <P.QRCodeContainer>
                <p>Scan this QR code from your Polygon ID Wallet App to claim a credential.</p>
                <QRCode value={JSON.stringify(qrCodeData)} />
            </P.QRCodeContainer>}
            {!isLoading && !qrCodeData && (
                <T.CardContainer>
                    <T.TicketBtn onClick={handleClaimCredential}>Claim Credential</T.TicketBtn>
                    <T.TicketBtn onClick={handleGetCredentialQR}>Request Credential QR Code</T.TicketBtn>
                </T.CardContainer>
            )}
        </T.PreNextStepContent>
    )
}

export default ClaimCredential