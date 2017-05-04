import React from 'react';

import Navbar from './Navbar.jsx';
import SearchItem from './SearchItem.jsx';


export default class SearchPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            res:[],
            keyWord: this.props.match.params.keyWord
        };
        // console.log(this.state.keyWord);
        this.search(this.state.keyWord);
    }

    search(keyWord) {
        const search = this;
        // console.log(keyWord);
        $.get('/searchData', {keyWord: keyWord}, function(data, status) {
            if (status === 'success') {
                // var nameList = [];  // nameList contains name of all charities and donors
                // for(var i = 0; i < data.length; i++) {
                //     nameList[i].name = data[i].name;
                //     nameList[i].id = data[i].id;
                // }
                console.log("data here")
                 console.log(data[0]);
                search.setState({res: data});
            } else {
                // error handling
            }
        });
    }

    render(){
        const renderedSearch = this.state.res.map((item) =>
            <SearchItem data={item}/>
        );

        return (
            <div>
                <Navbar/>
                <div id="main" className="center-block col-md-9">
                    <div className="row">
                        <div className="well search-container center-block">
                            {renderedSearch}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
