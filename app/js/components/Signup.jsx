import React from 'react';
import { Redirect } from 'react-router-dom';

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
        password: $('#password').val(),
        confirmPassword: $('#confirmPassword').val(),
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
      alert = <div className='alert alert-danger'><strong>Error: </strong>Username already exists.</div>;
    } else if (this.state.wrongPassword) {
      alert = <div className='alert alert-danger'><strong>Error: </strong>Passwords do not match.</div>;
    }

    if (this.state.signup) {
      return (<Redirect to="/login"/>);
    } else {
      return(
        <form onSubmit={this._handleSignup.bind(this)}>
          <h2>Welcome to OuterCircle!</h2>
          {alert}
          <div className="form-group">
            <label>Email:</label>
            <input className="form-control" id="email" type="email" placeholder="Enter Email" name="email" required />
          </div>
          <div className="form-group">  
            <label>First Name:</label>
            <input className="form-control" id="firstname" type="text" placeholder="First Name" name="passwd" required />
          </div>
          <div className="form-group">          
            <label>Last Name:</label>
            <input className="form-control" id="lastname" type="text" placeholder="Last Name" name="passwd" required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input className="form-control" id="password" type="password" placeholder="Enter Password" name="passwd" required />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input className="form-control" id="confirmPassword" type="password" placeholder="Confirm Password" name="passwd" required />
          </div>
          <div className="space-between">
            <button className="btn btn-primary" type="submit">Sign Up</button>
            <p>Have an account? Sign in <a href={window.location.origin + "/login"}> here</a>!
            </p>
          </div>
        </form>
    );
    }
  }
}

Signup.defaultProps={
  signup: false,
  wrongUsername: false,
  wrongPassword: false
};