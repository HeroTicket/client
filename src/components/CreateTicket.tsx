import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { useMutation } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import * as C from '@/styles/CreateTicket.styles';
import * as S from '@/styles/styled';
import axios, { AxiosError } from 'axios';
import { authContext } from '@/context/providers';

interface IFile extends File {
  file?: File;
  preview?: string;
  url?: string;
}

interface CreateTicketData {
  accessToken: string;
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

interface CreateTicketResponse {
  status: number;
  message: string;
  data: TicketCollection;
}

const EXTENSIONS = [
  { type: 'gif' },
  { type: 'jpg' },
  { type: 'jpeg' },
  { type: 'png' },
  { type: 'mp4' },
];



const CreateTicket = () => {
  //const createTicketMutation = useCreateTicket();

  const { isLoading, isLoggedIn, isRegistered, addressMatched, accessToken, userInfo } = useContext(authContext);

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

  const handleCreateTicket = async (ticketData: CreateTicketData): Promise<TicketCollection> => {
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

    const response = await axios.post<CreateTicketResponse>(`${process.env.NEXT_PUBLIC_SERVER_URL}/tickets/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${ticketData.accessToken}`,
      }
    });

    if (response.status !== 201) {
      throw new AxiosError(response.data.message ? response.data.message : "Ticket creation failed");
    }

    return response.data.data
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!accessToken) {
      return; // 로그인 상태가 아니면 함수를 종료
    }

    if (!bannerFile) {
      // 배너 이미지가 없으면 함수를 종료
      return;
    }

    const ticketData: CreateTicketData = {} as CreateTicketData;

    ticketData.accessToken = accessToken;
    ticketData.name = (document.getElementById('name') as HTMLInputElement).value;
    ticketData.symbol = (document.getElementById('symbol') as HTMLInputElement).value;
    ticketData.description = (document.getElementById('desc') as HTMLInputElement).value;
    ticketData.organizer = (document.getElementById('organizer') as HTMLInputElement).value;
    ticketData.location = (document.getElementById('location') as HTMLInputElement).value;
    ticketData.date = (document.getElementById('date') as HTMLInputElement).value;
    ticketData.bannerImage = bannerFile;
    ticketData.ticketUri = "QmaMmMmMkzYgSLQBDTVkyms4zgMRkZyw5MmUCZ6okN7zP4";
    ticketData.ethPrice = Number((document.getElementById('eth-price') as HTMLInputElement).value);
    ticketData.tokenPrice = Number((document.getElementById('token-price') as HTMLInputElement).value);
    ticketData.totalSupply = Number((document.getElementById('total') as HTMLInputElement).value);
    ticketData.saleDuration = Number((document.getElementById('sale-duration') as HTMLInputElement).value);

    Swal.fire({
      title: "Are you sure to create this ticket?",
      text: `Your current token balance: ${userInfo!.tbaTokenBalance}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Create",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Please wait...",
          icon: "info",
          didOpen: () => {
            Swal.showLoading();

            handleCreateTicket(ticketData).then((data) => {
              Swal.fire({
                title: "Ticket created!",
                text: `${data.contractAddress} is created.`,
                icon: "success",
                willClose: () => {
                  router.reload();
                }
              })

            }).catch((error) => {
              Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
                confirmButtonText: "OK",
              });
            });
          }
        });

      }
    });


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
            <input type='number' placeholder='Ticket Total Supply' id='total' required min={1} step={1} />
          </div>
        </C.InputContainer>
        <C.InputContainer>
          <div>
            <label htmlFor='eth-price'>ETH Price <span>*</span></label>
            <input type='number' placeholder='ETH Price in Gwei' id='eth-price' step={0.1} required min={1} />
          </div>
          <div>
            <label htmlFor='token-price'>Token Price <span>*</span></label>
            <input type='number' placeholder='Token Price' id='token-price' step={1} required min={1} />
          </div>
        </C.InputContainer>
        <C.InputContainer>
          <div>
            <label htmlFor='sale-duration'>Sale Duration <span>*</span></label>
            <input type='number' placeholder='Sale Duration' id='sale-duration' step={1} required min={1} />
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

