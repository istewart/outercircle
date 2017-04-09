import React from 'react';

export default class IMGheader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgsrc : 'beach.jpg'
    };
  }
  
  render() {
    return (
      <div className="center-block headerIMGContainer">
      	<img src={window.location.origin + "/" + this.state.imgsrc} className="headerIMG"/>
      </div>
    );
  }
}
