import React from 'react';
import Post from './post.jsx';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }
  render() {
    const renderedPosts = this.state.posts.map((post) =>
      <Post data={post}/>
    );

    return (
      <div id="main" className="center-block col-md-6">
        {renderedPosts}
      </div>
    );
  }
}
