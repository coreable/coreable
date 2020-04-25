import React from "react";
import "./Navbar.css";
import { JWT } from "../../constants";

const Navbar = (props) => {
  const { firstName, lastName } = props;
  const fullName = `${firstName} ${lastName}`;

  return (
    <nav className="navBar">
      <a className="logo">Coreable</a>

      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" for="menu-btn">
        <span className="nav-icon"></span>
        <span className="spacer" />
      </label>
      <ul className="menu">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="">Review</a>
        </li>
        <li>
          <a href="">Skills</a>
        </li>
        <li>
          <a href="">Goals</a>
        </li>
        <li>
          <a href="">Account details</a>
        </li>
        <li>
          <a href="">Change password</a>
        </li>
        <li>
          <a href="/" onClick={() => localStorage.removeItem(JWT)}>
            Logout
          </a>
        </li>
      </ul>

      <div class="second-menu">
        <input className="menu2-btn" type="checkbox" id="menu2-btn" />
        <label className="menu2-icon" for="menu2-btn">
          <p className="nav2-icon">{fullName}</p>
        </label>

        <ul className="menu2">
          <li>
            <a href="/">Account details</a>
          </li>
          <li>
            <a href="/">Change password</a>
          </li>
          <li>
            <a href="/">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
