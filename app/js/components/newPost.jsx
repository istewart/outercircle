import React from 'react';

export default class NewPost extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="newPost well well-sm">
        <form>
          <div class="form-group">
            <textarea class="form-control" id="newPost" placeholder="Enter a status" rows="3"></textarea>
          </div>

          <button type="submit" class="btn btn-primary">Post</button>
        </form>
      </div>
    );
  }
}
