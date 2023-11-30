import styled from 'styled-components';

export const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  > p:first-child {
    max-width: 50%;
    word-break: pre-wrap;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  > button {
    border: none;
    border-radius: 0.9rem;
    padding: 1rem 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    background-color: #c683d7;
    transition: all 0.3s;

    > a {
      color: #fff;
      text-decoration: none;
      > svg {
        margin-left: 0.5rem;
      }
    }

    &:hover {
      background-color: purple;
    }
  }
`;

export const LoginCallbackMessage = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;

  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;
