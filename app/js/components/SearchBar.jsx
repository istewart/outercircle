import React from 'react';

import SearchResult from './SearchResult.jsx';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleChange.bind(this); // TODO: this is a hack
    this.handleBlur = this.handleBlur.bind(this);
  }

  // find autocomplete results for current query
  handleChange(event) {
    event.preventDefault();
    const query = $('#search').val();

    // hide autocomplete if search is empty
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
    $('#search').val('');
    this.setState({results: []});
  }

  // hide the results when search loses focus // TODO: a hack, but only way i think
  handleBlur(event) {
    const currentTarget = event.currentTarget;

    // make sure we aren't selecting some sub element when we lose focus
    setTimeout(function() {
      if (!currentTarget.contains(document.activeElement)) {
        this.setState({results: []});
      }
    }.bind(this), 0);
  }

  render() { // TODO: CLEAN UP RELATED CODE, something cool with rounded edges
    const renderedResults = this.state.results.map((result) =>
      <SearchResult 
        name={result.name}
        profile={result.profile}
        link={result.link}
        key={result.link}
        click={this.handleClick}
      />
    );

    var renderedComplete = ""; // TODO: limit count
    if (renderedResults.length) {
      renderedComplete = (
        <ul className="search-results">
          {renderedResults}
        </ul>
      );
    }

    return (
      <div className="search-group"
       onFocus={this.handleFocus}
       onBlur={this.handleBlur}
      >
        <input id="search"
          className="form-control"
          type="text"
          placeholder="Search"
          autoComplete="off"
          onChange={this.handleChange}
        />
        {renderedComplete}
      </div>
    );
  }
}
