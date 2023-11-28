import React, { useState, useRef } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import axios from 'axios';
import { ConnectButton, } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import PolygonIDVerifier from '../PolygonIDVerifier';
import { Logo, ModalPortal} from './Reference';
import * as H from '@/styles/Header.styles';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const { address, isConnected } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>(null);

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
                          <button
                            onClick={openConnectModal}
                            type='button'
                            className='px-4 py-2 border border-gray-300 rounded-xl shadow-sm'
                          >
                            Connect Wallet
                          </button>
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
                        <div style={{ display: 'flex', gap: 12 }}>
                          <button
                            onClick={openChainModal}
                            style={{ display: 'flex', alignItems: 'center', backgroundColor: 'transparent', border: 'none' }}
                            type='button'
                            className='px-4 border-2 font-bold border-gray-500 rounded-xl shadow-sm'
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  borderRadius: 999,
                                  overflow: 'hidden',
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                  />
                                )}
                              </div>
                            )}
                          </button>
                          <div className='relative' ref={dropdownRef}>
                            <button
                              onClick={toggleDropdown}
                              type='button'
                              id='dropdown-menu-button'
                              style={{ backgroundColor: 'transparent', border: 'none'}}
                              aria-expanded={isOpen ? 'true' : 'false'}
                              aria-haspopup='true'
                            >
                              <div className='mr-4'>
                                {account.displayName}
                              </div>
                            </button>
                          </div>
                        </div>
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
        <ModalPortal isOpen={isModalOpen} onClose={closeModal}>
          {authenticated ? (
            <ConnectButton />
          ) : (
            <PolygonIDVerifier
              accountAddress={isConnected ? address : ''}
              credentialType={"Authorization"}
              onVerificationResult={setAuthenticated}
            />
          )}
        </ModalPortal>
      </div>
    </H.Head>
  )
}

export default Header;
