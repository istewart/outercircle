import React from 'react';

export default class SearchList extends React.Component {
    render(){
        return (
            <div className="search-list">
            <ul>
                {
                    this.props.items.map(function(item) {
                        if(item.category === 'C') {
                            return <a href={'http://localhost:8080/charity'}><li key={item}>{item.name}</li></a>
                        }
                        else if(item.category === 'D') {
                            return <a href={'http://localhost:8080/donor'}><li key={item}>{item.name}</li></a>
                        }

                        {/*return <a href={'charity/'+item}><li key={item}>{item}</li></a>*/} //use this when to specific page
                    })
                }
            </ul>
            </div>
        )
    }
}