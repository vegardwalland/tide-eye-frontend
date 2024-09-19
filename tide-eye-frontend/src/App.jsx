// src/App.jsx
import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  return (
    <div className="app-container" >
      <header className="app-header">
        <h1>Tide-Eye</h1>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
};

export default App;
