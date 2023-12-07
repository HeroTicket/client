import styled, { keyframes } from 'styled-components';
import { Container, ButtonStyle } from './styled';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

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
  padding: 2rem;
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
    z-index: 1;
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
  width: 90%;
  box-sizing: border-box;
  padding: 0.5rem 4rem;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ModalImageContainer = styled(CardImgContainer)`
  width: 35%;
  position: relative;
  align-items: center;
  img {
    object-fit: contain;
  }
`;

export const ModalRight = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1em;

  > div:first-child {
    min-height: 200px;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    > div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      h1 {
        margin: 0;
        font-size: 3rem;
      }
      p {
        margin: 0;
        font-size: 1rem;
        color: #999;
      }
    }

    > p {
      width: 90%;
    }
  }
`;

export const ModalRightHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const ModalRightContent = styled.div`
  width:  100%;
`;

export const CalendarContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const PreNextStepContent = styled.div`
  animation: ${fadeIn} 0.2s ease-in;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  min-width: 680px;
`;

export const PostNextStepContent = styled.div`
  animation: ${fadeIn} 0.2s ease-in;
  text-align: center;

  > button {
    width: 100%;
  }
`;

export const QrcodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    width: 50%;
    font-size: 10rem;
  }

  > p {
    width: 55%;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0;
    text-align: center;
  }
`;

export const PurchaseContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .purchaseImg {
    width: 100%;
    height: 40vh;
  }
`;

export const PurchaseInfo = styled(ModalRight)`
  width: 90%;
  align-items: center;
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #999;

  > p:first-child {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0;
  }

  > p:last-child {
    width: 80%;
    white-space: pre-line;
  }
`;

export const PurchasePrice = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;
