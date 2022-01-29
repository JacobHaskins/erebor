import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>
          Stock Comparison
        </h1>
      </header>
      <main>
        <SearchBar />
      </main>
    </div>
  );
}

export default App;
