import React from 'react';
import { Redirect } from 'react-router-dom';

export default class AddCharity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unauthorized: this.props.unauthorized,
      added: this.props.added
    };
  }

  _handleSubmit(event) {
      event.preventDefault();
      const data = {
        name: $('#name').val(),
        website: $('#website').val(),
        description: $('#description').val(),
      };
      $.post("/addCharity", data, function(result, status) {
        if (result.added === 'success') {
          this.setState({added: 'success'});
        }
        else {
          this.setState({added: 'failure'});
        }
      }.bind(this))
      
  }
  _checkLogin() {
    $.post('/loggedInAdmin', "", function(data, status) {
        if (status === 'success' && data.isAuth === "authorized") {
            this.setState({unauthorized: false});
            console.log('logged in');
        }
        else {
            this.setState({unauthorized: true});
            console.log('not logged in');
        }
    }.bind(this));
  }

  componentWillMount() {
    this._checkLogin();
  }
  
  render() {
    var alert = "";
    if (this.state.added === 'success') {
      alert = <div className='alert alert-success'><strong>Completed</strong> Charity has been added</div>;
    }
    else if (this.state.added === 'failure') {
      alert = <div className='alert alert-danger'><strong>Failure</strong> An error has occurred</div>;
    }
    if (this.state.unauthorized) {
      return (<Redirect to="/login"/>);
    }
    else {
      return(
      <div>
        <div className="row">
          <div className="col-md-7 col-md-offset-1 col-xs-12">
            <h1 className="signup-header">Add a Charity</h1>
          </div>
        </div>
        <div>
          <form onSubmit={this._handleSubmit.bind(this)}>
          <br/>
            {alert}
            <div className="form-group form-padding">
              <label><b>Charity Name</b></label>
              <input className="form-control" id="name" type="text" placeholder="Enter Charity Name" name="name" required />

              <label><b>Charity Website</b></label>
              <input className="form-control" id="website" type="text" placeholder="Enter Charity Website" name="website" required />

              <label><b>Charity Description</b></label>
              <textarea className="form-control" id="description" placeholder="Enter Description" name="decsription" rows="5"></textarea>

              <div className="form-padding-top">
                <button className="btn btn-primary" type="submit">Add Charity</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
    }
  }
}

AddCharity.defaultProps = {
  unauthorized: false,
  added: 'none'
}