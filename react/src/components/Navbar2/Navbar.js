import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { JWT } from "../../constants";
import Backdrop from "../Backdrop/Backdrop";
import NavbarItem from "./NarbarItem";
import "./navbar.scss";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuItems: ["Home", "Reviews", "Skills", "Goals", "Account", "Logout"],
      menuLinks: ["home", "reviews", "skills", "goals", "account", "logout"],
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
        <NavLink className="logo" to="/home">
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
                dest={this.state.menuLinks[idx]}
                menuOpenHandler={this.menuOpenHandler}
              >
                {menuItem}
              </NavbarItem>
            );
          })}
        </ul>

        <span className="spacer" />

        {/* right hand side menu */}
        {this.state.firstName === undefined ? null : (
          <div class="dropdown">
            {/* {this.state.firstName === undefined ? null : this.state.firstName} */}
            {`${this.state.firstName} ${this.state.lastName}`}
            <span className="dropbtn"></span>
            <div className="dropdown-content">
              <Link href="#">Account</Link>
              <Link to="/" onClick={() => localStorage.removeItem(JWT)}>
                Logout
              </Link>
            </div>
          </div>
        )}
      </nav>
    );
  }
}

export default Navbar;
