import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import * as C from '@/styles/CreateTicket.styles';
import * as S from '@/styles/styled';

interface IFile extends File {
  preview?: string;
}

const EXTENSIONS = [
  { type: 'gif' },
  { type: 'jpg' },
  { type: 'jpeg' },
  { type: 'png' },
  { type: 'mp4' },
];

const CreateTicket = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [bannerFile, setBannerFile] = useState<IFile | null>(null);
  const [ticketFile, setTicketFile] = useState<IFile | null>(null);


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
  
    if (FSIZE < SIZE && EXTENSIONS.some(extension => extension.type === TYPE)) {
      const objectURL = URL.createObjectURL(FILE);
  
      if (inputId === 'ticket-banner') {
        setBannerFile({ ...FILE, preview: objectURL });
      } else if (inputId === 'ticket') {
        setTicketFile({ ...FILE, preview: objectURL });
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
    const jwtToken = sessionStorage.getItem('jwtToken');
    if (!jwtToken) {
      // 로그인 모달 표시
      Swal.fire({
        title: '로그인 필요',
        text: '이 페이지를 사용하기 위해서는 로그인이 필요합니다.',
        icon: 'warning',
        confirmButtonText: '확인',
        willClose: () => {
          router.push('/'); // 로그인 페이지로 이동
        }
      });
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null; // 로그인 상태가 아니면 페이지 내용을 렌더링하지 않음
  }


  return (
    <C.FormContainer>
      <C.ImageInputContainer>
        <C.CreateImageContainer htmlFor='ticket-banner'>
          <div>
            {bannerFile && bannerFile.preview ? (
              <Image src={bannerFile.preview} alt='Banner Preview' layout='responsive' width={100} height={100} quality={100} />
            ) : (
              <FontAwesomeIcon icon={faImage} />
            )}
            <input id='ticket-banner' type='file' accept='image/*' onChange={fileUpload} hidden required />
          </div>
        </C.CreateImageContainer>
        <C.CreateImageContainer htmlFor='ticket'>
          <div>
            {ticketFile && ticketFile.preview ? (
              <Image src={ticketFile.preview} alt='Ticket Preview' layout='responsive' width={100} height={100} quality={100} />
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

