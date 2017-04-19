import React from 'react';

export default class AddDonation extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // todo
  }
  
  render() {
    return (
      <div className="well well-sm">
        <form onSubmit={this.handlePost}>
          <div className="form-group">
            <label for="name">Charity Name:</label>
            <input type="text" className="form-control" id="name"/>
          </div>
          <div className="form-group">
            <label for="category">Category:</label>
            <select id="category" className="form-control">
              <option>Education</option>
              <option>Environment</option>
            </select>
          </div>
          <div className="form-group">
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
