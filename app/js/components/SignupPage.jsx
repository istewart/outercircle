import React from 'react';
import Signup from './Signup.jsx';
import Navbar from './Navbar.jsx';

export default class SignupPage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <Signup/>
        <p>
          Or 
          <a 
            href={window.location.origin + "/login"}
            className="btn btn-primary">Login
          </a>
        </p>
      </div>
    );
  }
}