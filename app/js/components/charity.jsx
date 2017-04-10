import React from 'react';
import Navbar from './navbar.jsx';
import IMGheader from './IMGheader.jsx';
import Title from './Title.jsx';
import Feed from './feed.jsx';

export default class Charity extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title : this.props.title,
      posts: this.props.posts,
      header: this.props.headerImgsrc
    };
  }

  render(){
    return (
    <div>
      <Navbar/>
      <IMGheader/>
      <Title/>
      <Feed/>
    </div>
    )
  }
}
