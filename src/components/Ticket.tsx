import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { ModalPortal, DefaultImg } from './Common/Reference';
import { Title } from '@/styles/styled';
import 'react-calendar/dist/Calendar.css';
import * as T from '@/styles/Ticket.styles';
import * as S from '@/styles/Calendar.styles';
import axios from 'axios';
import { useQuery } from 'react-query';
import { formatEther } from 'viem';
import { authContext } from '@/context/providers';

/*
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
*/


interface TicketCollection {
  bannerUrl: string;
  contractAddress: string;
  createdAt: number;
  date: string;
  description: string;
  ethPrice: string;
  id: string;
  issuerAddress: string;
  location: string;
  name: string;
  organizer: string;
  remaining: string;
  saleEndAt: number;
  saleStartAt: number;
  symbol: string;
  ticketUrl: string;
  tokenPrice: string;
  totalSupply: string;
  updatedAt: number;
}

interface TicketCollectionDetail extends TicketCollection {
  userHasTicket: boolean;
}

interface GetTicketCollectionsResponse {
  status: number;
  message: string;
  data: TicketCollection[];
}

interface GetTicketCollectionDetailResponse {
  status: number;
  message: string;
  data: TicketCollectionDetail;
}

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

const unixTimeToDateString = (unixTime: number): string => {
  const date = new Date(unixTime * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

const Ticket = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<TicketCollection | null>(null);
  const [hasTicket, setHasTicket] = useState<boolean>(false);
  const [buyByMatic, setBuyByMatic] = useState<boolean>(false);
  const [buyByToken, setBuyByToken] = useState<boolean>(false);

  const [isPolygonBtn, setIsPolygonBtn] = useState<boolean>(false);

  const { isLoggedIn, isRegistered, addressMatched } = useContext(authContext);

  const openModal = (data: TicketCollection) => {
    setSelectedItem(data);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setBuyByMatic(false);
    setBuyByToken(false);
    setIsPolygonBtn(false);
    document.body.style.overflow = "unset";
    setTimeout(() => {
      setSelectedItem(null);
    }, 300); // 300ms는 애니메이션 지속 시간과 일치시킵니다.
  }

  const handleBuyByMatic = () => {
    setBuyByMatic(true);
  }

  const handleBuyByToken = () => {
    setBuyByToken(true);
  }

  const fetchTicketCollection = async (): Promise<TicketCollection[]> => {
    const response = await axios.get<GetTicketCollectionsResponse>(`${process.env.NEXT_PUBLIC_SERVER_URL}/tickets`);

    if (response.data.status !== 200) {
      throw new Error(response.data.message);
    }

    return response.data.data;
  };

  const fetchTicketCollectionDetail = async (contractAddress: string): Promise<TicketCollectionDetail> => {
    const response = await axios.get<GetTicketCollectionDetailResponse>(`${process.env.NEXT_PUBLIC_SERVER_URL}/tickets/${contractAddress}`);

    if (response.data.status !== 200) {
      throw new Error(response.data.message);
    }

    return response.data.data;
  };

  const ticketsQuery = useQuery<TicketCollection[], Error>('tickets', fetchTicketCollection);

  const ticketDetailQuery = useQuery<TicketCollectionDetail, Error>(
    ['ticketDetail', isLoggedIn, isRegistered, selectedItem?.contractAddress],
    () => fetchTicketCollectionDetail(selectedItem?.contractAddress || ''),
    {
      enabled: isLoggedIn && isRegistered && !!selectedItem?.contractAddress,
      onSuccess: (data) => {
        setHasTicket(data.userHasTicket);
      }
    }
  );

  return (
    <T.TicketContainer>
      <Title>
        <h1>Ticket</h1>
      </Title>
      <T.CardContainer>
        {
          ticketsQuery.isLoading ? (
            <div>Loading...</div>
          ) : ticketsQuery.isError ? (
            <div>Error: {ticketsQuery.error.message}</div>
          ) : (
            ticketsQuery.data ? (ticketsQuery.data?.map((ticket) => {
              return (
                <T.Card key={ticket.id} onClick={() => openModal(ticket)}>
                  <T.CardImgContainer>
                    <Image src={ticket.bannerUrl} alt="poster" fill quality={100} />
                  </T.CardImgContainer>
                  <T.CardContent>
                    <h2>{ticket.organizer}</h2>
                    <p className="place">{ticket.location}</p>
                    <p >{ticket.name}</p>
                  </T.CardContent>
                </T.Card>
              )
            })) : (
              <div>No Tickets Found</div>
            )
          )
        }
      </T.CardContainer>
      {/* Modal */}
      {selectedItem && (
        <ModalPortal isOpen={isModalOpen} onClose={closeModal} isNextStepClicked={buyByMatic || buyByToken}>
          {(!buyByMatic && !buyByToken) ? (
            <T.PreNextStepContent>
              <T.ModalImageContainer>
                <Image src={selectedItem?.bannerUrl || DefaultImg} alt="poster" fill={true} quality={100} />
              </T.ModalImageContainer>
              <T.ModalRight>
                <div>
                  <h1>{selectedItem.name}</h1>
                  <p>{selectedItem.description}</p>
                </div>
                <div>
                  <p>When: {selectedItem.date}</p>
                  <p>Where: {selectedItem.location}</p>
                  <p>Organizer: {selectedItem.organizer}</p>
                  <p>Sale Duration: {unixTimeToDateString(selectedItem.saleStartAt)} ~ {unixTimeToDateString(selectedItem.saleEndAt)}</p>
                  <p>Remaining: {selectedItem.remaining}</p>
                  <p>Matic Price: {formatEther(BigInt(selectedItem.ethPrice))} Matic</p>
                  <p>Token Price: {selectedItem.tokenPrice}</p>
                </div>
                {selectedItem.remaining === '0' ? (<T.TicketBtn disabled={true}>Sold Out</T.TicketBtn>) : (
                  (selectedItem.saleEndAt < Date.now() / 1000) ? (<T.TicketBtn disabled={true}>Sale Ended</T.TicketBtn>) : (
                    (hasTicket) ? (<T.TicketBtn disabled={true}>Already has ticket</T.TicketBtn>) : (
                      <>
                        <T.TicketBtn disabled={!(isLoggedIn && isRegistered && addressMatched)} onClick={handleBuyByMatic}>Buy By Matic</T.TicketBtn>
                        <T.TicketBtn disabled={!(isLoggedIn && isRegistered && addressMatched)} onClick={handleBuyByToken}>Buy By Token</T.TicketBtn>
                      </>
                    )))}
              </T.ModalRight>
            </T.PreNextStepContent>
          ) : (
            <T.PostNextStepContent>
              {buyByMatic && (
                <p>Bought by Matic</p>
              )}
              {buyByToken && (
                <p>Bought by Token</p>
              )}
              {/* {!isPolygonBtn ? (
                <T.TicketBtn onClick={() => setIsPolygonBtn(true)}>Polygon ID authentication request</T.TicketBtn>
              ) : (
                // <T.QrcodeContainer>
                //   <FontAwesomeIcon icon={faQrcode} className='qrcode' />
                //   <p>Scan the QR code to complete authentication.</p>
                // </T.QrcodeContainer>
                <T.PurchaseContainer>
                  <T.ModalImageContainer className="purchaseImg">
                    <Image src={selectedItem.bannerUrl || DefaultImg} alt="poster" fill={true} quality={100} />
                  </T.ModalImageContainer>
                  <T.PurchaseInfo>
                    <p>{selectedItem?.name}</p>
                    <p>{selectedItem?.description}</p>
                  </T.PurchaseInfo>
                  <T.PurchasePrice>
                    <p>Price</p>
                    <p>0.2 Token</p>
                  </T.PurchasePrice>
                  <T.TicketBtn>PayMents</T.TicketBtn>
                </T.PurchaseContainer>
              )} */}
            </T.PostNextStepContent>

          )}
        </ModalPortal>
      )}
    </T.TicketContainer>
  )
}

export default Ticket;
