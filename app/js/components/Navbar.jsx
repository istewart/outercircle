import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import LoginButton from './LoginButton.jsx';
import SearchList from './SearchList.jsx';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            keyWord:'',
            user: this.props.user,
            loggedIn: this.props.loggedIn,
            logout: false
        }
        this._logout = this._logout.bind(this);
        // this.getData();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({user:nextProps.user,loggedIn:nextProps.loggedIn});
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

    getData(keyWord) {
        const search = this;
        // console.log(keyWord);
        $.get('/searchDataShorted', {keyWord: keyWord}, function(data, status) {
            if (status === 'success') {
                search.setState({items: data, keyWord: keyWord});
            } else {
                // error handling
            }
        });
    }

    filterList(event) {
        if(event.target.value !== "") {
            var updatedList = [];
            this.getData(event.target.value.toLowerCase());
            updatedList = this.state.items;
            // var dataList = this.state.initialItems;
            // updatedList = dataList.filter(function(item){
            //     return item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
            // });
            this.setState({items: updatedList});
        } else {
            this.setState({items: []});
        }
    }

    // componentWillMount() {
    //     this.setState({items: []});
    // }

    render() {
    var loginButton = "";
    var logoutRedirect = "";
    var showAllSearch = <SearchList items={this.state.items} keyWord={this.state.keyWord} asd={true}/>;
    if (this.state.logout) {
        logoutRedirect = <Redirect to="/login"/>;
    }
    if (!this.state.loggedIn) {
        loginButton = <Link to="/login" className="btn btn-primary">Login</Link>;
    }
    else {
        loginButton = <button className="btn btn-primary" onClick={this._logout}>Logout</button>;
    }
    if(window.location.pathname.includes('/search/')) {
        showAllSearch = <SearchList items={this.state.items} keyWord={this.state.keyWord} asd={false}/>;
    }
    return (
      <div id="navbar">
        <Link to="/">
          <div id="logo"></div>
        </Link>
        {logoutRedirect}
        <input id="search"
          className="form-control"
          type="text"
          placeholder="Search"
          onChange={this.filterList.bind(this)}
        />
        {showAllSearch}
        <Link to={"/donor/"+this.state.user}>
          <img src={window.location.origin + "/profile.jpg"} className="img-rounded donor-thumbnail" id="user-menu" alt="profile image"/>
        </Link>
        {loginButton}
      </div>
    )
    }
}

Navbar.defaultProps={
    loggedIn: false
};
