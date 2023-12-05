import React, { useState, useRef, useEffect, useContext } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import PolygonIDVerifier from '@/components/PolygonIDVerifier';
import { Logo, ModalPortal } from './Reference';
import * as H from '@/styles/Header.styles';
import { authContext } from '@/pages/providers';
import Swal from 'sweetalert2';


const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<any>(null);

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { isLoggedIn, isRegistered, addressMatched, accessToken, userInfo, login, logout, registerUser } = useContext(authContext);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  }

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  }

  const handleLogin = (tokenPair: any) => {
    login(tokenPair);
    closeModal();
  }

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure to logout?",
      text: "You will be redirected to the main page.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged out!",
          icon: "success"
        });

        logout();
        router.push('/');
      }
    });
  };

  const handleDisconnect = () => {
    Swal.fire({
      title: "Are you sure to disconnect?",
      text: "You will be redirected to the main page.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Disconnect",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Disconnected!",
          icon: "success"
        });

        disconnect();
        logout();
        router.push('/');
      }
    });
  };

  const handleRegister = () => {
    Swal.fire({
      title: "Are you sure to register?",
      text: `You will register ${address} as your account address.`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Register",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Please wait...",
          icon: "info",
          didOpen: () => {
            Swal.showLoading();

            registerUser().then((res) => {
              Swal.fire({
                title: "Registered!",
                text: `Your TBA address is ${res.tbaAddress}`,
                icon: "success",
                willClose: () => {
                  router.reload();
                }
              })
            }).catch((err) => {
              if (axios.isAxiosError(err)) {
                const error = err as AxiosError;
                Swal.fire({
                  title: "Error!",
                  text: error.message,
                  icon: "error"
                })
              }
            })
          }
        });

      }
    });
  }

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
            <ConnectButton.Custom >
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
                          <H.LoginBtn
                            onClick={openConnectModal}
                            type='button'
                            className='px-4 py-2 border border-gray-300 rounded-xl shadow-sm'
                          >
                            Connect
                          </H.LoginBtn>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button
                            onClick={openChainModal}
                            type='button'
                            className='px-4 py-2 border border-gray-300 rounded-xl shadow-sm'
                          >
                            Wrong Network
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
                            {isDropdownOpen && (
                              <H.DropdownContainer className={isDropdownOpen ? 'open' : ''}>
                                {isLoggedIn ? (
                                  <>
                                    {isRegistered ? (
                                      addressMatched ? (<>
                                        <Link href={`/mypage`}>
                                          MyPage
                                        </Link>
                                        <Link href={`/create`}>
                                          Create Ticket
                                        </Link>
                                      </>) : (<span>Address not matched</span>)
                                    ) : (<span onClick={handleRegister}>Register</span>)}
                                    <span onClick={handleLogout}>Logout</span>
                                  </>
                                ) : (<span onClick={() => {
                                  toggleDropdown();
                                  openModal();
                                }}>Login</span>)}
                                <span onClick={handleDisconnect}>Disconnect</span> {/* 로그아웃: TODO - 연결 해제 버튼 누를 때 동작하게 하기 */}
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
          </li>
        </H.Menu>
        {isLoggedIn ? (
          null
        ) : (
          <ModalPortal isOpen={isModalOpen} onClose={closeModal}>
            <PolygonIDVerifier
              accountAddress={isConnected ? address : ''}
              credentialType={"Authorization"}
              loginHandler={handleLogin}
            />
          </ModalPortal>
        )}
      </div>
    </H.Head>
  )
}

export default Header;
