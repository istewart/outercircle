import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton.jsx';
import SearchList from './SearchList.jsx';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialItems: [
                "Apples",
                "Broccoli",
                "Chicken",
                "Duck",
                "Eggs",
                "Fish",
                "Granola",
                "Hash Browns"
            ],
            items: []
        }
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
        //this.setState({items: this.state.initialItems})
        this.setState({items: []})
    }

    render() {
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
        <LoginButton/>
      </div>
    )
    }
}
