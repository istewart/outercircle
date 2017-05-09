import React from 'react';

export default class ImageHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <img
        className="header-img-container"
        src={window.location.origin + "/" + this.props.cover_image}
        alt={this.props.name + "'s Cover Photo"}
      />
    );
  }
}
