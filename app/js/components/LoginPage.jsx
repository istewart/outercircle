import React from 'react';

import Home from './Home.jsx';
import { Redirect } from 'react-router-dom';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgsrc : this.props.imgsrc,
      loggedIn: this.props.loggedIn
    };
  }
  _handleLogin(event) {
    event.preventDefault();

      const data = {
        username: $('#username').val(),
        password: $('#password').val()
      };
      
      $.post('/login', data, function(result, status) {
        if (result.isAuth == "authorized") {
          this.setState({loggedIn: true});
        }
      }.bind(this));
  }
  
  render() {
    if (this.state.loggedIn) {
      return (<Redirect to="/"/>);
    }
    else {
      return (
        <div>
          <form onSubmit={this._handleLogin.bind(this)}>
          <div className="imgcontainer">
            <img src={window.location.origin + "/" + this.state.imgsrc} alt="Avatar" className="avatar" />
          </div>

          <div className="form-group form-padding">
            <label><b>Username</b></label>
            <input className="form-control" id="username" type="text" placeholder="Enter Username" name="uname" required />

            <label><b>Password</b></label>
            <input className="form-control" id="password" type="password" placeholder="Enter Password" name="passwd" required />
            <div className="form-padding-top">
              <button className="btn btn-primary" type="submit">Login</button>
              <span className="checkbox-right"><input type="checkbox" defaultChecked={false} /> Remember me</span>
            </div>

            <div className="form-padding-top form-padding-negative">
              <span className="psw">Forgot <a href="#">password?</a></span>
            </div>
          </div>
        </form>
        </div>
      );
    }
  }
}

LoginPage.defaultProps={
  imgsrc:'img_avatar2.png',
  loggedIn: false
};
