import React from 'react';
import Similar from './Similar.jsx';

export default class SuggestDonor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions:[],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.fetchSuggestDonor(nextProps.user);
  }

  fetchSuggestDonor(user) {
    $.get('/suggestDonor', {user: user}, function (data, status) {
      if (status === 'success') {
        this.setState({suggestions: data});
      } else {
        // todo error handling
      }
    }.bind(this));
  }

  render() {
    const suggest = this;

    const renderedSuggestions = this.state.suggestions.map((suggestion) =>
      <li className="list-group-item" key={suggestion.id}>
        <Similar data={suggestion} type="donor" user={suggest.props.user}/>
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
