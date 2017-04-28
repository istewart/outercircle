import React from 'react';

import Follow from './Follow.jsx';
import IMGheader from './IMGheader.jsx'

export default class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          <IMGheader imgsrc={this.props.data.cover_image}/>
          <div className="well charity-title center-block">
            <div className="charity-header">
              <h3>{this.props.data.name}</h3>
              <div className="charity-buttons">
                <a href={this.props.data.website} target="_blank" id="donate" className="btn btn-success btn-margin">
                  Donate
                </a>
                  <Follow isFollow={false} truetext='Followed' falsetext='Follow'/>
              </div>
            </div>
            <p>{this.props.data.description}</p>
          </div>
      </div>
    );
  }
}

Title.defaultProps = {
    data: {
        cover_image:'beach.jpg',
        name: 'OuterCircle',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        website: 'www.google.com'
    }
};
