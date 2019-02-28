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
      url:config.apiGateway+'/profile_services/get_history_and_mood',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer '+ sessionStorage.getItem('jwt')
    }

  })
  .then((response)=>
  {
      console.log("History fetched!!", response.data)
    if(response.status === 200)
    {
      var userHistoryTracks = response.data.data[0].history;
      this.setState({arrayOfHistory: userHistoryTracks})
      this.setState({isHistoryVisible: true})
      console.log("arraaay:",this.state.arrayOfHistory)
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
      url: config.apiGateway+'/profile_services/get_personal_details',
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
      console.log(this.state.userName);
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
      <div className="container-fluid">
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
                    borderRadius: '5px'
                                    
                  }} className={classes.paper}>

                <Typography variant="h6" id="modal-title">
                <h4 style={{background: '#303952', width: "100%", padding: "10px", color: '#fff'}}>User Profile</h4>
                {this.state.userName} <br />
                {this.state.userEmail}<br />                

                </Typography>

                <Typography variant="subtitle1" id="simple-modal-description">
                
                <h4 style={{background: '#574b90', width: "100%", padding: "10px", color: '#fff'}}>History</h4>
                

                 
                  {
                  this.state.arrayOfHistory.map((el,i) => (
                    <Card key={i} style={{marginBottom: 18, width: 150, height: 150, marginRight: 18, display: 'inline-block', paddingTop: '10px', fontColor: 'black'}}>
                    <CardMedia image = {el.album.images[0].url} style= {{width: 150, height: "inherit", cursor: "pointer", opacity: '0.75',
                    background: "linear-gradient( rgba(0, 0, 0, 0), rgba(42, 42, 42, 0.61), '#0000007a'"}}>

                    <div name="songDetailsRec" style={{height:'inherit'}}>
                    <div name="titleSongRec"
                    style= {{textAlign: "center", verticalAlign: "middle", lineHeight: "140px", height:'inherit', fontWeight: "bold", fontSize: 25}}>
                    {el.name}
                    </div>
                    </div>

                    </CardMedia>
                    </Card>))
                  }











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
