import React from 'react';
import { Redirect } from 'react-router-dom';

import Feed from './Feed.jsx';
import Navbar from './Navbar.jsx';
import SuggestDonor from './SuggestDonor.jsx';
import SuggestCharity from './SuggestCharity.jsx';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: true
    };

    this.checkLogin();
  }

  checkLogin() {
    $.post('/loggedIn', "", function(data, status) {
        if (status === 'success' && data.isAuth === "authorized") {
            this.setState({loggedIn: true,userId:data.userId});
            console.log('logged in, user id is '+data.userId);
        }
        else {
            this.setState({loggedIn: false});
            console.log('not logged in');
        }
    }.bind(this));
  }

  
  render() {
    if (!this.state.loggedIn) {
      return (<Redirect to="/login"/>);
    } else {
      return (
        <div>
          <Navbar/>
          <div id="main" className="center-block">
              <div className="col-md-4 col-sm-4 col-sm-push-7">
              <h1>{this.state.userId}</h1>
                  <SuggestDonor id={this.state.userId}/>
                  <SuggestCharity charity={this.state.userId}/>
              </div>
              <div className="col-md-6 col-sm-6 col-sm-pull-3">
                  <Feed donor={this.state.userId}/>
              </div>
          </div>
        </div>
    );
    }
  }
}
