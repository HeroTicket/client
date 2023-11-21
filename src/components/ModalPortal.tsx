import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";
import { ModalContainer } from '@/styles/ModalPortal.styles';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isNextStepClicked: boolean;
}

const ModalPortal: React.FC<ModalProps> = ({ isOpen, onClose, children, isNextStepClicked }) => {
  const router = useRouter();
  const isTicketPage = router.pathname === '/ticket';
  const [visible, setVisible] = useState<boolean>(false);
  
  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  const handleBackgroundClick = () => {
    setVisible(false)
    setTimeout(() => {
      onClose();
    }, 200);
  }

  // 모달 내용 클릭 시 버블링 방지 핸들러
  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  if (!isOpen) return null;

  return createPortal(
    <ModalContainer isOpen={visible} isTicketPage={isTicketPage} onClick={handleBackgroundClick} isNextStepClicked={isNextStepClicked}>
      <div onClick={handleContentClick}>
        {children}
      </div>
    </ModalContainer>,
    document.querySelector('#root-modal') as HTMLElement
  )
}

export default ModalPortal;

