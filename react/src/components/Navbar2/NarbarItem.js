import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";

const NavItem = (props) => {
  return (
    <li className="menubtn" style={{ color: "white" }}>
      <NavLink
        onClick={props.menuOpenHandler}
        className="nav-link"
        exact
        to={`/${props.dest}`}
        activeStyle={{
          borderBottom: "2px solid rgb(45, 215, 117)",
          height: "100%",
          //   margin: "auto",
          // width: "20%",
        }}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavItem;
