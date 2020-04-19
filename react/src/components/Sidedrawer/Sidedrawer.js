import React from 'react';
import './Sidedrawer.css';
import {
  Link
} from 'react-router-dom';
import { JWT } from '../../constants';

const sideDrawer = props => {
  let drawerClasses = 'sideDrawer';
  if (props.show) {
    drawerClasses = 'sideDrawer open';
  }
  return (
    <nav className={drawerClasses}>
      <div className="sideDrawer-logo">
        <p> Coreable </p>
        <div className="spacer" />
        <button className="close-sidedrawer" onClick={props.click}> X </button>
      </div>
      <ul className="menu">
        <li> <Link to="/">Home</Link> </li>
        <li> <a href="/">Results</a> </li>
        <li> <a href="/">Results facets</a> </li>
        <li> <a href="/" onClick={localStorage.removeItem(JWT)}>Logout</a></li>
      </ul>
    </nav>);
};

export default sideDrawer;