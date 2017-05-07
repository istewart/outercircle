import React from 'react';

import AddDonation from './AddDonation.jsx';
import DonationHistory from './DonationHistory.jsx';
import DonorProfile from './DonorProfile.jsx';
import DonorStats from './DonorStats.jsx';
import Feed from './Feed.jsx';
import Navbar from './Navbar.jsx';
import SuggestDonor from './SuggestDonor.jsx';

export default class DonorPage extends React.Component {
  constructor(props) {
    super(props);
      this.donor = this.props.match.params.id;
      this.state = {
        loggedIn: true
      };

    this.checkLogin();
  }

  checkLogin() {
    $.post('/loggedIn', "", function(data, status) {
        if (status === 'success' && data.isAuth === "authorized") {
            this.setState({loggedIn: true, userId:data.userId});
            console.log('logged in, user id is '+data.userId);
        }
        else {
            this.setState({loggedIn: false});
            console.log('not logged in');
        }
    }.bind(this));
  }

  render() {
    let add = {};
    if(this.donor===this.state.userId){
      add = <AddDonation userId={this.state.userId}/>;
    } else{
      add = <br/>;
    }

    return (
      <div>
        <Navbar/>
        <div id="main">
          <div className="row">
            <div className="container">
              <DonorProfile donor={this.donor} id={this.state.userId}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4 col-sm-push-6 col-sm-offset-1">
              {add}
              <DonorStats donor={this.donor}/>
              <DonationHistory donor={this.donor} id={this.state.userId}/>
              <SuggestDonor donor={this.donor} user={this.state.userId}/>
            </div>
            <div className="col-sm-6 col-sm-pull-4">
              <Feed id={this.state.id} type="donor"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
