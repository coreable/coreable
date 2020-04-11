import React, { Component } from 'react';
import '../Facet/Facet.css';
import {
    BrowserRouter as Router,
    Route,
    Link  } from 'react-router-dom';

class EmotionalFacets extends Component {

            // const sliderStyle = () => (
        //     `"linear-gradient(90deg, rgb(66, 113, 249) ${this.props.slider}%, rgb(214, 214, 214) ${this.props.slider}%)"`
        // );
        
    render() {
        return (
            <div className="facet-container">
            <div className="container">
                <h1>{this.props.facetType[this.props.arrayNum]}</h1>
                <h2 className="facet-heading"> {this.props.facetScore[0].title} </h2>
                <p className="facet-info"> {this.props.facetScore[0].info} </p>
                    <input 
                        type="range" 
                        min={0} 
                        max={100} 
                        step={20} 
                        value={this.props.facetRating} 
                        className="slider" 
                        onChange={this.props.handleRatingChange}
                        onInput={this.props.handleSliderChange}
                        // style={{sliderStyle}}
                        // style={{background: sliderStyle}}
                    />
                    <p>{this.props.facetRating}</p>
                    <p>{this.props.slider}%</p>
            </div>
            </div>
        )
    }
}

export default EmotionalFacets
