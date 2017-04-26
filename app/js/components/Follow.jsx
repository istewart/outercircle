import React from 'react';

function FollowButton(props){
  return (
    <button onClick={props.onClick} className="btn btn-info btn-margin">
      <i className="fa fa-user-plus" aria-hidden="true"></i>
      &nbsp; {props.text}
    </button>
  )
}

function UnfollowButton(props){
  return (
  <button onClick={props.onClick} className="btn btn-margin">
    <i className="fa fa-check-circle-o" aria-hidden="true"></i>
    &nbsp; {props.text}
  </button>
  )
}

export default class Follow extends React.Component {
  constructor(props) {
    super(props);
    this.checkFollow();
    this.state = {
      isFollow : this.props.isFollow,
      isLogin : this.props.isLogin
    };
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
  }

  checkFollow(){
    const  follow = this;
      $.get('/checkFollow', function(data, status) {
          if (status === 'success') {
              if(data === 'true') {
                  follow.setState({isFollow: true});
              } else {
                  follow.setState({isFollow: false});
              }
          } else {
              // todo error handling
          }
      });
  }

  handleFollow(){
    this.setState({isFollow: true});

    const data = {
      donor: 1,
      charity: 1,
    };

    $.post('/follow', data);
  }

  handleUnfollow(){
    this.setState({isFollow: false});

    const data = {
      donor: 1,
      charity: 1,
    };

    $.post('/unfollow', data);
  }

  render() {
    const isFollow = this.state.isFollow;
    if(isFollow){
      return(
        <UnfollowButton onClick={this.handleUnfollow} text={this.props.truetext} />
      );
    } else{
      return(
        <FollowButton onClick={this.handleFollow} text={this.props.falsetext} />
      );
    }
  }
}

Follow.defaultProps = {
    // isFollow: false,
    // isLogin: false,
    truetext: 'Followed',
    falsetext: 'Follow'
};
