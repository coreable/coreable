import React from "react";
import "./SideDrawerV2.scss";
import { JWT } from "../../constants";

const SideDrawer = (props) => {
  const menuOpen = props.menuOpen;
  if (menuOpen) {
    return (
      <div className="side-drawer-open">
        <div className="drawer-menu-container">
          <a
            className="menu-items"
            href="/"
            onClick={() => localStorage.removeItem(JWT)}
          >
            Home
          </a>
          <a
            className="menu-items"
            href="/setup"
            onClick={() => localStorage.removeItem(JWT)}
          >
            Placeholder
          </a>
          <a
            className="menu-items"
            href="/setup"
            onClick={() => localStorage.removeItem(JWT)}
          >
            Placeholder
          </a>
          <a
            className="menu-items"
            href="/"
            onClick={() => localStorage.removeItem(JWT)}
          >
            Logout
          </a>
        </div>
      </div>
    );
  } else {
    return <div className="side-drawer"></div>;
  }
};

export default SideDrawer;
