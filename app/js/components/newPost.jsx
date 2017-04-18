import React from 'react';

export default class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.handlePost = this.handlePost.bind(this);
  }

  handlePost(event) {
    event.preventDefault();
    this.props.handlePost();
  }
  
  render() {
    return (
      <form className="form-inline" onSubmit={this.handlePost}>
        <div className="newPost well well-sm form-group">
          <textarea 
            className="form-control" 
            id="newPost" 
            placeholder="Enter a status" 
            rows="3">
          </textarea>
          <button 
            type="submit" 
            className="btn btn-primary"
          >
            Post
          </button>
        </div>
      </form>
    );
  }
}
