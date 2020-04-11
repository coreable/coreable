import React, { Component , useState } from 'react';
import './Login.css';
import {
    BrowserRouter as Router,
    Route,
    Link  } from 'react-router-dom';
import Setup from '../Setup';

//apollo / graphQl
import { graphql } from 'react-apollo';
import {flowRight} from 'lodash';


// export class Login extends Component {
export function Login(props) {
    // render() {

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        

        function validateForm() {
            return email.length > 0 &&  email.includes("@") && password.length > 0;
        }
        
        function handleSubmit(event) {
            event.preventDefault();
            this.props.loginMutation({
                variables: {
                    email: this.state.email,
                    password: this.state.password
                },
                //this code is for the app to refresh the page after onSubmit
                // refetchQueries: [{query: loginMutation}]
            })
        }


        return (
            <div className="login-page">
            <div className="base-container">
                <div>
                    <h1> Welcome, <br/> <span className="span"> sign in to continue </span></h1>
                </div>

                <div> 
                    <div className="form">
                        {/* <form onSubmit={() => { handleSubmit(); queryAPI()}} className="form-group"> */}
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
                            {/* <Link to="/setup"> <button type="button" className="btn-login" disabled={!validateForm()} > Login </button> </Link> */}
                            <button type="submit" className="btn-login" disabled={!validateForm()} > Login </button>
                            <Link to="/register"> <button type="button" className="btn-sign-up"> Sign up </button> </Link>
                            <a className="forgotPassword" href=""> Forgot password </a>
                        </form>

                    </div>
                </div>
            </div>
            </div>
        )
    }
// }

//binding GraphQl with this component
export default (Login);


 