import React from 'react'
import { Console, Header, TextArea } from './InputConsole'
import { BiExport } from 'react-icons/bi'

const OutputConsole = ({ currentOutput }) => {
  return (
    <Console>
      <Header>
        Output:
        
        <a 
          href={`data:text/plain;charset=utf-8,${encodeURIComponent(currentOutput)}`} 
          download="output.txt" 
          title="Export Output"
        >
          <BiExport /> Export Output
        </a>
      </Header>

     
      <TextArea
        value={currentOutput}
        disabled
        placeholder="Output will be displayed here..."
        style={{
          width: '100%',
          height: '200px',
          resize: 'vertical',
          overflowY: 'auto', 
          padding: '0.5rem',
          backgroundColor: '#f4f4f4',
          border: '1px solid #ccc',
          borderRadius: '8px',
          color: '#333', 
          fontFamily: 'monospace',
          fontSize: '14px',
          lineHeight: '1.4', 
        }}
      />
    </Console>
  )
}

export default OutputConsole
