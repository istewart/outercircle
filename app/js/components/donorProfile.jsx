import React from 'react';
import IMGheader from './IMGheader.jsx';

export default class DonorProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgsrc : this.props.imgsrc
        };
    }

    render() {
        return (
            <div>
                <IMGheader/>
                <div className="rows">
                    <div className="donorProfile col-lg-2 col-lg-offset-2 col-md-offset-1">
                        <img src={window.location.origin + "/" + this.state.imgsrc} alt="Image Not Found" className="img-thumbnail"/>
                    </div>
                    <div className="donorInfo panel panel-default col-lg-4">
                        <div className="donorIntroduction panel-body">
                            <h2>I am a donor</h2>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a dui dignissim, rutrum felis ac, congue erat.
                            Mauris volutpat ut nibh ut dictum. Curabitur vulputate facilisis nulla sed sodales. Maecenas mollis a est vel fringilla.
                            Fusce tristique risus id ante rutrum, in suscipit nulla venenatis.
                            </p>
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

DonorProfile.defaultProps = {
    imgsrc : 'test2.png'
};
