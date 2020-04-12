import React, { Component } from 'react'
import ResilienceFacet from './ResilienceFacet';
import {
  Link  } from 'react-router-dom';

class Resilience extends Component {

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
          let facets = [...this.props.resilienceFacets]   
          facets[e.target.dataset.id][e.target.className] = e.target.value
          this.setState({ facets }, () => console.log(this.props.facets))
        } else {
          this.setState({ [e.target.name]: e.target.value })
        }
      }


    handleSubmit = (e) => { e.preventDefault() }

    render() {

        let {resilienceFacets} = this.props
        let {facetScore} = this.props
        let {userName} = this.props

        return (
            <div>
                <h1>Resilience</h1>
                <p style={{paddingBottom:"23pt"}}> Resilience is the ability to recover, re-bound or bounce back, <br/> adjust and even thrive after misfortune or change </p>
                
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>          

                    <ResilienceFacet 
                      resilienceFacets = {resilienceFacets}
                      facetScore = {facetScore}
                      userName = {userName}
                    />

                    {/* <input type="submit" value="Submit" />  */}
 
                    {/* <Link to="/Trust"><button className="btn-next" onClick={this.continue}> Next </button> <br/> </Link> */}
                    <Link to="/thank-you"><button className="btn-next"> Save & Confirm </button></Link> <br/>
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

export default Resilience
