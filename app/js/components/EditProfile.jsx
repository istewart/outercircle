import React from 'react';

export default class EditProfile extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	editProfile : false,
	    	donor: this.props.donor,
	    	name: this.props.name,
	    	description: this.props.description
	    };
  	}

  	_buttonClick(event) {
  		event.preventDefault();
		this.setState({editProfile : true});
	}
	_close(event) {
		event.preventDefault();
		this.setState({editProfile : false});
	}
	_submit(event) {
		event.preventDefault();
		this.setState({editProfile : false});

		const data = {
	      donor: this.state.donor,
	      name: $("#donorName").val(),
	      description: $("#donorDescription").val()
	    };

		this.props.changeItem(data);
        $.post('/editProfile', data);
	}

	render() {
		let style;
  		if (this.state.editProfile) {
  			style = "modal display";
  		} else {
  			style = "modal no-display";
  		}
		
		return (
			<div>
				<button id="editProfile" className="btn btn-info" onClick={this._buttonClick.bind(this)}>Edit Profile</button>
				<div className={style}>
					<form className="modal-content animate">
					    <div className="form-group form-padding">
						    <div className="modal-body form-group form-padding">
								<label className="control-label">Donor Name</label>
								<input className="form-control" id="donorName" type="text" defaultValue={this.state.name} required />
								<label className="control-label">Description</label>
								<input className="form-control" id="donorDescription" type="text" defaultValue={this.state.description} required />
							</div>

						    <div className="form-padding-top form-padding-negative space-between">
						    	<button className="btn btn-primary" onClick={this._close.bind(this)}>Cancel</button>

								<button className="btn btn-primary" type="submit" onClick={this._submit.bind(this)}>Save Info</button>
						    </div>
					    </div>
				  	</form>
				</div>
			</div>
		);
	}
}