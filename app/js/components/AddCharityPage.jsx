import React from 'react';
import AddCharity from './AddCharity.jsx';
import Navbar from './Navbar.jsx';

export default class AddCharityPage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div id="main">
        <Navbar/>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <AddCharity/>
          </div>
        </div>
      </div>
    );
  }
}