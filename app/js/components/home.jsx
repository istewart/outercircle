import Feed from './feed.jsx';
import Navbar from './navbar.jsx';
import NewPost from './newPost.jsx';
import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
    <div>
      <Navbar/>
      <NewPost/>
      <Feed/>
    </div>
    );
  }
}