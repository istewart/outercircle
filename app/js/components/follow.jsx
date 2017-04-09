import React from 'react';

function FollowButton(props){
  return (
    <button onClick={props.onClick} className="btn btn-info btn-margin">
      <i className="fa fa-user-plus" aria-hidden="true"></i>
      &nbsp; Follow
    </button>
  )
}

function UnfollowButton(props){
  return (
  <button onClick={props.onClick} className="btn btn-margin">
    <i className="fa fa-check-circle-o" aria-hidden="true"></i>
    &nbsp; Followed
  </button>
  )
}

class Follow extends React.Component {
  getDefaultProps() {
    return {
      isFollow: false,
      isLogin: false
    };
  }

  getInitialState() {
    return {
      isFollow : this.props.isFollow,
      isLogin: this.props.isLogin
    };
  }

  handleFollow(){
    this.setState({isFollow: true});
  }

  handleUnfollow(){
    this.setState({isFollow: false});
  }

  render() {
    const isFollow = this.state.isFollow;
    let button = null;
    if(isFollow){
      return(
        <UnfollowButton onClick={this.handleUnfollow} />
      );
    } else{
      return(
        <FollowButton onClick={this.handleFollow} />
      );
    }
  }
}
