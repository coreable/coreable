import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const NavItem = (props) => {
  return (
    <li className="menubtn" style={{ color: "white" }}>
      <NavLink
        onClick={props.menuOpenHandler}
        className="nav-link"
        exact
        to={`/${props.dest}`}
        activeStyle={{
          borderBottom: "2px solid rgb(66, 113, 249)",
          color: "rgb(66, 113, 249)",
          height: "100%",
        }}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavItem;
