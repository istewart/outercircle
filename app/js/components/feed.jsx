import React from 'react';

import NewPost from './newPost.jsx';
import Post from './post.jsx';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: this.props.posts
    };
  }

  handlePost() { // TODO: security, xss, rendering
    const data = {
      donor: 123,
      charity: 123,
      body: $('#newPost').val()
    };

    $.post('/post', data, function(response) {
      $('#newPost').val('');
    });
  }

  render() {
    const renderedPosts = this.state.posts.map((post) =>
      <Post data={post}/>
    );

    return (
      <div>
        <NewPost handlePost={this.handlePost}/>
        {renderedPosts}
      </div>
    );
  }
}

Feed.defaultProps = {
    posts: [
        {
            name: 'Ian Stewart',
            body: 'TODO',
            user: 'some id',
            time: new Date().getTime(),
        },
        {
            name: 'Not Ian Stewart',
            body: 'Hello, World!',
            user: 'some other id',
            time: new Date().getTime(),
        },
    ],
};