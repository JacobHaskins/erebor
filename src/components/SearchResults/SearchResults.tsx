import React from 'react';
import { useStockContext } from '../../business-logic/StockProvider/StockProvider';
import './SearchResults.css';

interface ISearchResultsProps {
  results: string[];
  clearCallback: () => void;
}

function SearchResults({ results, clearCallback }: ISearchResultsProps) {
  const { pinCardToBoard } = useStockContext();

  if (results.length === 0) {
    return null;
  }

  const triggerCardPin = (symbol: string): void => {
    pinCardToBoard(symbol);
    clearCallback();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.code === "Enter") {
      triggerCardPin(event.currentTarget.name);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    triggerCardPin(event.currentTarget.name);
  };

  return (
    <div id="results">
      { results.map((result: string, index: number) => {
          const name = result.split(';')[0];
          
          return (
            <button
              key={ 'result-' + index }
              className='result-button'
              onClick={ handleClick }
              onKeyDown={ handleKeyDown }
              name={ name }
            >
              { result }
            </button>
          );
        }) }
    </div>
  );
}

export default SearchResults;
