import React from 'react';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

export default React.createClass({
  render: function() {
    return (
      <div className="post well well-sm">
        <Link to='/donor/123'>
          <div>
            <img src={'profile.jpg'} className="img-rounded donor-thumbnail"/>
            <span>{this.props.data.name}</span>
          </div>
        </Link>
        <p>{this.props.data.body}</p>
      </div>
    );
  },
});
