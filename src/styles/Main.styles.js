import styled, { keyframes } from 'styled-components';
import { commonBoxShadow, commonBorderRadius, buttonStyle } from './styled';

export const slideUp = keyframes`
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const MainWrap = styled.div`
  animation: ${slideUp} 1s ease forwards;
  width: 100%;
  height: calc(100vh - 15vh);
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: center;
  justify-content: space-between;
  gap: 7rem;
  margin-bottom: 10rem;
`;

export const ImageContainer = styled.div`
  height: auto;

  img {
    max-width: 700px;
    max-height: 720px;
    border-radius: ${commonBorderRadius};
    box-shadow: ${commonBoxShadow};
  }
`;

export const MainLeft = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 3.5rem;
  }

  p {
    font-size: 1.3rem;
    margin-bottom: 5rem;
  }
`;

export const MainBtnWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 3rem;

  button {
    ${buttonStyle}
  }
  div {
    width: 50%;
    display: flex;
    align-items: center;
    margin: 0;
    cursor: pointer;

    p {
      font-weight: bold;
      margin: 0;

      &:hover {
        text-decoration: underline;
      }
    }

    svg {
      width: 10%;
      margin-left: 0.5rem;
    }
  }
`;

export const ServiceWrap = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12rem;
`;

export const ServiceText = styled.div`
  width: 80%;
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    margin-bottom: 2rem;
  }
`;

export const ServiceCard = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  gap: 1rem;
  text-align: center;

  div {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 1rem 2rem;
    box-shadow: ${commonBoxShadow};
    border-radius: ${commonBorderRadius};
    transition: all 0.3s;

    &:hover {
      transform: scale(1.1);
    }

    img {
      background-color: rgba(0, 100, 255, 0.2);
      border-radius: 50%;
      padding: 1rem;
    }

    p {
      display: flex;
      flex-direction: column;
      span {
        margin-bottom: 1rem;
        font-weight: bold;
      }
    }
  }
`;

export const WhatIsWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10rem;
`;

export const WhatIsDesc = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 1rem;

  div {
    width: 80%;
    text-align: center;

    img {
      box-shadow: ${commonBoxShadow};
      max-height: 397px;
      border-radius: 4rem;
    }
  }
`;
