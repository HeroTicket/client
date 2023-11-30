import styled, {keyframes} from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;


export const ModalContainer = styled.div<{isOpen: boolean, isTicketPage: boolean, isNextStepClicked: boolean}>`
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
  animation: ${(prop: { isOpen: boolean }) => (prop.isOpen ? fadeIn : fadeOut)}
    0.2s ease-in;
    visibility: ${(prop: { isOpen: boolean }) =>
      prop.isOpen ? "visible" : "hidden"};
  transition: visibility 0.2s ease-out;

  > div {
    max-width: ${(props) => (props.isTicketPage ? '60%' : '50%')};
    max-height: ${(props) => (props.isTicketPage ? '1000px' : '600px')};
    overflow: scroll;
    display: flex;
    flex-direction: ${(props) => (props.isTicketPage ? 'row' : 'column')};
    align-items: ${(props) => (props.isTicketPage && 'center')};
    justify-content: ${(props) => (props.isTicketPage && 'center')};
    gap: ${(props) => (props.isTicketPage && '3rem')};
    padding: 2rem;
    border-radius: 1rem;
    background-color: #fff;
    transition: max-width 0.3s ease-in-out, padding 0.3s ease-in-out;
  }
`;

