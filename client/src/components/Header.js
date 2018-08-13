import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import { GoogleLogout } from 'react-google-login';

class Header extends Component {
  render() {
    if (!this.props.signOut) {
      throw new Error("Header: signOut is null.");
    }

    return (
      <header className="grid-x grid-padding-x">
        <h3 className="small-6">
          <Link to="/" className="Header-title" >Mathing</Link>
        </h3>

        <div className="small-6 text-right">
          {this.props.userID ?
            <GoogleLogout
              className="button small"
              buttonText="Sign Out"
              onLogoutSuccess={this.props.signOut}
            /> : ""}
        </div>
      </header>);
  }
}

export default Header;