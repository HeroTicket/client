import styled from 'styled-components';
import { Container, commonBoxShadow, ButtonStyle } from './styled';

export const TicketContainer = styled(Container)`
  height: auto;
  justify-content: normal;
`;

export const CardContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  justify-items: center;
  gap: 4rem;
  padding: 1rem;
`;

export const Card = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
  box-shadow: ${commonBoxShadow};
  padding: 0.5rem 1rem;
  transition: transform 0.3s; // 부드러운 변형 효과

  &:hover {
    transform: scale(1.05); // 호버 시 카드 확대
  }

  @media (max-width: 768px) {
    max-width: 100%; // 모바일 화면에서의 스타일 조정
  }
`;

export const CardImgContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 200px;
  position: relative;

  img {
    border-radius: 1rem;
    object-fit: cover;
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem 2rem;
  text-align: left;
  box-sizing: border-box;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const TicketBtn = styled(ButtonStyle)`
  box-sizing: border-box;
  padding: 0.5rem 4rem;
`;
