import React from 'react';

import AddDonation from './AddDonation.jsx';
import DonationHistory from './DonationHistory.jsx';
import DonorProfile from './DonorProfile.jsx';
import Feed from './Feed.jsx';
import Navbar from './Navbar.jsx';
import Stats from './Stats.jsx';
import SuggestDonor from './SuggestDonor.jsx';

export default class DonorPage extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
  }
  
  render() {
    return (
      <div>
        <Navbar/>
        <div id="main">
          <div className="row">
            <div className="col-sm-10 col-sm-offset-1">
              <DonorProfile donor={this.id}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4 col-sm-push-6 col-sm-offset-1">
              <AddDonation donor={this.id}/>
              <DonationHistory donor={this.id}/>
              <Stats donor={this.id}/>
              <SuggestDonor donor={this.id}/>
            </div>
            <div className="col-sm-6 col-sm-pull-4">
              <Feed/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
