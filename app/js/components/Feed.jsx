import React from 'react';

import NewPost from './NewPost.jsx';
import Post from './Post.jsx';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
    this.fetchPosts();

    this.handlePost = this.handlePost.bind(this);
  }

  fetchPosts() {
    const feed = this;

    $.get('/posts', function(data, status) {
      if (status === 'success') {
        // we succesfully retrieved some posts so update state
        feed.setState({posts: data});
      } else {
        // todo error handling
      }
    });
  }

  handlePost() { // TODO: security, xss, rendering, errors
    const data = {
      donor: this.props.donor,
      charity: 1,
      body: $('#newPost').val()
    };

    const feed = this;

    $.post('/post', data, function(data, status) {
      $('#newPost').val('');
      feed.setState({
        posts: [data].concat(feed.state.posts),
      });
    });
  }

  render() {
    const renderedPosts = this.state.posts.map((post) =>
      <Post data={post} key={post.id}/>
    );

    return (
      <div>
        <NewPost handlePost={this.handlePost}/>
        {renderedPosts}
      </div>
    );
  }
}
