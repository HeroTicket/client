import React, { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import axios from 'axios';
import { useAccount} from 'wagmi';
import { ConnectButton, } from '@rainbow-me/rainbowkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { Logo, ModalPortal} from './Reference';
import * as H from '@/styles/Header.styles';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { isConnected } = useAccount();

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
            {
              isConnected ?
                <ConnectButton 
                  chainStatus='icon'
                  showBalance={false}
                />
              :
                <H.LoginBtn onClick={openModal}>Login</H.LoginBtn>
            }
            
          </li>
        </H.Menu>
        <ModalPortal isOpen={isModalOpen} onClose={closeModal}>
          <H.QrCodeContainer>
            <iframe src='https://issuer-ui.polygonid.me/credentials/scan-issued/94c98e75-8aac-11ee-b330-0242ac120008' style={{ 
              width: '500px', 
              height: '500px', 
              overflow: 'hidden', 
              // marginTop: '-100px', // 상단의 특정 부분을 숨김
            }} />
            <ConnectButton />
          </H.QrCodeContainer>
        </ModalPortal>
      </div>
    </H.Head>
  )
}

export default Header;
