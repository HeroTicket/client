import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Swal from 'sweetalert2';
import * as T from '@/styles/Ticket.styles';
import * as M from '@/styles/MyPage.styles';
import { DefaultImg, MainImg, ModalPortal } from './Common/Reference';
import { authContext } from '@/context/providers';
import axios from 'axios';
import { useQuery } from 'react-query';
import ClaimCredential from './ClaimCredential';
import VerifyCredential from './VerifyCredential';

interface GetProfileResponse {
  status: number;
  message: string;
  data: Profile
}

interface Profile {
  userInfo: UserInfo;
  ownedTickets: OwnedTicket[] | null;
  issuedTickets: TicketCollection[] | null;
}

interface UserInfo {
  accountAddress: string;
  avatar: string;
  banner: string;
  bio: string;
  createdAt: number;
  id: string;
  isAdmin: boolean;
  name: string;
  tbaAddress: string;
  tbaTokenBalance: string;
  updatedAt: number;
}

interface OwnedTicket {
  token_id: string;
  token_address: string;
  name: string;
  symbol: string;
  token_uri: string;
  metadata: string;
}

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

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('purchased');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<OwnedTicket | TicketCollection | null>(null);
  const router = useRouter();

  const { isLoading, isLoggedIn, isRegistered, addressMatched, accessToken, userInfo } = useContext(authContext);

  const fetchProfile = async (): Promise<Profile> => {
    if (!userInfo) {
      throw new Error('User info is not defined');
    }

    const res = await axios.get<GetProfileResponse>(`${process.env.NEXT_PUBLIC_SERVER_URL}/profile/${userInfo.accountAddress}`);

    if (res.status !== 200) {
      throw new Error(res.data.message);
    }

    return res.data.data;
  }

  const profileQuery = useQuery<Profile, Error>(['profile', userInfo], fetchProfile, {
    enabled: isLoggedIn && isRegistered && addressMatched,
  });

  const openModal = (item: OwnedTicket | TicketCollection) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    document.body.style.overflow = "unset";
    setTimeout(() => {
      setSelectedItem(null);
    }, 300);
  }

  useEffect(() => {
    if (isLoading) {
      return; // 로그인 상태 확인 중이면 페이지 내용을 렌더링하지 않음
    }

    if (!(isLoggedIn)) {
      // 로그인 모달 표시
      Swal.fire({
        title: 'Login Required',
        text: 'You need to login to access this page.',
        icon: 'warning',
        confirmButtonText: 'OK',
        willClose: () => {
          router.push('/'); // 로그인 페이지로 이동
        }
      });
    }
  }, [router, isLoading, isLoggedIn]);

  if (!(isLoggedIn && isRegistered && addressMatched && userInfo)) {
    return null; // 로그인 상태가 아니면 페이지 내용을 렌더링하지 않음
  }

  return (
    <M.MyPageContainer>
      <M.ProfileContainer>
        <p></p>
        <M.MyPageImageContainer>
          <Image src={userInfo.avatar} layout='responsive' width={800} height={720} quality={100} alt='profile image' priority />
        </M.MyPageImageContainer>
        <M.InfoContainer>
          <p title='Click to copy the address'>{userInfo!.accountAddress.slice(0, 12) + '...' + userInfo!.accountAddress.slice(30, userInfo!.accountAddress.length)}</p>
          <p>{userInfo!.tbaAddress.slice(0, 12) + '...' + userInfo!.tbaAddress.slice(30, userInfo!.tbaAddress.length)}</p>
          <p>{userInfo.tbaTokenBalance} HT</p>
        </M.InfoContainer>
      </M.ProfileContainer>
      <M.TabContainer>
        <M.TabButton
          className={activeTab === 'purchased' ? 'active' : ''}
          onClick={() => setActiveTab('purchased')}
        >
          Purchased Tickets
        </M.TabButton>
        <M.TabButton
          className={activeTab === 'issued' ? 'active' : ''}
          onClick={() => setActiveTab('issued')}
        >
          Issued Tickets
        </M.TabButton>
      </M.TabContainer>
      {activeTab === 'purchased' ? (
        <T.CardContainer>
          {
            profileQuery.data?.ownedTickets && profileQuery.data?.ownedTickets.map((ticket) => {
              const metadata = ticket.metadata ? JSON.parse(ticket.metadata) : {};
              const imageUrl = metadata.url || DefaultImg;

              return <T.Card key={ticket.token_id} onClick={() => openModal(ticket)}>
                <T.CardImgContainer>
                  <Image src={imageUrl} alt="poster" fill quality={100} priority />
                </T.CardImgContainer>
                <T.CardContent>
                  <h2>{ticket.name}</h2>
                  <p className="place">{ticket.token_address}</p>
                  <p className='title'>{ticket.token_id}</p>
                </T.CardContent>
              </T.Card>
            })
          }
          {profileQuery.data?.ownedTickets?.length === 0 && <p>No tickets</p>}
          {profileQuery.isLoading && <p>Loading...</p>}
          {profileQuery.isError && <p>Error: {profileQuery.error?.message}</p>}

        </T.CardContainer>
      ) : (
        <T.CardContainer>
          {
            profileQuery.data?.issuedTickets && profileQuery.data?.issuedTickets.map((ticket) => {
              return <T.Card key={ticket.id} onClick={() => openModal(ticket)}>
                <T.CardImgContainer>
                  <Image src={ticket.bannerUrl || DefaultImg} alt="poster" fill quality={100} priority />
                </T.CardImgContainer>
                <T.CardContent>
                  <h2>{ticket.name}</h2>
                  <p className="place">{ticket.location}</p>
                  <p className='title'>{ticket.symbol}</p>
                </T.CardContent>
              </T.Card>
            })
          }
        </T.CardContainer>
      )}
      {/* Modal */}
      {selectedItem && (
        <ModalPortal isOpen={isModalOpen} onClose={closeModal} >
          {
            'metadata' in selectedItem ?
              <ClaimCredential contractAddress={selectedItem.token_address} /> :
              <VerifyCredential contractAddress={selectedItem.contractAddress} close={closeModal} />
          }
        </ModalPortal>

      )}
    </M.MyPageContainer>
  )
}

export default MyPage;