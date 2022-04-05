import React, { ReactNode, useState } from 'react';

export const ModalContext = React.createContext<any>(null);

export const ModalProvider: React.FC = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null as ReactNode);

  const openModal = (content: ReactNode) => {
    setIsOpen(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setModalContent(null), 500);
  };
  return (
    <ModalContext.Provider
      value={[
        { isOpen, modalContent },
        { openModal, closeModal },
      ]}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
