import React from 'react';
import './SearchBar.css';

function SearchBar() {
  return (
    <fieldset className="search-fieldset">
      <legend id="search-legend">Search</legend>
      <label htmlFor="search-bar">Enter up to 3 stocks to compare the current stock prices.</label><br />
      <input id="search-bar" name="search" type="text" placeholder="PLTR / Palantir Technologies" />
    </fieldset>
  );
}

export default SearchBar;
