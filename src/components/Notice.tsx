import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import ModalPortal from './ModalPortal';
import { Container, Title, ListContainer, ListItem, Pagination } from '@/styles/styled';

const dummyData = [
  {'id': 1, 'title': 'title1', 'desc': `In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.
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
  'date': '2023.11.11'},
  {'id': 2, 'title': 'title2', 'desc': 'Et repudiandae exercitationem.', 'date': '2023.11.11'},
  {'id': 3, 'title': 'title3', 'desc': 'Quisquam ipsam dolorum sit ad.', 'date': '2023.11.11'},
  {'id': 4, 'title': 'title4', 'desc': 'Sapiente qui ipsum tempore fugit dignissimos iure omnis et.', 'date': '2023.11.11'},
  {'id': 5, 'title': 'title5', 'desc': 'Sapiente qui ipsum tempore fugit dignissimos iure omnis et.', 'date': '2023.11.11'},
]

interface NoticeData {
  id: number;
  title: string;
  desc: string;
  date: string;
}

const Notice = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<NoticeData | null>(null);

  const openModal = (data: NoticeData) => {
    setSelectedItem(data);
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  }

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
              <p>{data.date}</p>
            </ListItem>
          )
        })}
      </ListContainer>
      <Pagination>
        <button>이전</button>
        <button>다음</button>
      </Pagination>
      <ModalPortal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <h3>{selectedItem?.title}</h3>
          <p>{selectedItem?.date}</p>
        </div>
        <div>
          <p>{selectedItem?.desc}</p>
        </div>
      </ModalPortal>
    </Container>
  )
}

export default Notice;