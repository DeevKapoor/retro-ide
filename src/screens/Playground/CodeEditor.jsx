import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import CodeMirror from '@uiw/react-codemirror';
import { EditorState } from '@codemirror/state';
import { indentUnit } from '@codemirror/language';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';

// Themes for CodeMirror
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

// Monaco Editor
import { Monaco } from '@monaco-editor/react';

// Styled Components
const CodeEditorWrapper = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: ${({ themeType }) => (themeType === 'dark' ? '#1e1e1e' : '#f5f5f5')};
  position: relative;
`;

const EditorToggle = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  padding: 8px 12px;
  background-color: ${({ themeType }) => (themeType === 'dark' ? '#444' : '#ddd')};
  color: ${({ themeType }) => (themeType === 'dark' ? '#fff' : '#000')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${({ themeType }) => (themeType === 'dark' ? '#666' : '#bbb')};
  }
`;

// Theme and language mappings
const themeMapping = {
  githubDark,
  githubLight,
  dracula,
  vscodeDark,
};

const languageMapping = {
  cpp,
  java,
  javascript,
  python,
};

const monacoThemes = {
  dark: 'vs-dark',
  light: 'vs',
};

const CodeEditor = ({
  currentLanguage = 'javascript',
  currentTheme = 'githubDark',
  currentCode,
  setCurrentCode,
}) => {
  const [theme, setTheme] = useState(githubDark);
  const [language, setLanguage] = useState(javascript);
  const [useMonaco, setUseMonaco] = useState(false); // Toggle between CodeMirror and Monaco

  // Update the theme and language
  useEffect(() => {
    const selectedTheme = themeMapping[currentTheme] || githubDark;
    const selectedLanguage = languageMapping[currentLanguage] || javascript;

    setTheme(selectedTheme);
    setLanguage(selectedLanguage);
  }, [currentLanguage, currentTheme]);

  // Memoized extensions for CodeMirror
  const editorExtensions = useMemo(
    () => [
      language,
      indentUnit.of('    '), // Default indentation: 4 spaces
      EditorState.tabSize.of(4),
    ],
    [language]
  );

  return (
    <CodeEditorWrapper themeType={currentTheme.includes('Dark') ? 'dark' : 'light'}>
      {/* Toggle Button */}
      <EditorToggle
        themeType={currentTheme.includes('Dark') ? 'dark' : 'light'}
        onClick={() => setUseMonaco((prev) => !prev)}
      >
        Switch to {useMonaco ? 'CodeMirror' : 'Monaco'}
      </EditorToggle>

      {useMonaco ? (
        // Monaco Editor Component
        <Monaco
          height="100%"
          language={currentLanguage}
          theme={currentTheme.includes('Dark') ? monacoThemes.dark : monacoThemes.light}
          value={currentCode}
          onChange={(value) => setCurrentCode(value || '')}
          options={{
            selectOnLineNumbers: true,
            autoClosingBrackets: 'always',
            formatOnType: true,
            tabSize: 4,
          }}
        />
      ) : (
        // CodeMirror Editor Component
        <CodeMirror
          value={currentCode}
          height="100%"
          theme={theme}
          extensions={editorExtensions}
          onChange={(value) => setCurrentCode(value)}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            drawSelection: true,
            highlightSelectionMatches: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            syntaxHighlighting: true,
          }}
        />
      )}
    </CodeEditorWrapper>
  );
};

export default CodeEditor;
