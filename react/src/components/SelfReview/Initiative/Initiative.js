import React, { Component } from 'react'
import InitiativeFacet from './InitiavtiveFacet';
import {
  BrowserRouter as Router,
  Route,
  Link  } from 'react-router-dom';

class Initiative extends Component {

    
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
          let facets = [...this.props.initiativeFacets]   
          facets[e.target.dataset.id][e.target.className] = e.target.value
          this.setState({ facets }, () => console.log(this.props.facets))
        } else {
          this.setState({ [e.target.name]: e.target.value })
        }
      }


    handleSubmit = (e) => { e.preventDefault() }

    render() {

        let {initiativeFacets} = this.props
        let {facetScore} = this.props
        let {userName} = this.props

        return (
            <div>
                <h1>Initiative</h1>
                <p style={{paddingBottom:"23pt"}}> Proactive and self-starting; seize opportunities and act upon them; <br/> originate action and actively influence events </p>
                
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>          

                    <InitiativeFacet 
                      initiativeFacets = {initiativeFacets}
                      facetScore = {facetScore}
                      userName = {userName}
                    />

                    {/* <input type="submit" value="Submit" />  */}
 
                    {/* <Link to="/Trust"><button className="btn-next" onClick={this.continue}> Next </button> <br/> </Link> */}
                    <button className="btn-next" onClick={this.continue}> Next </button> <br/>
                    <a onClick={this.back}>Back</a>


                </form>
{/* 
                <p>{this.state.emotionalFacets[0].rating}</p>
                <p>{this.state.emotionalFacets[1].rating}</p>
                <p>{this.state.emotionalFacets[2].rating}</p> */}
            </div>
        )
    }
}

export default Initiative
