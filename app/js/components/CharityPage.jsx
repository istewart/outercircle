import React from 'react';

import Feed from './Feed.jsx';
import Navbar from './Navbar.jsx';
import Stats from './Stats.jsx';
import CharityProfile from './CharityProfile.jsx';
import Suggestion from './Suggestion.jsx';

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
            <div className="col-sm-10 col-sm-offset-1">
              <CharityProfile charity={this.id}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4 col-sm-push-6 col-sm-offset-1">
              <Stats/>
              <Suggestion type="charity"/>
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
