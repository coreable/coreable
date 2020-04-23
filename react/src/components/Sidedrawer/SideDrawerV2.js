import React from "react";
import { Link } from "react-router-dom";
import "./SideDrawerV2.scss";
import { JWT } from "../../constants";

const SideDrawer = (props) => {
  const menuOpen = props.menuOpen;
  if (menuOpen) {
    return (
      <div className="side-drawer-open">
        <div className="drawer-menu-container">
          <div className="menu-items">Home</div>
          <div className="menu-items">Placeholder</div>
          <div className="menu-items">Placeholder</div>
          <div className="menu-items"> Logout</div>
        </div>
      </div>
    );
  } else {
    return <div className="side-drawer"></div>;
  }
};

export default SideDrawer;
