import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const NavItem = (props) => {
  return (
    <li className="menubtn">
      <NavLink className="nav-link" exact to={`/${props.dest}`}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavItem;
