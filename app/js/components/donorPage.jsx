import Feed from './feed.jsx';
import Navbar from './navbar.jsx';
import DonorProfile from './donorProfile.jsx';
import Stats from './stats.jsx';
import React from 'react';

export default class DonorPage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <Navbar/>
        <div id="main" className="center-block col-md-9">
          <div className="row">
            <DonorProfile/>
          </div>
          <div className="row">
            <div className="col-md-5 col-sm-5 col-sm-push-7">
              <Stats/>
            </div>
            <div className="col-md-7 col-sm-7 col-sm-pull-5">
              <Feed/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
