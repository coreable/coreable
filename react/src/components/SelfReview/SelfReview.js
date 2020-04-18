import React, { Component } from 'react';
import './SelfReview.css';
// import SelfScore  from './SelfScore/SelfScore';
import EmotionalIntelligence from './Emotional/EmotionalIntelligence';
import Initiative from './Initiative/Initiative';
import Trust from './Trust/Trust';
import Flexibility from './Flexibility/Flexibility';
import Resilience from './Resilience/Resilience';

import { USER_NAME } from '../../constants';

class SelfReview extends Component {

  state = {
    step: 1,
    //added facets in the parent component to store its state
    emotionalFacets: [{
      name: "Responds to emotions in others",
      rating: 0,
    }, {
      name: "Demonstrates empathy",
      rating: 0,
    }, {
      name: "Manages own emotions",
      rating: 0,
    }
    ],
    initiativeFacets: [{
      name: "Responds to emotions in others",
      rating: 0,
    }, {
      name: "Demonstrates empathy",
      rating: 0,
    }, {
      name: "Manages own emotions",
      rating: 0,
    }
    ],
    trustFacets: [{
      name: "Is able to work cooperatively",
      rating: 0,
    }, {
      name: "Has a postive belief about the dependability of others",
      rating: 0,
    }
    ],
    flexibilityFacets: [{
      name: "Adaptable and receptive to new ideas",
      rating: 0,
    }, {
      name: "Adjusts easily to change work demands",
      rating: 0,
    }
    ],
    resilienceFacets: [{
      name: "Accepts all forms of constructive feedback",
      rating: 0,
    }, {
      name: "Remains calm under pressure",
      rating: 0,
    }, {
      name: "Adapts to change easily",
      rating: 0,
    }
    ],
    facetScore: [
      {
        title: "Fails",
        info: "Neglects to attempt"
      },
      {
        title: "Fails",
        info: "Neglects to attempt"
      },

      {
        title: "Under prompting",
        info: "Neglects to attempt"
      },
      {
        title: "Under prompting",
        info: "Neglects to attempt"
      },
      {
        title: "Under prompting",
        info: "Neglects to attempt"
      },

      {
        title: "Habitually",
        info: "By way of habit: customarily"
      },
      {
        title: "Habitually",
        info: "By way of habit: customarily"
      },

      {
        title: "Encourages others",
        info: "Gives support and confidence"
      },
      {
        title: "Encourages others",
        info: "Gives support and confidence"
      },

      {
        title: "Teaches",
        info: "Shares experience and guides"
      },
      {
        title: "Teaches",
        info: "Shares experience and guides"
      }
    ],
    showInfo: true,
  }

  //go to next page via switch
  nextStep = () => {
    //destructing - taking it out of state
    const { step } = this.state
    this.setState({
      step: step + 1
    })
  }

  //go to previous page via switch
  prevStep = () => {
    //destructing - taking it out of state
    const { step } = this.state
    this.setState({
      step: step - 1
    })
  }

  hideInfo = () => {
    const { showInfo } = this.state
    this.setState({
      showInfo: !showInfo
    })
  }

  // handleRatingChange = (e) => this.setState({facetRating: e.target.value})
  // handleSliderChange = (e) => this.setState({slider: e.target.value})

  render() {

    const NAME = localStorage.getItem(USER_NAME)
    const { step } = this.state

    switch (step) {
      case 1:
        return (
          <div className="container">
            <form className="self-review">
              <EmotionalIntelligence
                showInfo={this.state.showInfo}
                hideInfo={this.hideInfo}
                emotionalFacets={this.state.emotionalFacets}
                facetScore={this.state.facetScore}
                nextStep={this.nextStep}
                userName={NAME}
              />
            </form>
          </div>
        )

      case 2:
        return (
          <div className="container">
            <form className="self-review">
              <Initiative
                initiativeFacets={this.state.initiativeFacets}
                facetScore={this.state.facetScore}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                userName={NAME}
              />
            </form>
          </div>
        )

      case 3:
        return (
          <div className="container">
            <form className="self-review">
              <Trust
                trustFacets={this.state.trustFacets}
                facetScore={this.state.facetScore}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                userName={NAME}
              />
            </form>
          </div>
        )

      case 4:
        return (
          <div className="container">
            <form className="self-review">
              <Flexibility
                flexibilityFacets={this.state.flexibilityFacets}
                facetScore={this.state.facetScore}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                userName={NAME}
              />
            </form>
          </div>
        )

      case 5:
        return (
          <div className="container">
            <form className="self-review">
              <Resilience
                resilienceFacets={this.state.resilienceFacets}
                facetScore={this.state.facetScore}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                userName={NAME}
              />
            </form>
          </div>
        )
      default:
        console.log('ERROR!!!') // TODO : default case
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

export default SelfReview



