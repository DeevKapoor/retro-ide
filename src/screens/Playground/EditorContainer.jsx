import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { BiEditAlt, BiImport, BiExport, BiFullscreen } from 'react-icons/bi';
import { ModalContext } from '../../context/ModalContext';
import Select from 'react-select';
import { languageMap } from '../../context/PlaygroundContext';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';

const StyledEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: ${({ isFullScreen }) => (isFullScreen ? '100vh' : 'calc(100vh - 4.5rem)')};
  background-color: #121212;
`;

const CodeEditorContainer = styled.div`
  height: calc(100% - 4rem);
  display: flex;
  align-items: center;

  & > div {
    height: 100%;
    width: 100%;
  }
`;

const LowerToolBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: #1e1e1e;
  border-top: 1px solid #333;
  
  button, label, a {
    display: flex;
    align-items: center;
    color: #fff;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    gap: 0.5rem;
  }

  button:hover, label:hover, a:hover {
    color: #1db954;
  }

  input {
    display: none;
  }
`;

const SaveAndRunButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #1db954;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background-color: #17a247;
  }
`;

const themeOptions = [
  { value: 'vs-dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
];

const languageOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
];

const EditorContainer = ({
  title,
  currentLanguage,
  setCurrentLanguage,
  currentCode,
  setCurrentCode,
  folderId,
  playgroundId,
  saveCode,
  runCode,
  getFile,
  isFullScreen,
  setIsFullScreen,
}) => {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const [currentTheme, setCurrentTheme] = useState(themeOptions[0]);
  const [language, setLanguage] = useState(
    languageOptions.find((option) => option.value === currentLanguage) || languageOptions[0]
  );

  const handleThemeChange = (selectedOption) => {
    setCurrentTheme(selectedOption);
  };

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption);
    setCurrentLanguage(selectedOption.value);
    setCurrentCode(languageMap[selectedOption.value].defaultCode);
  };

  const handleRunCode = () => {
    if (!currentCode.trim()) {
      alert('Please enter some code before running!');
      return;
    }
    runCode();
  };

  return (
    <StyledEditorContainer isFullScreen={isFullScreen}>
      {!isFullScreen && (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 1rem' }}>
          <h3 style={{ color: '#fff' }}>{title || 'Untitled'}</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Select
              options={languageOptions}
              value={language}
              onChange={handleLanguageChange}
              styles={{
                control: (base) => ({ ...base, backgroundColor: '#1e1e1e', color: '#fff' }),
                singleValue: (base) => ({ ...base, color: '#fff' }),
              }}
            />
            <Select
              options={themeOptions}
              value={currentTheme}
              onChange={handleThemeChange}
              styles={{
                control: (base) => ({ ...base, backgroundColor: '#1e1e1e', color: '#fff' }),
                singleValue: (base) => ({ ...base, color: '#fff' }),
              }}
            />
          </div>
        </div>
      )}

      <CodeEditorContainer>
        <Editor
          height="100%"
          language={currentLanguage}
          theme={currentTheme.value}
          value={currentCode}
          onChange={(value) => setCurrentCode(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            automaticLayout: true,
            wordWrap: 'on',
          }}
        />
      </CodeEditorContainer>

      <LowerToolBar>
        <button onClick={() => setIsFullScreen((prev) => !prev)}>
          <BiFullscreen /> {isFullScreen ? 'Minimize Screen' : 'Full Screen'}
        </button>

        <label htmlFor="codefile">
          <input
            type="file"
            accept="."
            id="codefile"
            onChange={(e) => getFile(e, setCurrentCode)}
          />
          <BiImport /> Import Code
        </label>

        <a
          href={`data:text/plain;charset=utf-8,${encodeURIComponent(currentCode)}`}
          download="code.txt"
        >
          <BiExport /> Export Code
        </a>

        <SaveAndRunButton onClick={handleRunCode}>Run Code</SaveAndRunButton>
      </LowerToolBar>
    </StyledEditorContainer>
  );
};

export default EditorContainer;
