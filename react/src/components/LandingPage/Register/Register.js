import React, { Component } from 'react';
import styles from './Register.css';

export class Register extends Component {
    render() {
        return (
            <div className="base-container">
                <div>
                    <h1> Sign up, <br/> and join your team </h1>
                </div>

                <div> 
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username"> Email </label>
                            <input type="text" className="input-text"/>

                            <label htmlFor="password"> Password </label>
                            <input type="text" className="input-text"/>

                            <label htmlFor="firstName"> First name </label>
                            <input type="text" className="input-text"/>

                            <label htmlFor="lastName"> Last name </label>
                            <input type="text" className="input-text"/>


                        </div>
                        <button type="button" className="btn-signup"> Sign up </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;
