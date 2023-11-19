import React from "react";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";
import { ModalContainer } from '@/styles/ModalPortal.styles';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const ModalPortal: React.FC<ModalProps> = ({ isOpen, children }) => {
  const router = useRouter();
  const isTicketPage = router.pathname === '/ticket';

  if (!isOpen) return null;

  return createPortal(
    <ModalContainer isTicketPage={isTicketPage}>
      <div>
        {children}
      </div>
    </ModalContainer>,
    document.querySelector('#root-modal') as HTMLElement
  )
}

export default ModalPortal;

