import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import signIn from '../api/signIn';
import global from './global';
import saveToken from '../api/saveToken';
import register from '../api/register';
import initData from '../api/initData';

export default class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userID: '',
      name: 'abc',
      email: 'abc',
      picture: 'abc',
      password: 'abc',
      rePassword: 'abc'
    }
  }
  componentClicked(){
    console.log("clicked");
    this.props.onUserSignIn();
  }
  onSignIn(response){
    signIn(response.email, '123abc')
    .then(res => {
      console.log('res ne', res);
      global.onSignIn(res.user);
      saveToken(res.token);
   })
   .catch(err => {
    console.log('loi dang nhap nhe em',err);
    register(response.email, response.name, '123abc')
    .then(ress => {
      console.log('ket qua dang nhap',ress);
      if (ress === 'THANH_CONG') {
        signIn(response.email, '123abc')
        .then(response => {
          global.onSignIn(response.user);
        //  saveToken(response.token);
        })
        .catch(error => console.log('bi o day', error));
      }
    })
    .catch(errorr => console.log('loi ne', errorr));
  });


  }
  responseFacebook(response){
    console.log('fb response',response);
    // this.setState({
    //   name: response.name,
    //   email: response.name,
    //   password: '123abc',
    //   rePassword: '123abc'
    // });
    // console.log(this.state.name, this.state.email, this.state.password);
    this.onSignIn(response);
    console.log('signIn ne');

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
