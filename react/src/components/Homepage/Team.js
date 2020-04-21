import React from 'react'
import Stepper from './Stepper'
import './Team.css'

const Team = (props) => {

    const teamName = props.teamName
    const unit = props.unit


    return(
        <div className="team-container">
            <h2> {teamName} </h2>
            <h3> {unit} </h3>
            <Stepper {...props}/>
        </div>
    )
}

export default Team