import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SessionProvider } from './context';
import { Routes } from './routes';
import { globalStyles } from './styles';

function App() {
  globalStyles();
  return (
    <>
      <ToastContainer autoClose={4000} position="bottom-right" />
      <SessionProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </SessionProvider>
    </>
  );
}

export default App;
