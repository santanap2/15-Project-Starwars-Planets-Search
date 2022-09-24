import React from 'react';
import './App.css';
import AppProvider from './context/AppProvider';
import Table from './components/Table';
import FilterName from './components/FilterName';
import FilterNumbers from './components/FilterNumbers';

function App() {
  return (
    <AppProvider>
      <div>
        <h2>Starwars Planets Search</h2>
        <FilterName />
        <FilterNumbers />
        <Table />
      </div>
    </AppProvider>
  );
}

export default App;
