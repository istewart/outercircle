import React from 'react';

import Navbar from './Navbar.jsx';
import SearchItem from './SearchItem.jsx';


export default class SearchPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            donor: [],
            charity: [],
            keyWord: this.props.match.params.keyWord
        };
        // console.log(this.state.keyWord);
        console.log(this.props.location.pathname);
        this.search(this.state.keyWord);
    }

    search(keyWord) {
        const search = this;
        // console.log(keyWord);
        $.get('/searchData', {keyWord: keyWord}, function(data, status) {
            if (status === 'success') {
                var donor = data.filter((item) => (item.category === 'D'));
                var charity = data.filter((item) => (item.category === 'C'));
                // console.log("data here")
                //  console.log(data[0]);
                search.setState({donor: donor, charity: charity});
            } else {
                // error handling
            }
        });
    }

    render(){
        const renderedDonor = this.state.donor.map((item) =>
            <SearchItem data={item} key={item.id}/>
        );

        const renderedCharity = this.state.charity.map((item) =>
            <SearchItem data={item} key={item.id}/>
        );

        return (
            <div>
                <Navbar/>
                <div className="row">
                    <div className="search-container-all">
                        <h3>Search results for: {this.state.keyWord}</h3>
                        <br/>
                        <div className="well search-container col-lg-4 col-md-4">
                            <p>Charities</p>
                            {renderedCharity}
                        </div>
                        <div className="well search-container col-lg-4 col-md-4">
                            <p>Donors</p>
                            {renderedDonor}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
