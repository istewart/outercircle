import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
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
          <div id="menu"></div>
        </Link>
      </div>
    );
  }
});
