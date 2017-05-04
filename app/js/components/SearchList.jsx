import React from 'react';
import { Link } from 'react-router-dom';

export default class SearchList extends React.Component {
    constructor(props) {
        super(props);
    }

    // handleClick(){
    //     $.post('/search', this.props.items);
    // }

    render(){
        const list = this;
        if(list.props.items.length !== 0) {
            return (
                <div className="search-list">
                    <ul>
                        {
                            list.props.items.map(function(item) {
                                if(item.category === 'C') {
                                    return <Link to={'/charity/' + item.id}><li key={item}>{item.name}</li></Link>
                                }
                                else if(item.category === 'D') {
                                    return <Link to={'/donor/' + item.id}><li key={item}>{item.name}</li></Link>
                                }
                            })
                        },
                        {
                            <Link to={'/search/' + list.props.keyWord}><li>{'more...'}</li></Link>
                        }
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