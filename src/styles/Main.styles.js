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
  height: calc(100vh - 10vh);
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 5rem;
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

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    img {
      max-width: 500px;
      max-height: 520px;
    }
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

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    h1 {
      font-size: 2.5rem;
    }

    p {
      font-size: 0.8rem;
    }
  }
`;

export const MainBtnWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 3rem;

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
      width: 3%;
      margin-left: 0.5rem;
    }
  }
`;

export const ServiceWrap = styled.div`
  min-height: calc(100vh - 20vh);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
`;

export const ServiceText = styled.div`
  width: 80%;
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    margin-bottom: 2rem;
  }
  p {
    font-size: 1.5rem;
  }
`;

export const ServiceCard = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  justify-items: center;
  gap: 1rem;
  text-align: center;
  background-color: #fff;

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
      box-sizing: border-box;
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

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    gap: 2.3rem;
    margin-bottom: 5rem;
    div {
      width: 80%;
      padding: 0.8rem 1.8rem;
    }
  }
`;

export const WhatIsWrap = styled.div`
  min-height: calc(100vh - 20vh);
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
