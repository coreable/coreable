import React, { Component } from 'react';
import './Review.scss';
import Facet from './Facet/Facet';
import { Redirect } from 'react-router-dom';
import {
  TEAMID,
  JWT
} from '../../constants';
import {
  LinearProgress
} from '@material-ui/core';

class SelfReview extends Component {
  constructor() {
    super();

    this.state = {
      currentIndex: 0,
      submitting: false,
      facets: [
        {
          name: 'Emotional Intelligence',
          desc: 'Actively creates a pleasant human environment for work, show empathy, accountability, humility, friendliness and unselfishness',
          traits: [
            {
              var: 'emotionalResponse',
              val: 0,
              desc: 'Response to emotions in others',
            },
            {
              var: 'empathy',
              val: 0,
              desc: 'Demonstrates empathy'
            },
            {
              var: 'managesOwn',
              val: 0,
              desc: 'Manages own emotions'
            }
          ]
        },
        {
          name: 'Initiative',
          desc: 'Proactive and self-starting; seize opportunities and act upon them; originate action and actively influence events',
          traits: [
            {
              var: 'proactive',
              val: 0,
              desc: ''
            },
            {
              var: 'influences',
              val: 0,
              desc: ''
            }
          ]
        },
        {
          name: 'Moral Trust',
          desc: 'Firm belief in the reliability, truth, or ability of someone',
          traits: [
            {
              var: 'faith',
              val: 0,
              desc: ''
            },
            {
              var: 'cooperatively',
              val: 0,
              desc: 'Is able to work cooperatively'
            },
            {
              var: 'positiveBelief',
              val: 0,
              desc: 'Has a postive belief about the dependability of others'
            }
          ]
        },
        {
          name: 'Flexibility',
          desc: 'Be adaptable and receptive to new ideas; respond and adjust easily to changing work demands and circumstances; not bound by old ways of doing things',
          traits: [
            {
              var: 'newIdeas',
              val: 0,
              desc: 'Adaptable and receptive to new ideas'
            },
            {
              var: 'workDemands',
              val: 0,
              desc: 'Adjusts easily to change work demands'
            }
          ]
        },
        {
          name: 'Clarity',
          desc: '',
          traits: [
            {
              var: 'clearInstructions',
              val: 0,
              desc: ''
            },
            {
              var: 'preventsMisunderstandings',
              val: 0,
              desc: ''
            },
            {
              var: 'easilyExplainsComplexIdeas',
              val: 0,
              desc: ''
            }
          ]
        },
        {
          name: 'Culture',
          desc: '',
          traits: [
            {
              var: 'openToShare',
              val: 0,
              desc: ''
            },
            {
              var: 'tone',
              val: 0,
              desc: ''
            },
            {
              var: 'crossTeam',
              val: 0,
              desc: ''
            }
          ]
        },
        {
          name: 'Non-Verbal',
          desc: '',
          traits: [
            {
              var: 'distractions',
              val: 0,
              desc: ''
            },
            {
              var: 'eyeContact',
              val: 0,
              desc: ''
            }
          ]
        },
        {
          name: 'Verbal Attentiveness',
          desc: '',
          traits: [
            {
              var: 'signifiesInterest',
              val: 0,
              desc: ''
            },
            {
              var: 'verbalAttentiveFeedback',
              val: 0,
              desc: ''
            }
          ]
        },
        {
          name: 'Resilience',
          desc: 'Resilience is the ability to recover, re-bound or bounce back, adjust and even thrive after misfortune or change',
          traits: [
            {
              var: 'resilienceFeedback',
              val: 0,
              desc: 'Accepts all forms of constructive feedback'
            },
            {
              var: 'calm',
              val: 0,
              desc: 'Remains calm under pressure'
            },
            {
              var: 'change',
              val: 0,
              desc: 'Adapts to change easily'
            }
          ]
        }
      ]
    }
  }

  nextStep = () => {
    let { currentIndex } = this.state
    currentIndex++;
    this.setState({
      ...this.state,
      currentIndex,
      submitting: currentIndex >= this.state.facets.length
    });
    if (currentIndex >= this.state.facets.length) {
      this.submit();
    }
  }

  submit = async() => {
    let review = JSON.parse(localStorage.getItem("self-review"));
    console.log(review);
  }

  prevStep = () => {
    const { currentIndex } = this.state;
    this.setState({
      ...this.state,
      currentIndex: currentIndex - 1
    });
  }

  render() {
    const { currentIndex } = this.state;
    if (!localStorage.getItem(JWT)) {
      return (<Redirect to="/"></Redirect>);
    }
    if (this.state.currentIndex <= -1) {
      return (<Redirect to="/setup"></Redirect>);
    }
    if (!this.props.location.state.team_id) {
      return (<Redirect to="/setup"></Redirect>);
    }
    localStorage.setItem(TEAMID, this.props.location.state.team_id);
    if (this.state.currentIndex >= this.state.facets.length && this.state.submitting) {
      return (<LinearProgress style={{ top: '12pt' }} />);
    }
    if (this.state.currentIndex >= this.state.facets.length && !this.state.submitting) {
      return (<h1>Thank you</h1>);
    }
    return (
      <Facet {...this.state.facets[currentIndex]}
        nextStep={this.nextStep}
        prevStep={this.prevStep}></Facet>
    );
  }
}

export default SelfReview;
