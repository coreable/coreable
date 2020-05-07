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
import { JWT, API_URL } from "../../constants";
import Loader from "../components/Loading/Loading";

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
            "Ability to perceive, use, and understand our personality traits to manage and deal with emotions",
          traits: [
            {
              name: "Emotional response",
              var: "emotionalResponse",
              val: 0,
              desc: "Responds to emotions in others",
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
            "To be proactive and self-starting; seize opportunities and act upon them to actively influence events",
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
          name: "Trust",
          desc: "Firm belief in the reliability, truth, or ability of someone",
          traits: [
            {
              name: "Cooperatively",
              var: "cooperatively",
              val: 0,
              desc: "Ability to work cooperatively",
            },
            {
              name: "Positive belief",
              var: "positiveBelief",
              val: 0,
              desc: "Has a positive belief about the dependability of others",
            },
          ],
        },
        {
          name: "Flexibility",
          desc:
            "Adaptable and receptive to new ideas; responds and adjusts easily to changing work demands and circumstances; not bound by old ways of doing things",
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
              desc: "Adjusts easily to a change in work demands",
            },
          ],
        },
        {
          name: "Resilience",
          desc:
            "Ability to recover, adjust and even thrive after misfortune or change",
          traits: [
            {
              name: "Resilience feedback",
              var: "resilienceFeedback",
              val: 0,
              desc: "Accepts constructive feedback",
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
        {
          name: "Clarity",
          desc:
            "Provides clear instructions that encourage productivity and prevent misunderstanding",
          traits: [
            {
              name: "Clear instructions",
              var: "clearInstructions",
              val: 0,
              desc: "Gives clear instructions",
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
          desc:
            "Enables effective communication across all team members, delivers messages in an appropriate tone and cultivates an an open and supportive environment",
          traits: [
            {
              name: "Open to share",
              var: "openToShare",
              val: 0,
              desc: "Builds a strong sense of openness, trust and community",
            },
            {
              name: "Tone",
              var: "tone",
              val: 0,
              desc: "Encourages creative potential in others",
            },
            {
              name: "Cross team",
              var: "crossTeam",
              val: 0,
              desc:
                "Creates an environment where individuals feel safe to report errors",
            },
          ],
        },
        {
          name: "Non-Verbal Communication",
          desc:
            "Ability to stay engaged through body language, gestures, facial expressions and other ways of communication",
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
              desc:
                "Demonstrates active listening by appearing relaxed, friendly facial expressions, open posture, eye contact, full attention and non-verbal acknowledgments during interactions",
            },
          ],
        },
        {
          name: "Verbal Attentiveness",
          desc:
            "Practices active listening by paraphrasing, clarifying, reflective listening and asking questions.",
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
              desc:
                "Is able to self reflect on interaction and receive feedback",
            },
          ],
        },
      ],
    };

    if (!localStorage.getItem("review")) {
      localStorage.setItem("review", JSON.stringify({}));
    }
  }

  componentDidMount = () => {
    if (this.props.me) {
      this.props.ReactGA.pageview('/review');
    }
  }

  nextStep = () => {
    let { currentIndex } = this.state;
    currentIndex++;
    this.setState({
      ...this.state,
      currentIndex,
      submitting: currentIndex >= this.state.facets.length
    });
    if (currentIndex >= this.state.facets.length) {
      this.submit();
    }
  };

  prevStep = () => {
    const { currentIndex } = this.state;
    this.setState({
      ...this.state,
      currentIndex: currentIndex - 1
    });
  };

  submit = async () => {
    const review = JSON.parse(localStorage.getItem("review"));
    const promises = [];
    const AUTH_TOKEN = localStorage.getItem(JWT);
    const team_id = this.props.location.state.pending._id;
    const me_id = this.props.me._id;

    for (const user in review[me_id][team_id]) {
      try {
        const query = {
          query: `
            mutation {
              submitReview(
                receiver_id: "${user}", 
                team_id: "${team_id}", 
                subject_id: "${this.props.location.state.pending.subject._id}",
                emotionalResponse: ${review[me_id][team_id][user]["emotionalResponse"].val}, 
                empathy: ${review[me_id][team_id][user]["empathy"].val},
                managesOwn: ${review[me_id][team_id][user]["managesOwn"].val},
                cooperatively: ${review[me_id][team_id][user]["cooperatively"].val},
                positiveBelief: ${review[me_id][team_id][user]["positiveBelief"].val},
                resilienceFeedback: ${review[me_id][team_id][user]["resilienceFeedback"].val},
                calm: ${review[me_id][team_id][user]["calm"].val},
                change: ${review[me_id][team_id][user]["change"].val},
                newIdeas: ${review[me_id][team_id][user]["newIdeas"].val},
                workDemands: ${review[me_id][team_id][user]["workDemands"].val},
                proactive: ${review[me_id][team_id][user]["proactive"].val},
                influences: ${review[me_id][team_id][user]["influences"].val},
                clearInstructions: ${review[me_id][team_id][user]["clearInstructions"].val},
                easilyExplainsComplexIdeas: ${review[me_id][team_id][user]["easilyExplainsComplexIdeas"].val},
                openToShare: ${review[me_id][team_id][user]["openToShare"].val},
                tone: ${review[me_id][team_id][user]["tone"].val},
                crossTeam: ${review[me_id][team_id][user]["crossTeam"].val},
                distractions: ${review[me_id][team_id][user]["distractions"].val},
                eyeContact: ${review[me_id][team_id][user]["eyeContact"].val},
                signifiesInterest: ${review[me_id][team_id][user]["signifiesInterest"].val},
                verbalAttentiveFeedback: ${review[me_id][team_id][user]["verbalAttentiveFeedback"].val}
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
          `,
        };
        const options = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            [JWT]: AUTH_TOKEN,
          },
          body: JSON.stringify(query),
        };
        promises.push(
          new Promise((r, f) => {
            fetch(API_URL, options).then(r).catch(r);
          })
        );
      } catch (err) {
        console.error(err);
      }
    }

    Promise.all(promises).then(() => {
      this.setState({
        ...this.state,
        submitting: false
      }, () => {
        this.props.refreshMe();
        try {
          const reviews = JSON.parse(localStorage.getItem("review"));
          delete reviews[team_id];
          localStorage.setItem("review", JSON.stringify(reviews));
        } catch (err) {
          console.error(err);
        }
      });
    });
  };

  render() {
    const { currentIndex } = this.state;
    const reviewDone = this.state.currentIndex >= this.state.facets.length;

    /**
     * User is unauthenticated
     */
    if (!this.props.me && !this.props.loading) {
      return (<Redirect to="/"></Redirect>);
    }

    /**
     * User is still loading from the database
     */
    if (!this.props.me && this.props.loading) {
      return (<div></div>);
    }

    /**
     * Review was submitted successfully
     */
    if (reviewDone && !this.state.submitting) {
      return (<Redirect to="/skills"></Redirect>);
    }

    /**
     * Review is currently being submitted
     */
    if (reviewDone && this.state.submitting) {
      return (<Loader />);
    }

    /**
     * Something went wrong and no team was loaded with the review component
     */
    if (!this.props.location.state) {
      return (<Redirect to="/"></Redirect>);
    }

    /**
     * The user hit the back button too many times
     */
    if (this.state.currentIndex <= -1) {
      return (<Redirect to="/home"></Redirect>);
    }

    return (
      <Facet
        pending={this.props.location.state.pending}
        currentIndex={this.state.currentIndex}
        facetLength={this.state.facets.length}
        {...this.state.facets[currentIndex]}
        nextStep={this.nextStep}
        prevStep={this.prevStep}
        me={this.props.me}
        ReactGA={this.props.ReactGA}
      ></Facet>
    );
  }
}

export default Review;
