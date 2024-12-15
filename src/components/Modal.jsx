import React, { useContext } from 'react';
import styled from 'styled-components';
import { NewFolder, NewPlayground, NewPlaygroundAndFolder, EditFolder, EditPlaygroundTitle, Loading } from './ModalTypes';
import { ModalContext } from '../context/ModalContext';

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5); /* Darker background */
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.3s ease-out; /* Smooth fade-in animation */
`;

const ModalContent = styled.div`
    background-color: #fff;
    padding: 2rem;
    width: 40%;
    max-width: 500px;
    min-width: 300px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    animation: slideIn 0.3s ease-out;
    overflow: hidden;
    
    @media (max-width: 768px) {
        width: 90%; /* Adjust for smaller screens */
    }

    /* Fade-in animation */
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    /* Slide-in animation */
    @keyframes slideIn {
        0% {
            transform: translateY(-30px);
        }
        100% {
            transform: translateY(0);
        }
    }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.2rem;
`;

export const CloseButton = styled.button`
  background: transparent;
  outline: 0;
  border: 0;
  font-size: 2rem;
  cursor: pointer;
  color: #333;
  transition: color 0.3s ease;

  &:hover {
    color: #d9534f; /* Change color on hover */
  }
`;

export const Input = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem 0;
  
  input {
    padding: 0.8rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    font-size: 1rem;
    width: 100%;
    margin-bottom: 1rem;
  }

  button {
    background: #007bff;
    color: white;
    padding: 0.8rem 2rem;
    border-radius: 8px;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const Modal = () => {
  const { isOpenModal, closeModal } = useContext(ModalContext);
  const { modalType } = isOpenModal;
  
  return (
    <ModalContainer>
      <ModalContent>
        <Header>
          <h3>Create or Edit</h3>
          <CloseButton onClick={closeModal}>&#10005;</CloseButton>
        </Header>

        {modalType === 1 && <NewFolder />}
        {modalType === 2 && <NewPlayground />}
        {modalType === 3 && <NewPlaygroundAndFolder />}
        {modalType === 4 && <EditFolder />}
        {modalType === 5 && <EditPlaygroundTitle />}
        {modalType === 6 && <Loading />}
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
