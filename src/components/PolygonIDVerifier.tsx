import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import QRCode from "react-qr-code";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import * as P from '@/styles/PolygonID.styles';
import * as H from '@/styles/Header.styles';
import Link from "next/link";

interface PolygonIDProps {
  accountAddress?: string;
  credentialType: string;
  onVerificationResult: Dispatch<SetStateAction<boolean>>;
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

interface SocketEvent {
  name: string;
  status: string;
  data: { accessToken: string; refreshToken: string }; // JWT 토큰페어
}

const PolygonIDVerifier = ({
  accountAddress,
  credentialType,
  onVerificationResult,
}: PolygonIDProps) => {
  const [sessionId, setSessionId] = useState<string>("");
  const [qrCodeData, setQrCodeData] = useState<QRCodeData | null>(null);
  const [isHandlingVerification, setIsHandlingVerification] = useState<boolean>(false);
  const [verificationCheckComplete, setVerificationCheckComplete] =
    useState<boolean>(false);
  const [verificationMessage, setVerificationMessage] = useState<string>("");
  const [socketEvents, setSocketEvents] = useState<SocketEvent[]>([]);
  const linkDownloadPolygonIDWalletApp = "https://0xpolygonid.github.io/tutorials/wallet/wallet-overview/#quick-start";
  const issuerOrHowToLink = "https://oceans404.notion.site/How-to-get-a-Verifiable-Credential-f3d34e7c98ec4147b6b2fae79066c4f6?pvs=4";

  const socket = useRef<WebSocket | null>(null);

  const serverUrl = "https://api.heroticket.xyz";

  const getQrCodeApi = (sessionId: string) => {
    return serverUrl + `/v1/users/login-qr?sessionId=${sessionId}`;
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
      const response = await fetch(getQrCodeApi(sessionId));
      const data = await response.text();
      return JSON.parse(data);
    };

    if (sessionId) {
      fetchQrCode().then((data) => {
        console.log(data.data);
        setQrCodeData(data.data);
      }).catch(console.error);
    }
  }, [sessionId]);

  // socket event side effects
  useEffect(() => {
    if (socketEvents.length) {
      const currentSocketEvent = socketEvents[socketEvents.length - 1];

      console.log(currentSocketEvent)

      if (currentSocketEvent.name === 'login-callback') {
        if (currentSocketEvent.status === 'IN_PROGRESS') {
          setIsHandlingVerification(true);
        } else {
          setIsHandlingVerification(false);
          setVerificationCheckComplete(true);
          if (currentSocketEvent.status === 'DONE') {
            setVerificationMessage("✅ Verified proof");
            const jwtTokenPair = currentSocketEvent.data;
            sessionStorage.setItem('jwtToken', JSON.stringify(jwtTokenPair));
  
            fetchUserInfo(jwtTokenPair.accessToken, accountAddress);

            setTimeout(() => {
              reportVerificationResult(true);
            }, 2000);
            socket.current?.close();
          } else {
            setVerificationMessage("❌ Error verifying VC");
          }
        }
      }
    }
  }, [socketEvents]);

  const fetchUserInfo = async (accessToken: string, accountAddress: string) => {
    try {
      const response = await axios.get(`${serverUrl}/v1/users/info`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 404) {
        console.log('error', response.status)
      } else {
        const userInfo = response.data;
        console.log(userInfo);
      }

    } catch (e) {
      console.log('Error fetching user info:', e);
      if (e.response && e.response.status === 404) {
        await registerUser(accessToken, accountAddress);
      }
    }
  }

  const registerUser = async (accessToken: string, accountAddress: string) => {
    try {
      const res = await axios.post(`${serverUrl}/v1/users/register/${accountAddress}`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log('User registered:', res.data); // 사용자 등록 성공 응답 처리
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  // callback, send verification result back to app
  const reportVerificationResult = (result: boolean) => {
    onVerificationResult(result);
  };

  return (
    <>
      <P.QRCodeContainer>
        <p>Scan this QR code from your Polygon ID Wallet App to prove access rights.</p>
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
        <P.ButtonContainer>
          <button>
            <Link href={linkDownloadPolygonIDWalletApp} target="_blank">
              Download the Polygon ID Wallet App
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </Link>
          </button>
          <button>
            <Link href={issuerOrHowToLink} target="_blank">
              Get a {credentialType} VC
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </Link>
          </button>
        </P.ButtonContainer>
      </P.QRCodeContainer>
    </>
  );
}

export default PolygonIDVerifier;