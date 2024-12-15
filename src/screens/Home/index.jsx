import React, { useContext } from 'react'
import styled from 'styled-components'
import LeftComponent from './LeftComponent'
import RightComponent from './RightComponent'
import Modal from '../../components/Modal'
import { ModalContext } from '../../context/ModalContext'

const StyledHome = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  background-color: #f4f7fa; /* Light background color */
  box-sizing: border-box;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 1rem;
  }
`

const LeftRightContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const Home = () => {
  const { isOpenModal } = useContext(ModalContext);

  return (
    <StyledHome>
      <LeftRightContainer>
        <LeftComponent />
        <RightComponent />
      </LeftRightContainer>
      {isOpenModal.show && <Modal />}
    </StyledHome>
  )
}

export default Home
