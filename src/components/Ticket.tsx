import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ModalPortal, DefaultImg } from './Common/Reference';
import { Title } from '@/styles/styled';
import 'react-calendar/dist/Calendar.css';
import * as T from '@/styles/Ticket.styles';
import * as S from '@/styles/Calendar.styles';

const dummyData = [
  { 'id': 1, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2310/231030015704_23014028.gif', 'owner': 'voluptatem', 'place': 'occaecati', 'title': 'quo optio et', 'desc': 'Fugiat enim a reprehenderit. Quis repellendus culpa non exercitationem. Illo est repudiandae. Qui ullam et molestiae aut. Commodi aliquid facilis perspiciatis minima illo itaque.Fugiat enim a reprehenderit. Quis repellendus culpa non exercitationem. Illo est repudiandae. Qui ullam et molestiae aut. Commodi aliquid facilis perspiciatis minima illo itaque.' },
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
]

interface TicketData {
  id: number;
  poster: string;
  owner: string;
  place: string;
  title: string;
  desc: string;
}

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

const Ticket = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<TicketData | null>(null);
  const [value, setValue] = useState<Value>(new Date());
  const [isNextStepClicked, setIsNextStepClicked] = useState<boolean>(false);
  const [isLargeModal, setIsLargeModal] = useState(true);

  const handleDateChange = (newValue: Value) => {
    setValue(newValue);
  };

  const availableDates = [
    new Date(2023, 11, 7).getTime(), // 12월 7일
    new Date(2023, 11, 8).getTime(), // 12월 8일
    new Date(2023, 11, 9).getTime(), // 12월 9일
  ];

  const isDisabled = ({ date, view }: { date: Date; view: string }): boolean => {
    return view === 'month' && !availableDates.includes(date.getTime());
  };

  const openModal = (data: TicketData) => {
    setSelectedItem(data);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  }
  const closeModal = () => {
    setIsLargeModal(true);
    setIsModalOpen(false);
    setIsNextStepClicked(false);
    document.body.style.overflow = "unset";
    setTimeout(() => {
      setSelectedItem(null);
    }, 300); // 300ms는 애니메이션 지속 시간과 일치시킵니다.
  }

  const handleNextStepClick = () => {
    setIsNextStepClicked(true);
    setIsLargeModal(false); // 모달 크기를 줄입니다
  }

  return (
    <T.TicketContainer>
      <Title>
        <h1>Ticket</h1>
      </Title>
      <T.CardContainer>
        {dummyData.map((data) => {
          return (
            <T.Card key={data.id} onClick={() => openModal(data)}>
              <T.CardImgContainer>
                <Image src={data.poster} alt="poster" fill quality={100}  />
              </T.CardImgContainer>
              <T.CardContent>
                <h2>{data.owner}</h2>
                <p className="place">{data.place}</p>
                <p className='title'>{data.title}</p>
              </T.CardContent>
            </T.Card>
          )
        })}
      </T.CardContainer>
      <ModalPortal isOpen={isModalOpen} onClose={closeModal} isLarge={isLargeModal}>
        {!isNextStepClicked ? (
          <>
            <T.ModalImageContainer>
              <Image src={selectedItem?.poster || DefaultImg} alt="poster" fill={true} quality={100}  />
            </T.ModalImageContainer>
            <T.ModalRight>
              <div>
                <div>
                  <h1>{selectedItem?.title}</h1>
                  <p>{selectedItem?.owner}</p>
                </div>
                <p>{selectedItem?.desc}</p>
              </div>
              <T.CalendarContainer>
                <S.CalendarBox>
                  <S.StyleCalendar
                    locale='en'
                    onChange={handleDateChange}
                    value={value}
                    tileDisabled={isDisabled}
                    calendarType='hebrew'
                  />
                </S.CalendarBox>
              </T.CalendarContainer>
              <T.TicketBtn onClick={handleNextStepClick}>Next Step</T.TicketBtn>
            </T.ModalRight>
          </>
        ) : (
          <div>
            <T.TicketBtn>Polygon ID authentication request</T.TicketBtn>
          </div>
        )}
      </ModalPortal>
    </T.TicketContainer>
  )
}

export default Ticket;
