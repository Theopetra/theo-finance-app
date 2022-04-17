import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';

export const ModalContext = React.createContext<any>(null);

export const ModalProvider: React.FC = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null as ReactNode);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      // because of the way the modal is designed, we close modal if route changes
      closeModal();
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

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
