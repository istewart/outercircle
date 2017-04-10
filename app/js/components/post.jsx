import React from 'react';
import { Link } from 'react-router-dom';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgsrc : 'profile.jpg'
    };
  }
  
  render() {
    const time = new Date(this.props.data.time).toLocaleTimeString();

    return (
      <div className="post well well-sm">
        <div className="post-header">
          <Link to='/donor/123'>
            <img src={window.location.origin + "/" + this.state.imgsrc} className="img-rounded donor-thumbnail"/>
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
