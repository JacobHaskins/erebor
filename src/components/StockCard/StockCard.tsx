import React, { useEffect, useState } from 'react';
import { useStockContext } from '../../business-logic/StockProvider/StockProvider';
import { getStockDataForSymbol, IStockCardData, StockStatsData } from '../../business-logic/ApiServices/ApiStocksStatsService';
import './StockCard.css';
import './glyphicon.css';

interface IStockCardProps {
  symbol: string;
  cardId: string;
}

function StockCard({ symbol, cardId }: IStockCardProps) {
  const { resetCardByCardId } = useStockContext();
  const [ cardData, setCardData ] = useState(new StockStatsData());

  const modifyCardData = (newCardData: IStockCardData): void => {
    if(typeof setCardData != 'undefined') {
      console.log('newCardData', newCardData);
      setCardData(newCardData);
    }
  };

  useEffect(() => {
    if (!symbol || !symbol.trim()) {
      setCardData(new StockStatsData());
    } else if (cardData.Name.trim().length === 0) {
      getStockDataForSymbol(symbol.trim(), modifyCardData);
    }
  }, [symbol]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.code === "Enter") {
      resetCardByCardId(cardId);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    resetCardByCardId(cardId);
  };

  if (!symbol || !symbol.trim()) {
    return (
      <section className="stock-card-empty">
        <p className="grey-text">
          Pick an additional stock symbol in the search box above to display stock information
        </p>
      </section>
    );
  }

  return (
    <section className="stock-card">
      <button
        className='remove-button'
        onClick={ handleClick }
        onKeyDown={ handleKeyDown }
        aria-label="Remove"
      >
        X
      </button>
      <h2>{ cardData.Name }</h2>
      <span className="glyphicon glyphicon-arrow-up"></span>
      <span className="glyphicon glyphicon-arrow-down"></span>
    </section>
  );
}

export default StockCard;
