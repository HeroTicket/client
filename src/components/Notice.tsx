import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalPortal from './ModalPortal';
import { Container, Title, ListContainer, ListItem, Pagination, ModalCloseBtn } from '@/styles/styled';
import { NoticeModalTitleContainer } from '@/styles/Notice.styles';

const dummyData = [
  {'id': 1, 'title': 'title1', 'content': `In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.
  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.
  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.
  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.
  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.
  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.
  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.

  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.
  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.
  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.
  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.
  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.

  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.
  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.
  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.

  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.
  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.
  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.
  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.
  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.`,
  'createdAt': '2023.11.11', 'updatedAt': 0},
  {'id': 2, 'title': 'title2', 'content': 'Et repudiandae exercitationem.', 'createdAt': '2023.11.11', 'updatedAt': 0},
  {'id': 3, 'title': 'title3', 'content': 'Quisquam ipsam dolorum sit ad.', 'createdAt': '2023.11.11', 'updatedAt': 0},
  {'id': 4, 'title': 'title4', 'content': 'Sapiente qui ipsum tempore fugit dignissimos iure omnis et.', 'createdAt': '2023.11.11', 'updatedAt': 0},
  {'id': 5, 'title': 'title5', 'content': 'Sapiente qui ipsum tempore fugit dignissimos iure omnis et.', 'createdAt': '2023.11.11', 'updatedAt': 0},
]

interface NoticeData {
  id: number;
  title: string;
  content: string;
  createdAt: string;
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

const Notice = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<NoticeData | null>(null);
  const [noticeDataList, setNoticeDataList] = useState<NoticeData[] | null>(null);
  const [noticeData, setNoticeData] = useState<NoticeData | null>(null);
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
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/notices`);

      setNoticeDataList(res.data.data.items);
      console.log(res.data.data.items);
    } catch (error) {
      console.log(error);
    }
  }

  const noticeDetail = async (id: number) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/notices/${id}`);
      setNoticeData(res.data.data);

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    noticeList();
    noticeDetail(1);
  }, []);

  return (
    <Container>
      <Title>
        <h1>Notice</h1>
      </Title>
      <ListContainer>
        {dummyData.map((data) => {
          return (
            <ListItem key={data.id} onClick={() => openModal(data)}>
              <h3>{data.title}</h3>
              <p>{data.createdAt}</p>
            </ListItem>
          )
        })}
      </ListContainer>
      <Pagination>
        <button>이전</button>
        <button>다음</button>
      </Pagination>
      <ModalPortal isOpen={isModalOpen} onClose={closeModal}>
        <NoticeModalTitleContainer>
          <h3>{selectedItem?.title}</h3>
          <p>{selectedItem?.createdAt}</p>
        </NoticeModalTitleContainer>
        <div>
          <p>{selectedItem?.content}</p>
        </div>
        <ModalCloseBtn onClick={closeModal}>Close</ModalCloseBtn>
      </ModalPortal>
    </Container>
  )
}

export default Notice;