import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import { GoogleLogout } from 'react-google-login';

class Header extends Component {
  render() {
    return (
      <header className="grid-x grid-padding-x">
        <h3 className="cell">
          <Link to="/" className="Header-title" >Hot Math Practice</Link>
        </h3>

        { this.props.userID ? 
        <GoogleLogout
          className="button"
          buttonText="Sign Out"
          onLogoutSuccess={this.props.signOut}
         /> : "" }
      </header>);
  }
}

export default Header;