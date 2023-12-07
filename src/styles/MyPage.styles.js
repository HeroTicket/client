import styled from 'styled-components';
import { ImageContainer } from './Main.styles';

export const MyPageContainer = styled.div`
  width: 100%;
  height: calc(100vh - 50vh);
`;

export const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const MyPageImageContainer = styled(ImageContainer)`
  position: relative;
  left: 0;
  top: 0;

  > img {
    max-width: 300px;
    max-height: 300px;
    border-radius: 100%;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 1.5rem;
    font-weight: bold;
    transition: all 0.3s;
  }

  p:first-child:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  > div {
    width: 2px;
    height: 30px; /* 선의 높이 */
    background-color: black; /* 선의 색상 */
    margin: 10px 0; /* 상하 여백 */
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 6rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid black;
`;

export const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  background: none;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
  &.active {
    font-weight: bold;
  }
`;
