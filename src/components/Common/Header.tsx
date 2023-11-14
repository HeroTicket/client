import React from 'react';
import Image from 'next/image'
import styled from 'styled-components';
import logo from '@/assets/images/logo.png';

const Header = () => {
  return (
    <Head>
      <Image src={logo} alt='logo' width={150} height={25} quality={100} />
      <div>
        <Menu>
          <li>About us</li>
          <li>Notice</li>
          <li>Ticket</li>
          <li>FAQ</li>
          <li>
            <LoginBtn>Login</LoginBtn>
          </li>
        </Menu>
      </div>
    </Head>
  )
}

export default Header;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

`;

const Menu = styled.ul`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  list-style: none;
  font-size: 1.5rem;
  font-weight: 600;

  li {
    cursor: pointer;
    transition: all .3s;

    &:hover {
      color: red;
    }
  }
`;

const LoginBtn = styled.button`
  background-color: red;
  color: white;
  padding: .7rem 3rem;
  border: none;
  border-radius: .6rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    background-color: #D71313;
    color: #fff;
  }
`