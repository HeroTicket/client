import styled, { keyframes } from 'styled-components';
import { ListItem } from './styled';

interface FaqListProps {
  isExpanded: boolean;
}

const slideFadeInDropdownAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-1rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideFadeOutDropdownAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
`

export const FaqList = styled(ListItem)<FaqListProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .icon {
    width: 1%;
    margin-left: 0.5rem;
    transform: ${({ isExpanded }) => isExpanded ? 'rotate(-180deg)' : 'rotate(0deg)'};
    transition: transform 0.3s ease;  
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
