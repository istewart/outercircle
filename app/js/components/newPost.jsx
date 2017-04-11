import React from 'react';

export default class NewPost extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="newPost well well-sm center-block">
        <textarea className="form-control" id="newPost" placeholder="Enter a status" rows="3"></textarea>
        <button type="submit" className="btn btn-primary">Post</button>
      </div>
    );
  }
}
