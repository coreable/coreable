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
import { Route, Link } from "react-router-dom";
import { JWT } from "../../../constants";
import NavbarItem from "./NarbarItem";
import "./Navbar.scss";
import SkillBar from "../SkillBar/SkillBar";
import Skills from "../../home/Home";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuItems: [
        { name: "Collaboration", link: "skills" },
        { name: "Communication", link: "home" },
      ],
    };
  }

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
    const { menuItems } = this.state;

    return (
      <nav className="navBar-skills">
        <React.Fragment>
          <ul className="menu" id="menu">
            {menuItems.map((menuItem, idx) => {
              return (
                <React.Fragment>
                  <NavbarItem key={idx} dest={menuItem.link}>
                    {menuItem.name}
                  </NavbarItem>
                </React.Fragment>
              );
            })}
          </ul>
        </React.Fragment>
      </nav>
    );
  }
}

export default Navbar;
