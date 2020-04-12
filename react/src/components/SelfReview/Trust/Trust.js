import React, { Component } from 'react'
// import {
//   BrowserRouter as Router,
//   Route,
//   Link  } from 'react-router-dom';
import TrustFacet from './TrustFacet';

class Trust extends Component {

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
          let facets = [...this.props.trustFacets]   
          facets[e.target.dataset.id][e.target.className] = e.target.value
          this.setState({ facets }, () => console.log(this.props.facets))
        } else {
          this.setState({ [e.target.name]: e.target.value })
        }
      }


    handleSubmit = (e) => { e.preventDefault() }

    render() {

        let {trustFacets} = this.props
        let {facetScore} = this.props
        let {userName} = this.props

        return (
            <div>
                <h1> Trust </h1>
                <p style={{paddingBottom:"23pt"}}> Firm belief in the reliability, truth, or ability of someone </p>
                
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>          

                    <TrustFacet 
                      trustFacets = {trustFacets}
                      facetScore = {facetScore}
                      userName = {userName}
                    />

                    {/* <input type="submit" value="Submit" />  */}
 
                    {/* <Link to="/flexibility"><button className="btn-next"> Next </button> <br/> </Link> */}
                    <button className="btn-next" onClick={this.continue}> Next </button> <br/>
                    <a href={this.back} onClick={this.back}>Back</a>


                </form>
{/* 
                <p>{this.state.emotionalFacets[0].rating}</p>
                <p>{this.state.emotionalFacets[1].rating}</p>
                <p>{this.state.emotionalFacets[2].rating}</p> */}
            </div>
        )
    }
}

export default Trust
