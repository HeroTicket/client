import styled from 'styled-components';
import { Container, ButtonStyle } from './styled';

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
  padding: 0.5rem 1rem;
  transition: transform 0.3s;
  cursor: pointer;
  border-bottom: 1px solid #e4e4e4;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    border-bottom: 2px solid red;
    transition: width 0.5s ease; /* 애니메이션 효과 */
    z-index: -1;
  }

  &:hover::after {
    width: 100%;
  }

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const CardImgContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 500px;
  position: relative;

  img {
    object-fit: contain;
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 100%;
  padding: 1rem 2rem;
  text-align: left;
  box-sizing: border-box;
  text-align: center;

  h2 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  .place {
    color: #999;
  }

  .title {
    font-weight: 300;
  }
`;

export const TicketBtn = styled(ButtonStyle)`
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 4rem;
`;

export const ModalImageContainer = styled(CardImgContainer)`
  width: 59%;
  height: 50rem;

  img {
    padding-right: 2rem;
    object-fit: contain;
  }
`;
