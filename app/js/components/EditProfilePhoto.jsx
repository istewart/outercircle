import React from 'react';

export default class EditProfilePhoto extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	editing : false
	    };
  	}

  	_buttonClick(event) {
  		event.preventDefault();
		this.setState({editing : true});
	}
	_close(event) {
		event.preventDefault();
		this.setState({editing : false});
	}
	_submit(event) {

	}

	render() {
		let style;
  		if (this.state.editing) {
  			style = "modal display";
  		} else {
  			style = "modal no-display";
  		}
		
		return (
			<div>
				<button id="editCover" className="btn btn-info" onClick={this._buttonClick.bind(this)}>Edit Profile Photo</button>
				<div className={style}>
					<form className="modal-content animate" encType="multipart/form-data">
					    <div className="form-group form-padding">
						    <div className="modal-body form-group form-padding">
								<label className="control-label">Upload New Profile Photo</label>
								<input className="file" id="coverPhoto" type="file" data-show-preview="false"/>
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











