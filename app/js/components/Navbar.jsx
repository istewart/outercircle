import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton.jsx';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="navbar">
        <Link to="/">
          <div id="logo"></div>
        </Link>
        <input id="search"
          className="form-control"
          type="text"
          placeholder="Search"
        />
        <Link to="/">
          <img src={window.location.origin + "/profile.jpg"} className="img-rounded donor-thumbnail" id="user-menu"/>
        </Link>
        <LoginButton/>
      </div>
    );
  }
}
