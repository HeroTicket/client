import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalPortal from './ModalPortal';
import { Container, Title, ListContainer, ListItem, Pagination, ModalCloseBtn } from '@/styles/styled';
import { NoticeModalTitleContainer } from '@/styles/Notice.styles';

interface GetNoticesResponse {
  status: number;
  message: string;
  data: Notices;
}

interface Notices {
  items: NoticeData[];
  pagination: Pagination;

}

interface NoticeData {
  id: number;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

interface Pagination {
  currentPage: number;
  end: number;
  hasNext: boolean;
  hasPrev: boolean;
  limit: number;
  pages: number;
  start: number;
  total: number;
}

const unixTimeToDateString = (unixTime: number): string => {
  const date = new Date(unixTime * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

const Notice = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<NoticeData | null>(null);
  const [noticeDataList, setNoticeDataList] = useState<NoticeData[] | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const openModal = (data: NoticeData) => {
    setSelectedItem(data);
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  }

  const noticeList = async () => {
    try {
      const res = await axios.get<GetNoticesResponse>(`${process.env.NEXT_PUBLIC_SERVER_URL}/notices`);

      if (res.status !== 200) {
        throw new Error(res.data.message);
      }

      setNoticeDataList(res.data.data.items);
      setPagination(res.data.data.pagination);

      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    noticeList();
  }, []);

  return (
    <Container>
      <Title>
        <h1>Notice</h1>
      </Title>
      <ListContainer>
        {noticeDataList?.length === 0 && <p>There is no notice.</p>}
        {noticeDataList?.map((data: NoticeData) => (
          <ListItem key={data.id} onClick={() => openModal(data)}>
            <h3>{data.title}</h3>
            <p>{unixTimeToDateString(data.createdAt)}</p>
          </ListItem>
        ))}
      </ListContainer>
      <Pagination>
        <button>Prev</button>
        <button>Next</button>
      </Pagination>
      {selectedItem && (<ModalPortal isOpen={isModalOpen} onClose={closeModal}>
        <NoticeModalTitleContainer>
          <h3>{selectedItem.title}</h3>
          <p>{unixTimeToDateString(selectedItem.createdAt)}</p>
        </NoticeModalTitleContainer>
        <div>
          <p>{selectedItem.content}</p>
        </div>
        <ModalCloseBtn onClick={closeModal}>Close</ModalCloseBtn>
      </ModalPortal>)}
    </Container>
  )
}

export default Notice;