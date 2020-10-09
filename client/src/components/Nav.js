import React, { Component } from "react";
import logo from "../images/logo.svg";
import "./Nav.css";
import { Link } from "react-router-dom";

class NavBar extends Component {
  /*constructor(props) {
    super(props);
  }*/
  render() {
    return (
      <div className="nav-form">
        <Link to="/">
          <img className="nav-logo" src={logo} alt="logo"></img>
        </Link>
      </div>
    );
  }
}

export default NavBar;
