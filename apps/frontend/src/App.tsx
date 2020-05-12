import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Albums from './components/Albums';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <div className='App'>
        <Albums />
      </div>
    </>
  );
}

export default App;
