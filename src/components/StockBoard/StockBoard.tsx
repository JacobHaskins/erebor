import React from 'react';
import { useStockContext } from '../../business-logic/StockProvider/StockProvider';
import StockCard from '../StockCard/StockCard';
import './StockBoard.css';

function StockBoard() {
  const { boardState } = useStockContext();

  return (
    <div className="stock-board">  
      <StockCard title={ boardState[0] } />
      <StockCard title={ boardState[1] } />
      <StockCard title={ boardState[2] } />
    </div>
  );
}

export default StockBoard;
