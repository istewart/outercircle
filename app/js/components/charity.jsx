import React from 'react';
import Navbar from './navbar.jsx';
import IMGheader from './IMGheader.jsx';
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

      <Title data={this.state.title}/>
      <Feed posts={this.state.posts}/>
      <Stats/>
    </div>
    )
  }
}
