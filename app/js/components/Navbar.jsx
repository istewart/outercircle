import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import LoginButton from './LoginButton.jsx';
import SearchBar from './SearchBar.jsx';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            keyWord:'',
            user: this.props.user,
            loggedIn: this.props.loggedIn,
            logout: false,
            profile_image: "default_profile.jpg"
        }
        this._logout = this._logout.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({user:nextProps.user, loggedIn:nextProps.loggedIn});
        this.fetchData(nextProps.user);
    }

    fetchData(user) {
        $.get('/donor/' + user + '/data', function(data, status) {
          if (status === 'success') {
            // we succesfully retrieved some data so update state
            this.setState({profile_image: data.profile_image});
          } else {
            console.log("error fetching profile image")
          }
        }.bind(this));
    }

    _logout() {
        const navbar = this;
        $.post('/logout', "", function(data, status) {
            if (status === 'success') {
                console.log('logged out');
                navbar.setState({loggedIn: false, logout: true, userId:0});
            }
        })
    }

    render() {
        var loginButton = "";
        var logoutRedirect = "";
        if (this.state.logout) {
            logoutRedirect = <Redirect to="/login"/>;
        }
        if (!this.state.loggedIn) {
            loginButton = <Link to="/login" className="btn btn-primary">Login</Link>;
        }
        else {
            loginButton = <button className="btn btn-primary" onClick={this._logout}>Logout</button>;
        }

        return (
          <div id="navbar">
            <Link to="/">
                <img src={window.location.origin + "/logo_green.png"} className="img-rounded profile-thumbnail"/>
            </Link>
            {logoutRedirect}
            <SearchBar/>
            <Link to={"/donor/"+this.state.user}>
              <img src={window.location.origin + "/" + this.state.profile_image} className="img-rounded profile-thumbnail" id="user-menu" alt="profile image"/>
            </Link>
            {loginButton}
          </div>
        );
    }
}

Navbar.defaultProps={
    loggedIn: false
};
