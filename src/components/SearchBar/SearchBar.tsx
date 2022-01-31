import React, { useState, useEffect, useRef } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import { searchForSymbol } from '../../business-logic/ApiServices/ApiSymbolSearchService';
import './SearchBar.css';

function SearchBar() {
  const [ searchTerm, setSearchTerm ] = useState<string>('');
  const [ results, setResults] = useState<string[]>([]);
  const searchBarRef = useRef<HTMLInputElement>(null);

  const clearCallback = (): void => {
    setSearchTerm('');
    if (searchBarRef.current) {
      searchBarRef.current.value = '';
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const modifyResults = (newResults: string[]): void => {
    setResults(newResults);
  };

  useEffect(() => {
    let isMounted = true;

    if (searchTerm.trim() === '') {
      setResults([]);
    } else {
      searchForSymbol(searchTerm.trim(), modifyResults);
    }

    return () => {
      isMounted = false;
    };
  }, [searchTerm]);

  return (
    <fieldset className="search-fieldset">
      <legend id="search-legend">Search</legend>
      <label htmlFor="search-bar">Enter up to 3 stocks to compare the current stock prices.</label><br />
      <input 
        id="search-bar" 
        name="search" 
        type="search" 
        spellCheck="true"
        onChange={ handleChange } 
        placeholder="PLTR / Palantir Technologies"
        ref={ searchBarRef }
      />
      { results.length > 0 && (
        <SearchResults results={ results } clearCallback={ clearCallback } />
      ) }
    </fieldset>
  );
}

export default SearchBar;
