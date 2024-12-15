import React from 'react'
import styled from 'styled-components'
import { BiImport } from 'react-icons/bi'

export const Console = styled.div`
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  width: 100%;
  max-width: 600px;
  margin: 20px auto; /* Centered console */
`

export const Header = styled.div`
  background: #007bff;
  height: 4.5rem;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  padding: 0 1.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  label, a {
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    color: #fff;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  label:hover, a:hover {
    color: #ffcc00;
  }

  input[type="file"] {
    display: none;
  }
`

export const TextArea = styled.textarea`
  flex-grow: 1;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1.1rem;
  background-color: #fff;
  color: #333; /* Darker text color */
  min-height: 250px;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  border-top: none; /* Removes the top border, making it more seamless with the header */

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: inset 0 2px 5px rgba(0, 123, 255, 0.2);
  }

  &::placeholder {
    color: #777; /* Darker placeholder color for better visibility */
  }
`

const InputConsole = ({ currentInput, setCurrentInput, getFile }) => {
  return (
    <Console>
      <Header>
        Input: 
        <label htmlFor="inputfile">
          <input 
            type="file" 
            accept="text/*, .csv, .json, .txt" 
            id="inputfile" 
            onChange={(e) => getFile(e, setCurrentInput)} 
          /> 
          <BiImport /> Import Input
        </label>
      </Header>
      <TextArea
        onChange={(e) => setCurrentInput(e.target.value)}
        value={currentInput}
        placeholder="Type or import input here..."
      />
    </Console>
  )
}

export default InputConsole
