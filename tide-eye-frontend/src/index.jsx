// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'; // Add your global styles if any

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
