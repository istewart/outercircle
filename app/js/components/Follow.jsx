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
    this.checkFollow();
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
  }

  checkFollow(){
    const follow = this;
    console.log(follow.props.user);
      if(follow.props.truetext==="Followed") {
          const data= {
              user: follow.props.user,
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
              user: follow.props.user,
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
    const follow = this;
    follow.setState({isFollow: true});
    if(follow.props.truetext==="Followed"){
        const data= {
            user: follow.props.user,
            charity: follow.props.id,
        };
        $.post('/follow', data);
    } else{
        const data = {
            user: follow.props.user,
            donor: follow.props.id,
        }
        $.post('/connect', data);
    }



  }

  handleUnfollow(){
    this.setState({isFollow: false});

    const data = {
        donor: this.props.user,
        charity: this.props.charity,
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
