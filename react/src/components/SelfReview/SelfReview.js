/*
===========================================================================
Copyright (C) 2020 Coreable
This file is part of Coreable's source code.
Corables source code is free software; you can redistribute it
and/or modify it under the terms of the End-user license agreement.
Coreable's source code is distributed in the hope that it will be
useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
You should have received a copy of the license along with the 
Coreable source code.
===========================================================================
*/

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
  constructor(props) {
    super(props);

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

  submit = async () => {
    const review = JSON.parse(localStorage.getItem("self-review"));
    const query = {
      query: `
  mutation {
    submitReview(
      receiver_id: "${review.user_id}", 
      team_id: "${review.team_id}", 
      emotionalResponse: ${review.emotionalResponse}, 
      empathy: ${review.empathy},
      managesOwn: ${review.managesOwn},
      faith: ${review.faith},
      cooperatively: ${review.cooperatively},
      positiveBelief: ${review.positiveBelief},
      resilienceFeedback: ${review.resilienceFeedback},
      calm: ${review.calm},
      change: ${review.change},
      newIdeas: ${review.newIdeas},
      workDemands: ${review.workDemands},
      proactive: ${review.proactive},
      influences: ${review.influences},
      clearInstructions: ${review.clearInstructions},
      preventsMisunderstandings: ${review.preventsMisunderstandings},
      easilyExplainsComplexIdeas: ${review.easilyExplainsComplexIdeas},
      openToShare: ${review.openToShare},
      tone: ${review.tone},
      crossTeam: ${review.crossTeam},
      distractions: ${review.distractions},
      eyeContact: ${review.eyeContact},
      signifiesInterest: ${review.signifiesInterest},
      verbalAttentiveFeedback: ${review.verbalAttentiveFeedback}) {
      errors {
        path
        code
        message
      }
      data {
        review {
          _id
        }
      }
    }
  }`}
    fetch('https://coreable.appspot.com/graphql', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'JWT': localStorage.getItem(JWT),
      },
      body: JSON.stringify(query)
    }).then(async (data) => {
      // const result = await data.json();
      // todo: not ignore this
      this.setState({
        ...this.state,
        submitting: false,
        review: review
       });
    });
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
    if (this.state.currentIndex >= this.state.facets.length && !this.state.submitting) {
      return (<Redirect to="/thank-you"></Redirect>);
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
    return (
      <Facet {...this.state.facets[currentIndex]}
        nextStep={this.nextStep}
        prevStep={this.prevStep}></Facet>
    );
  }
}

export default SelfReview;
