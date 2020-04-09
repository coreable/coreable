import React, { Component } from 'react';
import './SelfScore.css';
import {
    BrowserRouter as Router,
    Route,
    Link  } from 'react-router-dom';

 
class SelfScore extends Component {

    state = {
        subFacet : [
            "Manages own emotions",
            "Empathy",
            "Responds to emotions in others"
        ]
    }


    render() {

        return (
            <div className="facet-container">
                <div className="self-score-container">
                    {/* <h2 className="facet-heading"> {this.state.facetHeading[this.props.facetRating/20]} </h2>
                    <p className="facet-info"> {this.state.facetInfo[this.props.facetRating/20]} </p> */}
                    <input 
                        type="range" 
                        min={0} 
                        max={100} 
                        step={20} 
                        value={this.props.facetRating} 
                        className="self-score-slider" 
                        // onChange={this.props.handleRatingChange}
                        // onInput={this.props.handleSliderChange}
                        style={{width: `${this.props.slider * 4}pt`}}
                        // style={{sliderStyle}}
                    />
                    <p>{this.props.facetRating}</p>
                    <p>{this.props.slider}%</p>
                </div>
            </div>
        )
    }
}

export default SelfScore
