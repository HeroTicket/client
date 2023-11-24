import React, { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { Logo, ModalPortal} from './Reference';
import * as H from '@/styles/Header.styles';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
            <H.LoginBtn onClick={openModal}>Login</H.LoginBtn>
          </li>
        </H.Menu>
        <ModalPortal isOpen={isModalOpen} onClose={closeModal}>
          <H.QrCodeCOntainer>
            <FontAwesomeIcon icon={faQrcode} className='qrcode' />
            <p>Please scan the QR code.</p>
          </H.QrCodeCOntainer>
        </ModalPortal>
      </div>
    </H.Head>
  )
}

export default Header;
