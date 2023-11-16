import React, { useState } from 'react';
import styled from 'styled-components';
import ModalPortal from './ModalPortal';

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
    <NoticeContainer>
      <NoticeTitle>
        <h1>Notice</h1>
      </NoticeTitle>
      <NoticeListContainer>
        {dummyData.map((data) => {
          return (
            <NoticeList key={data.id} onClick={() => openModal(data)}>
              <h3>{data.title}</h3>
              <p>{data.date}</p>
            </NoticeList>
          )
        })}
      </NoticeListContainer>
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
    </NoticeContainer>
  )
}

export default Notice;

const NoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: calc(100vh - 20vh);
`

const NoticeTitle = styled.div`
  margin-bottom: 2rem;
`

const NoticeListContainer = styled.div`
  width: 70%;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const NoticeList = styled.div`
  position: relative; /* 가상 요소를 올바르게 배치하기 위해 필요 */
  padding: .5rem 1rem;
  border-bottom: 2px solid #ece9e9;
  cursor: pointer;
  transition: all .3s;
  overflow: hidden; /* 가상 요소가 컨테이너 밖으로 나가지 않도록 설정 */

  h3 {
    margin: 1rem 0;
  }

  p {
    font-size: .8rem;
    color: #777;
    margin-top: 0;
    margin-bottom: .5rem
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    border-bottom: 2px solid red;
    transition: width .5s ease; /* 애니메이션 효과 */
    z-index: -1;
  }

  &:hover::after {
    width: 100%;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  button {
    padding: .5rem 1rem;
    border: 1px solid #ece9e9;
    border-radius: 5px;
    cursor: pointer;
    transition: all .3s;
    &:hover {
      background-color: #ece9e9;
    }
  }
`
