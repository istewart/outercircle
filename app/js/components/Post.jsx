import React from 'react';
import { Link } from 'react-router-dom';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const time = new Date(this.props.data.time).toLocaleTimeString();

    return (
      <div className="well well-sm">
        <div className="post-header">
          <Link to={'/donor/' + this.props.data.donor}>
            <img 
              src={window.location.origin + "/" + this.props.data.profile_image}
              className="img-rounded donor-thumbnail" alt="profile image"
            />
          </Link>
          <div className="post-title">
            <Link to={'/donor/' + this.props.data.donor}>
              <p>{this.props.data.name}</p>
            </Link>
            <p className="post-time">{time}</p>
          </div>
        </div>
        <span className="post-body">{this.props.data.body}</span>
      </div>
    );
  }
}
