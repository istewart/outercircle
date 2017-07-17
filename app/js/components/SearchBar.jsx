import React from 'react';
import { Link } from 'react-router-dom';

import SearchResult from './SearchResult.jsx';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // find autocomplete results for current query
  handleChange(event) {
    event.preventDefault();
    const query = $('#search').val();

    // hide autocomplete if search is deleted
    if (!query) {
      this.setState({results: []});
      return;
    }

    // retrieve autocomplete results based on new query
    $.get('/search', {q: query}, function(data, status) {
      if (status === 'success') {
        this.setState({results: data});
      } else {
        console.log("search error: " + status); // TODO THIS
      }
    }.bind(this));
  }

  // clear the search bar when a link is clicked
  handleClick() {
    $('#search').val("");
  }

  render() { // TODO: fix overlap display
    const renderedResults = this.state.results.map((result) =>
      <SearchResult 
        name={result.name}
        profile={result.profile}
        link={result.link}
        key={result.link}
        click={this.handleClick}
      />
    );

    var renderedComplete = "";
    if (renderedResults.length) {
      renderedComplete = (
        <ul className="search-results">
          {renderedResults}
        </ul>
      );
    }

    return (
      <div className="search-group">
        <input id="search"
          className="form-control"
          type="text"
          placeholder="Search"
          onChange={this.handleChange}
        />
        {renderedComplete}
      </div>
    );
  }
}
