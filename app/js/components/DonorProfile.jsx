import React from 'react';

import ImageHeader from './ImageHeader.jsx';

export default class DonorProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.fetchData = this.fetchData.bind(this);
        this.fetchData();
    }

    fetchData() {
        $.get('/donor/' + this.props.donor, function(data, status) {
          if (status === 'success') {
            // we succesfully retrieved some data so update state
            this.setState({
                name: data.name,
                description: data.description,
                profile_image: data.profile_image,
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
                <ImageHeader/>
                <div className="row donor-header">
                    <img src={window.location.origin + "/" + this.state.profile_image} alt="TODO's Profile Picture" className="img-thumbnail"/>
                    <div className="donorInfo panel panel-default">
                        <div className="donorIntroduction panel-body">
                            <h2>{this.state.name}</h2>
                            <p>{this.state.description}</p>
                        </div>
                        <div className="donorToolbar">
                            <span className="glyphicon glyphicon-user"></span>
                            <span> 350 connections </span>
                            <span><a href="#">view</a></span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
