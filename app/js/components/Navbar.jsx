import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton.jsx';
import SearchList from './SearchList.jsx';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialItems: [],
            items: [],
            loggedIn: this.props.loggedIn
        }
        this.getData();
    }
    _checkLogin() {
        $.post('/loggedIn', "", function(data, status) {
            if (status === 'success' && data.isAuth === "authorized") {
                this.setState({loggedIn: true});
                console.log('logged in');
            }
            else {
                this.setState({loggedIn: false});
                console.log('not logged in');
                console.log(data);
            }
        }.bind(this))
    }

    getData() {
        const search = this;
        $.get('/searchData', function(data, status) {
            if (status === 'success') {
                var nameList = [];  // nameList contains name of all charities and donors
                for(var i = 0; i < data.length; i++) {
                    nameList[i] = data[i].name;
                }
                search.setState({initialItems: nameList});
            } else {
                // error handling
            }
        });
    }

    filterList(event) {
        if(event.target.value !== "") {
            var updatedList = [];
            var dataList = this.state.initialItems;
            updatedList = dataList.filter(function(item){
                return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
            });
            this.setState({items: updatedList});
        } else {
            this.setState({items: []});
        }
    }

    componentWillMount() {
        this._checkLogin();
        this.setState({items: []});
    }

    render() {
    var loginButton = "";
    if (!this.state.loggedIn) {
        loginButton = <Link to="/login"><button className="btn btn-primary">Login</button></Link>;
    }
    return (
      <div id="navbar">
        <Link to="/">
          <div id="logo"></div>
        </Link>
        <input id="search"
          className="form-control"
          type="text"
          placeholder="Search"
          onChange={this.filterList.bind(this)}
        />
        <SearchList items={this.state.items}/>
        <Link to="/">
          <img src={window.location.origin + "/profile.jpg"} className="img-rounded donor-thumbnail" id="user-menu"/>
        </Link>
        {loginButton}
      </div>
    )
    }
}

Navbar.defaultProps={
    loggedIn: false
};
