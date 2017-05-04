import React from 'react';

import ImageHeader from './ImageHeader.jsx';
import EditProfile from './EditProfile.jsx';


export default class DonorProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.changeItem = this.changeItem.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.fetchData();
    }

    fetchData() {
        $.get('/donor/' + this.props.donor + '/data', function(data, status) {
          if (status === 'success') {
            // we succesfully retrieved some data so update state
            this.setState({
                donor: this.props.donor,
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

    changeItem(item) {
        this.setState({
            name: item.name,
            description: item.description
        });
    }

    render() {
        if (this.state.donor == null) {
            return (
                <div>
                    <ImageHeader name={this.state.name} cover_image={this.state.cover_image}/>
                    <div className="donor-header">
                        <img 
                            src={window.location.origin + "/" + this.state.profile_image} 
                            alt={this.state.name + "'s Profile Picture"} 
                            className="img-thumbnail"
                        />
                        <div className="donor-info panel panel-default">
                            <div className="panel-body">
                                <h2>{this.state.name}</h2>
                                <p>{this.state.description}</p>
                                <p className="donor-toolbar">
                                    <span className="glyphicon glyphicon-user"></span>
                                    <span> 350 connections </span>
                                    <span><a href="#">view</a></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <ImageHeader name={this.state.name} cover_image={this.state.cover_image}/>
                    <div className="donor-header">
                        <img 
                            src={window.location.origin + "/" + this.state.profile_image} 
                            alt={this.state.name + "'s Profile Picture"} 
                            className="img-thumbnail"
                        />
                        <div className="donor-info panel panel-default">
                            <div className="panel-body">
                                <EditProfile className="pull-right" donor={this.state.donor} name={this.state.name} description={this.state.description} changeItem={this.changeItem}/>
                                <h2>{this.state.name}</h2>
                                <p>{this.state.description}</p>
                                <p className="donor-toolbar">
                                    <span className="glyphicon glyphicon-user"></span>
                                    <span> 350 connections </span>
                                    <span><a href="#">view</a></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
