import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { JWT, USER_NAME, LAST_NAME } from "../../constants";
import Backdrop from "../Backdrop/Backdrop";
import NavbarItem from "./NarbarItem";
import "./navbar.scss";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      menuItems: [
        { name: "Home", link: "home" },
        { name: "Reviews", link: "comingsoon" },
        { name: "Skills", link: "comingsoon" },
        { name: "Goals", link: "comingsoon" },
        { name: "Account", link: "comingsoon" },
        { name: "Logout", link: "" },
      ],
    };
  }

  // componentDidMount = () => {
  //   console.log(this.state.menuItems[4].name);
  // };

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

  capitalize(str) {
    if (str === null || str === undefined) {
      return "";
    } else {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }

  removeJWT() {
    localStorage.removeItem(JWT);
    localStorage.removeItem(USER_NAME);
    localStorage.removeItem(LAST_NAME);
    window.location.reload(true);
  }

  render() {
    const { menuItems, menuOpen } = this.state;

    return (
      <nav className="navBar">
        {this.backdropHandler()}
        <NavLink className="logo" to="/home">
          Coreable
        </NavLink>

        {this.state.firstName === "firstName" ||
        this.state.firstName === null ||
        this.state.lastName === "lastName" ||
        this.state.lastName === null ? null : (
          <React.Fragment>
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
                    dest={menuItem.link}
                    menuOpenHandler={this.menuOpenHandler}
                  >
                    {menuItem.name}
                  </NavbarItem>
                );
              })}
            </ul>
          </React.Fragment>
        )}
        <span className="spacer" />

        {/* right hand side menu */}
        {/* {this.state.firstName === undefined ? null : ( */}
        {this.state.firstName === "firstName" ||
        this.state.firstName === null ||
        this.state.lastName === "lastName" ||
        this.state.lastName === null ? null : (
          <div className="dropdown">
            {/* {this.state.firstName === undefined ? null : this.state.firstName} */}
            {`${this.capitalize(this.state.firstName)}`}
            <span className="dropbtn"></span>
            <div className="dropdown-content">
              <Link to="/review">Account</Link>
              {/* <Link onClick={() => localStorage.removeItem(JWT)}>Logout</Link> */}
              <Link to="" onClick={() => this.removeJWT()}>
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
