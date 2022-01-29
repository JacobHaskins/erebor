import React from 'react';
import StockCard from '../StockCard/StockCard';
import './StockBoard.css';

function StockBoard() {
  return (
    <div className="stock-board">
      <StockCard />
      <StockCard />
      <StockCard />
    </div>
  );
}

export default StockBoard;
