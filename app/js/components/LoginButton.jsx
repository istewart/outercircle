import React from 'react';

export default class LoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgsrc : this.props.imgsrc,
      loginDisplay : this.props.loginDisplay
    };
  }
  	_buttonClick(event) {
  		event.preventDefault();
		this.setState({loginDisplay : true});
	}
	_close(event) {
		event.preventDefault();
		this.setState({loginDisplay : false});
	}
	_handleLogin(event) {
		event.preventDefault();

	    const data = {
	      username: $('#username').val(),
	      password: $('#password').val()
	    };
	    
	    $.post('/login', data, function(result, status) {
	    	console.log(result);
	    	console.log(status);
	    });

	}
  
  render() {
  	let style;
  	if (this.state.loginDisplay) {
  		style = "modal display";
  	} else {
  		style = "modal no-display";
  	}
    return (
      <div>
      	<a href="#" className="btn btn-primary" onClick={this._buttonClick.bind(this)}>Login</a>
		<div id="id01" className={style}>
		  
		  <form className="modal-content animate" onSubmit={this._handleLogin.bind(this)}>
		    <div className="imgcontainer">
		      <a href="#" onClick={this._close.bind(this)}><span className="close" title="Close">&times;</span></a>
		      <img src={window.location.origin + "/" + this.state.imgsrc} alt="Avatar" className="avatar" />
		    </div>

		    <div className="form-group form-padding">
			    <label><b>Username</b></label>
			    <input className="form-control" id="username" type="text" placeholder="Enter Username" name="uname" required />

			    <label><b>Password</b></label>
			    <input className="form-control" id="password" type="password" placeholder="Enter Password" name="passwd" required />
			    <div className="form-padding-top">
				    <button className="btn btn-primary" type="submit">Login</button>
				    <span className="checkbox-right"><input type="checkbox" defaultChecked={false} /> Remember me</span>
				</div>

			    <div className="form-padding-top form-padding-negative">
			      <a href="#" onClick={this._close.bind(this)}><button type="button" className="btn btn-danger">Cancel</button></a>
			      <span className="psw">Forgot <a href="#">password?</a></span>
			    </div>
		    </div>
		  </form>
		</div>
      </div>
    );
  }
}

LoginButton.defaultProps={
  imgsrc:'img_avatar2.png',
  loginDisplay : false
};

