import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import { GoogleLogout } from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Header extends Component {
  render() {
    if (!this.props.signOut) {
      throw new Error("Header: signOut is null.");
    }

    return (
      <header className="grid-x grid-padding-x">
        <h3 className="small-4">
          <Link to="/" className="Header-title" >Mathing</Link>

        </h3>
        <div className="small-8 text-right">
          {this.props.userID ?
            <div>
              {/*
              {this.props.firstName ?
              <span className="show-for-large-up Header-greeting">Welcome, {this.props.firstName}. </span>
              : "" }
              */}

              <Link to="/"><FontAwesomeIcon className="Header-homeicon" icon="home" /></Link>

              {this.props.imageURL ? 
              <img className="Header-user-icon" alt={`User: ${this.props.firstName}`} src={this.props.imageURL} />
              : ""}

              <GoogleLogout
                className="button small"
                buttonText="Sign Out"
                onLogoutSuccess={this.props.signOut}
              />
            </div> : ""}
        </div>
      </header>);
  }
}

export default Header;