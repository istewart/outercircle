import React from 'react';
import { Link } from 'react-router-dom';

export default class SearchList extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        const list = this;
        var All = "";
        // console.log(list.props.asd);
        if(list.props.asd === true) { All = <Link to={'/search/' + list.props.keyWord}><li className="allRes">{'See all results for '+list.props.keyWord}</li></Link>; }
        if(list.props.items.length !== 0) {
            return (
                <div className="search-list">
                    <ul>
                        {
                            list.props.items.map(function(item) {
                                if(item.category === 'C') {
                                    return <Link to={'/charity/' + item.id} key={item.id}><li>{item.name}</li></Link>
                                }
                                else if(item.category === 'D') {
                                    return <Link to={'/donor/' + item.id} key={item.id}><li>{item.name}</li></Link>
                                }
                            })
                        }
                        {All}
                    </ul>
                </div>
            )
        }
        else {
            return (
                <div className="search-list">
                    <ul>
                    </ul>
                </div>
            )
        }
    }
}