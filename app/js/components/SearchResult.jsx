import React from 'react';
import { Link } from 'react-router-dom';

export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Link
        to={this.props.link}
        className="search-result"
        onClick={this.props.click}
      >
        <li>
          {this.props.name}
        </li>
      </Link>
    );
  }
}
