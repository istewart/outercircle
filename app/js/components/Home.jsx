import React from 'react';

import Feed from './Feed.jsx';
import Navbar from './Navbar.jsx';
import Suggestion from './Suggestion.jsx';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <Navbar/>
        <div id="main" className="center-block">
            <div className="col-md-4 col-sm-4 col-sm-push-7">
                <Suggestion type="donor"/>
                <Suggestion type="charity"/>
            </div>
            <div className="col-md-6 col-sm-6 col-sm-pull-3">
                <Feed/>
            </div>
        </div>
      </div>
    );
  }
}
