import React from 'react';
import { useStockContext } from '../../business-logic/StockProvider/StockProvider';
import StockCard from '../StockCard/StockCard';
import './StockBoard.css';

function StockBoard() {
  const { boardState } = useStockContext();

  return (
    <div className="stock-board">  
      <StockCard cardId='card0' symbol={ boardState.card0 } />
      <StockCard cardId='card1' symbol={ boardState.card1 } />
      <StockCard cardId='card2' symbol={ boardState.card2 } />
    </div>
  );
}

export default StockBoard;
