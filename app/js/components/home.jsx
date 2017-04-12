import React from 'react';

import Feed from './feed.jsx';
import Navbar from './navbar.jsx';
import Stats from './stats.jsx';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <Navbar/>
        <div id="main" className="center-block">
            <div className="col-md-6">            
              <Feed/>
            </div>
            <div className="col-md-3">
              <Stats/>
            </div>
        </div>
      </div>
    );
  }
}
