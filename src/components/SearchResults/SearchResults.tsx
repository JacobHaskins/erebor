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

  const triggerCardPin = (symbol: string | null): void => {
    if (symbol) {
      pinCardToBoard(symbol);
      clearCallback();
    }
  };

  const handleKeyDownList = (event: React.KeyboardEvent<HTMLUListElement>) => {
    let currentItem = document.querySelector("[aria-selected=true]");
    if (event.key === 'ArrowUp') {
      console.log('Arrowup', currentItem);
      if(currentItem && currentItem.previousElementSibling !== null){
        const prev = currentItem.previousElementSibling as HTMLElement;
        currentItem.setAttribute("aria-selected","false");
        prev.setAttribute("aria-selected", "true");
        prev.focus();
      }
      event.preventDefault();
    } else if (event.key === 'ArrowDown') {
      console.log('Arrowdown', currentItem);
      if(currentItem && currentItem.nextElementSibling !== null){
        const next = currentItem.nextElementSibling as HTMLElement;
        currentItem.setAttribute("aria-selected","false");
        next.setAttribute("aria-selected", "true");
        next.focus();
      } else if(!currentItem) {
        currentItem = document.querySelector("[aria-selected=false]");
        if (currentItem) {
          currentItem.setAttribute("aria-selected", "true");
          (currentItem as HTMLElement).focus();
        }
      }
      event.preventDefault();
    } else if ((event.code === 'Enter' || event.code === 'Space') && currentItem) {
      triggerCardPin(currentItem.textContent);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();

    triggerCardPin(event.currentTarget.textContent);
  };

  return (
    <div id="results">
      <ul role="listbox" onKeyDown={ handleKeyDownList } tabIndex={ 0 } aria-label="Search results">
        { results.map((result: string, index: number) => {          
          return (
              <li
                tabIndex={ -1 }
                role="option"
                aria-selected="false"
                key={ 'result-' + index }
                className='result-item'
                onClick={ handleClick }
              >
                { result }
              </li>
          );
        }) }
      </ul>
    </div>
  );
}

export default SearchResults;
