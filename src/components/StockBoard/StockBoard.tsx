import React from 'react';
import { useStockContext } from '../../business-logic/StockProvider/StockProvider';
import StockCard from '../StockCard/StockCard';
import './StockBoard.css';

function StockBoard() {
  const { boardState } = useStockContext();

  return (
    <div className="stock-board">  
      <StockCard title={ boardState.card0 } />
      <StockCard title={ boardState.card1 } />
      <StockCard title={ boardState.card2 } />
    </div>
  );
}

export default StockBoard;
