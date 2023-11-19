import React from 'react';
import Image from 'next/image';
import Logo from '@/assets/images/logo.png';
import { CardContainer, Card } from '@/styles/Ticket.styles';
import { Container, Title } from '@/styles/styled';

const Ticket = () => {
  return (
    <Container>
      <Title>
        <h1>Ticket</h1>
      </Title>
      <CardContainer>
        <Card>
          <div>
            <Image src={Logo} alt="Logo" layout='responsive' width={100} height={100} quality={100}  />
          </div>
          <div>
            <h2>티켓</h2>
            <p>티켓</p>
            <button>Buy</button>
          </div>
        </Card>
      </CardContainer>
    </Container>
  )
}

export default Ticket;
