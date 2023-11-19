// Header.styles.js
import styled from 'styled-components';

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Menu = styled.ul`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  list-style: none;
  font-size: 1.5rem;
  font-weight: 600;

  li {
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: red;
    }

    a {
      text-decoration: none;
      color: #000;
      transition: all 0.3s;
      &:hover {
        color: red;
      }
    }
  }
`;

export const LoginBtn = styled.button`
  background-color: red;
  color: white;
  padding: 0.7rem 3rem;
  box-sizing: border-box;
  border: none;
  border-radius: 0.6rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #d71313;
    color: #fff;
  }
`;
