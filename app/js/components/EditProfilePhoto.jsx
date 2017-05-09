import React from 'react';

export default class EditCoverPhoto extends React.Component {
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
		this.setState({editing : false});
		event.stopPropagation();
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
					<form method="post" action="/uploadProfile" className="modal-content animate" encType="multipart/form-data" onSubmit={this._submit.bind(this)}>
					    <div className="form-group form-padding">
						    <div className="modal-body form-group form-padding">
								<label className="control-label">Upload New Profile Photo</label>
								<input className="file" name="imagefile" type="file" />
							</div>

						    <div className="form-padding-top form-padding-negative space-between">
						    	<button className="btn btn-primary" onClick={this._close.bind(this)}>Cancel</button>

								<button className="btn btn-primary" type="submit">Save Info</button>
						    </div>
					    </div>
				  	</form>
				</div>
			</div>
		);
	}
}