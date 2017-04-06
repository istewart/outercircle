import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <div id="navbar">
        <a href="/">
          <div id="logo"></div>
        </a>
        <input id="search" 
          className="form-control" 
          type="text" 
          placeholder="Search"
        />
        <a href="/">
          <div id="menu"></div>
        </a>
      </div>
    );
  },
});
