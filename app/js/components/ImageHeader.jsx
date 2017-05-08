import React from 'react';

export default class ImageHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="center-block headerIMGContainer">
      	<img 
          src={window.location.origin + "/" + this.props.cover_image}
          className="headerIMG" 
          alt={this.props.name + "'s Cover Photo"}
        />
      </div>
    );
  }
}
