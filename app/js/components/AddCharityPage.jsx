import React from 'react';
import AddCharity from './AddCharity.jsx';
import Navbar from './Navbar.jsx';

export default class AddCharityPage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <Navbar/>
        <AddCharity/>
      </div>
    );
  }
}