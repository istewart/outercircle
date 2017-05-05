import React from 'react';

import Feed from './Feed.jsx';
import Navbar from './Navbar.jsx';
import Stats from './Stats.jsx';
import CharityProfile from './CharityProfile.jsx';
import SuggestCharity from './SuggestCharity.jsx';

export default class CharityPage extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
  }

  render(){
    return (
      <div>
        <Navbar/>
        <div id="main">
          <div className="row">
            <div className="container">
              <CharityProfile charity={this.id}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4 col-sm-push-6 col-sm-offset-1">
              <Stats/>
              <SuggestCharity charity={this.id}/>
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
