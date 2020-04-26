import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { JWT } from "../../constants";
import Backdrop from "../Backdrop/Backdrop";
import NavbarItem from "./NarbarItem";
import "./navbar.scss";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuItems: ["Home", "Review", "Skills", "Goals", "Account", "Logout"],
      menuOpen: false,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
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

  render() {
    const { menuItems, menuOpen } = this.state;

    return (
      <nav className="navBar">
        {this.backdropHandler()}
        <NavLink className="logo" to="/Home">
          Coreable
        </NavLink>
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
                dest={menuItem}
                menuOpenHandler={this.menuOpenHandler}
              >
                {menuItem}
              </NavbarItem>
            );
          })}
        </ul>

        <span className="spacer" />

        {/* right hand side menu */}
        <div class="dropdown">
          {this.state.firstName === null ? null : this.state.firstName}
          {/* {`${this.state.firstName} ${this.state.lastName}`} */}
          <span className="dropbtn"></span>
          <div className="dropdown-content">
            <a href="#">Account</a>
            <a href="/" onClick={() => localStorage.removeItem(JWT)}>
              Logout
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
