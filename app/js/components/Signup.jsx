import React from 'react';
import { Redirect } from 'react-router-dom';

var genHash = require('sha256');

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
      wrongUsername: false,
      wrongPassword: false
    };
  }

  _handleSignup(event) {
      event.preventDefault();
      const data = {
        username: $('#email').val(),
        password: genHash($('#password').val()),
        confirmPassword: genHash($('#confirmPassword').val()),
        firstname: $('#firstname').val(),
        lastname: $('#lastname').val()
      };
      this.setState({wrongUsername: false});
      if (data.confirmPassword == data.password) {
        this.setState({wrongPassword: false});
        $.post('/signup', data, function(result, status) {
          if (result.signup == "success") {
            this.setState({signup: true});
          }
          else {
            this.setState({wrongUsername: true});
          }
        }.bind(this));
      }
      else {
        this.setState({wrongPassword: true});
      }
  }
  
  render() {
    var alert = "";
    if (this.state.wrongUsername) {
      alert = <div className='alert alert-danger'><strong>Error</strong> Username already exists</div>;
    }
    else if (this.state.wrongPassword) {
      alert = <div className='alert alert-danger'><strong>Error</strong> Passwords don't match</div>;
    }
    if (this.state.signup) {
      return (<Redirect to="/login"/>);
    }
    else {
      return(
      <div>
        <div className="row">
          <div className="col-md-7 col-md-offset-1 col-xs-12">
            <h3 className="signup-header">Let's Get Started</h3>
          </div>
        </div>
        <div>
          <form onSubmit={this._handleSignup.bind(this)}>
          <br/>
            {alert}
            <div className="form-group form-padding">
              <label><b>Email</b></label>
              <input className="form-control" id="email" type="email" placeholder="Enter Email" name="email" required />

              <label><b>First Name</b></label>
              <input className="form-control" id="firstname" type="text" placeholder="First Name" name="passwd" required />

              <label><b>Last Name</b></label>
              <input className="form-control" id="lastname" type="text" placeholder="Last Name" name="passwd" required />

              <label><b>Password</b></label>
              <input className="form-control" id="password" type="password" placeholder="Enter Password" name="passwd" required />

              <label><b>Confirm Password</b></label>
              <input className="form-control" id="confirmPassword" type="password" placeholder="Confirm Password" name="passwd" required />
              <div className="form-padding-top">
                <button className="btn btn-primary" type="submit">Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
    }
  }
}

Signup.defaultProps={
  signup: false,
  wrongUsername: false,
  wrongPassword: false
};