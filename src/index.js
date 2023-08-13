import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1300px',
  '2xl': '1536px',
}

const theme = extendTheme({ breakpoints })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
