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
          <div className="post-header">
            <img 
              src={window.location.origin + "/" + this.props.profile}
              className="img-rounded profile-thumbnail"
              alt={"Profile Image of " + this.props.name}
            />
            <div className="post-title">
              <p>{this.props.name}</p>
              <p className="post-time">{this.props.subtitle}</p>
            </div>
          </div>
        </li>
      </Link>
    );
  }
}
