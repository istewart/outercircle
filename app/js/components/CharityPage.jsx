import React from 'react';

import Feed from './Feed.jsx';
import Navbar from './Navbar.jsx';
import Stats from './Stats.jsx';
import CharityProfile from './CharityProfile.jsx';
import SuggestCharity from './SuggestCharity.jsx';

export default class CharityPage extends React.Component {
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
              this.setState({loggedIn: true, userId: data.userId});
          }
          else {
              this.setState({loggedIn: false});
          }
      }.bind(this));
  }

  render(){
    const Id = parseInt(this.props.match.params.id);

    return (
      <div>
        <Navbar loggedIn={this.state.loggedIn} user={this.state.userId}/>
        <div id="main">
          <div className="row">
            <CharityProfile charity={Id} user={this.state.userId}/>
          </div>
          <div className="row">
            <div className="col-sm-4 col-sm-push-6 col-sm-offset-1">
              <Stats/>
              <SuggestCharity charity={Id} user={this.state.userId}/>
            </div>
            <div className="col-sm-6 col-sm-pull-4">
              <Feed charity={Id} user={this.state.userId} type="charity"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
