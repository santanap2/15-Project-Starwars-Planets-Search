import React from 'react';
import './App.css';
import AppProvider from './context/AppProvider';
import Table from './components/Table';

function App() {
  return (
    <AppProvider>
      <div>
        <h2>Starwars Planets Search</h2>
        <Table />
      </div>
    </AppProvider>
  );
}

export default App;
