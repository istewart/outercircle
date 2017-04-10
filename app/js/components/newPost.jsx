import React from 'react';

export default class NewPost extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="newPost well well-sm center-block">
        <form>
          <div className="form-group">
            <textarea className="form-control" id="newPost" placeholder="Enter a status" rows="3"></textarea>
          </div>

          <button type="submit" className="btn btn-primary">Post</button>
        </form>
      </div>
    );
  }
}
