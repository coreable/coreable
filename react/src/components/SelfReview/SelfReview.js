import React, { Component } from 'react';
import './SelfReview.css';
// import SelfScore  from './SelfScore/SelfScore';
//collaboration
import EmotionalIntelligence from './Emotional/EmotionalIntelligence';
import Initiative from './Initiative/Initiative';
import Trust from './Trust/Trust';
import Flexibility from './Flexibility/Flexibility';
import Resilience from './Resilience/Resilience';
//communication
import Clarity from './Clarity/Clarity'
import Culture from './Culture/Culture'
import NonVerbal from './NonVerbal/NonVerbal'
import Verbal from './Verbal/Verbal'
import {USER_NAME, AUTH_TOKEN, TEAMID, USERID} from '../../constants';
import { SUBMIT_SELF_REVIEW } from '../../Queries';
import { graphql } from 'react-apollo';



class SelfReview extends Component {
    
    state = {
        TEAMID: localStorage.getItem(TEAMID),
        USERID: localStorage.getItem(USERID), 
        step: 1,
        //added facets in the parent component to store its state
        emotionalFacets : [{
            name : "Responds to emotions in others",
            id : "emotionalResponse",
            rating : 0,
            },{
            name : "Demonstrates empathy",
            rating : 0,
            },{
            name : "Manages own emotions",
            rating : 0,
            }
        ],
        initiativeFacets : [{
            name : "Proactive and self-starting",
            rating : 0,
            },{
            name : "Actively influences events",
            rating : 0,
            }
        ],
        trustFacets : [{
            name : "Is able to work cooperatively",
            rating : 0,
            },{
            name : "Has a postive belief about the dependability of others",
            rating : 0,
            }
        ],
        flexibilityFacets : [{
            name : "Adaptable and receptive to new ideas",
            rating : 0,
            },{
            name : "Adjusts easily to change work demands",
            rating : 0,
            }
        ],
        resilienceFacets : [{
            name : "Accepts all forms of constructive feedback",
            rating : 0,
            },{
            name : "Remains calm under pressure",
            rating : 0,
            },{
            name : "Adapts to change easily",
            rating : 0,
            }
        ],
        clarityFacets : [{
            name : "Gives clear instructions",
            rating : 0,
            },{
            name : "Easily explains complex ideas",
            rating : 0,
            }
        ],
        cultureFacets : [{
            name : "Builds a strong sense of openness, trust and community",
            rating : 0,
            },{
            name : "Encourages creative potential in others",
            rating : 0,
            },{
            name : "Creates an environment where individuals are safe to report errors",
            rating : 0,
            }
        ],
        nonVerbalFacets : [{
            name : "Avoids distractions if at all possible",
            rating : 0,
            },{
            name : "During interactions demonstrates active listening by appearing relaxed, friendly facial expressions, open posture, eye contact, full attention and non-verbal acknowledgments",
            rating : 0,
            }
        ],
        verbalFacets : [{
            name : "Signifies interest in what other people have to say",
            rating : 0,
            },{
            name : "Is able to reflect on interaction and receive feedback",
            rating : 0,
            }
        ],
        facetScore : [
            {   title : "Fails",
                info  : "Neglects to attempt" } ,
            {   title : "Fails",
                info  : "Neglects to attempt" } ,
  
            {   title : "Under prompting",
                info  : "Neglects to attempt" } ,
            {   title : "Under prompting",
                info  : "Neglects to attempt" } ,
            {   title : "Under prompting",
                info  : "Neglects to attempt" } ,
  
            {   title : "Habitually",
                info  : "By way of habit: customarily" } , 
            {   title : "Habitually",
                info  : "By way of habit: customarily" } ,
  
            {   title : "Encourages others",
                info  : "Gives support and confidence" } ,
            {   title : "Encourages others",
                info  : "Gives support and confidence" } , 
  
            {   title : "Teaches",
                info  : "Shares experience and guides" } ,
            {   title : "Teaches",
                info  : "Shares experience and guides" }
            ],
        showInfo : true,
    }


    //go to next page via switch
    nextStep = () => {
        //destructing - taking it out of state
        const {step} = this.state
        this.setState ({
            step: step + 1
        })
    }

    //go to previous page via switch
    prevStep = () => {
        //destructing - taking it out of state
        const {step} = this.state
        this.setState ({
            step: step - 1
        })
    }

    hideInfo = () => {
       const {showInfo} = this.state
       this.setState({
           showInfo : !showInfo
       })
    }
      
    // submitSelfReview = () => {
    //     // const TEAMID = localStorage.getItem(TEAMID);
    //     // const USERID = localStorage.getItem(USERID);
    //     this.props.SUBMIT_SELF_REVIEW({
    //         variables: {
    //             receiver_id: this.state.USERID, 
    //             team_id: this.state.TEAMID, 
    //             //Emotional 
    //             emotionalResponse: this.state.emotionalFacets[0].rating, 
    //             empathy: this.state.emotionalFacets[1].rating,
    //             managesOwn: this.state.emotionalFacets[2].rating,

    //             //Trust
    //             faith: '0', //not part of?
    //             cooperatively: this.state.trustFacets[0].rating,
    //             positiveBelief: this.state.trustFacets[1].rating,

    //             //Resilience
    //             resilienceFeedback: this.state.resilienceFacets[0].rating,
    //             calm: this.state.resilienceFacets[1].rating,
    //             change: this.state.resilienceFacets[2].rating,

    //             //Flexibility
    //             newIdeas: this.state.flexibilityFacets[0].rating,
    //             workDemands: this.state.flexibilityFacets[1].rating,

    //             //Initiative
    //             proactive: this.state.initiativeFacets[0].rating,
    //             influences: this.state.initiativeFacets[1].rating,

    //             //Clarity - to complete
    //             clearInstructions: '0', //not part of?
    //             preventsMisunderstandings: this.state.clarityFacets[0].rating,
    //             easilyExplainsComplexIdeas: this.state.clarityFacets[1].rating,

    //             //Culture - to complete
    //             openToShare: this.state.cultureFacets[0].rating,
    //             tone: this.state.cultureFacets[1].rating,
    //             crossTeam: this.state.cultureFacets[2].rating,

    //             //Non-verbal - to complete
    //             distractions: this.state.nonVerbalFacets[0].rating,
    //             eyeContact: this.state.nonVerbalFacets[1].rating,

    //             //Verbal Attentiveness - to complete
    //             signifiesInterest: this.state.verbalFacets[0].rating,
    //             verbalAttentiveFeedback: this.state.verbalFacets[1].rating
    //         }
    //     })
    //     console.log("hello")
    // }

    // handleRatingChange = (e) => this.setState({facetRating: e.target.value})
    // handleSliderChange = (e) => this.setState({slider: e.target.value})

    render() {


        
        const NAME = localStorage.getItem(USER_NAME)
        // eslint-disable-next-line
        const TOKEN = localStorage.getItem(AUTH_TOKEN)
        const {step} = this.state
        // eslint-disable-next-line
        switch(step) {
            case 1:
                return (
                    <div className="container"> 
                        <form className="self-review">
                            <EmotionalIntelligence
                                showInfo = {this.state.showInfo}
                                hideInfo = {this.hideInfo}
                                emotionalFacets = {this.state.emotionalFacets}
                                facetScore = {this.state.facetScore}
                                nextStep = {this.nextStep}
                                userName = {NAME}
                            />
                        </form>
                    </div>
                )
            
            case 2:
                return (
                    <div className="container"> 
                        <form className="self-review">
                            <Initiative
                                initiativeFacets = {this.state.initiativeFacets}
                                facetScore = {this.state.facetScore}
                                nextStep = {this.nextStep}
                                prevStep = {this.prevStep} 
                                userName = {NAME}
                            />
                        </form>
                    </div>
                )

            case 3:
                return (
                    <div className="container"> 
                        <form className="self-review">
                            <Trust
                                trustFacets = {this.state.trustFacets}
                                facetScore = {this.state.facetScore}
                                nextStep = {this.nextStep}
                                prevStep = {this.prevStep} 
                                userName = {NAME}
                            />
                        </form>
                    </div>
                )

            case 4:
                return (
                    <div className="container"> 
                        <form className="self-review">
                            <Flexibility
                                flexibilityFacets = {this.state.flexibilityFacets}
                                facetScore = {this.state.facetScore}
                                nextStep = {this.nextStep}
                                prevStep = {this.prevStep} 
                                userName = {NAME}
                            />
                        </form>
                    </div>
                )

            case 5:
                return (
                    <div className="container"> 
                        <form className="self-review">
                            <Resilience
                                resilienceFacets = {this.state.resilienceFacets}
                                facetScore = {this.state.facetScore}
                                nextStep = {this.nextStep}
                                prevStep = {this.prevStep} 
                                userName = {NAME}
                            />
                        </form>
                    </div>
                )
            case 6:
                return (
                    <div className="container"> 
                        <form className="self-review">
                            <Clarity
                                clarityFacets = {this.state.clarityFacets}
                                facetScore = {this.state.facetScore}
                                nextStep = {this.nextStep}
                                prevStep = {this.prevStep} 
                                userName = {NAME}
                            />
                        </form>
                    </div>
                )
            case 7:
                return (
                    <div className="container"> 
                        <form className="self-review">
                            <Culture
                                cultureFacets = {this.state.cultureFacets}
                                facetScore = {this.state.facetScore}
                                nextStep = {this.nextStep}
                                prevStep = {this.prevStep} 
                                userName = {NAME}
                            />
                        </form>
                    </div>
                )
            case 8:
                return (
                    <div className="container"> 
                        <form className="self-review">
                            <NonVerbal
                                nonVerbalFacets = {this.state.nonVerbalFacets}
                                facetScore = {this.state.facetScore}
                                nextStep = {this.nextStep}
                                prevStep = {this.prevStep} 
                                userName = {NAME}
                            />
                        </form>
                    </div>
                )
            case 9:
                return (
                    <div className="container"> 
                        <form className="self-review">
                            <Verbal
                                verbalFacets = {this.state.verbalFacets}
                                facetScore = {this.state.facetScore}
                                nextStep = {this.nextStep}
                                prevStep = {this.prevStep} 
                                userName = {NAME}
                                // submitSelfReview = {this.submitSelfReview}
                                emotionalFacets = {this.state.emotionalFacets}
                                initiativeFacets = {this.state.initiativeFacets}
                                trustFacets = {this.state.trustFacets}
                                flexibilityFacets = {this.state.flexibilityFacets}
                                resilienceFacets = {this.state.resilienceFacets}
                                clarityFacets = {this.state.clarityFacets}
                                cultureFacets = {this.state.cultureFacets}
                                nonVerbalFacets = {this.state.nonVerbalFacets}
                                TEAMID = {this.state.TEAMID}
                                USERID = {this.state.USERID}
                            />
                        </form>
                    </div>
                )
        }

        // return (
        //     <div className="container"> 
        //         <form className="self-review">

        //             <Initiative
        //                 nextStep = {this.nextStep}
        //                 prevStep = {this.prevStep} 
        //             />

        //         </form>
        //     </div>
        // )
        
    }
}

export default graphql(SUBMIT_SELF_REVIEW, {name: "SUBMIT_SELF_REVIEW"})(SelfReview);




