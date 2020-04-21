import React, { Component } from 'react'
import VerbalFacet from './VerbalFacet';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link  } from 'react-router-dom';
import {
  Link  } from 'react-router-dom';


import { USERID, TEAMID } from '../../../constants';
import { Mutation } from 'react-apollo';
import { SUBMIT_SELF_REVIEW } from  '../../../Queries';

class Verbal extends Component {


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

    submitReview = (e) => {
      e.preventDefault();
      this.props.submitSelfReview();
    }

    handleChange = (e) => {
        if (["rating"].includes(e.target.className) ) {
          let facets = [...this.props.verbalFacets]   
          facets[e.target.dataset.id][e.target.className] = e.target.value
          this.setState({ facets }, () => console.log(this.props.facets))
        } else {
          this.setState({ [e.target.name]: e.target.value })
        }
      }


    handleSubmit = (e) => { e.preventDefault() }

    render() {

        let {verbalFacets} = this.props
        let {facetScore} = this.props
        let {userName} = this.props
 
        const team_id = this.props.TEAMID
        const receiverID = this.props.USERID

        const emotionalResponse = this.props.emotionalFacets[0].rating 
        const empathy = this.props.emotionalFacets[1].rating
        const managesOwn = this.props.emotionalFacets[2].rating
        const faith = '0'
        const cooperatively = this.props.trustFacets[0].rating
        const positiveBelief = this.props.trustFacets[1].rating
        const resilienceFeedback = this.props.resilienceFacets[0].rating
        const calm = this.props.resilienceFacets[1].rating
        const change = this.props.resilienceFacets[2].rating
        const newIdeas = this.props.flexibilityFacets[0].rating
        const workDemands = this.props.flexibilityFacets[1].rating
        const proactive = this.props.initiativeFacets[0].rating
        const influences = this.props.initiativeFacets[1].rating
        const clearInstructions = '0'
        const preventsMisunderstandings = this.props.clarityFacets[0].rating
        const easilyExplainsComplexIdeas = this.props.clarityFacets[1].rating
        const openToShare = this.props.cultureFacets[0].rating
        const tone = this.props.cultureFacets[1].rating
        const crossTeam = this.props.cultureFacets[2].rating
        const distractions = this.props.nonVerbalFacets[0].rating
        const eyeContact = this.props.nonVerbalFacets[1].rating
        const signifiesInterest = this.props.verbalFacets[0].rating
        const verbalAttentiveFeedback = this.props.verbalFacets[1].rating


        return (
            <div>
                <h1> Verbal attentiveness </h1>
                <p> {receiverID}</p>
                <p> {team_id}</p>
                {/* <p onClick={this.props.hideInfo} style={{paddingBottom:"23pt"}}> 
                { this.props.showInfo ? 
                <p> Actively create a pleasant human environment for work, show <br/> empathy, accountability, humility, friendliness and unselfishness </p>
                : null } </p> */}

                { this.props.showInfo ? 
                <p> Provides active listening by paraphrasing, clarifying, <br/> reflective listening, prompts, open and closed questions. </p>
                : null } <span onClick={this.props.hideInfo}> { this.props.showInfo ? <span> hide </span> : <span> open </span> } </span>
                
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>          

                    <VerbalFacet 
                      verbalFacets = {verbalFacets}
                      facetScore = {facetScore}
                      userName = {userName}
                    />
                    
                    {/* <Link to="/initiative"><button className="btn-next" onClick={this.continue}> Next </button> <br/> </Link> */}
                    {/* <Link to="/thank-you"><button className="btn-next" onClick={this.submitReview.bind(this)}> Save & Confirm </button></Link> <br/> */}
                    <Mutation
                                    mutation={SUBMIT_SELF_REVIEW}
                                    variables={{
                                      receiverID, 
                                      team_id,
                                      emotionalResponse,
                                      empathy,
                                      managesOwn,
                                      faith,
                                      cooperatively,
                                      positiveBelief,
                                      resilienceFeedback,
                                      calm,
                                      change,
                                      newIdeas,
                                      workDemands,
                                      proactive,
                                      influences,
                                      clearInstructions,
                                      preventsMisunderstandings,
                                      easilyExplainsComplexIdeas,
                                      openToShare,
                                      tone,
                                      crossTeam,
                                      distractions,
                                      eyeContact,
                                      signifiesInterest,
                                      verbalAttentiveFeedback
                                    }}
                                    onCompleted={data => this._confirm(data)}
                                >
                                    {mutation => (
                                    <button type="button" className="btn-next" onClick={mutation}>
                                        Save & Confirm
                                    </button>
                                    )}
                                </Mutation>
                    <br/> <a href={this.back} onClick={this.back}>Back</a>


                </form>
            </div>
        )
    }
    _confirm = async data => {
      try {
          console.log(data)
          this.props.history.push(`/thank-you`)
        } 
      catch {
          alert('Invalid');
          console.log(data)
      }
    }
    
}

export default Verbal
