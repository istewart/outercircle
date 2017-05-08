import React from 'react';

import Follow from './Follow.jsx';
import ImageHeader from './ImageHeader.jsx'

export default class CharityProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.fetchData = this.fetchData.bind(this);
    this.fetchData();
    console.log(this.props.user+" "+this.props.charity)
  }

  fetchData() {
    $.get('/charity/' + this.props.charity + '/data', function(data, status) {
      if (status === 'success') {
        // we succesfully retrieved some data so update state
        this.setState({
          charity: this.props.charity,
          name: data.name,
          website: data.website,
          description: data.description,
          cover_image: data.cover_image,
        });
      } else {
        // todo error handling
      }
    }.bind(this));
  }

  render() {
    return (
      <div>
        <ImageHeader 
          name={this.state.name} 
          cover_image={this.state.cover_image}
        />
        <div className="well charity-title center-block shadow-box">
          <div className="charity-header">
            <h3>{this.state.name}</h3>
            <div className="charity-buttons">
              <a href={this.state.website}
                target="_blank" 
                id="donate" 
                className="btn btn-success btn-margin"
              >
                Donate
              </a>
                <Follow 
                  isFollow={false} 
                  truetext='Followed' 
                  falsetext='Follow'
                  id={this.props.charity}
                  user={this.props.user}
                />
            </div>
          </div>
          <p>{this.state.description}</p>
        </div>
      </div>
    );
  }
}
