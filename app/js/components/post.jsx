import React from 'react';
import { Link } from 'react-router-dom';

class Post extends React.Component {
  render() {
    const time = new Date(this.props.data.time).toLocaleTimeString();

    return (
      <div className="post well well-sm">
        <div className="post-header">
          <Link to='/donor/123'>
            <img src={'profile.jpg'} className="img-rounded donor-thumbnail"/>
          </Link>
          <div className="post-title">
            <Link to='/donor/123'>
              <p>{this.props.data.name}</p>
            </Link>
            <p className="post-time">{time}</p>
          </div>
        </div>
        <p>{this.props.data.body}</p>
      </div>
    );
  }
};
