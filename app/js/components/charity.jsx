import React from 'react';
import Navbar from './navbar.jsx';
import Title from './Title.jsx';
import Feed from './feed.jsx';
import Stats from './stats.jsx';

export default class Charity extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title : this.props.title,
      posts: this.props.posts,
      headerImg: this.props.headerImg
    };
  }

  render(){
    return (
    <div>
      <Navbar/>
      <div id="main" className="center-block col-md-9">
        <div className="row">
          <Title data={this.state.title}/>
        </div>
        <div className="row">
          <div className="col-md-5 col-sm-5 col-sm-push-7">
            <Stats/>
          </div>
          <div className="col-md-7 col-sm-7 col-sm-pull-5">
            <Feed/>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
