import React from 'react';

export default class IMGheader extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="center-block row headerIMGContainer">
      	<img src={window.location.origin + "/" + this.props.imgsrc} className="headerIMG" alt="Header image"/>
      </div>
    );
  }
}

IMGheader.defaultProps={
  imgsrc:'beach.jpg'
};
