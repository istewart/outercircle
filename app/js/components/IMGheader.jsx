import React from 'react';

class IMGheader extends React.Component {
  getInitialState() {
    return {
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
