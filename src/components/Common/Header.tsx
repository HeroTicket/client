import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import logo from '@/assets/images/logo.png';
import { Head, Menu, LoginBtn } from '@/styles/Header.styles';

const Header = () => {
  return (
    <Head>
      <Link href='/'>
        <Image src={logo} alt='logo' width={150} height={25} quality={100} />
      </Link>
      <div>
        <Menu>
          <li>
            <Link href='/'>About us</Link>
          </li>
          <li>
            <Link href='/notice'> Notice </Link>
          </li>
          <li>Ticket</li>
          <li>
            <Link href='/faq'>FAQ</Link>
          </li>
          <li>
            <LoginBtn>Login</LoginBtn>
          </li>
        </Menu>
      </div>
    </Head>
  )
}

export default Header;

