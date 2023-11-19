import React, { useState } from 'react';
import Image from 'next/image';
import { ModalPortal } from './Common/Reference';
import { TicketContainer, CardContainer, Card, CardImgContainer, CardContent, TicketBtn, ModalImageContainer } from '@/styles/Ticket.styles';
import { Title } from '@/styles/styled';

const dummyData = [
  { 'id': 1, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2310/231030015704_23014028.gif', 'owner': 'voluptatem', 'place': 'occaecati', 'title': 'quo optio et', 'desc': 'Accusantium officia autem quos quisquam nisi officiis voluptatibus illo aut.' },
  { 'id': 2, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2311/231103111621_23016085.gif', 'owner': 'quisquam', 'place': 'totam', 'title': 'quo optio et', 'desc': 'Illo deleniti quo velit ipsum consequatur facilis est minima.' },
  { 'id': 3, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2310/231025103254_23014952.gif', 'owner': 'provident', 'place': 'voluptatem', 'title': 'quo optio et', 'desc': 'Placeat et repellendus voluptatum excepturi eos.' },
  { 'id': 4, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2311/231115060435_23015862.gif', 'owner': 'error', 'place': 'et', 'title': 'quo optio et', 'desc': 'Aut dolorem voluptatibus asperiores optio voluptas vel consectetur.' },
  { 'id': 5, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2311/231114025008_23016498.gif', 'owner': 'aut', 'place': 'adipisci', 'title': 'quo optio et', 'desc': 'Atque accusamus dicta sed sapiente dolorem repellat totam.' },
  { 'id': 6, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2311/231107044048_23016041.gif', 'owner': 'distinctio', 'place': 'quo', 'title': 'quo optio et', 'desc': 'Ab enim omnis sed error eius rerum.' },
  { 'id': 7, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2310/231020110913_23012636.gif', 'owner': 'a', 'place': 'beatae', 'title': 'quo optio et', 'desc': 'Et natus id vitae sequi alias omnis.' },
  { 'id': 8, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2311/231110105234_23016182.gif', 'owner': 'est', 'place': 'nulla', 'title': 'quo optio et', 'desc': 'Qui harum quo.' },
  { 'id': 9, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2311/231113093904_23016243.gif', 'owner': 'dolor', 'place': 'labore', 'title': 'quo optio et', 'desc': 'Beatae est est dolores quia aliquam quae.' },
  { 'id': 10, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2311/231113020527_23016322.gif', 'owner': 'voluptatum', 'place': 'perferendis', 'title': 'quo optio et', 'desc': 'Et et ut fugiat perferendis quasi.' },
  { 'id': 11, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2311/231114024601_23016343.gif', 'owner': 'repudiandae', 'place': 'atque', 'title': 'quo optio et', 'desc': 'Impedit optio facilis aperiam quia asperiores.' },
  { 'id': 12, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2311/231116113220_23016762.gif', 'owner': 'alias', 'place': 'doloribus', 'title': 'quo optio et', 'desc': 'Saepe tempora quibusdam asperiores velit neque pariatur ut perferendis.' },
  { 'id': 13, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2309/230920091152_23013281.gif', 'owner': 'nulla', 'place': 'nihil', 'title': 'quo optio et', 'desc': 'Dolor est totam dolor et maiores in.' },
  { 'id': 14, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2309/230921024652_23013309.gif', 'owner': 'sit', 'place': 'omnis', 'title': 'quo optio et', 'desc': 'Assumenda facere nobis quae laborum corporis nihil autem sed maiores.' },
  { 'id': 15, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2310/231031095904_23015513.gif', 'owner': 'harum', 'place': 'quae', 'title': 'quo optio et', 'desc': 'Dolorem ipsa recusandae consequuntur non eligendi eos eum saepe ea.' },
  { 'id': 16, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2310/231012031758_23014405.gif', 'owner': 'in', 'place': 'in', 'title': 'quo optio et', 'desc': 'Et qui consequatur.' },
  { 'id': 17, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2310/231017044035_23014379.gif', 'owner': 'eaque', 'place': 'sed', 'title': 'quo optio et', 'desc': 'Quia consequatur cupiditate maxime officia perferendis accusantium quas hic est.' },
]

interface TicketData {
  id: number;
  poster: string;
  owner: string;
  place: string;
  title: string;
  desc: string;
}

const Ticket = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<TicketData | null>(null);

  const openModal = (data: TicketData) => {
    setSelectedItem(data);
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  }


  return (
    <TicketContainer>
      <Title>
        <h1>Ticket</h1>
      </Title>
      <CardContainer>
        {dummyData.map((data) => {
          return (
            <Card key={data.id} onClick={() => openModal(data)}>
              <CardImgContainer>
                <Image src={data.poster} alt="poster" fill quality={100}  />
              </CardImgContainer>
              <CardContent>
                <h2>{data.owner}</h2>
                <p className="place">{data.place}</p>
                <p className='title'>{data.title}</p>
              </CardContent>
            </Card>
          )
        })}
      </CardContainer>
      <ModalPortal isOpen={isModalOpen} onClose={closeModal}>
        <ModalImageContainer>
          <Image src={selectedItem?.poster} alt="poster" fill quality={100}  />
        </ModalImageContainer>
        <div>
          <h3>{selectedItem?.title}</h3>
          <p>{selectedItem?.owner}</p>
          <p>{selectedItem?.desc}</p>
          <div>
            달력
          </div>
          <button>Next Step</button>
        </div>
      </ModalPortal>
    </TicketContainer>
  )
}

export default Ticket;
