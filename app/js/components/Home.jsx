import React from 'react';
import { Redirect } from 'react-router-dom';

import Feed from './Feed.jsx';
import Navbar from './Navbar.jsx';
import Suggestion from './Suggestion.jsx';

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
            this.setState({loggedIn: true});
            console.log('logged in');
        }
        else {
            this.setState({loggedIn: false});
            console.log('not logged in');
            console.log(data);
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
}
