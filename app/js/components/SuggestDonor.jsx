import React from 'react';
import Similar from './Similar.jsx';

const MAX_SUGGESTIONS = 3;

export default class SuggestDonor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions:[],
        };
        this.fetchSuggestDonor();
    }

    fetchSuggestDonor() {
        const suggest = this;

        $.get('/suggestDonor', {id:suggest.props.id}, function (data, status) {
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
                <Similar data={suggestion} type="donor"/>
            </li>
        );

        return (
            <div>
                <header className="component-header">People you may know</header>
                <ul className="list-group suggest-list shadow-box">
                    {renderedSuggestions}
                </ul>
            </div>
        )
    }
}

SuggestDonor.defaultProps = {
    id : 1,
};
