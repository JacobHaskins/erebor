import React from 'react';
import { StockProvider } from '../../business-logic/StockProvider/StockProvider';
import SearchBar from '../SearchBar/SearchBar';
import StockBoard from '../StockBoard/StockBoard';
import './App.css';

function App() {
  return (
    <StockProvider>
      <div className="app">
        <header>
          <h1>
            Stock Comparison
          </h1>
        </header>
        <main>
          <SearchBar />
          <StockBoard />
        </main>
      </div>
    s</StockProvider>
  );
}

export default App;
