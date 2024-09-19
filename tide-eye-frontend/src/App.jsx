// src/App.jsx
import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css'; // Optional: Import your CSS file for styling

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Tidal Data Dashboard</h1>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
};

export default App;
