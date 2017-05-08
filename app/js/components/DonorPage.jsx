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
      };

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

  handleSubmit(event) { // TODO: security, xss, rendering, errors
        event.preventDefault();
        const data = {
            donor: this.state.userId,
            charity: 1, // todo
            category: $('#category').val(),
            amount: $('#amount').val(),
        };

        $.post('/donate', data, function(data, status) {
            $('#name').val('');
            $('#category').val('');
            $('#amount').val('');
        });


  }

  render() {
    const Id = parseInt(this.props.match.params.id);

    let add = {};
    if(Id===this.state.userId){
      add = <AddDonation userId={this.state.userId}/>;
    } else{
      add = <br/>;
    }

    return (
      <div>
        <Navbar loggedIn={this.state.loggedIn} user={this.state.userId}/>
        <div id="main">
          <div className="row">
            <div className="container">
              <DonorProfile donor={Id} user={this.state.userId}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4 col-sm-push-6 col-sm-offset-1">
              {add}
              <DonorStats donor={Id}/>
              <DonationHistory donor={Id} id={this.state.userId}/>
              <SuggestDonor donor={Id} user={this.state.userId}/>
            </div>
            <div className="col-sm-6 col-sm-pull-4">
              <Feed donor={Id} type="donor"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
