import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link  } from 'react-router-dom';
import EmotionalFacet from './NAEmotionalFacets';


class Emotional extends Component {

    state = {
        title : "Emotional Intelligence",
        info : "Actively create a pleasant human environment for work, show empathy, accountability, humility, friendliness and unselfishness.",
        facetType : [
            "Responds to emotions in others", "Demonstrates empathy", "Manages own emotions" ],
        facetScore : [
            {   title : "Fails",
                info  : "Neglects to attempt" } ,   
            {   title : "Under prompting",
                info  : "Neglects to attempt" } ,
            {   title : "Habitually",
                info  : "By way of habit: customarily" } ,  
            {   title : "Encourages others",
                info  : "Gives support and confidence" } ,
            {   title : "Teaches",
                info  : "Shares experience and guides" } ,
            {   title : "Teaches",
                info  : "Shares experience and guides" }
            ],
        facetRating: [],
        slider : 0,
        values : []
    }

  


    handleRatingChange(i, e) {
        this.setState({
          values: { ...this.state.facetRating, [i]: e.target.value }
        });
      }

    handleSliderChange(i, e) {
        this.setState({
          values: { ...this.state.slider, [i]: e.target.value }
        });
      }
    // handleRatingChange = (e) => this.setState({facetRating: e.target.value})
    // handleSliderChange = (e) => this.setState({slider: e.target.value})

    render() {

        // function ReptileListItems() {
        //     var emotionalFacets = [{
        //         name : "Hansol",
        //         rating : 0,
        //         value : 0,
        //         slider : 0
        //     }]

        //     return emotionalFacets.map(reptile => (
        //       <li style={{color:"black"}}>{reptile.name}</li>
        //     ));
        //   }

        
        var arr=this.state.facetType;
        var elements=[];
        var arrayNum = 0;
        for (var i=0; i<arr.length; i++){
            elements.push(<EmotionalFacet
                value={this.state.facetRating[i]} 
                name={this.state.values[i]} 
                facetType={this.state.facetType}
                arrayNum={arrayNum}
                facetRating={this.state.facetRating[i]} 
                handleRatingChange={this.handleRatingChange.bind(this, i)} 
                slider={this.state.slider} 
                handleSliderChange={this.handleSliderChange.bind(this, i)}
                />);
            arrayNum =  arrayNum + 1;
        }
        /* the for loop above is essentially the same as
        elements = arr.map( item => <Card value={ item } /> );
        The result is an array of 3 Card components. */
        return (
            <div className="element-div">
                        {/* <h2 className="facet-heading"> {this.state.title} </h2>
                        <p className="facet-info"> {this.state.info} </p> */}
                        {/* {this.createCard()} */}
                        {/* {() => this.createCard()} */}
                        {/* {ReptileListItems()} */}
                        {elements}
            </div>
        )
    }
}

export default Emotional
