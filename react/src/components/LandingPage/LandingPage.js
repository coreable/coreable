import React, { Component } from 'react';
import {

    Link  } from 'react-router-dom';
import './LandingPage.css';
import {USER_NAME, AUTH_TOKEN} from '../../constants'

export class LandingPage extends Component {


    render() {
        return (
            <div className="landing-page">
            <div className="container">
                <div>
                    <h1 style={{color:"white"}}> Welcome to Coreable </h1>
                    <div className="text"><p> Create an account or sign in to manage <br/> your Coreable account and review others.</p></div>       
                    <div className="container"> 
                </div>
                <div className="btn-landing-page">
                        {/* <Link to="/login"> <button type="button" className="btn-login"> Log in </button> </Link> */}
                        <Link to="/loginexample"> <button type="button" className="btn-login"> Log in</button> </Link>
                        {/* <Link to="/register"> <button type="button" className="btn-sign-up"> Sign up </button> </Link> */}
                        <Link to="/registerexample"> <button type="button" className="btn-sign-up"> Sign up</button> </Link>
                </div>
            </div>
        
            </div>
            </div>
        )
    }
}

export default LandingPage
