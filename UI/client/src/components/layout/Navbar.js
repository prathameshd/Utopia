import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
var config = require('../../config');

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
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
        <DropdownItem onClick={this.navigateProfileService}>Profile Service</DropdownItem>
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
      </div>
    )
  }
}

export default Navbar;
