import React from 'react';
import Similar from './Similar.jsx';

const MAX_SUGGESTIONS = 3;

export default class SuggestCharity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions:[],
        };
        this.fetchSuggestCharity();
    }

    fetchSuggestCharity() {
        const suggest = this;

        $.get('/suggestCharity', {id:suggest.props.id}, function (data, status) {
            if (status === 'success') {
                suggest.setState({suggestions: data.slice(0, MAX_SUGGESTIONS)});
            } else {
                // todo error handling
            }
        });
    }

    render() {
        const renderedSuggestions = this.state.suggestions.map((suggestion) =>
            <li className="list-group-item" key={suggestion.id}>
                <Similar data={suggestion} type="charity"/>
            </li>
        );

        return (
            <div>
                <header className="component-header">People also views</header>
                <ul className="list-group suggest-list shadow-box">
                    {renderedSuggestions}
                </ul>
            </div>
        )
    }
}

SuggestCharity.defaultProps = {
    charity : 0,
};
