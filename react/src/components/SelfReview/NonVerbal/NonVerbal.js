import React, { Component } from 'react'
import NonVerbalFacet from './NonVerbalFacet';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link  } from 'react-router-dom';

class NonVerbal extends Component {

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
          let facets = [...this.props.nonVerbalFacets]   
          facets[e.target.dataset.id][e.target.className] = e.target.value
          this.setState({ facets }, () => console.log(this.props.facets))
        } else {
          this.setState({ [e.target.name]: e.target.value })
        }
      }


    handleSubmit = (e) => { e.preventDefault() }

    render() {

        let {nonVerbalFacets} = this.props
        let {facetScore} = this.props
        let {userName} = this.props

        return (
            <div>
                <h1> Non-verbal </h1>
                {/* <p onClick={this.props.hideInfo} style={{paddingBottom:"23pt"}}> 
                { this.props.showInfo ? 
                <p> Actively create a pleasant human environment for work, show <br/> empathy, accountability, humility, friendliness and unselfishness </p>
                : null } </p> */}

                { this.props.showInfo ? 
                <p> During conversation keeps engaged through their <br/> body language showing eye contact and not being distracted </p>
                : null } <span onClick={this.props.hideInfo}> { this.props.showInfo ? <span> hide </span> : <span> open </span> } </span>
                
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>          

                    <NonVerbalFacet 
                      nonVerbalFacets = {nonVerbalFacets}
                      facetScore = {facetScore}
                      userName = {userName}
                    />
                    
                    {/* <Link to="/initiative"><button className="btn-next" onClick={this.continue}> Next </button> <br/> </Link> */}
                    <button className="btn-next" onClick={this.continue}> Next </button> <br/>
                    <a href={this.back} onClick={this.back}>Back</a>


                </form>
            </div>
        )
    }
}

export default NonVerbal
