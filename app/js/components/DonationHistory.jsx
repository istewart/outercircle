import React from 'react';

export default class DonationHistory extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      donations: [],
    };
    this.fetchDonations();
  }

    componentWillReceiveProps(nextProps) {
        if(nextProps.last!==""){
            this.setState({
                donations:[nextProps.last].concat(this.state.donations)
            });
        }
    }

  fetchDonations() {
    const history = this;

    $.get('/donations/' + this.props.donor, function(data, status) {
      if (status === 'success') {
        // we succesfully retrieved some donations so update state
        history.setState({donations: data});
      } else {
        // todo error handling
      }
    }.bind(this));
  }

  render() {
    var renderedDonations;
    if (this.state.donations.length) {
      renderedDonations = this.state.donations.map((donation) =>
        <tr key={donation.id}>
          <td>{donation.name}</td>
          <td>{"$" + donation.amount + ".00"}</td>
          <td>{donation.category}</td>
          <td>{new Date(donation.time).toLocaleDateString()}</td>
        </tr>
      ); // TODO: this is a hack on amount
    } else {
      renderedDonations = [<tr><td>Record a donation to see something here!</td></tr>];
    }

    return (
      <div>
        <header className="component-header">Donation History</header>
        <div className="well well-sm shadow-box">
          <table className="table table-striped table-hover form-end">
            <thead>
              <tr>
                <th>Charity</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {renderedDonations}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
