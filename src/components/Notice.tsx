import React from 'react';
import styled from 'styled-components';

const dummyData = [
  {'id': 1, 'title': 'title1', 'desc': 'In veniam libero alias animi dignissimos commodi quia.', 'date': '2023.11.11'},
  {'id': 2, 'title': 'title2', 'desc': 'Et repudiandae exercitationem.', 'date': '2023.11.11'},
  {'id': 3, 'title': 'title3', 'desc': 'Quisquam ipsam dolorum sit ad.', 'date': '2023.11.11'},
  {'id': 4, 'title': 'title4', 'desc': 'Sapiente qui ipsum tempore fugit dignissimos iure omnis et.', 'date': '2023.11.11'},
  {'id': 5, 'title': 'title5', 'desc': 'Sapiente qui ipsum tempore fugit dignissimos iure omnis et.', 'date': '2023.11.11'},
]

const Notice = () => {

  return (
    <NoticeContainer>
      <NoticeTitle>
        <h1>Notice</h1>
      </NoticeTitle>
      <NoticeListContainer>
        {dummyData.map((data) => {
          return (
            <NoticeList key={data.id}>
              <h3>{data.title}</h3>
              <p>{data.date}</p>
            </NoticeList>
          )
        })}
      </NoticeListContainer>
      <div>
        pagination
      </div>
    </NoticeContainer>
  )
}

export default Notice;

const NoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100vh;
  /* height: calc(100vh - 22vh); */
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
    margin: 0%;
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
