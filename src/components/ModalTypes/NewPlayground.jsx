import React, { useContext, useState } from 'react';
import { Header, CloseButton } from '../Modal';
import { IoCloseSharp } from 'react-icons/io5';
import { ModalContext } from '../../context/ModalContext';
import { PlaygroundContext } from '../../context/PlaygroundContext';

import Select from 'react-select';
import styled from 'styled-components';


const InputWithSelect = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
  align-items: center;
  width: 100%;
  
  input, button {
    padding: 0.8rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  input {
    background: #f7f7f7;
  }

  button {
    background: #4CAF50;
    color: #fff;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s ease, transform 0.3s ease;
    width: 100%;
  }

  button:hover {
    background: #45a049;
    transform: translateY(-2px);
  }

  button:active {
    transform: translateY(1px);
  }

  & > div {
    width: 100%;
  }

  label {
    font-size: 1.1rem; /* Slightly increased font size for better readability */
    font-weight: 700; /* Bold the label for emphasis */
    color: #333; /* Darker text for better contrast */
    margin-bottom: 0.5rem;
  }

  .select-container {
    width: 100%;
    .react-select__control {
      border-radius: 8px;
      border: 1px solid #ddd;
      padding: 0.5rem;
      transition: border-color 0.3s ease;
      background-color: #f7f7f7;
      &:hover {
        border-color: #4CAF50;
      }
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NewPlaygroundAndFolder = () => {
  const { closeModal } = useContext(ModalContext);
  const { addPlaygroundAndFolder } = useContext(PlaygroundContext);

  const languageOptions = [
    { value: "cpp", label: "C++" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
  ];

  const [playgroundName, setPlaygroundName] = useState("");
  const [folderName, setFolderName] = useState("");
  const [language, setLanguage] = useState(languageOptions[0]);

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption);
  };

  return (
    <>
      <Header>
        <h2 style={{ fontWeight: '700' }}>Create New Playground & Folder</h2>
        <CloseButton onClick={() => closeModal()}>
          <IoCloseSharp />
        </CloseButton>
      </Header>
      
      <InputWithSelect>
        <div>
          <label>Enter Folder Name</label>
          <input 
            type="text" 
            placeholder="e.g. My Folder"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)} 
          />
        </div>

        <div>
          <label>Enter Playground Name</label>
          <input 
            type="text" 
            placeholder="e.g. Playground 1"
            value={playgroundName}
            onChange={(e) => setPlaygroundName(e.target.value)} 
          />
        </div>

        <div className="select-container">
          <label>Choose Language</label>
          <Select
            options={languageOptions}
            value={language}
            onChange={handleLanguageChange}
            placeholder="Select Language"
            menuPortalTarget={document.body}  // Renders the menu outside the container
            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999, // Ensures the dropdown is above other elements
              }),
              control: (base) => ({
                ...base,
                borderRadius: '8px',
                border: '1px solid #ddd',
                padding: '0.5rem',
                backgroundColor: '#f7f7f7',
              }),
            }}
          />
        </div>

        <button onClick={() => {
          addPlaygroundAndFolder(folderName, playgroundName, language.label);
          closeModal();
        }}>
          Create Playground
        </button>
      </InputWithSelect>
    </>
  );
};

export default NewPlaygroundAndFolder;
