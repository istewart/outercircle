import React from 'react';

export default class DonationHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      donations: [],
    };
    this.fetchDonations();
  }

  fetchDonations() {
    const history = this;

    $.get('/donations', function(data, status) {
      if (status === 'success') {
        // we succesfully retrieved some donations so update state
        history.setState({donations: data});
      } else {
        // todo error handling
      }
    });
  }

  render() {
    const renderedDonations = this.state.donations.map((donation) =>
      <tr>
        <td>{donation.name}</td>
        <td>{"$" + donation.amount + ".00"}</td>
        <td>{donation.category}</td>
        <td>{new Date(donation.time).toLocaleDateString()}</td>
      </tr>
    ); // TODO: this is a hack on amount

    return (
    <div>
      <header className="component-header">Donation History</header>
      <div className="well well-sm">
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
