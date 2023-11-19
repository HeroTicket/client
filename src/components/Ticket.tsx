import React from 'react';
import Image from 'next/image';
import { NftImg, MainImg, Did, Erc6551, Security } from './Common/Reference';
import { TicketContainer, CardContainer, Card, CardImgContainer, CardContent, TicketBtn } from '@/styles/Ticket.styles';
import { Title } from '@/styles/styled';

const dummyData = [
  { 'id': 1, 'poster': NftImg, 'title': 'ticket1', 'desc': 'quo optio et' },
  { 'id': 2, 'poster': MainImg, 'title': 'ticket1', 'desc': 'quo optio et' },
  { 'id': 3, 'poster': Did, 'title': 'ticket1', 'desc': 'quo optio et' },
  { 'id': 3, 'poster': Did, 'title': 'ticket1', 'desc': 'quo optio et' },
  { 'id': 3, 'poster': Did, 'title': 'ticket1', 'desc': 'quo optio et' },
  { 'id': 3, 'poster': Did, 'title': 'ticket1', 'desc': 'quo optio et' },
  { 'id': 3, 'poster': Did, 'title': 'ticket1', 'desc': 'quo optio et' },
  { 'id': 4, 'poster': Erc6551, 'title': 'ticket1', 'desc': 'quo optio et' },
  { 'id': 5, 'poster': Security, 'title': 'ticket1', 'desc': 'quo optio et' },
  { 'id': 6, 'poster': NftImg, 'title': 'ticket1', 'desc': 'quo optio et' },
  { 'id': 6, 'poster': NftImg, 'title': 'ticket1', 'desc': 'quo optio et' },
  { 'id': 6, 'poster': NftImg, 'title': 'ticket1', 'desc': 'quo optio et' },
  { 'id': 6, 'poster': NftImg, 'title': 'ticket1', 'desc': 'quo optio et' },
  { 'id': 6, 'poster': NftImg, 'title': 'ticket1', 'desc': 'quo optio et' },
  { 'id': 6, 'poster': NftImg, 'title': 'ticket1', 'desc': 'quo optio et' },
  { 'id': 6, 'poster': NftImg, 'title': 'ticket1', 'desc': 'quo optio et' },
  { 'id': 6, 'poster': NftImg, 'title': 'ticket1', 'desc': 'quo optio et' },
  { 'id': 6, 'poster': NftImg, 'title': 'ticket1', 'desc': 'quo optio et' },
]

interface TicketData {
  id: number;
  poster: string;
  title: string;
  desc: string;
}

const Ticket = () => {
  return (
    <TicketContainer>
      <Title>
        <h1>Ticket</h1>
      </Title>
      <CardContainer>
        {dummyData.map((data) => {
          return (
            <Card key={data.id}>
              <CardImgContainer>
                <Image src={data.poster} alt="poster" fill quality={100}  />
              </CardImgContainer>
              <CardContent>
                <div>
                  <h2>{data.title}</h2>
                  <h3>2021.11.11</h3>
                </div>
                <p>{data.desc}</p>
                <TicketBtn>Buy</TicketBtn>
              </CardContent>
            </Card>
          )
        })}
      </CardContainer>
    </TicketContainer>
  )
}

export default Ticket;
