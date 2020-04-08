import React, { Component , useState } from 'react';
import './Login.css';
import {
    BrowserRouter as Router,
    Route,
    Link  } from 'react-router-dom';
import Setup from '../Setup';

// export class Login extends Component {
export function Login(props) {
    // render() {

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [border, setBorder] = useState("");
        

        function validateForm() {
            return email.length > 0 &&  email.includes("@") && password.length > 0;
        }
        
        function handleSubmit(event) {
            event.preventDefault();
        }

        return (
            <div className="login-page">
            <div className="base-container">
                <div>
                    <h1> Welcome, <br/> <span className="span"> sign in to continue </span></h1>
                </div>

                <div> 
                    <div className="form">
                        <form onSubmit={handleSubmit} className="form-group">
                            <label htmlFor="username"> Email </label>
                            <input 
                                type="text" 
                                className="input-text" 
                                placeholder="email@coreable.com"                     
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <label htmlFor="password"> Password </label>
                            <input 
                                // type="text" 
                                className="input-text" 
                                placeholder="********" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />

                            {/* <label htmlFor="teamCode"> Team code </label>
                            <input type="text" className="input-text" placeholder="GHDK0402"/> */}
                        </form>
                        <Link to="/setup"> <button type="button" className="btn-login" disabled={!validateForm()} > Login </button> </Link>
                        <Link to="/register"> <button type="button" className="btn-sign-up"> Sign up </button> </Link>
                        <a className="forgotPassword" href=""> Forgot password </a>
                    </div>
                </div>
            </div>
            </div>
        )
    }
// }

export default Login;
