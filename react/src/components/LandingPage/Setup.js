import React, { Component } from 'react';
import styles from './Login/Login.css';
import {
    BrowserRouter as Router,
    Route,
    Link  } from 'react-router-dom';

export class Setup extends Component {
    render() {
        return (
            <div className="login-page">
            <div className="base-container">
                <div>
                    <h1> Welcome, <br/> <span className={styles.span}> sign in to continue </span></h1>
                </div>

                <div> 
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="teamCode"> Team code </label>
                            <input type="text" className="input-text" placeholder="eg: GHDK0402"/>
                        </div>
                        <Link to="/self-review"><button type="button" className="btn-login"> Continue </button></Link>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Setup;
