import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { ConnectButton, } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import PolygonIDVerifier from '@/components/PolygonIDVerifier';
import { Logo, ModalPortal} from './Reference';
import * as H from '@/styles/Header.styles';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>(null);
  const { address, isConnected } = useAccount();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  }

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  }

  let accessToken: string = '';

const jwtToken = sessionStorage.getItem('jwtToken');

if (jwtToken) {
  try {
    const parsedToken = JSON.parse(jwtToken);
    if (parsedToken && parsedToken.accessToken && typeof parsedToken.accessToken === 'string') {
      accessToken = parsedToken.accessToken;
    }
  } catch (error) {
    console.error('Parsing jwtToken failed', error);
  }
}

  const fetchUserInfo = async (accessToken: string, address: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/info`, {
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
      const err = e as AxiosError;
      if (err?.response && err?.response.status === 404) {
        await registerUser(accessToken, address);
      }
    }
  }

  const registerUser = async (accessToken: string, address: string) => {
    console.log(accessToken, address);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/register/${address}`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log('User registered:', res.data); // 사용자 등록 성공 응답 처리
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  useEffect(() => {
    if (authenticated && address) {
      fetchUserInfo(accessToken, address);
    }
  }, [authenticated]);

  useEffect(() => {
    if (isConnected && address) {
      registerUser(accessToken, address);
    }
  }, [isConnected]);

  return (
    <H.Head>
      <Link href='/'>
        <Image src={Logo} alt='logo' width={150} height={25} quality={100} />
      </Link>
      <div>
        <H.Menu>
          <li>
            <Link href='/'>About us</Link>
          </li>
          <li>
            <Link href='/notice'> Notice </Link>
          </li>
          <li>
            <Link href='/ticket'>Ticket</Link>
          </li>
          <li>
            <Link href='/faq'>FAQ</Link>
          </li>
          <li>
            {isConnected ? (
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  authenticationStatus,
                  mounted,
                }) => {
                  // Note: If your app doesn't use authentication, you
                  // can remove all 'authenticationStatus' checks
                  const ready = mounted && authenticationStatus !== 'loading';
                  const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus || authenticationStatus === 'authenticated');
        
                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        style: {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <H.StyledButton
                              onClick={openConnectModal}
                              type='button'
                              className='px-4 py-2 border border-gray-300 rounded-xl shadow-sm'
                            >
                              Connect Wallet
                            </H.StyledButton>
                          );
                        }
        
                        if (chain.unsupported) {
                          return (
                            <button
                              onClick={openChainModal}
                              type='button'
                              className='px-4 py-2 border border-gray-300 rounded-xl shadow-sm'
                            >
                              Wrong network
                            </button>
                          );
                        }
        
                        return (
                          <H.ProfileContainer>
                            <H.ChainButton onClick={openChainModal} type='button'>
                              {chain.hasIcon && (
                                <H.ChainIconContainer>
                                  {chain.iconUrl && (
                                    <Image src={chain.iconUrl} alt={chain.name ?? 'Chain icon'} layout='responsive' width={500} height={500} quality={100}/>
                                  )}
                                </H.ChainIconContainer>
                              )}
                            </H.ChainButton>
                            <H.DropdownButtonContainer ref={dropdownRef}>
                              <H.ProfileButton onClick={toggleDropdown} type='button'>
                                {account.displayName}
                              </H.ProfileButton>
                              {isOpen && (
                                <H.DropdownContainer className={isOpen ? 'open' : ''}>
                                  <Link href={`/mypage`}>
                                    MyPage
                                  </Link>
                                  <Link href={`/create`}>
                                    Create Ticket
                                  </Link>
                                  <span onClick={openAccountModal}>Disconnect</span>
                                </H.DropdownContainer>
                              )}
                            </H.DropdownButtonContainer>
                          </H.ProfileContainer>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            ) : (
              <H.LoginBtn onClick={openModal}>Login</H.LoginBtn>
            )}
          </li>
        </H.Menu>
        {isConnected ? (
          null
        ) : (
          <ModalPortal isOpen={isModalOpen} onClose={closeModal}>
            {authenticated ? (
              <ConnectButton />
            ) : (
              <PolygonIDVerifier
                connected={isConnected}
                accountAddress={isConnected ? address : ''}
                credentialType={"Authorization"}
                onVerificationResult={setAuthenticated}
              />
            )}
          </ModalPortal>
        )}
      </div>
    </H.Head>
  )
}

export default Header;
