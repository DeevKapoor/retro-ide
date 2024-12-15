import React, { useContext } from 'react';
import styled from 'styled-components';
import { IoTrashOutline } from 'react-icons/io5';
import { BiEditAlt } from 'react-icons/bi';
import { FcOpenedFolder } from 'react-icons/fc';
import logo from '../../assets/logo-small.png';
import { ModalContext } from '../../context/ModalContext';
import { PlaygroundContext } from '../../context/PlaygroundContext';
import { useNavigate } from 'react-router-dom';

const StyledRightComponent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 60%;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  animation: fadeIn 0.6s ease-out;

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    padding: 1rem 0.5rem;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 1rem;
`;

const Heading = styled.h3`
  font-size: ${props => (props.size === 'small' ? '1.25rem' : '1.75rem')};
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  span {
    font-weight: 700;
    color: #007bff;
  }
`;

const AddButton = styled.div`
  font-size: 1rem;
  border-radius: 30px;
  color: #fff;
  background-color: #007bff;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform-origin: center;

  span {
    font-size: 1.5rem;
    font-weight: 700;
  }

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05) rotate(5deg);
  }
`;

const FolderCard = styled.div`
  margin-bottom: 1.5rem;
  animation: fadeUp 0.5s ease-in-out;

  @keyframes fadeUp {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const FolderIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  color: #555;
  transition: color 0.3s ease, transform 0.2s ease;

  &:hover {
    color: #007bff;
    transform: scale(1.1);
  }

  svg {
    font-size: 1.3rem;
  }
`;

const PlayGroundCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 428px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: #fff;

  &:hover {
    scale: 1.05;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CardContent = styled.div`
  margin-left: 1rem;
  p {
    margin: 0;
    color: #333;
  }
`;

const Logo = styled.img`
  width: 70px;
  margin-right: 1rem;

  @media (max-width: 425px) {
    width: 50px;
    margin-right: 0.5rem;
  }
`;

const RightComponent = () => {
  const navigate = useNavigate();
  const { openModal } = useContext(ModalContext);
  const { folders, deleteFolder, deleteCard } = useContext(PlaygroundContext);

  return (
    <StyledRightComponent>
      <Header>
        <Heading size="large">
          My <span>Playground</span>
        </Heading>
        <AddButton
          onClick={() =>
            openModal({
              show: true,
              modalType: 1,
              identifiers: {
                folderId: '',
                cardId: '',
              },
            })
          }
        >
          <span>+</span> New Folder
        </AddButton>
      </Header>

      {Object.entries(folders).map(([folderId, folder]) => (
        <FolderCard key={folderId}>
          <Header>
            <Heading size="small">
              <FcOpenedFolder /> {folder.title}
            </Heading>
            <FolderIcons>
              <IoTrashOutline onClick={() => deleteFolder(folderId)} />
              <BiEditAlt
                onClick={() =>
                  openModal({
                    show: true,
                    modalType: 4,
                    identifiers: {
                      folderId: folderId,
                      cardId: '',
                    },
                  })
                }
              />
              <AddButton
                onClick={() =>
                  openModal({
                    show: true,
                    modalType: 2,
                    identifiers: {
                      folderId: folderId,
                      cardId: '',
                    },
                  })
                }
              >
                <span>+</span> New Playground
              </AddButton>
            </FolderIcons>
          </Header>

          <PlayGroundCards>
            {Object.entries(folder['playgrounds']).map(([playgroundId, playground]) => (
              <Card
                key={playgroundId}
                onClick={() => {
                  navigate(`/playground/${folderId}/${playgroundId}`);
                }}
              >
                <CardContainer>
                  <Logo src={logo} />
                  <CardContent>
                    <p>{playground.title}</p>
                    <p>Language: {playground.language}</p>
                  </CardContent>
                </CardContainer>
                <FolderIcons
                  onClick={(e) => {
                    e.stopPropagation(); //stop click propagation from child to parent
                  }}
                >
                  <IoTrashOutline onClick={() => deleteCard(folderId, playgroundId)} />
                  <BiEditAlt
                    onClick={() =>
                      openModal({
                        show: true,
                        modalType: 5,
                        identifiers: {
                          folderId: folderId,
                          cardId: playgroundId,
                        },
                      })
                    }
                  />
                </FolderIcons>
              </Card>
            ))}
          </PlayGroundCards>
        </FolderCard>
      ))}
    </StyledRightComponent>
  );
};

export default RightComponent;
