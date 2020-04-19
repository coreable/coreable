import React, { Component } from 'react'
import './ThankYou.css';

class ThankYou extends Component {
  render() {
    return (
      <div className="container">
        <div className="left-container">
          <p style={{ color: "black" }}><b>Thank you, </b><br /> <span style={{ fontColor: "rgb(97, 103, 122)", fontWeight: "normal" }}> your results will be <br /> posted shortly. </span></p>
        </div>
      </div>
    )
  }
}

export default ThankYou