import React from 'react';
import Follow from './follow.jsx';

class Title extends React.Component {
  getDefaultProps() {
    return {
      title : 'OutCircle',
      body : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    };
  }

  getInitialState() {
    return {
      title : this.props.title,
      body : this.props.body
    };
  }

  render() {
    return (
      <div id="charityTitle" className="center-block well">
        <div className="row vtc-center">
          <div className="col-md-7 text-center">
            <h1>{this.state.title}</h1>
          </div>
          <div className="col-md-5">
              <button id="donate" className="btn btn-success btn-margin">Donate</button>
              <Follow isFollow={false}/>
          </div>
        </div>
        <div className="row">
          <p>{this.state.body}</p>
        </div>
      </div>
    );
  }
})
