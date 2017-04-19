import React from 'react';

import AddDonation from './AddDonation.jsx';
import DonorProfile from './DonorProfile.jsx';
import Feed from './Feed.jsx';
import Navbar from './Navbar.jsx';
import Stats from './Stats.jsx';

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
              <AddDonation/>
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
