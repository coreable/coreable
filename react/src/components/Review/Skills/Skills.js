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
  Button,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { JWT, API_URL } from "../../../constants";
import Radar from "./Radar";
import SkillBar from "./SkillBar/SkillBar";
import "./Skills.scss";

class Skills extends Component {
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
      blind: [],
    };
  }

  componentDidMount = async () => {
    if (this.props.me) {
      this.props.ReactGA.pageview("/skills");
    }

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
      `,
    };
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        [JWT]: localStorage.getItem(JWT),
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
      strengths = this.getStrengthAreasTop3(
        data.user.reviews.report.sorted,
        data.user.reviews.report.average
      );
      improve = this.getImproveAreasTop3(
        data.user.reviews.report.sorted,
        data.user.reviews.report.average
      );
      bright = this.getBrightSpots(
        data.user.reviews.report.sorted,
        data.user.reflection
      );
      blind = this.getBlindSpots(
        data.user.reviews.report.sorted,
        data.user.reflection
      );
      console.log(bright);
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
      blind,
    });
  };

  getCorrectVariableName = (skill) => {
    if (skill === "calm") return "Calm";
    if (skill === "change") return "Change";
    if (skill === "clearInstructions") return "Clear instructions";
    if (skill === "cooperatively") return "Cooperatively";
    if (skill === "crossTeam") return "Cross team";
    if (skill === "distractions") return "Distractions";
    if (skill === "easilyExplainsComplexIdeas")
      return "Easily explains complex ideas";
    if (skill === "emotionalResponse") return "Emotional response";
    if (skill === "empathy") return "Empathy";
    if (skill === "eyeContact") return "Eye contact";
    if (skill === "influences") return "Influences";
    if (skill === "managesOwn") return "Manages own";
    if (skill === "newIdeas") return "New ideas";
    if (skill === "openToShare") return "Open to share";
    if (skill === "positiveBelief") return "Positive belief";
    if (skill === "proactive") return "Proactive";
    if (skill === "resilienceFeedback") return "Resilience feedback";
    if (skill === "signifiesInterest") return "Signifies interest";
    if (skill === "tone") return "Tone";
    if (skill === "verbalAttentiveFeedback") return "Verbal attentive feeback";
    if (skill === "workDemands") return "Work demands";
    return "";
  };

  getBrightSpots = (sorted, reflection) => {
    let result = [];
    try {
      for (const obj of sorted) {
        if (reflection[obj["field"]] < obj["value"]) {
          if (!Number.isNaN(obj["value"]) && Number.isFinite(obj["value"])) {
            if (
              !Number.isNaN(reflection[obj["field"]]) &&
              Number.isFinite(reflection[obj["field"]])
            ) {
              result.push({
                field: obj["field"],
                name: this.getCorrectVariableName(obj["field"]),
                self: reflection[obj["field"]],
                team: obj["value"],
              });
            }
          }
        }
      }
      result = result.slice(0, 3);
    } catch (err) {
      console.error(err);
    }
    return result;
  };

  getBlindSpots = (sorted, reflection) => {
    let result = [];
    try {
      for (const obj of sorted) {
        if (reflection[obj["field"]] > obj["value"]) {
          if (!Number.isNaN(obj["value"]) && Number.isFinite(obj["value"])) {
            if (
              !Number.isNaN(reflection[obj["field"]]) &&
              Number.isFinite(reflection[obj["field"]])
            ) {
              result.push({
                field: obj["field"],
                name: this.getCorrectVariableName(obj["field"]),
                self: reflection[obj["field"]],
                team: obj["value"],
              });
            }
          }
        }
      }
      result = result.slice(0, 3);
    } catch (err) {
      console.error(err);
    }
    return result;
  };

  getStrengthAreasTop3 = (sorted, reflection) => {
    const result = [];
    try {
      let clone = JSON.parse(JSON.stringify(sorted));
      clone = clone.reverse();
      clone = clone.slice(0, 3);
      for (let i = 0; i < clone.length; i++) {
        const selfScore = reflection[clone[i]["field"]];
        if (!Number.isNaN(selfScore) && Number.isFinite(selfScore)) {
          clone[i]["value"] += selfScore;
          clone[i]["value"] /= 2;
        }
        if (
          !Number.isNaN(clone[i]["value"]) &&
          Number.isFinite(clone[i]["value"])
        ) {
          result.push({
            ...clone[i],
            name: this.getCorrectVariableName(clone[i]["field"]),
          });
        }
      }
      result.sort((a, b) => a.value - b.value).reverse();
    } catch (err) {
      console.error(err);
    }
    return result;
  };

  getImproveAreasTop3 = (sorted, reflection) => {
    const result = [];
    try {
      let clone = JSON.parse(JSON.stringify(sorted));
      clone = clone.slice(0, 3);
      for (let i = 0; i < clone.length; i++) {
        const selfScore = reflection[clone[i]["field"]];
        if (!Number.isNaN(selfScore) && Number.isFinite(selfScore)) {
          clone[i]["value"] += selfScore;
          clone[i]["value"] /= 2;
        }
        if (
          !Number.isNaN(clone[i]["value"]) &&
          Number.isFinite(clone[i]["value"])
        ) {
          result.push({
            ...clone[i],
            name: this.getCorrectVariableName(clone[i]["field"]),
          });
        }
      }
      result.sort((a, b) => a.value - b.value);
    } catch (err) {
      console.error(err);
    }
    return result;
  };

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
      resilience: 0,
    };
    try {
      result.emotionalIntelligence =
        (clone.emotionalResponse + clone.empathy + clone.managesOwn) / 3;
      result.initiative = (clone.proactive + clone.influences) / 2;
      result.trust = (clone.cooperatively + clone.positiveBelief) / 2;
      result.flex = (clone.newIdeas + clone.workDemands) / 2;
      result.clarity = clone.clearInstructions / 1;
      result.culture = (clone.openToShare + clone.tone + clone.crossTeam) / 3;
      result.nonVerbal = (clone.distractions + clone.eyeContact) / 2;
      result.attentive =
        (clone.signifiesInterest + clone.verbalAttentiveFeedback) / 2;
      result.resilience =
        (clone.resilienceFeedback + clone.calm + clone.change) / 3;
    } catch {
      console.log({
        code: "ERR",
        message: "Self review results threw an error",
        path: "ThankYou.js/calculateSelfAverage()",
      });
    }
    return result;
  };

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
      resilience: 0,
    };
    try {
      result.emotionalIntelligence =
        (clone.emotionalResponse + clone.empathy + clone.managesOwn) / 3;
      result.initiative = (clone.proactive + clone.influences) / 2;
      result.trust = (clone.cooperatively + clone.positiveBelief) / 3;
      result.flex = (clone.newIdeas + clone.workDemands) / 2;
      result.clarity = clone.clearInstructions / 1;
      result.culture = (clone.openToShare + clone.tone + clone.crossTeam) / 3;
      result.nonVerbal = (clone.distractions + clone.eyeContact) / 2;
      result.attentive =
        (clone.signifiesInterest + clone.verbalAttentiveFeedback) / 2;
      result.resilience =
        (clone.resilienceFeedback + clone.calm + clone.change) / 3;
    } catch {
      console.log({
        code: "ERR",
        message: "Review results threw an error",
        path: "ThankYou.js/calculateTeamAverage()",
      });
    }
    return result;
  };

  render() {
    if (!this.props.me && !this.props.loading) {
      return <Redirect to="/"></Redirect>;
    }

    if (!this.props.me && this.props.loading) {
      return <div></div>;
    }

    return (
      <div className="review-container">
        <div className="top-background">
          <Typography
            variant="h2"
            style={{ color: "white", fontWeight: "bold", marginTop: "40pt" }}
          >
            Your Skills
          </Typography>
          <p
            style={{
              fontSize: "1.4rem",
              fontWeight: "bold",
              marginBottom: "35pt",
              color: "#d6d6d6",
            }}
          >
            All marks are average of 5 assessments{" "}
          </p>
          <div className="skills-btns">
            <button className="btn primarybtn">All Core Skills</button>
            <button className="btn primarybtn" disabled>
              Collaboration
            </button>
            <button className="btn primarybtn" disabled>
              Communication
            </button>
          </div>
          <div className="skills-btns-dropdown">
            <button className="btn primarybtn">All Core Skills</button>
            <div className="skills-dropdown-content">
              <ul>
                <li>Collaboration</li>
                <li>Communication</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="main">
          <div
            style={{
              paddingLeft: "0",
              paddingRight: "0",
              margin: "6px",
              width: "100%",
              // height: "448pt",
            }}
          >
            <Card variant="outlined" style={{ border: "1px solid lightgrey" }}>
              <Radar {...this.state} />
            </Card>
          </div>
          <div
            style={{
              marginTop: "8pt",
              marginBottom: "50pt",
              padding: "0",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {(() => {
              if (this.state.strengths.length > 0) {
                return (
                  <Grid className="inside-main">
                    <Container style={{ paddingLeft: "0", paddingRight: "0" }}>
                      <Card
                        variant="outlined"
                        style={{ maxHeight: "308pt", border: "none" }}
                      >
                        <CardContent style={{ margin: "0", padding: "0" }}>
                          <div className="inside-main-content">
                            <Typography
                              variant="h4"
                              component="h1"
                              style={{
                                fontWeight: "bold",
                                paddingBottom: "5pt",
                              }}
                            >
                              Top Strengths
                            </Typography>
                            <Typography
                              variant="h6"
                              component="h1"
                              style={{
                                color: "rgb(97,103,121",
                                fontWeight: "bold",
                              }}
                            >
                              Top facets are sorted highest to lowest
                            </Typography>

                            {this.state.strengths.map((strength, idx) => {
                              return <SkillBar key={idx} values={strength} />;
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    </Container>
                  </Grid>
                );
              }
            })()}
            {(() => {
              if (this.state.improve.length > 0) {
                return (
                  <Grid className="inside-main">
                    <Container style={{ paddingLeft: "0", paddingRight: "0" }}>
                      <Card
                        variant="outlined"
                        style={{ maxHeight: "308pt", border: "none" }}
                      >
                        <CardContent style={{ margin: "0", padding: "0" }}>
                          <div className="inside-main-content">
                            <Typography
                              variant="h4"
                              component="h1"
                              style={{
                                fontWeight: "bold",
                                paddingBottom: "5pt",
                              }}
                            >
                              Areas to improve
                            </Typography>
                            <Typography
                              variant="h6"
                              component="h1"
                              style={{
                                color: "rgb(97,103,121",
                                fontWeight: "bold",
                              }}
                            >
                              Top facets are sorted highest to lowest
                            </Typography>
                            {this.state.improve.sort((a, b) => {
                              return b.value - a.value;
                            }) &&
                              this.state.improve.map((improve, idx) => {
                                return <SkillBar key={idx} values={improve} />;
                              })}
                          </div>
                        </CardContent>
                      </Card>
                    </Container>
                  </Grid>
                );
              }
            })()}
            {(() => {
              if (this.state.blind.length > 0) {
                return (
                  <Grid className="inside-main">
                    <Container style={{ paddingLeft: "0", paddingRight: "0" }}>
                      <Card
                        variant="outlined"
                        style={{ maxHeight: "308pt", border: "none" }}
                      >
                        <CardContent style={{ margin: "0", padding: "0" }}>
                          <div className="inside-main-content">
                            <Typography
                              variant="h4"
                              component="h1"
                              style={{
                                fontWeight: "bold",
                                paddingBottom: "5pt",
                              }}
                            >
                              Blind spots
                            </Typography>
                            <Typography
                              variant="h6"
                              component="h1"
                              style={{
                                color: "rgb(97,103,121",
                                fontWeight: "bold",
                              }}
                            >
                              Top facets are sorted highest to lowest
                            </Typography>
                            {this.state.blind.sort((a, b) => {
                              return b.self - a.self;
                            }) &&
                              this.state.blind.map((improve, idx) => {
                                return <SkillBar key={idx} values={improve} />;
                              })}
                          </div>
                        </CardContent>
                      </Card>
                    </Container>
                  </Grid>
                );
              }
            })()}
            {(() => {
              if (this.state.bright.length > 0) {
                return (
                  <Grid className="inside-main">
                    <Container style={{ paddingLeft: "0", paddingRight: "0" }}>
                      <Card
                        variant="outlined"
                        style={{ maxHeight: "308pt", border: "none" }}
                      >
                        <CardContent style={{ margin: "0", padding: "0" }}>
                          <div className="inside-main-content">
                            <Typography
                              variant="h4"
                              component="h1"
                              style={{
                                fontWeight: "bold",
                                paddingBottom: "5pt",
                              }}
                            >
                              Bright spots
                            </Typography>
                            <Typography
                              variant="h6"
                              component="h1"
                              style={{
                                color: "rgb(97,103,121",
                                fontWeight: "bold",
                              }}
                            >
                              Top facets are sorted highest to lowest
                            </Typography>
                            {this.state.bright.sort((a, b) => {
                              return b.team - a.team;
                            }) &&
                              this.state.bright.map((improve, idx) => {
                                return <SkillBar key={idx} values={improve} />;
                              })}
                          </div>
                        </CardContent>
                      </Card>
                    </Container>
                  </Grid>
                );
              }
            })()}
          </div>
        </div>
      </div>
    );
  }
}

export default Skills;
