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
      this.state = {
        loggedIn: true,
        lastdonation:""
      };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkLogin();
  }

  checkLogin() {
    $.post('/loggedIn', "", function(data, status) {
        if (status === 'success' && data.isAuth === "authorized") {
            this.setState({loggedIn: true, userId:data.userId});
        }
        else {
            this.setState({loggedIn: false});
        }
    }.bind(this));
  }

  handleSubmit() { // TODO: security, xss, rendering, errors

      const data = {
          donor: this.state.userId,
          charity: 1, // todo
          // category: 'TODO: ADD THIS TO CHARITY',
          amount: $('#amount').val(),
          isPublic: +($('#public').val() == 'Public'),
      };

      const donorpage = this;

      $.post('/donate', data, function(data, status) {
          $('#name').val('');
          $('#amount').val('');
          $('#public').val('Public');
          donorpage.setState({lastdonation:data});
      });
  }

  render() {
    const Id = parseInt(this.props.match.params.id);

    let add = {};
    if(Id===this.state.userId){
      add = <AddDonation handleSubmit={this.handleSubmit}/>;
    } else{
      add = <br/>;
    }

    return (
      <div>
        <Navbar loggedIn={this.state.loggedIn} user={this.state.userId}/>
        <div id="main">
          <div className="row">
            <div className="col-sm-12">
              <DonorProfile donor={Id} user={this.state.userId}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4 col-sm-push-6 col-sm-offset-1">
              {add}
              <DonorStats donor={Id} last={this.state.lastdonation.time}/>
              <DonationHistory donor={Id} id={this.state.userId} last={this.state.lastdonation}/>
              <SuggestDonor donor={Id} user={this.state.userId}/>
            </div>
            <div className="col-sm-6 col-sm-pull-4">
              <Feed user={this.state.userId} donor={Id} type="donor"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
