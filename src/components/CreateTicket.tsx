import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { useMutation } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import * as C from '@/styles/CreateTicket.styles';
import * as S from '@/styles/styled';
import axios from 'axios';
import { authContext } from '@/pages/providers';

interface IFile extends File {
  file?: File;
  preview?: string;
  url?: string;
}

interface CreateTicketData {
  name: string;
  symbol: string;
  description: string;
  organizer: string;
  location: string;
  date: string;
  bannerImage: File; // 또는 이미지 데이터에 따라 다른 타입
  ticketUri: string;
  ethPrice: number;
  tokenPrice: number;
  totalSupply: number;
  saleDuration: number;
}

const EXTENSIONS = [
  { type: 'gif' },
  { type: 'jpg' },
  { type: 'jpeg' },
  { type: 'png' },
  { type: 'mp4' },
];


const useCreateTicket = () => {
  return useMutation(async (ticketData: CreateTicketData) => {
    const jwtToken = sessionStorage.getItem('jwtToken');
    if (!jwtToken) {
      throw new Error("No JWT Token found in sessionStorage");
    }
    const tokenData = JSON.parse(jwtToken);
    const { accessToken } = tokenData;

    const formData = new FormData();
    formData.append('name', ticketData.name);
    formData.append('symbol', ticketData.symbol);
    formData.append('description', ticketData.description);
    formData.append('organizer', ticketData.organizer);
    formData.append('location', ticketData.location);
    formData.append('date', ticketData.date);
    formData.append('bannerImage', ticketData.bannerImage);
    formData.append('ticketUri', ticketData.ticketUri);
    formData.append('ethPrice', ticketData.ethPrice?.toString());
    formData.append('tokenPrice', ticketData.tokenPrice?.toString());
    formData.append('totalSupply', ticketData.totalSupply?.toString());
    formData.append('saleDuration', ticketData.saleDuration?.toString());

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/tickets/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`,
        }
      });

      return response.data;
    } catch (error) {
      console.log('Error creating ticket: ', error);
      throw error;
    }
  });
}

const CreateTicket = () => {
  const createTicketMutation = useCreateTicket();

  const { isLoading, isLoggedIn, isRegistered, addressMatched, userInfo } = useContext(authContext);

  const router = useRouter();
  const [uploadFile, setUploadFile] = useState(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [ticketFile, setTicketFile] = useState<IFile | null>(null);
  const [bannerFileUrl, setBannerFileUrl] = useState<IFile | null>(null);
  const [ticketFileUrl, setTicketFileUrl] = useState<IFile | null>(null);

  const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 파일이 있는지 확인
    if (!e.target.files || e.target.files.length === 0) {
      return; // 파일이 없으면 함수를 종료
    }

    const FILE = e.target.files[0];
    const SIZE = 100;
    const TYPE = (FILE.type).split('/')[1];
    const FSIZE = (FILE.size) / Math.pow(10, 6);
    const inputId = e.target.id;

    console.log(FILE)

    if (FSIZE < SIZE && EXTENSIONS.some(extension => extension.type === TYPE)) {
      const objectURL = URL.createObjectURL(FILE);

      if (inputId === 'ticket-banner') {
        setBannerFile(FILE);
        setBannerFileUrl({ ...FILE, preview: objectURL });
      } else if (inputId === 'ticket') {
        setTicketFileUrl({ ...FILE, preview: objectURL });
        setTicketFile({ ...FILE, url: objectURL });
      }
    } else {
      // 파일 크기 오류 처리
      Swal.fire({
        title: 'Error',
        text: `파일 사이즈가 MAX SIZE ${SIZE}보다 큽니다.`,
        icon: 'error',
        confirmButtonText: '확인'
      });
    }
  };


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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    // 기타 폼 데이터 추가...

    console.log(bannerFile, ticketFile?.url)
    if (bannerFile) {
      formData.append('bannerImage', bannerFile);
    }

    if (ticketFile) {
      //formData.append('ticketUri', ticketFileUrl?.preview);
    }

    const ticketData = {
      name: '',
      symbol: '',
      description: '',
      organizer: '',
      location: '',
      date: '',
      bannerImage: '',
      ticketUri: '',
      ethPrice: '',
      tokenPrice: '',
      totalSupply: '',
      saleDuration: '',
    };

    /*
    createTicketMutation.mutate(ticketData, {
      onSuccess: (data) => {
        // 성공 처리
        console.log('Ticket created:', data);
      },
      onError: (error) => {
        // 오류 처리
        console.error('Error creating ticket:', error);
      },
    });
    */
  };

  return (
    <C.FormContainer onSubmit={handleSubmit}>
      <C.ImageInputContainer>
        <C.CreateImageContainer htmlFor='ticket-banner'>
          <div>
            {bannerFileUrl && bannerFileUrl.preview ? (
              <Image src={bannerFileUrl.preview} alt='Banner Preview' layout='responsive' width={100} height={100} quality={100} />
            ) : (
              <FontAwesomeIcon icon={faImage} />
            )}
            <input id='ticket-banner' type='file' accept='image/*' onChange={fileUpload} hidden required />
          </div>
        </C.CreateImageContainer>
        <C.CreateImageContainer htmlFor='ticket'>
          <div>
            {ticketFileUrl && ticketFileUrl.preview ? (
              <Image src={ticketFileUrl.preview} alt='Ticket Preview' layout='responsive' width={100} height={100} quality={100} />
            ) : (
              <FontAwesomeIcon icon={faImage} />
            )}
            <input id='ticket' type='file' accept='image/*' onChange={fileUpload} hidden />
          </div>
        </C.CreateImageContainer>
      </C.ImageInputContainer>
      <C.InputWrap>
        <C.InputContainer>
          <div>
            <label htmlFor='name'>Name <span>*</span></label>
            <input type='text' placeholder='Name' id='name' required />
          </div>
          <div>
            <label htmlFor='symbol'>Symbol <span>*</span></label>
            <input type='text' placeholder='symbol' id='symbol' required />
          </div>
        </C.InputContainer>
        <C.InputContainer>
          <div>
            <label htmlFor='organizer'>Organizer <span>*</span></label>
            <input type='text' placeholder='organizer' id='organizer' required />
          </div>
          <div>
            <label htmlFor='location'>Location <span>*</span></label>
            <input type='text' placeholder='location' id='location' required />
          </div>
        </C.InputContainer>
        <C.InputContainer>
          <div>
            <label htmlFor='date'>Date <span>*</span></label>
            <input type='date' placeholder='date' id='date' required />
          </div>
          <div>
            <label htmlFor='total'>Ticket Total Supply <span>*</span></label>
            <input type='number' placeholder='Ticket Total Supply' id='total' required />
          </div>
        </C.InputContainer>
        <C.InputContainer>
          <div>
            <label htmlFor='eth-price'>ETH Price <span>*</span></label>
            <input type='number' placeholder='ETH Price' id='eth-price' step={0.1} required />
          </div>
          <div>
            <label htmlFor='token-price'>Token Price <span>*</span></label>
            <input type='number' placeholder='Token Price' id='token-price' step={0.1} required />
          </div>
        </C.InputContainer>
        <C.TextContainer>
          <label htmlFor='desc'>Description <span>*</span></label>
          <textarea placeholder='Description' id='desc' required />
        </C.TextContainer>
      </C.InputWrap>
      <S.ButtonStyle type='submit'>Create</S.ButtonStyle>
    </C.FormContainer>
  )
}

export default CreateTicket;

