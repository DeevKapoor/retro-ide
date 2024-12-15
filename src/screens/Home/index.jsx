import React, { useContext, useState, useRef } from 'react';
import EditorContainer from './EditorContainer';
import InputConsole from './InputConsole';
import OutputConsole from './OutputConsole';
import styled, { keyframes } from 'styled-components';
import { useParams } from 'react-router-dom';
import { languageMap, PlaygroundContext } from '../../context/PlaygroundContext';
import { ModalContext } from '../../context/ModalContext';
import Modal from '../../components/Modal';
import { Buffer } from 'buffer';
import axios from 'axios';

// Animation for smooth resizing
const smoothResize = keyframes`
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
`;

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: ${({ isFullScreen }) => isFullScreen ? '1fr' : '2fr 1fr'};
  min-height: ${({ isFullScreen }) => isFullScreen ? '100vh' : 'calc(100vh - 4.5rem)'};
  animation: ${smoothResize} 0.3s ease-in-out;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0.5rem;
  }
`;

const Consoles = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
  grid-template-columns: 1fr;

  @media (max-width: 768px) {
    grid-template-rows: auto;
  }
`;

const Playground = () => {
  const { folderId, playgroundId } = useParams();
  const { folders, savePlayground } = useContext(PlaygroundContext);
  const { isOpenModal, openModal, closeModal } = useContext(ModalContext);
  const { title, language, code } = folders[folderId].playgrounds[playgroundId];

  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [currentCode, setCurrentCode] = useState(code);
  const [currentInput, setCurrentInput] = useState('');
  const [currentOutput, setCurrentOutput] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Refs for input and output to avoid unnecessary re-renders
  const currentInputRef = useRef(currentInput);
  const currentOutputRef = useRef(currentOutput);

  // Logic for saving code
  const saveCode = () => {
    savePlayground(folderId, playgroundId, currentCode, currentLanguage);
  };

  // Base64 encoding/decoding for API requests
  const encode = (str) => Buffer.from(str, "binary").toString("base64");
  const decode = (str) => Buffer.from(str, 'base64').toString();

  // API call to submit the code for evaluation
  const postSubmission = async (language_id, source_code, stdin) => {
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '79c2103237msh1ea258e5b590edfp1a3d05jsn10edae2c23b6', // Correct API Key
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      },
      data: JSON.stringify({
        language_id,
        source_code,
        stdin,
      }),
    };

    try {
      const res = await axios.request(options);
      return res.data.token;
    } catch (error) {
      console.error('Error during submission:', error);
      setCurrentOutput('Failed to submit code.');
    }
  };

  // API call to get output after code execution
  const getOutput = async (token) => {
    try {
      const options = {
        method: 'GET',
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        params: { base64_encoded: 'true', fields: '*' },
        headers: {
          'X-RapidAPI-Key': '79c2103237msh1ea258e5b590edfp1a3d05jsn10edae2c23b6', // Correct API Key
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      };

      const res = await axios.request(options);
      console.log('API Response:', res.data); // Log the entire response

      // Ensure the response contains a 'status' field and it's not null
      if (res.data && res.data.status) {
        const { status_id, status, stdout, compile_output, stderr } = res.data;

        if (status_id <= 2) {
          // Poll again after a delay (e.g., 3 seconds) if still processing
          setTimeout(() => getOutput(token), 3000);
          return null; // Avoid processing until the status is complete
        }

        const status_name = status.description;
        const decoded_output = decode(stdout || '');
        const decoded_compile_output = decode(compile_output || '');
        const decoded_error = decode(stderr || '');

        let final_output = '';
        if (status_id !== 3) {
          final_output = decoded_compile_output || decoded_error;
        } else {
          final_output = decoded_output;
        }
        setCurrentOutput(`${status_name}\n\n${final_output}`);
      } else {
        console.error('Invalid response structure:', res.data);
        setCurrentOutput('Error fetching output. Invalid response structure.');
      }
    } catch (error) {
      console.error('Error fetching output:', error);
      setCurrentOutput('An error occurred while fetching output.');
    }
  };

  const runCode = async () => {
    openModal({
      show: true,
      modalType: 6,
      identifiers: { folderId: "", cardId: "" },
    });

    const language_id = languageMap[currentLanguage].id;
    const source_code = encode(currentCode);
    const stdin = encode(currentInput);

    const token = await postSubmission(language_id, source_code, stdin);
    if (token) {
      await getOutput(token);
    }

    closeModal();
  };

  // File handling logic
  const getFile = (e, setState) => {
    const input = e.target;
    if ("files" in input && input.files.length > 0) {
      placeFileContent(input.files[0], setState);
    }
  };

  const placeFileContent = (file, setState) => {
    readFileContent(file)
      .then(content => setState(content))
      .catch(error => console.log(error));
  };

  const readFileContent = (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  return (
    <div>
      <MainContainer isFullScreen={isFullScreen}>
        <EditorContainer
          title={title}
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
          currentCode={currentCode}
          setCurrentCode={setCurrentCode}
          folderId={folderId}
          playgroundId={playgroundId}
          saveCode={saveCode}
          runCode={runCode}
          getFile={getFile}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
        <Consoles>
          <InputConsole
            currentInput={currentInput}
            setCurrentInput={setCurrentInput}
            getFile={getFile}
          />
          <OutputConsole currentOutput={currentOutput} />
        </Consoles>
      </MainContainer>
      {isOpenModal.show && <Modal />}
    </div>
  );
};

export default Playground;
