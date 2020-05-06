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
import { Grid, Typography, Container } from "@material-ui/core";
import { JWT } from "../../../constants";
import Chart from "./Chart";
// import Navbar from "../../Navbar2/Navbar";

// import { LinearProgress } from "@material-ui/core";

class ThankYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      averages: {},
      reflection: {},
      firstName: props.me.firstName,
    };
  }

  componentDidMount() {
    let query = {
      query: `query {
        me {
          errors {
            code
            path
            message
          }
          data {
            user {
              reviews {
                report {
                  average {
                    calm
                    change
                    clearInstructions
                    cooperatively
                    crossTeam
                    distractions
                    easilyExplainsComplexIdeas
                    emotionalResponse
                    empathy
                    eyeContact
                    influences
                    managesOwn
                    newIdeas
                    openToShare
                    positiveBelief
                    proactive
                    resilienceFeedback
                    signifiesInterest
                    tone
                    verbalAttentiveFeedback
                    workDemands
                  }
                }
              }
              reflection {
                calm
                change
                clearInstructions
                cooperatively
                crossTeam
                distractions
                easilyExplainsComplexIdeas
                emotionalResponse
                empathy
                eyeContact
                influences
                managesOwn
                newIdeas
                openToShare
                positiveBelief
                proactive
                resilienceFeedback
                signifiesInterest
                tone
                verbalAttentiveFeedback
                workDemands
              }
            }
          }
        }
      }
    `,
    };
    fetch("https://coreable.appspot.com/graphql", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        JWT: localStorage.getItem(JWT),
      },
      body: JSON.stringify(query),
    }).then(async (data) => {
      const result = await data.json();
      let averages;
      let reflection;

      try {
        averages = result.data.me.data.user.reviews.report.average;
        reflection = result.data.me.data.user.reflection;
      } catch (err) {
        return false;
      }

      let emotionalIntelligence = 0;
      let initiative = 0;
      let trust = 0;
      let flex = 0;
      let clarity = 0;
      let culture = 0;
      let nonVerbal = 0;
      let attentive = 0;
      let resilience = 0;

      try {
        emotionalIntelligence =
          (averages.emotionalResponse +
            averages.empathy +
            averages.managesOwn) /
          3;
        initiative = (averages.proactive + averages.influences) / 2;
        trust = (averages.cooperatively + averages.positiveBelief) / 3;
        flex = (averages.newIdeas + averages.workDemands) / 2;
        clarity = averages.clearInstructions / 2;
        culture =
          (averages.openToShare + averages.tone + averages.crossTeam) / 3;
        nonVerbal = (averages.distractions + averages.eyeContact) / 2;
        attentive =
          (averages.signifiesInterest + averages.verbalAttentiveFeedback) / 2;
        resilience =
          (averages.resilienceFeedback + averages.calm + averages.change) / 3;
        averages = {
          emotionalIntelligence,
          initiative,
          trust,
          flex,
          clarity,
          culture,
          nonVerbal,
          attentive,
          resilience,
        };
      } catch {
        console.log({
          code: "ERR",
          message: "Review results threw an error",
          path: "ThankYou.js",
        });
      }

      try {
        emotionalIntelligence =
          (reflection.emotionalResponse +
            reflection.empathy +
            reflection.managesOwn) /
          3;
        initiative = (reflection.proactive + reflection.influences) / 2;
        trust = (reflection.cooperatively + reflection.positiveBelief) / 3;
        flex = (reflection.newIdeas + reflection.workDemands) / 2;
        clarity = reflection.clearInstructions / 2;
        culture =
          (reflection.openToShare + reflection.tone + reflection.crossTeam) / 3;
        nonVerbal = (reflection.distractions + reflection.eyeContact) / 2;
        attentive =
          (reflection.signifiesInterest + reflection.verbalAttentiveFeedback) /
          2;
        resilience =
          (reflection.resilienceFeedback +
            reflection.calm +
            reflection.change) /
          3;
        reflection = {
          emotionalIntelligence,
          initiative,
          trust,
          flex,
          clarity,
          culture,
          nonVerbal,
          attentive,
          resilience,
        };
      } catch {
        console.log({
          code: "ERR",
          message: "Self review results threw an error",
          path: "ThankYou.js",
        });
      }

      this.setState({
        ...this.state,
        loading: false,
        averages,
        reflection,
      });
    });
  }

  render() {
    return (
      <div
        style={{
          background: "rgb(245, 245, 245)",
          position: "relative",
          margin: "0 auto",
          alignItems: "center",
          width: "100%",
          display: "flex",

          minHeight: "100%",
        }}
      >
        <Grid container direction="column" justify="center" alignItems="center">
          <Container style={{ textAlign: "left", marginTop: "20px" }}>
            <Typography
              variant="h3"
              component="h1"
              style={{
                fontWeight: "bold",
                marginTop: "48pt",
                textAlign: "left",
                color: "#000",
              }}
            >
              Thank you {this.state.firstName},
            </Typography>
            <Typography
              variant="h3"
              component="h1"
              style={{ textAlign: "left", color: "#707070" }}
            >
              here are your results
            </Typography>
          </Container>
          <Container>
            <Chart {...this.state} />
          </Container>
        </Grid>
      </div>
    );
  }
}

export default ThankYou;
