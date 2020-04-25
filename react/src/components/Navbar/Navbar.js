import React, { useState } from "react";
import "./Navbar.css";
import { JWT } from "../../constants";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { firstName, lastName } = props;
  const fullName = `${firstName} ${lastName}`;

  // const uncheck = () => {
  //   const uncheck = document.getElementsByTagName("input");
  //   // console.log(uncheck.length);
  //   for (var i = 0; i < uncheck.length; i++) {
  //     if (uncheck[i].type == "checkbox") {
  //       console.log(uncheck[i].checked);
  //       uncheck[i].checked = false;
  //     }
  //   }
  // };

  // let header2 = document.getElementsByClassName("menu");
  let btns = document.getElementsByClassName("menubtn");
  console.log(btns);
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }

  return (
    <nav className="navBar">
      <a className="logo">Coreable</a>

      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" for="menu-btn">
        <span className="nav-icon"></span>
        <span className="spacer" />
      </label>
      <ul className="menu" id="menu">
        <li>
          <a className="menubtn active">Home</a>
        </li>
        <li>
          <Link to="/home" style={{ margin: "0", padding: "0" }}>
            <a className="menubtn">Review</a>
          </Link>
        </li>
        <li>
          <Link to="/home" style={{ margin: "0", padding: "0" }}>
            <a className="menubtn">Skills</a>
          </Link>
        </li>
        <li>
          <Link to="/home" style={{ margin: "0", padding: "0" }}>
            <a className="menubtn">Goals</a>
          </Link>
        </li>
        <li>
          <Link to="/home" style={{ margin: "0", padding: "0" }}>
            <a className="menubtn">Account details</a>
          </Link>
        </li>
        <li>
          <Link to="/home" style={{ margin: "0", padding: "0" }}>
            <a id="menubtn">Change password</a>
          </Link>
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
