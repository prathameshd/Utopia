import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


var config = require('../../config');

  const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
    },
  });

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      open: false,
      userEmail: '',
      userName:'',
      arrayOfHistory: [],
      isHistoryVisible: false,


    };
    this.handleOpen=this.handleOpen.bind(this)

  }


   handleClose = () => {
    this.setState({ open: false });
 };

handleOpen() 
 {
      this.setState({ open: true });
      
  axios
  ({
    method:'get',
      url:'http://localhost:3001/getHistoryAndMood',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer '+ sessionStorage.getItem('jwt')
    }

  })
  .then((response)=>
  {

    if(response.status === 200)
    {
      console.log("user history:",response.data.data)
      var userHistoryTracks = response.data.data[0].history[0];
      this.setState({arrayOfHistory: userHistoryTracks})
      this.setState({isHistoryVisible: true})
    }
    else
    {
      console.log("could not fetch history",response)
      return([])
    }
  }).catch(err => {
    console.log("could not fetch history", err)
    if(err.status==401){
      window.location.href = "/login";
    }
    return([])
  })

  //call to get user details
    axios
  ({
    method:'get',
      url:'http://localhost:3001/getPersonalDetails',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer '+ sessionStorage.getItem('jwt')
    }

  })
  .then((response)=>
  {

    if(response.status === 200)
    {
      console.log("user details are",response.data.data[0].email)
      this.setState({
        userEmail:response.data.data[0].email,
        userName:response.data.data[0].firstName

      })
    }
    else
    {
      console.log("user details not found",response)
      return([])
    }
  }).catch(err => {
    console.log("user deatils not found", err)
    if(err.status==401){
      window.location.href = "/login";
    }
    return([])
  })


}



  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  logout(){
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("spotifyToken");
    window.location.href = "/login"
  }

  navigateProfileService(){

  }

  render(){
        const { classes } = this.props;

    return (
      <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
      <Link className="navbar-brand" to="/">Utopia</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
      <span className="navbar-toggler-icon"></span>
      </button>
      {
        sessionStorage.getItem('jwt')!=null && sessionStorage.getItem('name')!=null?

        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
        {sessionStorage.getItem('name')}
        </DropdownToggle>
        <DropdownMenu>
        <DropdownItem onClick={this.handleOpen}>My Profile</DropdownItem>
        <DropdownItem onClick={this.logout}>Logout</DropdownItem>
        </DropdownMenu>
        </Dropdown>
        :
        <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
        <Link className="nav-link" to="/register">Sign Up</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
        </li>

        </ul>
        </div>
      }
      </div>
      </nav>

                  <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.open}
              onClose={this.handleClose}
            >
              <div style={{
                    top: '10%',
                    left: '10%',
                    height:'80%',
                    width: '80%',
                    scroll:'auto',
                    
                  }} className={classes.paper}>

                <Typography variant="h6" id="modal-title">
                User Profile
                </Typography>

                <Typography variant="subtitle1" id="simple-modal-description">
                 {this.state.userName}<br />
                {this.state.userEmail}
                <h4>HISTORY</h4>
                {this.state.arrayOfHistory}

                 












                 </Typography>
                
              </div>
            </Modal>

      </div>



      
    )
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Navbar);;
