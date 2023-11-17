import styled, { keyframes } from 'styled-components';
import { ListItem } from './styled';

interface FaqListProps {
  isExpanded: boolean;
}

const rotateUp = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-180deg);
  }
`

const rotateDown = keyframes`
  from {
    transform: rotate(-180deg);
  }
  to {
    transform: rotate(0deg);
  }
`

export const FaqList = styled(ListItem)<FaqListProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .icon {
    width: 1%;
    margin-left: 0.5rem;
    animation: ${({ isExpanded }) => isExpanded ? rotateUp : rotateDown} .3s forwards;
  }
`;

export const FaqDesc = styled.div<FaqListProps>`
  padding: 0.5rem 1rem;
  max-height: ${({ isExpanded }) => isExpanded ? '500px' : '0'}; // 최대 높이 조절
  overflow: hidden;
  transition: max-height 0.5s ease-in-out; // 부드러운 전환 효과
`;