import React from 'react';

export default class IMGheader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgsrc : this.props.imgsrc
    };
  }
  
  render() {
    return (
      <div className="center-block row headerIMGContainer">
      	<img src={window.location.origin + "/" + this.state.imgsrc} className="headerIMG"/>
      </div>
    );
  }
}

IMGheader.defaultProps={
  imgsrc:'beach.jpg'
};
