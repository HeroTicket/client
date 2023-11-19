import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}


const ModalPortal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <ModalContainer onClick={onClose}>
      <div>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </ModalContainer>,
    document.querySelector('#root-modal') as HTMLElement
  )
}

export default ModalPortal;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .2);
  display: flex;
  justify-content: center;
  align-items: center;
  
  > div {
    width: 50%;
    max-height: 500px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    box-sizing: border-box;
    border-radius: 1rem;
    background-color: #fff;
    
    div:nth-child(1) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      white-space: pre-line;
      border-bottom: 1px solid #999;
      
      h3:nth-child(1) {
        font-size: 1.5rem;
      }

      > p:nth-child(2) {
        font-size: .8rem;
        color: #999;
      }

    }
    > button {
      margin-top: 1rem;
      background-color: transparent;
      border: none;
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
      transition: all .3s;

      &:hover {
        color: red;
      }
    }

  }
  
`