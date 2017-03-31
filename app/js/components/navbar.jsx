import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <div id="navbar">
        <input id="search" 
          className="form-control" 
          type="text" 
          placeholder="Search"
        />
      </div>
    );
  },
});
