/*
===========================================================================
Copyright (C) 2020 Coreable
This file is part of Coreable's source code.
Coreables source code is free software; you can redistribute it
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
import { JWT } from "../../constants";
import Backdrop from "../Backdrop/Backdrop";
import NavbarItem from "./NarbarItem";
import "./Navbar.scss";
import logo from "./../../images/CoreableLogo.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import {
  HamburgerMenu,
  Logo,
  NavBarContainer,
  NavBarContents,
} from "./navbar-style";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
      me: props.app.data.user,
      menuItems: [
        { name: "Home", link: "home" },
        { name: "Skills", link: "skills" },
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

  capitalize = (str) => {
    if (str.length) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return "";
  };

  removeJWT = () => {
    localStorage.removeItem(JWT);
    window.location.reload(true);
  };

  render() {
    const { menuItems, menuOpen } = this.state;

    return (
      <NavBarContainer>
        <NavBarContents>
          <Logo src={logo} alt="logo" />
          <HamburgerMenu>
            <HiOutlineMenuAlt3 style={{ height: "70%", width: "70%" }} />
          </HamburgerMenu>
        </NavBarContents>
      </NavBarContainer>
      // <nav className="navBar">
      //   {this.backdropHandler()}
      //   <NavLink className="logo" to="/home">
      //     <img src={logo} />
      //   </NavLink>

      //   {this.state.me && (
      //     <>
      //       <input
      //         onClick={this.menuOpenHandler}
      //         className="menu-btn"
      //         type="checkbox"
      //         id="menu-btn"
      //         checked={menuOpen}
      //       />
      //       <label className="menu-icon" htmlFor="menu-btn">
      //         <span className="nav-icon"></span>
      //         <span className="spacer" />
      //       </label>
      //       <ul className="menu" id="menu">
      //         {menuItems.map((menuItem, idx) => {
      //           return (
      //             <NavbarItem
      //               key={idx}
      //               dest={menuItem.link}
      //               menuOpenHandler={this.menuOpenHandler}
      //             >
      //               {menuItem.name}
      //             </NavbarItem>
      //           );
      //         })}
      //       </ul>
      //     </>
      //   )}

      //   <span className="spacer" />

      //   {this.state.me && (
      //     <div className="dropdown">
      //       <Link to="" onClick={() => this.removeJWT()}>
      //         Logout
      //       </Link>
      //       <span className="dropbtn">{this.state.me.firstName}</span>
      //       <div className="dropdown-content">
      //         <Link to="/review">Account</Link>
      //         <Link to="" onClick={() => this.removeJWT()}>
      //           Logout
      //         </Link>
      //       </div>
      //     </div>
      //   )}
      // </nav>
    );
  }
}

export default Navbar;
