import React from 'react';

// import Post from './post.jsx';

export default React.createClass({
  getInitialState: function() {
    return {
      stats: ["Hi"],
    };
  },

  render: function() {
    // const renderedStats = this.state.stats.map((stat) =>
    //   <Stat data={post}/>
    // );
  
    const renderedStats = this.state.stats[0];
    return (
      <div id="main" className="center-block col-md-10">
        {renderedStats}
      </div>
    );
  },
});