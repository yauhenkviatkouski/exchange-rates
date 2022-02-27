import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

type ModalProps = {
  children: React.ReactNode;
  title?: string;
  isError?: boolean;
  onClose: () => void;
};

const Modal = (props: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  function isClickedOutside(e: React.MouseEvent) {
    if (
      e.target instanceof HTMLElement &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      return true;
    }
    return false;
  }
  return createPortal(
    <div
      className="ModalWrapper"
      onClick={(e) => isClickedOutside(e) && props.onClose()}
    >
      <div ref={modalRef} className="Modal">
        <button className="CloseButton" onClick={props.onClose}>
          X
        </button>
        {props.title && <header className="ModalHeader">{props.title}</header>}
        <div className="ModalContent">{props.children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
