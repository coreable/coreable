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
import {
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  Button
} from "@material-ui/core";
import { JWT, API_URL } from "../../../constants";
import Radar from "./Radar";
import HorizontalBar from "./HorizontalBarWithTeamChart";
import './ThankYou.scss';

class ThankYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      sorted: [],
      averages: {},
      reflection: {},
      strengths: [],
      improve: [],
      bright: [],
      blind: []
    };
  }

  async componentDidMount() {
    const query = {
      query: `
        query {
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
                    sorted {
                      value
                      field
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
      `
    };
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        JWT: localStorage.getItem(JWT),
      },
      body: JSON.stringify(query),
    };

    const res = await fetch(API_URL, options).then((data) => data.json());
    const { data, errors } = res.data.me;

    if (errors) {
      console.error(errors);
      return false;
    }

    // Chart Data
    let sorted;
    let averages;
    let reflection;
    let strengths;
    let improve;
    let bright;
    let blind;

    try {
      averages = this.calculateTeamAverage(data.user.reviews.report.average);
      reflection = this.calculateSelfAverage(data.user.reflection);
      strengths = this.getStrengthAreasTop3(data.user.reviews.report.sorted, data.user.reviews.report.average);
      improve = this.getImproveAreasTop3(data.user.reviews.report.sorted, data.user.reviews.report.average);
      bright = this.getBrightSpots(data.user.reviews.report.sorted, data.user.reflection);
      blind = this.getBlindSpots(data.user.reviews.report.sorted, data.user.reflection);
    } catch (err) {
      // Ignore
    }

    this.setState({
      ...this.state,
      loading: false,
      sorted,
      averages,
      reflection,
      strengths,
      improve,
      bright,
      blind
    });
  }

  getBrightSpots = (sorted, reflection) => {
    let result = [];
    try {
      for (const obj of sorted) {
        if (reflection[obj['field']] < obj['value']) {
          result.push({ field: obj['field'], self: reflection[obj['field']], team: obj['value'] });
        }
      }
      result = result.slice(0, 3);
    } catch (err) {
      console.error(err);
    }
    return result;
  }

  getBlindSpots = (sorted, reflection) => {
    let result = [];
    try {
      for (const obj of sorted) {
        if (reflection[obj['field']] > obj['value']) {
          result.push({ field: obj['field'], self: reflection[obj['field']], team: obj['value'] });
        }
      }
      result = result.slice(0, 3);
    } catch (err) {
      console.error(err);
    }
    return result;
  }

  getStrengthAreasTop3 = (sorted, reflection) => {
    const result = [];
    try {
      let clone = JSON.parse(JSON.stringify(sorted));
      clone = clone.reverse();
      clone = clone.slice(0, 3);
      for (let i = 0; i < clone.length; i++) {
        const selfScore = reflection[clone[i]['field']];
        if (!Number.isNaN(selfScore) && Number.isFinite(selfScore)) {
          clone[i]['value'] += selfScore;
          clone[i]['value'] /= 2;
        }
        result.push(clone[i]);
      }
      result.sort((a, b) => a.value - b.value).reverse();
    } catch (err) {
      console.error(err);
    }
    return result;
  }

  getImproveAreasTop3 = (sorted, reflection) => {
    const result = [];
    try {
      let clone = JSON.parse(JSON.stringify(sorted));
      clone = clone.slice(0, 3);
      for (let i = 0; i < clone.length; i++) {
        const selfScore = reflection[clone[i]['field']];
        if (!Number.isNaN(selfScore) && Number.isFinite(selfScore)) {
          clone[i]['value'] += selfScore;
          clone[i]['value'] /= 2;
        }
        result.push(clone[i]);
      }
      result.sort((a, b) => a.value - b.value);
    } catch (err) {
      console.error(err);
    }
    return result;
  }

  calculateSelfAverage = (reflection) => {
    const clone = JSON.parse(JSON.stringify(reflection));
    const result = {
      emotionalIntelligence: 0,
      initiative: 0,
      trust: 0,
      flex: 0,
      clarity: 0,
      culture: 0,
      nonVerbal: 0,
      attentive: 0,
      resilience: 0
    };
    try {
      result.emotionalIntelligence = (clone.emotionalResponse + clone.empathy + clone.managesOwn) / 3;
      result.initiative = (clone.proactive + clone.influences) / 2;
      result.trust = (clone.cooperatively + clone.positiveBelief) / 3;
      result.flex = (clone.newIdeas + clone.workDemands) / 2;
      result.clarity = clone.clearInstructions / 2;
      result.culture = (clone.openToShare + clone.tone + clone.crossTeam) / 3;
      result.nonVerbal = (clone.distractions + clone.eyeContact) / 2;
      result.attentive = (clone.signifiesInterest + clone.verbalAttentiveFeedback) / 2;
      result.resilience = (clone.resilienceFeedback + clone.calm + clone.change) / 3;
    } catch {
      console.log({ code: "ERR", message: 'Self review results threw an error', path: "ThankYou.js/calculateSelfAverage()" });
    }
    return result;
  }

  calculateTeamAverage = (averages) => {
    const clone = JSON.parse(JSON.stringify(averages));
    const result = {
      emotionalIntelligence: 0,
      initiative: 0,
      trust: 0,
      flex: 0,
      clarity: 0,
      culture: 0,
      nonVerbal: 0,
      attentive: 0,
      resilience: 0
    };
    try {
      result.emotionalIntelligence = (clone.emotionalResponse + clone.empathy + clone.managesOwn) / 3;
      result.initiative = (clone.proactive + clone.influences) / 2;
      result.trust = (clone.cooperatively + clone.positiveBelief) / 3;
      result.flex = (clone.newIdeas + clone.workDemands) / 2;
      result.clarity = clone.clearInstructions / 2;
      result.culture = (clone.openToShare + clone.tone + clone.crossTeam) / 3;
      result.nonVerbal = (clone.distractions + clone.eyeContact) / 2;
      result.attentive = (clone.signifiesInterest + clone.verbalAttentiveFeedback) / 2;
      result.resilience = (clone.resilienceFeedback + clone.calm + clone.change) / 3;
    } catch {
      console.log({ code: "ERR", message: 'Review results threw an error', path: "ThankYou.js/calculateTeamAverage()" });
    }
    return result;
  }

  render() {
    return (
      <div className="review-container">
        <div className="top-background">
          <Typography
            variant="h2"
            style={{ color: "white", fontWeight: "bold" }}
          >
            Your Skills
            </Typography>
          <p style={{ fontSize: "1.4rem" }}>
            {" "}

          </p>
          <Button variant="contained">
            All Core Skills
          </Button>
          <span style={{ marginLeft: '8pt', marginRight: '8pt' }}></span>
          <Button variant="contained">
            Collaboration
          </Button>
          <span style={{ marginLeft: '8pt', marginRight: '8pt' }}></span>
          <Button variant="contained">
            Communication
          </Button>
        </div>

        <div className="main">
          <Grid container direction="column" justify="center" alignItems="center">
            <Container>
              <Card variant="outlined">
                <Radar {...this.state} />
              </Card>
            </Container>
            <Container style={{ marginTop: '8pt', marginBottom: '8pt' }}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="stretch"
                spacing={1}
              >
                <Grid item>
                  <Container>
                    <Card variant="outlined">
                      <CardContent>
                        <div style={{ textAlign: 'left' }}>
                          <Typography variant="h4" component="h1" style={{ fontWeight: 'bold' }}>Top Strengths</Typography>
                          <Typography variant="h5" component="h1">Top facets are sorted highest to lowest</Typography>
                        </div>
                        <p>{JSON.stringify(this.state.strengths)}</p>
                      </CardContent>
                    </Card>
                  </Container>
                </Grid>
                <Grid item>
                  <Container>
                    <Card variant="outlined">
                      <CardContent>
                        <div style={{ textAlign: 'left' }}>
                          <Typography variant="h4" component="h1" style={{ fontWeight: 'bold' }}>Areas to improve</Typography>
                          <Typography variant="h5" component="h1">Top facets are sorted highest to lowest</Typography>
                        </div>
                        <p>{JSON.stringify(this.state.improve)}</p>
                      </CardContent>
                    </Card>
                  </Container>
                </Grid>
                <Grid item>
                  <Container>
                    <Card variant="outlined">
                      <CardContent>
                        <div style={{ textAlign: 'left' }}>
                          <Typography variant="h4" component="h1" style={{ fontWeight: 'bold' }}>Blind spots</Typography>
                          <Typography variant="h5" component="h1">Top facets are sorted highest to lowest</Typography>
                        </div>
                        {
                          this.state.blind.map((blind, index) => {
                            return (<HorizontalBar key={index} {...blind}></HorizontalBar>);
                          })
                        }
                      </CardContent>
                    </Card>
                  </Container>
                </Grid>
                <Grid item>
                  <Container>
                    <Card variant="outlined">
                      <CardContent>
                        <div style={{ textAlign: 'left' }}>
                          <Typography variant="h4" component="h1" style={{ fontWeight: 'bold' }}>Bright spots</Typography>
                          <Typography variant="h5" component="h1">Top facets are sorted highest to lowest</Typography>
                        </div>
                        {
                          this.state.bright.map((bright, index) => {
                            return (<HorizontalBar key={index} {...bright}></HorizontalBar>);
                          })
                        }
                      </CardContent>
                    </Card>
                  </Container>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </div>
      </div>
    );
  }
}

export default ThankYou;