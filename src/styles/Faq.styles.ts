import styled, { keyframes } from 'styled-components';
import { ListItem } from './styled';

interface FaqListProps {
  isExpanded: boolean;
}

export const FaqList = styled(ListItem)<FaqListProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  transition: all .3s ease-in-out;

  .icon {
    width: 1%;
    margin-left: 0.5rem;
    transform: ${({ isExpanded }) => isExpanded ? 'rotate(-180deg)' : 'rotate(0deg)'};
    transition: transform 0.3s ease;  
  }

  &:hover {
    transform: scale(1.05);
  }

  > div > h3 {
    margin: 1rem 0;
  }
`;

export const FaqDesc = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? '200px' : '0')};
  overflow: hidden;
  padding: ${({ isOpen }) => (isOpen ? '.5rem 1rem' : '0')};
  transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  white-space: pre-line;
`;
