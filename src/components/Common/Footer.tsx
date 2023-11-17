import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Logo from '@/assets/images/logo.png';
import Discord from '@/assets/images/discord.png';
import Gmail from '@/assets/images/gmail.png';
import Github from '@/assets/images/github.png';

const Footer = () => {

  return (
    <FooterContainer>
      <FooterLogo>
        <Image src={Logo} alt='logo' width={100} height={100} layout='responsive' quality={100} />
      </FooterLogo>
      <FooterIconContainer>
        <div>
          <Image src={Github} alt='Github' width={100} height={100} layout='responsive' quality={100} />
        </div>
        <div>
          <Image src={Discord} alt='Discord' width={100} height={100} layout='responsive' quality={100} />
        </div>
        <div>
          <Image src={Gmail} alt='Gmail' width={100} height={100} layout='responsive' quality={100} />
        </div>
      </FooterIconContainer>
    </FooterContainer>
  )
}

export default Footer;

const FooterContainer = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #999;
  padding: 1rem 0;
`

const FooterLogo = styled.div`
  width: 10%;
`

const FooterIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;

  div {
    width: 3%;
    height: 100%;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      transform: scale(1.1);
    }
  }
`