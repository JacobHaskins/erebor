import React, { useEffect, useState } from 'react';
import { useStockContext } from '../../business-logic/StockProvider/StockProvider';
import './StockCard.css';
import './glyphicon.css';

interface IStockCardProps {
  symbol: string;
  cardId: string;
}

interface IStockCardData {
  name: string;
}

const defaultCardData: IStockCardData = {
  name: ''
};

function StockCard({ symbol, cardId }: IStockCardProps) {
  const { resetCardByCardId } = useStockContext();
  const [ cardData, setCardData ] = useState(defaultCardData);

  const modifyCardData = (newCardData: IStockCardData): void => {
    if(typeof setCardData != 'undefined') {
      setCardData(newCardData);
    }
  };

  useEffect(() => {
    if (!symbol || !symbol.trim()) {
      setCardData(defaultCardData);
    } else {
      // TODO: restore getStockDataForSymbol(symbol.trim(), modifyCardData);
      modifyCardData({name: 'The Fellowship of the Ring'});
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
      <h2>{ cardData.name }</h2>
      <span className="glyphicon glyphicon-arrow-up"></span>
      <span className="glyphicon glyphicon-arrow-down"></span>
    </section>
  );
}

export default StockCard;
