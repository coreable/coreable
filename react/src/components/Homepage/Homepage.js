import React , { Component } from 'react'
import Team from './Team'
import { Link } from 'react-router-dom';

// import {USER_NAME, AUTH_TOKEN, TEAMID, USERID} from '../../constants';
import { GET_USER_DETAILS } from '../../Queries';
import { Query } from 'react-apollo';

import './Homepage.css'

class Homepage extends Component {

    render(){
        const fakeData = {
            teams: [
                {
                    name: "Team0",
                    unit: "FIT1055",
                    stage: 1
                },
                {
                    name: "Team1",
                    unit: "FIT1055",
                    stage: 1
                },
                {
                    name: "Team2",
                    unit: "FIT1055",
                    stage: 2
                }
            ]
        }

        return(
            <div className="homepage-container">

                
                {/* replace this code */}
                {fakeData.teams.map((team, idx) => {
                    return <Team 
                                key = {idx}
                                teamName = {team.name}
                                unit = {team.unit}
                                stage = {team.stage} /> })}
                {/* until here */}

            {/* replace with below code */}
                {/* <Query query={GET_USER_DETAILS}>
                    {({ loading, error, data }) => {
                    if (loading) return <div>Loading...</div>
                    if (error) return <div>{error}</div>
                
                    const Teams = data.user.teams
                
                    return (
                        <div>
                        {Teams.map(team => <Team key={team._id} teamName={team.something} unit={team.something} stage={team.somethiong}/>)}
                        </div>
                    )
                    }}
                </Query> */}
            {/* until here     */}

                <div className="add-team">
                    <Link to="/setup"> <button> + </button></Link>
                </div>
            </div>
        )
    }
}

export default Homepage