import React from 'react';

import { connect } from 'react-redux';
import history from '../../history';
import { Link } from 'react-router-dom';
class SearchInput extends React.Component {
  state = { searchTerm: '' };
  onInputChange = (e) => {
    const term = e.target.value;
    this.setState((prevState) => ({
      ...prevState,
      searchTerm: term,
    }));
  };
  render() {
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          history.push(`/searchResult/${this.state.searchTerm}`);
        }}
      >
        <input
          type="search"
          id="search"
          placeholder="Search..."
          onChange={this.onInputChange}
          value={this.state.searchTerm}
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
  }
}
export default connect(null)(SearchInput);
