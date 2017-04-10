import React from 'react';

// import Post from './post.jsx';

export default class Stats extends React.Component{
  constructor(props) {
    super(props);
    this.state= {
      stats: ["Hi"]
    };
  }

  render() {
    // const renderedStats = this.state.stats.map((stat) =>
    //   <Stat data={post}/>
    // );

      return <div id="main" className="center-block col-md-10">
          {this.state.stats[0]}
      </div>
  }
}