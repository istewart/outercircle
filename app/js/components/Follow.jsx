import React from 'react';

function FollowButton(props){
  return (
    <button onClick={props.onClick} className="btn btn-info">
      <i className="fa fa-user-plus" aria-hidden="true"></i>
      &nbsp; {props.text}
    </button>
  )
}

function UnfollowButton(props){
  return (
  <button onClick={props.onClick} className="btn">
    <i className="fa fa-check-circle-o" aria-hidden="true"></i>
    &nbsp; {props.text}
  </button>
  )
}

export default class Follow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollow : this.props.isFollow,
      isLogin : this.props.isLogin,
    };
    this.checkFollow(this.props.user);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
  }

  componentWillReceiveProps(nextProps) {
        this.checkFollow(nextProps.user);
  }

  checkFollow(User){
    const follow = this;
      if(follow.props.truetext==="Followed") {
          const data= {
              user: User,
              charity: follow.props.id,
          };
          $.get('/checkFollow',data, function (data, status) {
              if (status === 'success') {
                  if (data === 'true') {
                      follow.setState({isFollow: true});
                  } else {
                      follow.setState({isFollow: false});
                  }
              } else {
                  // todo error handling
              }
          });
      } else{
          const data = {
              user: User,
              donor: follow.props.id,
          };
          // console.log("CheckFollow: "+data.user+" "+data.donor);
          $.get('/checkConnect',data, function (data, status) {
              if (status === 'success') {

                  // console.log("checkFollowResult:"+data);
                  if (data === 'true') {
                      follow.setState({isFollow: true});
                  } else {
                      follow.setState({isFollow: false});
                  }
              } else {
                  // todo error handling
              }
          });
      }
  }

  handleFollow(){
    this.setState({isFollow: true});
    if(this.props.truetext==="Followed"){
        const data= {
            user: this.props.user,
            charity: this.props.id,
        };
        $.post('/follow', data);
    } else{
        const data = {
            user: this.props.user,
            donor: this.props.id,
        }
        $.post('/connect', data);
    }

  }

  handleUnfollow(){
      this.setState({isFollow: false});
      if(this.props.truetext==="Followed"){
          const data= {
              user: this.props.user,
              charity: this.props.id,
          };
          $.post('/unfollow', data);
      } else{
          const data = {
              user: this.props.user,
              donor: this.props.id,
          }
          $.post('/unconnect', data);
      }
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
