import styled from 'styled-components';
import { commonBoxShadow } from './styled';

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: ${commonBoxShadow};
  background-color: #fff;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-10px);
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
`;
