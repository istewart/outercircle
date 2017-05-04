import React from 'react';
import { Link } from 'react-router-dom';

export default class SearchList extends React.Component {
    render(){
        return (
            <div className="search-list">
            <ul>
                {
                    this.props.items.map(function(item) {
                        if(item.category === 'C') {
                            return <Link to={'/charity/' + item.id}><li key={item}>{item.name}</li></Link>
                        }
                        else if(item.category === 'D') {
                            return <Link to={'/donor/' + item.id}><li key={item}>{item.name}</li></Link>
                        }

                        {/*return <a href={'charity/'+item}><li key={item}>{item}</li></a>*/} //use this when to specific page
                    })
                }
            </ul>
            </div>
        )
    }
}