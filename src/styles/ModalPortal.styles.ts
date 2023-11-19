import styled from 'styled-components';

export const ModalContainer = styled.div<{isTicketPage: boolean}>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    width: 50%;
    max-height: ${(props) => (props.isTicketPage ? '900px' : '500px')};
    overflow: scroll;
    display: flex;
    flex-direction: ${(props) => (props.isTicketPage ? 'row' : 'column')};
    align-items: ${(props) => (props.isTicketPage && 'center')};
    gap: ${(props) => (props.isTicketPage && '3rem')};
    padding: 2rem;
    box-sizing: border-box;
    border-radius: 1rem;
    background-color: #fff;
  }
`;
