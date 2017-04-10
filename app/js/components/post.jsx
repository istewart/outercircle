import React from 'react';
import { Link } from 'react-router-dom';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
  }
  
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
            <p className="post-time"> {time}</p>
          </div>
        </div>
        <span className="post-body">{this.props.data.body}</span>
      </div>
    );
  }
}
