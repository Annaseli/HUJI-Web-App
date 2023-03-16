import React from 'react';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  // Any component now can access auth context - a global prop
  <StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
