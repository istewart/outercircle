import React from 'react';

export default class AddDonation extends React.Component {
  constructor(props) {
    super(props);
    this.Submit = this.Submit.bind(this);
  }

  Submit(event){
      event.preventDefault();
      this.props.handleSubmit();
  }
  
  render(){
    return (
      <div className="well well-sm shadow-box">
        <form onSubmit={this.Submit}>
          <div className="form-group">
            <label htmlFor="name">Charity Name:</label>
            <input type="text" className="form-control" id="name"/>
          </div>
          <div className="form-group">
            <label htmlFor="public">Privacy:</label>
            <select id="public" className="form-control">
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <div className="input-group">
              <div className="input-group-addon">$</div>
                <input type="number" className="form-control" id="amount"/>
              <div className="input-group-addon">.00</div>
            </div>
          </div>
          <div className="form-group form-end">
            <button 
              type="submit" 
              className="btn btn-primary full-width"
            >
              Record Donation
            </button>
          </div>
        </form>
      </div>
    );
  }
}
