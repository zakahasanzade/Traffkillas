import React, { Component } from "react";
import Logo from "../../assets/Logo.jpg";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <img src={Logo} alt="Traffkillas" className="logo"></img>
      </header>
    );
  }
}

export default Header;
