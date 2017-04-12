import React from 'react';
import Follow from './follow.jsx';
import IMGheader from './IMGheader.jsx'

export default class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgsrc : this.props.data.imgsrc,
      title : this.props.data.title,
      body : this.props.data.body
    };
  }

  render() {
    return (
      <div>
          <IMGheader imgsrc={this.state.imgsrc}/>
          <div className="well charity-title center-block">
            <div className="charity-header">
              <h1>{this.state.title}</h1>
              <div className="charity-buttons">
                <button id="donate" className="btn btn-success btn-margin">Donate</button>
                <Follow isFollow={false}/>
              </div>
            </div>
            <p>{this.state.body}</p>
          </div>
      </div>
    );
  }
}

Title.defaultProps = {
    data: {
        imgsrc:'beach.jpg',
        title: 'OuterCircle',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
};
