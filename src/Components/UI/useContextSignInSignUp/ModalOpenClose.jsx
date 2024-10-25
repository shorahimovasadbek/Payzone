import React, { createContext, useState, useContext } from 'react'

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [openModalOTP, setOpenModalOTP] = useState(false)

  const openLoginModal = () => setIsLoginModalOpen(true);
  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const openOTP = () => setOpenModalOTP(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);
  const closeOTP = () => setOpenModalOTP(false);

  return (
    <ModalContext.Provider value={{ openOTP, isSignUpModalOpen, openModalOTP, isLoginModalOpen, openLoginModal, closeLoginModal, closeOTP, openSignUpModal, closeSignUpModal }}>
      {children}
    </ModalContext.Provider>
  );
};
