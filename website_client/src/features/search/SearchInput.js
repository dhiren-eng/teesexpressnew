import React, { useState } from 'react';

import { connect } from 'react-redux';
import history from '../../history';
import { Link } from 'react-router-dom';
const SearchInput = () => {
  const [state, updateState] = useState({ searchTerm: '' });
  const onInputChange = (e) => {
    const term = e.target.value;
    updateState((prevState) => ({
      ...prevState,
      searchTerm: term,
    }));
  };
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        history.push(`/searchResult/${state.searchTerm}`);
      }}
    >
      <input
        type="search"
        id="search"
        placeholder="Search..."
        onChange={onInputChange}
        value={state.searchTerm}
        autoComplete="off"
      />
      <button
        type="submit"
        className="btn d-flex"
        style={{ boxShadow: 'none', outline: 'none' }}
      >
        <i class="fas fa-search" style={{ fontSize: '18px' }}></i>
      </button>
    </form>
  );
};
export default SearchInput;
