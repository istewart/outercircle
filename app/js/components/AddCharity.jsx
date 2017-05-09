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
        category: $('#category').val(),
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
    } else if (this.state.added === 'failure') {
      alert = <div className='alert alert-danger'><strong>Failure</strong> An error has occurred</div>;
    }

    if (this.state.unauthorized) {
      return (<Redirect to="/login"/>);
    } else {
      return(
        <div>
          {alert}
          <form onSubmit={this._handleSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="name">Charity Name:</label>
              <input className="form-control" id="name" type="text" placeholder="Enter Charity Name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="category">Charity Category:</label>
              <input className="form-control" id="category" type="text" placeholder="Enter Charity Category" name="category" required />
            </div>
            <div className="form-group">
              <label htmlFor="website">Charity Website:</label>
              <input className="form-control" id="website" type="text" placeholder="Enter Charity Website" name="website" required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Charity Description:</label>
              <textarea className="form-control" id="description" placeholder="Enter Description" name="decsription" rows="5"></textarea>
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit">Add Charity</button>
            </div>
          </form>
        </div>
      );
    }
  }
}

AddCharity.defaultProps = {
  unauthorized: false,
  added: 'none'
}