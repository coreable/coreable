import React from 'react';
import  './Sidedrawer.css';
import {
    Link  } from 'react-router-dom';
import { AUTH_TOKEN , USER_NAME, USERID, TEAMID } from '../../constants';


const sideDrawer = props => {
    let drawerClasses = 'sideDrawer';
    if (props.show){
        drawerClasses = 'sideDrawer open';
    }
  return (
    <nav className={drawerClasses}>
        <div className="sideDrawer-logo">
            <p> Coreable </p>
            <div className="spacer"/>
            <button className="close-sidedrawer" onClick={props.click}> X </button>
        </div>
        <ul className="menu">
            <li> <Link to="/">Home</Link> </li> 
            <li> <a href="/">Results</a> </li> 
            <li> <a href="/">Results facets</a> </li> 
            <li> <Link to="/" onClick={() => {
                localStorage.removeItem(AUTH_TOKEN)
                localStorage.removeItem(USER_NAME)
                localStorage.removeItem(USERID)
                localStorage.removeItem(TEAMID)
                alert('You have logged out')
                }}>Log out</Link> </li> 
        </ul>
    </nav> );
};

export default sideDrawer;