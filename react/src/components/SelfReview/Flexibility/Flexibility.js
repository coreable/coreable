import React, { Component } from 'react'
import FlexibilityFacet from './FlexibilityFacet';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link  } from 'react-router-dom';

class Flexibility extends Component {

    //multi-form
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
            });
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
            });
    }

    handleChange = (e) => {
        if (["rating"].includes(e.target.className) ) {
          let facets = [...this.props.flexibilityFacets]   
          facets[e.target.dataset.id][e.target.className] = e.target.value
          this.setState({ facets }, () => console.log(this.props.facets))
        } else {
          this.setState({ [e.target.name]: e.target.value })
        }
      }

    handleSubmit = (e) => { e.preventDefault() }

    render() {

        let {flexibilityFacets} = this.props
        let {facetScore} = this.props
        let {userName} = this.props

        return (
            <div>
                <h1> Flexibility </h1>
                <p style={{paddingBottom:"23pt"}}> Be adaptable and receptive to new ideas; respond and adjust easily to changing work <br/> demands and circumstances; not bound by old ways of doing things </p>
                
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>          

                    <FlexibilityFacet 
                      flexibilityFacets = {flexibilityFacets}
                      facetScore = {facetScore}
                      userName = {userName}
                    />

                    {/* <input type="submit" value="Submit" />  */}
                    
                    {/* <Link to="/Resilience"><button className="btn-next"> Next </button> <br/> </Link> */}
                    <button className="btn-next" onClick={this.continue}> Next </button> <br/>
                    <a href={this.back} onClick={this.back}>Back</a>


                </form>
            </div>
        )
    }
}

export default Flexibility
