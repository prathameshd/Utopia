import React, { Component } from 'react';
import axios from 'axios';
import {ToastContainer, ToastStore} from 'react-toasts'
var config = require('../../config');
class Register extends Component {
  constructor(){

    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();

    const newUser = {
      firstName: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.password2
    };

    return axios
    ({
      method:'post',
      url: config.authHost+'/register',
      headers: {'Access-Control-Allow-Origin': '*'},
      data: newUser

    })
    .then((response)=>{
      console.log(response)
      if(response.status == 200)
      {
        ToastStore.success("Congrats! Your account has been created!");
        window.location = 'http://localhost:3000';

      }
    }).catch(err =>
      {
        console.log("Error registering...!", err)

        return([])
      })

    }

    render(){
      return(
        <div className="register" style={{paddingBottom:100}}>
        <div className="container">
        <div className="row">
        <div className="col-md-8 m-auto">
        <h1 className="display-4 text-center auth">Sign Up</h1>
        <p className="lead text-center auth" >Create your Utopia account</p>
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
        <input type="text" className="form-control form-control-lg" placeholder="Name" name="name" value={this.state.name} onChange={this.onChange} required />
        </div>
        <div className="form-group">
        <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />

        </div>
        <div className="form-group">
        <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/>
        </div>
        <div className="form-group">
        <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={this.onChange}/>
        </div>
        <input type="submit"  className="btn btn-info btn-block mt-4" />
        </form>
        </div>
        </div>
        </div>
        <ToastContainer position={ToastContainer.POSITION.BOTTOM_RIGHT} store={ToastStore}/>
        </div>
      );
    }
  }

  export default Register;
