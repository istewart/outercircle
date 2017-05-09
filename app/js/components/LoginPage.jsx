import React from 'react';

import Home from './Home.jsx';
import { Redirect } from 'react-router-dom';

var genHash = require('sha256');

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgsrc : this.props.imgsrc,
      loggedIn: this.props.loggedIn,
      loginFailed: this.props.loginFailed
    };
  }
  _handleLogin(event) {
    event.preventDefault();

      const data = {
        username: $('#username').val(),
        password: genHash($('#password').val())
      };
      
      $.post('/login', data, function(result, status) {
        console.log(status);
        if (result.isAuth == "authorized") {
          this.setState({loggedIn: true});
        }
      }.bind(this)).fail(function(){
        this.setState({loginFailed: true});
      }.bind(this));
  }
  
  render() {
    var alert = "";
    if (this.state.loginFailed) {
      alert = <div className='alert alert-danger'><strong>Error</strong> Username or password incorrect</div>;
    }
    if (this.state.loggedIn) {
      return (<Redirect to="/"/>);
    }
    else {
      return (
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <form onSubmit={this._handleLogin.bind(this)}>
              <div className="imgcontainer">
                <img src={window.location.origin + "/" + this.state.imgsrc} alt="Avatar" className="avatar" />
              </div>
              {alert}
              <div className="form-group">
                <label htmlFor="username">Email:</label>
                <input 
                  className="form-control"
                  id="username"
                  type="email"
                  placeholder="Username"
                  name="uname"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="passwd"
                  required
                />
              </div>
              <div className="form-group space-between">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
                <div className="checkbox">
                  <label>
                    <input type="checkbox" defaultChecked={false}/>
                    Remember Me
                  </label>
                </div>
              </div>
              <div className="form-group space-between">
                <p>
                  Forgot <a href="#">password</a>?
                </p>
                <p>
                  Or <a 
                    href={window.location.origin + "/signup"}
                    className="btn btn-primary"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          </div>    
        </div>
      );
    }
  }
}

LoginPage.defaultProps={
  imgsrc:'img_avatar2.png',
  loggedIn: false,
  loginFailed: false
};
