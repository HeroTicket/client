// Header.styles.js
import styled from 'styled-components';
import { QrcodeContainer } from './Ticket.styles';

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

  li:not(:last-child) {
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

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 0.9rem;
  }
`;

export const Loginli = styled.li``;

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

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0.5rem 2rem;
    font-size: 0.8rem;
  }
`;

export const QrCodeContainer = styled(QrcodeContainer)`
  > p {
    width: 100%;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.2rem;
`;

export const ChainButton = styled.button`
  position: relative;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const ProfileButton = styled.button`
  background-color: transparent;
  border: none;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
`;

export const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db; // gray-300
  border-radius: 0.75rem; // rounded-xl
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background-color: transparent;
  font-size: 1rem;
`;

export const ChainIconContainer = styled.div`
  background: ${(props) => props.background};
  overflow: hidden;
`;

export const DropdownButtonContainer = styled.div`
  position: relative;
`;

export const DropdownContainer = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > a {
    margin-top: 0.5rem;
    text-decoration: none;
    transition: all 0.3s;
    color: #000;
    &:hover {
      color: red;
    }
  }

  > span {
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
`;
