import React, { Component } from 'react';
import styles from './Login/Login.css';
// import {
//     Link  } from 'react-router-dom';

//graphql/apollo
import { Mutation } from 'react-apollo'
import { AUTH_TOKEN, USER_NAME, TEAMID} from '../../constants';
import { JOIN_TEAM } from  '../../Queries'

function validate(inviteCode) {
    // true means invalid, so our conditions got reversed
    return {
        inviteCode: inviteCode.length <= 0
    };
  }

class Setup extends Component {
    constructor() {
        super();
        this.state = {
            inviteCode: ""
        };
    }
    
    handleTeamCodeChange = evt => {
        this.setState({ inviteCode: evt.target.value });
    };

    handleSubmit = evt => {
        if (!this.canBeSubmitted()) {
          evt.preventDefault();
          return;
        }
      };
    
    canBeSubmitted() {
        const errors = validate(this.state.inviteCode);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
    }

    render() {
        const NAME = localStorage.getItem(USER_NAME)
        const {inviteCode} = this.state

        const errors = validate(this.state.inviteCode);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        return (
            <div className="login-page">
            <div className="base-container">
                <div>
                    <h1> Welcome {NAME}, <br/> <span className={styles.span}> enter the Team code to continue </span></h1>
                </div>

                <div> 
                    <div className="form">
                        <div className="form-group">
                            <form onSubmit={this.handleSubmit}>
                                <label htmlFor="teamCode"> Team code </label>
                                <input type="text" value={inviteCode} className="input-text" onChange={this.handleTeamCodeChange} placeholder="eg: GHDK0402"/>

                                <Mutation
                                    mutation={JOIN_TEAM}
                                    variables={{inviteCode}}
                                    onCompleted={data => this._confirm(data)}
                                >
                                    {mutation => (
                                    <button type="button" className="btn-login" disabled={isDisabled} onClick={mutation}>
                                        Continue
                                    </button>
                                    )}
                                </Mutation>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }

    _confirm = async data => {
        try {
            const { _id } = data.joinTeam.data.user
            console.log(_id)
            this._saveUserData({_id})
            this.props.history.push(`/self-review`)
          } 
        catch {
            alert('Invalid signup');
            console.log(data)
        }
      }
      
      _saveUserData = ({_id}) => {
        localStorage.setItem(TEAMID, _id)
      }

}

export default Setup;
