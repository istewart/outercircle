import React from 'react';
import Similar from './Similar.jsx';

export default class SuggestCharity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions:[],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.fetchSuggestCharity(nextProps.user);
  }

  fetchSuggestCharity(user) {
    $.get('/suggestCharity', {user: user}, function (data, status) {
      if (status === 'success') {
        this.setState({suggestions: data});
      } else {
        // todo error handling
      }
    }.bind(this));
  }

  render() {
    const renderedSuggestions = this.state.suggestions.map((suggestion) =>
      <li className="list-group-item" key={suggestion.id}>
        <Similar data={suggestion} type="charity" user={this.props.user}/>
      </li>
    );

    return (
      <div>
        <header className="component-header">Charities you might like:</header>
        <ul className="list-group suggest-list shadow-box">
          {renderedSuggestions}
        </ul>
      </div>
      );
    }
  }
