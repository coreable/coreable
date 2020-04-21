import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Stepper.scss'

const Stepper = (props) => {
    const stage = props.stage

    // const [count, setCount] = useState(stage)

    switch(stage) {
        case 1:
            return (
                <div className="step-container">
                    <div className="step-wrapper">
                        <div className="step-number-highlighted"><span>1</span></div>
                        <div className="step-description"> Self review </div>
                        <div className="divider-line"></div>
                    </div>
                    <div className="step-wrapper">
                        <div className="step-number">2</div>
                        <div className="step-description"> Team review </div>
                        <div className="divider-line"></div>
                    </div>
                    <div className="step-wrapper">
                        <div className="step-number">3</div>
                        <div className="step-description"> Final review </div>
                        {/* <div className="divider-line"></div> */}
                    </div>
                </div>
            );
        
        case 2:
            return (
                <div className="step-container">
                    <div className="step-wrapper">
                        <div className="step-number-highlighted"><span>1</span></div>
                        <div className="step-description"> Self review </div>
                        <div className="divider-line"></div>
                    </div>
                    <div className="step-wrapper">
                        <div className="step-number-highlighted"><span>2</span></div>
                        <div className="step-description"> Team review </div>
                        <div className="divider-line"></div>
                    </div>
                    <div className="step-wrapper">
                        <div className="step-number">3</div>
                        <div className="step-description"> Final review </div>
                        {/* <div className="divider-line"></div> */}
                    </div>
                </div>
            );
        
        default:
            return (
                <div className="step-container">
                    <div className="step-wrapper">
                        <div className="step-number-highlighted"><span>1</span></div>
                        <div className="step-description"> Self review </div>
                        <div className="divider-line"></div>
                    </div>
                    <div className="step-wrapper">
                        <div className="step-number-highlighted"><span>2</span></div>
                        <div className="step-description"> Team review </div>
                        <div className="divider-line"></div>
                    </div>
                    <div className="step-wrapper">
                        <div className="step-number-highlighted"><span>3</span></div>
                        <div className="step-description"> Final review </div>
                        {/* <div className="divider-line"></div> */}
                    </div>
                </div>
            );
      }
}



export default Stepper
