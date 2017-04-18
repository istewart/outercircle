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
      <div className="new-post well well-sm">
        <form onSubmit={this.handlePost}>
          <div className="form-group">
            <textarea 
              className="form-control" 
              id="newPost" 
              placeholder="Enter a status" 
              rows="3">
            </textarea>
          </div>
          <div className="form-group post-button-container">
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    );
  }
}
