import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <div className="post well well-sm">
        <p>{this.props.data.name}</p>
        <p>{this.props.data.body}</p>
      </div>
    );
  },
});
