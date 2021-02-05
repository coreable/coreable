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

import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { JWT } from "../../constants";
import "./Navbar.scss";
import logo from "./../../images/CoreableLogo.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";
import {
  HamburgerMenu,
  ListItems,
  Logo,
  NavBarContainer,
  NavBarContents,
  NavbarMenu,
  UnorderedList,
} from "./navbar-style";

const navbarItems = [
  { name: "Home", link: "home" },
  { name: "Skills", link: "skills" },
];

const Navbar = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const me = useState(props.app.data.user);

  const capitalize = (str) => {
    if (str.length) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return "";
  };

  const removeJWT = () => {
    localStorage.removeItem(JWT);
    window.location.reload(true);
  };

  return (
    <NavBarContainer>
      <NavBarContents>
        <NavLink className="logo" to="/home">
          <Logo src={logo} alt="logo" />
        </NavLink>
        {me[0] && (
          <HamburgerMenu onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <RiCloseLine style={{ height: "70%", width: "70%" }} />
            ) : (
              <HiOutlineMenuAlt3 style={{ height: "70%", width: "70%" }} />
            )}
          </HamburgerMenu>
        )}
      </NavBarContents>
      <NavbarMenu isOpen={menuOpen}>
        <UnorderedList>
          {navbarItems.map((menuItem, idx) => {
            return (
              <ListItems key={idx}>
                <NavLink
                  style={{ color: "#0653cd" }}
                  exact
                  to={`/${menuItem.link}`}
                >
                  {menuItem.name}
                </NavLink>
              </ListItems>
            );
          })}

          <ListItems onClick={removeJWT}>
            <NavLink style={{ color: "#0653cd" }} exact to="">
              Logout
            </NavLink>
          </ListItems>
        </UnorderedList>
      </NavbarMenu>
    </NavBarContainer>
  );
};

export default Navbar;
