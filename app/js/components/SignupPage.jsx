import React from 'react';
import Signup from './Signup.jsx';
import Navbar from './Navbar.jsx';

export default class SignupPage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div id ="main">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <Signup/>
          </div>
        </div>
      </div>
    );
  }
}