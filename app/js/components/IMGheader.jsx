import React from 'react';

export default React.createClass({
getInitialState: function() {
    return {
      imgsrc : 'test.jpg'
      };
  },

  render: function() {
    return (
      <div className="center-block headerIMGContainer">
      	<img src={this.state.imgsrc} className="headerIMG" />
      </div>
    );
  },
});
