import React, { useState, useRef, useEffect, useContext } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import PolygonIDVerifier from '@/components/PolygonIDVerifier';
import { Logo, ModalPortal } from './Reference';
import * as H from '@/styles/Header.styles';
import { authContext } from '@/pages/providers';


const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<any>(null);

  const { address, isConnected } = useAccount();
  const { isLoggedIn, accessToken, login, logout } = useContext(authContext);

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

  const handleDisconnect = () => {
    sessionStorage.removeItem('jwtToken'); // 예시로 'jwtToken'을 삭제
    router.push('/');
  };

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
                                    <Image src={chain.iconUrl} alt={chain.name ?? 'Chain icon'} layout='responsive' width={500} height={500} quality={100} />
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
                                  <span onClick={() => { openAccountModal(); handleDisconnect(); }}>Disconnect</span>
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
              <H.LoginBtn onClick={openModal}>Connect</H.LoginBtn>
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
                accountAddress={isConnected ? address : ''}
                credentialType={"Authorization"}
                loginHandler={login}
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
