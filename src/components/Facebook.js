import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';


export default class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userID: '',
      name: '',
      email: '',
      picture: '',
      password: ''
    }
  }
  componentClicked(){
    console.log("clicked");
    this.props.onSignIn();
  }
  responseFacebook(response){
    console.log(response);
    this.setState({
      name: response.name,
      email: response.email,
      password: '123abc',
      rePassword: '123abc'
    });
    this.onSignIn();

  }
  render(){
    let fbContent;
    if (this.state.isLoggedIn){
      fbContent = null;
    }else {
      fbContent=(
        <FacebookLogin
          appId="194438774616448"
          autoLoad={true}
          size="small"
          fields="name,email,picture"
          onClick={this.componentClicked.bind(this)}
          callback={this.responseFacebook.bind(this)} />
      )
    }
    return(
      <div>{fbContent}</div>
    )

  }
}
