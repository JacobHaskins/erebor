import React, { useEffect, useState } from 'react';
import { useStockContext } from '../../business-logic/StockProvider/StockProvider';
import { getStockDataForSymbol } from '../../business-logic/ApiServices/ApiStocksStatsService';
import { ICard, Card } from "../../models/Card";
import './StockCard.css';
import './glyphicon.css';

interface IStockCardProps {
  symbol: string;
  cardId: string;
}

function StockCard({ symbol, cardId }: IStockCardProps) {
  const { resetCardByCardId } = useStockContext();
  const [ cardData, setCardData ] = useState(new Card());

  const modifyCardData = (newCardData: ICard): void => {
    if(typeof setCardData != 'undefined') {
      console.log('newCardData', newCardData);
      setCardData(newCardData);
    }
  };

  useEffect(() => {
    if (!symbol || !symbol.trim()) {
      setCardData(new Card());
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

  if (!symbol || !symbol.trim() || !cardData || !cardData.Symbol) {
    return (
      <section className="stock-card-empty">
        <p className="grey-text">
          Pick an additional stock symbol in the search box above to display stock information
        </p>
      </section>
    );
  }

  const changePercentNumber = Number(cardData.ChangePercent.substring(0, cardData.ChangePercent.length - 2)); 
  const stockIsUp = !isNaN(changePercentNumber) &&  changePercentNumber > 0;
  const stockIsDown = !isNaN(changePercentNumber) &&  changePercentNumber < 0;

  return (
    <section className="stock-card">
      <h2><button
        className='remove-button'
        onClick={ handleClick }
        onKeyDown={ handleKeyDown }
        aria-label="Remove"
      >
        X
      </button>
      { cardData.Name }&nbsp;({ cardData.Symbol })</h2>
      <div className='stats-container'>
        <div className='stats-row-container'>
          <p><span className='stock-price'>{ cardData.Price }</span>&nbsp;<span className='stock-currency'>{ cardData.Currency }</span>
          <br/>
          {
            stockIsUp && ( <span className="up glyphicon glyphicon-arrow-up">{ cardData.ChangePercent }</span> )
          }
          {
            stockIsDown && ( <span className="down glyphicon glyphicon-arrow-down">{ cardData.ChangePercent }</span> )
          }
          {
            !stockIsUp && !stockIsDown && ( <span>{ cardData.ChangePercent }</span> )
          }
          </p>
        </div>
        <div className='stats-row-container'>
          <span className='stats-label'>
            52-week [low..high]:&nbsp;
          </span>
          <span className='stats-value'>
            [{ cardData.Low52Week }..{ cardData.High52Week }]
          </span>
        </div>
        <div className='stats-row-container'>
          <span className='stats-label'>
            Dividend per share (yield):&nbsp;
          </span>
          <span className='stats-value'>
            { cardData.DividendPerShare }&nbsp;({ cardData.DividendYield ? cardData.DividendYield : '0' }%)
          </span>
        </div>
        <div className='stats-row-container'>
          <span className='stats-label'>
            PE:&nbsp;
          </span>
          <span className='stats-value'>
            { cardData.PERatio }
          </span>
        </div>
        <div className='stats-row-container'>
          <span className='stats-label'>
            PEG:&nbsp;
          </span>
          <span className='stats-value'>
            { cardData.PEGRatio }
          </span>
        </div>
        <div className='stats-row-container'>
          <span className='stats-label'>
            EPS:&nbsp;
          </span>
          <span className='stats-value'>
            { cardData.EPS }
          </span>
        </div>
        <div className='stats-row-container'>
          <span className='stats-label'>
            EBITDA:&nbsp;
          </span>
          <span className='stats-value'>
            { cardData.EBITDA }
          </span>
        </div>
        <div className='stats-row-container'>
          <span className='stats-label'>
            Book value:&nbsp;
          </span>
          <span className='stats-value'>
            { cardData.BookValue }
          </span>
        </div>
      </div>
    </section>
  );
}

export default StockCard;
