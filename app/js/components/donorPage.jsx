import Feed from './feed.jsx';
import Navbar from './navbar.jsx';
import DonorProfile from './donorProfile.jsx';
import Stats from './stats.jsx';
import React from 'react';

export default class DonorPage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
    <div>
      <Navbar/>
      <DonorProfile/>
      <Feed/>
      <Stats/>
    </div>
    );
  }
}