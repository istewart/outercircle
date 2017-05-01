import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false
    };
  }

  _handleSignup(event) {
      event.preventDefault();
      const data = {
        username: $('#username').val(),
        password: $('#password').val(),
        confirmPassword: $('#confirmPassword').val(),
        email: $('#email').val()
      };
      if (data.confirmPassword == data.password) {
        $.post('/signup', data, function(result, status) {
          if (result.signup == "success") {
            this.setState({signup: true});
          }
        }.bind(this));
      }
      else {
        alert('passwords did not match');
      }
  }
  
  render() {
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
            <div className="form-group form-padding">
              <label><b>Username</b></label>
              <input className="form-control" id="username" type="text" placeholder="Enter Username" name="uname" required />

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
  signup: false
};