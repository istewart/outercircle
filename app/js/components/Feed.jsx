import React from 'react';

import NewPost from './NewPost.jsx';
import Post from './Post.jsx';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };

    this.handlePost = this.handlePost.bind(this);
    this.fetchPosts(this.props.type, this.props.user);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchPosts(nextProps.type, nextProps.user);
  }

  fetchPosts(type,User) {
    const feed = this;
    if (type==="home"){
        console.log("User id: " + User);
        $.get('/homeposts', {user: User}, function(data, status) {
            if (status === 'success') {
                // we succesfully retrieved some posts so update state
                feed.setState({posts: data});
            } else {
                // todo error handling
            }
        });
    } else if (type==="donor"){
        console.log("donor: " + feed.props.donor);
        $.get('/donorposts', {donor: feed.props.donor}, function(data, status) {
            if (status === 'success') {
                // we succesfully retrieved some posts so update state
                feed.setState({posts: data});
            } else {
                // todo error handling
            }
        });
    } else {
        $.get('/charityposts', {charity: feed.props.charity}, function(data, status) {
            if (status === 'success') {
                // we succesfully retrieved some posts so update state
                feed.setState({posts: data});
            } else {
                // todo error handling
            }
        });
    }

  }

  handlePost() { // TODO: security, xss, rendering, errors
    const data = {
      donor: this.props.user,
      charity: this.props.charity,
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

Feed.defaultProps = {
   user:0,
   donor:0,
   charity: 0
}