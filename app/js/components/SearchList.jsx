import React from 'react';

export default class SearchList extends React.Component {
    render(){
        return (
            <div className="search-list">
            <ul>
                {
                    this.props.items.map(function(item) {
                        return <a href={'charity'}><li key={item}>{item}</li></a>
                        {/*return <a href={'charity/'+item}><li key={item}>{item}</li></a>*/} //use this when to specific page
                    })
                }
            </ul>
            </div>
        )
    }
}