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

import React, { Component } from "react";
import "./Review.scss";
import Facet from "./Facet/Facet";
import { Redirect } from "react-router-dom";
import { JWT } from "../../constants";
import { LinearProgress } from "@material-ui/core";

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      submitting: false,
      facets: [
        {
          name: "Emotional Intelligence",
          desc:
            "Actively creates a pleasant human environment for work, show empathy, accountability, humility, friendliness and unselfishness",
          traits: [
            {
              name: "Emotional response",
              var: "emotionalResponse",
              val: 0,
              desc: "Response to emotions in others",
            },
            {
              name: "Empathy",
              var: "empathy",
              val: 0,
              desc: "Demonstrates empathy",
            },
            {
              name: "Manages own",
              var: "managesOwn",
              val: 0,
              desc: "Manages own emotions",
            },
          ],
        },
        {
          name: "Initiative",
          desc:
            "Proactive and self-starting; seize opportunities and act upon them; originate action and actively influence events",
          traits: [
            {
              name: "Proactive",
              var: "proactive",
              val: 0,
              desc: "Proactive and self-starting",
            },
            {
              name: "Influences",
              var: "influences",
              val: 0,
              desc: "Actively influences events",
            },
          ],
        },
        {
          name: "Moral Trust",
          desc: "Firm belief in the reliability, truth, or ability of someone",
          traits: [
            {
              name: "Faith",
              var: "faith",
              val: 0,
              desc: "",
            },
            {
              name: "Cooperatively",
              var: "cooperatively",
              val: 0,
              desc: "Is able to work cooperatively",
            },
            {
              name: "Positive belief",
              var: "positiveBelief",
              val: 0,
              desc: "Has a postive belief about the dependability of others",
            },
          ],
        },
        {
          name: "Flexibility",
          desc:
            "Be adaptable and receptive to new ideas; respond and adjust easily to changing work demands and circumstances; not bound by old ways of doing things",
          traits: [
            {
              name: "New ideas",
              var: "newIdeas",
              val: 0,
              desc: "Adaptable and receptive to new ideas",
            },
            {
              name: "Work demands",
              var: "workDemands",
              val: 0,
              desc: "Adjusts easily to change work demands",
            },
          ],
        },
        {
          name: "Clarity",
          desc: "",
          traits: [
            {
              name: "Clear instructions",
              var: "clearInstructions",
              val: 0,
              desc: "Gives clear instructions",
            },
            {
              name: "Prevents misunderstandings",
              var: "preventsMisunderstandings",
              val: 0,
              desc: "",
            },
            {
              name: "Complex ideas",
              var: "easilyExplainsComplexIdeas",
              val: 0,
              desc: "Easily explains complex ideas",
            },
          ],
        },
        {
          name: "Culture",
          desc: "",
          traits: [
            { name: "Open to share", var: "openToShare", val: 0, desc: "" },
            {
              name: "Tone",
              var: "tone",
              val: 0,
              desc: "",
            },
            { name: "Cross team", var: "crossTeam", val: 0, desc: "" },
          ],
        },
        {
          name: "Non-Verbal",
          desc: "",
          traits: [
            {
              name: "Distractions",
              var: "distractions",
              val: 0,
              desc: "Avoids distractions if at all possible",
            },
            {
              name: "Eye contact",
              var: "eyeContact",
              val: 0,
              desc: "During interactions demonstrates active listening by appearing relaxed, friendly facial expressions, open posture, eye contact, full attention and non-verbal acknowledgments",
            },
          ],
        },
        {
          name: "Verbal Attentiveness",
          desc: "",
          traits: [
            {
              name: "Signifies interest",
              var: "signifiesInterest",
              val: 0,
              desc: "Signifies interest in what other people have to say",
            },
            {
              name: "Verbal attentive feedback",
              var: "verbalAttentiveFeedback",
              val: 0,
              desc: "Is able to reflect on interaction and receive feedback",
            },
          ],
        },
        {
          name: "Resilience",
          desc:
            "Resilience is the ability to recover, re-bound or bounce back, adjust and even thrive after misfortune or change",
          traits: [
            {
              name: "Resilience feedback",
              var: "resilienceFeedback",
              val: 0,
              desc: "Accepts all forms of constructive feedback",
            },
            {
              name: "Calm",
              var: "calm",
              val: 0,
              desc: "Remains calm under pressure",
            },
            {
              name: "Change",
              var: "change",
              val: 0,
              desc: "Adapts to change easily",
            },
          ],
        },
      ],
    };

    if (!localStorage.getItem("review")) {
      localStorage.setItem("review", JSON.stringify({}));
    }
  }

  nextStep = () => {
    let { currentIndex } = this.state;
    currentIndex++;
    this.setState({
      ...this.state,
      currentIndex,
      submitting: currentIndex >= this.state.facets.length,
    });
    if (currentIndex >= this.state.facets.length) {
      this.submit();
    }
  };

  submit = async () => {
    const review = JSON.parse(localStorage.getItem("review"));
    const promises = [];
    const AUTH_TOKEN = localStorage.getItem(JWT);

    for (const team in review) {
      for (const user in review[team]) {
        try {
          const query = {
            query: `
              mutation {
                submitReview(
                  receiver_id: "${user}", 
                  team_id: "${team}", 
                  emotionalResponse: ${review[team][user]['emotionalResponse'].val}, 
                  empathy: ${review[team][user]['empathy'].val},
                  managesOwn: ${review[team][user]['managesOwn'].val},
                  faith: ${review[team][user]['faith'].val},
                  cooperatively: ${review[team][user]['cooperatively'].val},
                  positiveBelief: ${review[team][user]['positiveBelief'].val},
                  resilienceFeedback: ${review[team][user]['resilienceFeedback'].val},
                  calm: ${review[team][user]['calm'].val},
                  change: ${review[team][user]['change'].val},
                  newIdeas: ${review[team][user]['newIdeas'].val},
                  workDemands: ${review[team][user]['workDemands'].val},
                  proactive: ${review[team][user]['proactive'].val},
                  influences: ${review[team][user]['influences'].val},
                  clearInstructions: ${review[team][user]['clearInstructions'].val},
                  preventsMisunderstandings: ${review[team][user]['preventsMisunderstandings'].val},
                  easilyExplainsComplexIdeas: ${review[team][user]['easilyExplainsComplexIdeas'].val},
                  openToShare: ${review[team][user]['openToShare'].val},
                  tone: ${review[team][user]['tone'].val},
                  crossTeam: ${review[team][user]['crossTeam'].val},
                  distractions: ${review[team][user]['distractions'].val},
                  eyeContact: ${review[team][user]['eyeContact'].val},
                  signifiesInterest: ${review[team][user]['signifiesInterest'].val},
                  verbalAttentiveFeedback: ${review[team][user]['verbalAttentiveFeedback'].val}
                ) {
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
              }
            `
          };
          const options = {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'JWT': AUTH_TOKEN,
            },
            body: JSON.stringify(query)
          };
          promises.push(new Promise((r, f) => fetch('https://coreable.appspot.com/graphql', options).then(r)));
        } catch (err) {
          console.error({ err: err, path: 'Review.js' });
        }
      }
    }
    Promise.all(promises).then(() => {
      this.setState({
        ...this.state,
        submitting: false,
      });
    });
  };

  prevStep = () => {
    const { currentIndex } = this.state;
    this.setState({
      ...this.state,
      currentIndex: currentIndex - 1,
    });
  };

  render() {
    const { currentIndex } = this.state;
    const reviewDone = this.state.currentIndex >= this.state.facets.length;
    if (!localStorage.getItem(JWT)) {
      // TODO: move this to a prop
      return <Redirect to="/"></Redirect>;
    }
    if (reviewDone && !this.state.submitting) {
      return <Redirect to="/thank-you"></Redirect>;
    }
    if (reviewDone && this.state.submitting) {
      return <LinearProgress style={{ top: "12pt" }} />;
    }
    console.log(this.props.location);
    if (!this.props.location.state) {
      return <Redirect to="/"></Redirect>;
    }
    if (this.state.currentIndex <= -1) {
      return <Redirect to="/setup"></Redirect>;
    }
    return (
      <Facet
        pending={this.props.location.state.pending}
        {...this.state.facets[currentIndex]}
        nextStep={this.nextStep}
        prevStep={this.prevStep}
      ></Facet>
    );
  }
}

export default Review;
