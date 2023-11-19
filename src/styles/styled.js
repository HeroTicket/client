import styled, { keyframes } from 'styled-components';

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

export const Container = styled.div`
  animation: ${slideUp} 1s ease forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 100vh;
  height: calc(100vh - 20vh);
`;

export const Title = styled.div`
  margin-bottom: 2rem;
`;

export const ListContainer = styled.div`
  width: 70%;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ListItem = styled.div`
  position: relative; /* 가상 요소를 올바르게 배치하기 위해 필요 */
  padding: 0.5rem 1rem;
  border-bottom: 2px solid #ece9e9;
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden; /* 가상 요소가 컨테이너 밖으로 나가지 않도록 설정 */

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.8rem;
    color: #777;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

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
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  button {
    padding: 0.5rem 1rem;
    border: 1px solid #ece9e9;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: #ece9e9;
    }
  }
`;

export const ButtonStyle = styled.button`
  background-color: red;
  color: white;
  padding: 0.7rem 3rem;
  border: none;
  border-radius: 0.6rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #d71313;
  }
`;

export const ModalCloseBtn = styled.button`
  margin-top: 1rem;
  background-color: transparent;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: red;
  }
`;

export const commonBoxShadow = '0 0 10px #999';
export const commonBorderRadius = '2rem';

export const buttonStyle = `
  background-color: red;
  color: white;
  padding: .7rem 3rem;
  border: none;
  border-radius: .6rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition all .3s;

  &:hover {
    background-color: #d71313;
  }
`;
