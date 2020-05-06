/*
===========================================================================
Copyright (C) 2020 Coreable
This file is part of Coreable's source code.
Corables source code is free software; you can redistribute it
and/or modify it under the terms of the End-user license agreement.
Coreable's source code is distributed in the hope that it will be
useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
You should have received a copy of the license along with the 
Coreable source code.
===========================================================================
*/

import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { JWT, USER_NAME, LAST_NAME } from "../../constants";
import Backdrop from "../Backdrop/Backdrop";
import NavbarItem from "./NarbarItem";
import "./Navbar.scss";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
      me: props.me,
      menuItems: [
        { name: "Home", link: "home" },
        { name: "Reviews", link: "comingsoon" },
        { name: "Skills", link: "comingsoon" },
        { name: "Goals", link: "comingsoon" },
        { name: "Account", link: "comingsoon" },
        { name: "Logout", link: "" },
      ],
    };
  }

  backdropClickHandler = () => {
    this.setState({ menuOpen: false });
  };

  menuOpenHandler = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  backdropHandler = () => {
    if (this.state.menuOpen) {
      return <Backdrop click={this.backdropClickHandler} />;
    }
  };

  capitalize(str) {
    if (str.length) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return "";
  }

  removeJWT() {
    localStorage.removeItem(JWT);
    localStorage.removeItem(USER_NAME);
    localStorage.removeItem(LAST_NAME);
    window.location.reload(true);
  }

  render() {
    const { menuItems, menuOpen } = this.state;

    return (
      <nav className="navBar">
        {this.backdropHandler()}
        <NavLink className="logo" to="/home">
          Coreable
        </NavLink>

        {(() => {
          if (this.state.me) {
            return (
              <React.Fragment>
                <input
                  onClick={this.menuOpenHandler}
                  className="menu-btn"
                  type="checkbox"
                  id="menu-btn"
                  checked={menuOpen}
                />
                <label className="menu-icon" for="menu-btn">
                  <span className="nav-icon"></span>
                  <span className="spacer" />
                </label>
                <ul className="menu" id="menu">
                  {menuItems.map((menuItem, idx) => {
                    return (
                      <NavbarItem
                        key={idx}
                        dest={menuItem.link}
                        menuOpenHandler={this.menuOpenHandler}
                      >
                        {menuItem.name}
                      </NavbarItem>
                    );
                  })}
                </ul>
              </React.Fragment>
            );
          }
        })()}
        <span className="spacer" />

        {(() => {
          if (this.state.me) {
            return (
              <div className="dropdown">
                <span className="dropbtn">{this.state.me.firstName}</span>
                <div className="dropdown-content">
                  <Link to="/review">Account</Link>
                  <Link to="" onClick={() => this.removeJWT()}>
                    Logout
                  </Link>
                </div>
              </div>
            );
          }
        })()}
      </nav>
    );
  }
}

export default Navbar;
