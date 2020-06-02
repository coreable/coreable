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
} from "@material-ui/core";
import { Redirect, NavLink, Route } from "react-router-dom";
import { API_URL } from "../../constants";
import Radar from "./Radar";
import SkillBar from "./SkillBar/SkillBar";
import "./Skills.scss";

function Communication() {
  return <h1 style={{ color: "black" }}>Hello</h1>;
}

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
      teams: [],
    };
  }

  componentDidMount = async () => {
    this.props.ReactGA.pageview("/skills");

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
                teams {
                  _id
                  name
                }
                reviews {
                  report {
                    average {
                      calm
                      clearInstructions
                      cooperatively
                      crossTeam
                      distractions
                      easilyExplainsComplexIdeas
                      empathy
                      usesRegulators
                      influences
                      managesOwn
                      newIdeas
                      openToShare
                      positiveBelief
                      proactive
                      resilienceFeedback
                      signifiesInterest
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
                  clearInstructions
                  cooperatively
                  crossTeam
                  distractions
                  easilyExplainsComplexIdeas
                  empathy
                  usesRegulators
                  influences
                  managesOwn
                  newIdeas
                  openToShare
                  positiveBelief
                  proactive
                  resilienceFeedback
                  signifiesInterest
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
        JWT: this.props.app.JWT,
      },
      body: JSON.stringify(query),
    };

    const res = await fetch(API_URL, options).then((data) => data.json());
    const { data, errors } = res.data.me;

    if (errors) {
      console.error(errors);
      return false;
    }
    console.log(data);
    // Chart Data
    let sorted;
    let averages;
    let reflection;
    let strengths;
    let improve;
    let bright;
    let blind;
    let teams;

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
      teams = data.user.teams;
      console.log(teams);
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
      teams,
    });
  };

  getCorrectVariableName = (skill) => {
    if (skill === "calm") return "Calm";
    if (skill === "clearInstructions") return "Clear instructions";
    if (skill === "cooperatively") return "Cooperatively";
    if (skill === "crossTeam") return "Cross team";
    if (skill === "distractions") return "Distractions";
    if (skill === "easilyExplainsComplexIdeas")
      return "Easily explains complex ideas";
    if (skill === "empathy") return "Empathy";
    if (skill === "usesRegulators") return "Uses regluators";
    if (skill === "influences") return "Influences";
    if (skill === "managesOwn") return "Manages own";
    if (skill === "newIdeas") return "New ideas";
    if (skill === "openToShare") return "Open to share";
    if (skill === "positiveBelief") return "Positive belief";
    if (skill === "proactive") return "Proactive";
    if (skill === "resilienceFeedback") return "Resilience feedback";
    if (skill === "signifiesInterest") return "Signifies interest";
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
      // Collaboration
      result.emotionalIntelligence = (clone.empathy + clone.managesOwn) / 2;
      result.initiative = (clone.proactive + clone.influences) / 2;
      result.trust = (clone.cooperatively + clone.positiveBelief) / 2;
      result.flex = (clone.newIdeas + clone.workDemands) / 2;
      result.resilience = (clone.resilienceFeedback + clone.calm) / 2;

      // Communication
      result.clarity =
        (clone.clearInstructions + clone.easilyExplainsComplexIdeas) / 2;
      result.culture = (clone.openToShare + clone.crossTeam) / 2;
      result.nonVerbal = (clone.distractions + clone.usesRegulators) / 2;
      result.attentive = clone.signifiesInterest / 1;
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
      // Collaboration
      result.emotionalIntelligence = (clone.empathy + clone.managesOwn) / 2;
      result.initiative = (clone.proactive + clone.influences) / 2;
      result.trust = (clone.cooperatively + clone.positiveBelief) / 2;
      result.flex = (clone.newIdeas + clone.workDemands) / 2;
      result.resilience = (clone.resilienceFeedback + clone.calm) / 2;

      // Communication
      result.clarity =
        (clone.clearInstructions + clone.easilyExplainsComplexIdeas) / 2;
      result.culture = (clone.openToShare + clone.crossTeam) / 2;
      result.nonVerbal = (clone.distractions + clone.usesRegulators) / 2;
      result.attentive = clone.signifiesInterest / 1;
    } catch {
      console.log({
        code: "ERR",
        message: "Review results threw an error",
        path: "ThankYou.js/calculateTeamAverage()",
      });
    }
    return result;
  };

  // facetToggleHandler = (e) => {
  //   const btns = document.querySelectorAll(".facet-button");
  //   for (let i = 0; i < btns.length; i++) {
  //     btns[i].onClick = function() {
  //       console.log(this);
  //       this.classList.add("selected");
  //     };
  //   }
  // };

  render() {
    const btns = document.querySelectorAll(".facet-button");
    const tabs = document.querySelectorAll(".tab");

    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        this.classList.add("selected");
        if (i === 0) {
          btns[1].classList = "facet-button";
        } else {
          btns[0].classList = "facet-button";
        }
        btns[i].blur();
      });
    }

    for (let i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener("click", function() {
        this.classList.add("active");
        console.log(tabs[i].textContent);
        if (i === 0) {
          tabs[1].classList = "tab";
        } else {
          tabs[0].classList = "tab";
        }
      });
    }

    if (!this.props.app.data.user) {
      return <Redirect to="/"></Redirect>;
    }

    return (
      <div className="review-container">
        <div className="top-background"></div>

        <div className="skills-main">
          <div
            style={{
              paddingLeft: "0",
              paddingRight: "0",
              width: "100%",
            }}
          >
            <div className="skills-main-grid">
              <div className="skills-grid">
                <h1 style={{ color: "white" }}>Your Skills</h1>
                <p
                  style={{
                    fontSize: "1.4rem",
                    marginBottom: "35pt",
                    color: "#d6d6d6",
                  }}
                >
                  All marks are average of 5 assessments
                </p>
              </div>
            </div>
            <div className="skills-btns">
              <ul className="skills-grid">
                <div
                  style={{
                    gridColumn: "3/5",
                    textAlign: "left",
                  }}
                >
                  <li className="tab active">Collaboration</li>
                </div>
                <div
                  style={{
                    gridColumn: "5/7",
                    textAlign: "left",
                  }}
                >
                  <li className="tab">Communication</li>
                </div>
              </ul>
              <Route
                exact
                path="/skills/communication"
                component={Communication}
              />
            </div>
            <div className="skills-btns-dropdown">
              <button className="btn primarybtn">All Core Skills</button>
              {/* Dropdown menu after we complete the other pages */}
              {/* <div className="skills-dropdown-content">
                <ul>
                  <li>Collaboration</li>
                  <li>Communication</li>
                </ul>
              </div> */}
            </div>
          </div>
          {/* 
          <div className="radar-div">
            <Radar {...this.state} />
          </div> */}

          {/* <div>
            {(() => {
              if (
                this.state.strengths.length > 0 &&
                this.state.improve.length > 0
              ) {
                return (
                  <Typography
                    variant="h3"
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      marginTop: "40pt",
                    }}
                  >
                    Your facets
                  </Typography>
                );
              }
            })()}
          </div> */}

          <div className="main-skills-container">
            <div className="filter">
              <div
                style={{
                  display: "flex",
                  // justifyContent: "left",
                  borderRadius: "4px 4px 0 0",
                  alignItems: "center",
                  height: "30px",
                  background: "white",
                  padding: "24px",
                }}
              >
                <h1 style={{ fontSize: "24px" }}>Student dashboard</h1>
              </div>
              <div style={{ textAlign: "left", padding: "24px" }}>
                <span style={{ color: "#4070e0" }}>Team review</span>
                <span style={{ color: "#2dd775" }}>Self review</span>
                <div style={{ margin: "16px 0" }}>
                  <button
                    className="facet-button selected"
                    onClick={this.facetToggleHandler}
                  >
                    Facets
                  </button>
                  <button
                    className="facet-button"
                    onClick={this.facetToggleHandler}
                  >
                    Traits
                  </button>
                </div>
                <div>
                  <label>Team</label>
                  <br />
                  <select
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  >
                    <option>All</option>
                    {this.state.teams.map((team) => {
                      return (
                        <option value={team._id} key={team._id}>
                          {team.name.charAt(0).toUpperCase() +
                            team.name.slice(1)}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
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
                      <Container
                        style={{ paddingLeft: "0", paddingRight: "0" }}
                      >
                        <Card
                          variant="outlined"
                          style={{ maxHeight: "308pt", border: "none" }}
                        >
                          <CardContent style={{ margin: "0", padding: "0" }}>
                            <div
                              className="inside-main-content"
                              style={{ gridArea: "top-strength" }}
                            >
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
                      <Container
                        style={{ paddingLeft: "0", paddingRight: "0" }}
                      >
                        <Card
                          variant="outlined"
                          style={{ maxHeight: "308pt", border: "none" }}
                        >
                          <CardContent style={{ margin: "0", padding: "0" }}>
                            <div
                              className="inside-main-content"
                              style={{ gridArea: "areas-to-improve" }}
                            >
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
                                  return (
                                    <SkillBar key={idx} values={improve} />
                                  );
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
                      <Container
                        style={{ paddingLeft: "0", paddingRight: "0" }}
                      >
                        <Card
                          variant="outlined"
                          style={{ maxHeight: "308pt", border: "none" }}
                        >
                          <CardContent style={{ margin: "0", padding: "0" }}>
                            <div
                              className="inside-main-content"
                              style={{ gridArea: "over-estimation" }}
                            >
                              <Typography
                                variant="h4"
                                component="h1"
                                style={{
                                  fontWeight: "bold",
                                  paddingBottom: "5pt",
                                }}
                              >
                                Over estimation
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
                                  return (
                                    <SkillBar key={idx} values={improve} />
                                  );
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
                      <Container
                        style={{ paddingLeft: "0", paddingRight: "0" }}
                      >
                        <Card
                          variant="outlined"
                          style={{ maxHeight: "308pt", border: "none" }}
                        >
                          <CardContent style={{ margin: "0", padding: "0" }}>
                            <div
                              className="inside-main-content"
                              style={{ gridArea: "under-estimation" }}
                            >
                              <Typography
                                variant="h4"
                                component="h1"
                                style={{
                                  fontWeight: "bold",
                                  paddingBottom: "5pt",
                                }}
                              >
                                Under estimation
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
                                  return (
                                    <SkillBar key={idx} values={improve} />
                                  );
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
      </div>
    );
  }
}

export default Skills;
