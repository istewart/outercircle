import React from 'react';
import { Link } from 'react-router-dom';

export default class SearchItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.data.category === 'D') {
            return (
                <div className="well well-sm">
                    <div className="post-header">
                        <Link to={'/donor/' + this.props.data.id}>
                            <img
                                src={window.location.origin + "/" + this.props.data.profile}
                                className="img-rounded donor-thumbnail" alt="profile image"
                            />
                        </Link>
                        <div className="post-title">
                            <Link to={'/donor/' + this.props.data.id}>
                                <p>{this.props.data.name}</p>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="well well-sm">
                    <div className="post-header">
                        <Link to={'/donor/' + this.props.data.id}>
                            <img
                                src={window.location.origin + "/" + this.props.data.profile}
                                className="img-rounded donor-thumbnail" alt="profile image"
                            />
                        </Link>
                        <div className="post-title">
                            <Link to={'/charity/' + this.props.data.id}>
                                <p>{this.props.data.name}</p>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
