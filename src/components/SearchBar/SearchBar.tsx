import React, { useState, useEffect, useRef } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import { searchForKeyword } from '../../business-logic/ApiServices/ApiKeywordSearchService';
import './SearchBar.css';

type Timer = ReturnType<typeof setTimeout>
const defaultTimerHandle: Timer = setTimeout(() => '', 1);

function SearchBar() {
  const [ searchTerm, setSearchTerm ] = useState<string>('');
  const [ results, setResults] = useState<string[]>([]);
  const [ queryTimeoutHandle, setQueryTimeoutHandle ] = useState<Timer>(defaultTimerHandle);
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
    if(typeof setResults != 'undefined') {
      setResults(newResults);
    }
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
    } else {
      if (queryTimeoutHandle != defaultTimerHandle) {
        clearTimeout(queryTimeoutHandle);
      }
      const doSearch = (): void => {
        searchForKeyword(searchTerm.trim(), modifyResults);
        clearTimeout(queryTimeoutHandle);
        setQueryTimeoutHandle(defaultTimerHandle);
      };
      setQueryTimeoutHandle(setTimeout(doSearch, 1025)); // NOTE: Because of API Throttling, only query the API if it has been about 1 second or more since the last keydown.
    }
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
