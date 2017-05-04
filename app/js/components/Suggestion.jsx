import React from 'react';
import Similar from './Similar.jsx';

const MAX_SUGGESTIONS = 3;

export default class Suggestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions:[],
        };
        this.fetchSuggest();
    }

    fetchSuggest() {
        const suggest = this;

        let dat={
            id: suggest.props.id,
            type: suggest.props.type
        };
        $.get('/suggest', dat, function (data, status) {
            if (status === 'success') {
                suggest.setState({suggestions: data.slice(0, MAX_SUGGESTIONS)});
            } else {
                // todo error handling
            }
        });
    }

    render() {
        const t = this.props.type;
        const renderedSuggestions = this.state.suggestions.map((suggestion) =>
            <li className="list-group-item">
                <Similar data={suggestion} type={t}/>
            </li>
        );

        let title="";
        if(this.props.type === "charity") {
            title = 'People also views';
        }
        else{
            title = 'People you may know';
        }
        return (
            <div>
                <header className="component-header">{title}</header>
                <ul className="list-group suggest-list">
                    {renderedSuggestions}
                </ul>
            </div>
        )
    }
}

Suggestion.defaultProps = {
    id : 1,
    type : "charity"
};
