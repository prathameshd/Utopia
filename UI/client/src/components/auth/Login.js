import React, { Component } from 'react';
import axios from 'axios';
import {ToastContainer, ToastStore} from 'react-toasts'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
var config = require('../../config');

class Login extends Component {

  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
      jwt: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.callLogin = this.callLogin.bind(this);
    this.authorizeSpotify = this.authorizeSpotify.bind(this);

  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };
  }

  // Calls the login backend and gets JWT
  // If successful, calls the Spotify Broker API next
  callLogin(){

    const loginData = {
      email: this.state.email,
      password: this.state.password
    }


    return axios
    ({
      method:'post',
      url:config.apiGateway+'/auth/login',
      headers: {'Access-Control-Allow-Origin': '*'},
      data: loginData

    })
    .then((response)=>{
      console.log(response)
      if(response.status == 200)
      {
        sessionStorage.setItem("jwt", response.data.token);
        sessionStorage.setItem("name", response.data.first_name);
        this.setState({jwt:response.data.token}, this.authorizeSpotify);   // sets jwt to state & calls next fn
        ToastStore.success("Logging In to Utopia");

      }
    }).catch(err =>
      {
        console.log("Error logging in...!", err)
          ToastStore.error("Incorrect Credentials. Please Enter Valid Email and Password");

        return([])
      })
    }

    authorizeSpotify(){
      console.log("Trying to reach Spotify broker......")

      return axios
      ({
        method:'get',
        url:config.apiGateway+'/api_broker/get_auth',
        headers: {'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer '+ this.state.jwt
      }
    })
    .then((response)=>{
      if(response.status == 200)
      {
        console.log(response)


		//updating redirectURL

		console.log("updated redirect URL",response.data.data);
        window.location.href = response.data.data;
      }
      else
      {
        console.log("/getAuth status was 500!!! Ooops!")
        return([])
      }
    }).catch(err =>
      {
        console.log("Failed to authorize with spotify /getAuth ", err)
        return([])
      })
    }



    tryToLogin = (res) =>{
    console.log("TRY TO ",res)
    axios({
      method:'post',
      url:config.apiGateway+'/auth/checkUser',
      data:{'email':res["email"], 'firstName': res["name"] },
      headers: {'Access-Control-Allow-Origin': '*'}
    })
    .then( (response) => {
     console.log('login successful')

      sessionStorage.setItem("jwt", response.data.token);
        sessionStorage.setItem("name", response.data.first_name);
        this.setState({jwt:response.data.token}, this.authorizeSpotify);   // sets jwt to state & calls next fn
        ToastStore.success("Logging In to Utopia");

      //this.setState({loginSuccess: true});
    }).catch((error)=>{
     // this.setState({promptRole: true});
    })
  }

  responseFacebook = (response) => {
    if(response){
       sessionStorage.setItem('jwt',response['accessToken'])
      sessionStorage.setItem('name', response['name'])
      console.log(response)
      this.tryToLogin(response)
       //this.setState({firstName: response.name, newEmail:response.email, fbAccessToken: response.accessToken},
       //()=>{      this.tryToLogin(response);
       //});
    }
  }


  tryToGoogleLogin = (res) =>{
  console.log("TRY TO ",res)
  axios({
    method:'post',
    url:config.apiGateway+'/auth/checkUser',
    data:{'email':res["w3"]["U3"], 'firstName': res["w3"]["ig"] },
    headers: {'Access-Control-Allow-Origin': '*'}
  })
  .then( (response) => {
   console.log('login successful')

    sessionStorage.setItem("jwt", response.data.token);
      sessionStorage.setItem("name", res['w3']['ig']);
      this.setState({jwt:response.data.token}, this.authorizeSpotify);   // sets jwt to state & calls next fn
      ToastStore.success("Logging In to Utopia");

    //this.setState({loginSuccess: true});
  }).catch((error)=>{
   // this.setState({promptRole: true});
  })
}

  responseGoogle = (response) => {
    console.log(response);
    if(response){
       sessionStorage.setItem('jwt',response['accessToken'])
      sessionStorage.setItem('name', response['w3']['ig'])
      console.log(response)
      this.tryToGoogleLogin(response)
       //this.setState({firstName: response.name, newEmail:response.email, fbAccessToken: response.accessToken},
       //()=>{      this.tryToLogin(response);
       //});
    }
  }


  /*
  <FacebookLogin
    appId="867682386905565"
    autoLoad={false}
    fields="name,email,picture"
    callback={(response)=>this.responseFacebook(response)} />
  */



    render(){
      return(
        <div className="login" style={{paddingBottom:200}}>
        <div className="container">
        <div className="row">
        <div className="col-md-8 m-auto">
        <h1 className="display-4 text-center auth">Log In</h1>
        <p className="lead text-center auth">Sign in to your Utopia account</p>
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
        <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
        </div>
        <div className="form-group">
        <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
        </div>
        <input type="submit" onClick={this.callLogin} className="btn btn-info btn-block mt-4" />
        <div style={{marginTop:16, alignCenter: 'center'}} className="text-center">
          <GoogleLogin
            clientId="722327594409-hh0pobkmlnqqpnrm9m8nrni7fsfhrcqm.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
        </form>
        </div>
        </div>
        </div>
        <ToastContainer position={ToastContainer.POSITION.BOTTOM_RIGHT} store={ToastStore}/>
        </div>
      );
    }
  }

  export default Login;
