/*
===========================================================================
Copyright (C) 2020 Coreable
This file is part of Coreable's source code.
Coreables source code is free software; you can redistribute it
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
  Redirect,
  // Route
} from "react-router-dom";
import { API_URL } from "../../constants";
// import Radar from "./Radar";
import SkillBar from "./SkillBar/SkillBar";
import "./Skills.scss";
// import { ListItemAvatar } from "@material-ui/core";

let collabState = "collaboration";
let traitState = "trait";

class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      sorted: [],
      averages: {},
      averagesRaw: {},
      reflection: {},
      reflectionRaw: {},
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
    // Chart Data
    let sorted;
    let averages;
    let averagesRaw;
    let reflection;
    let reflectionRaw;
    let strengths;
    let improve;
    let bright;
    let blind;
    let teams;

    try {
      sorted = data.user.reviews.report.sorted;
      averages = this.calculateTeamAverage(data.user.reviews.report.average);
      averagesRaw = data.user.reviews.report.average;
      reflection = this.calculateSelfAverage(data.user.reflection);
      reflectionRaw = data.user.reflection;
      //top strengths
      strengths = this.getStrengthAreas(
        data.user.reviews.report.sorted,
        data.user.reviews.report.average
      );
      strengths = this.filterByCommCollab(strengths, "collaboration");
      //areas to improve
      improve = this.getImproveAreas(
        data.user.reviews.report.sorted,
        data.user.reviews.report.average
      );
      improve = this.filterByCommCollab(improve, "collaboration");
      //brightspots
      bright = this.getBrightSpots(
        data.user.reviews.report.sorted,
        data.user.reflection
      );
      bright = this.filterByCommCollab(bright, "collaboration");
      //blindspots
      blind = this.getBlindSpots(
        data.user.reviews.report.sorted,
        data.user.reflection
      );
      blind = this.filterByCommCollab(blind, "collaboration");
      teams = data.user.teams;
      console.log(blind);
    } catch (err) {
      // Ignore
    }

    this.setState({
      ...this.state,
      loading: false,
      sorted,
      averages,
      averagesRaw,
      reflection,
      reflectionRaw,

      strengths,
      improve,
      bright,
      blind,
      teams,
    });
  };

  getCorrectVariableName = (skill) => {
    if (skill === "calm")
      return [
        "Remains calm under pressure",
        "Calm",
        "Resilience",
        "collaboration",
      ];
    if (skill === "clearInstructions")
      return [
        "Gives clear instructions",
        "Clear instructions",
        "Clarity",
        "communication",
      ];
    if (skill === "cooperatively")
      return [
        "Is able to work cooperatively",
        "Cooperatively",
        "Trust",
        "collaboration",
      ];
    if (skill === "crossTeam")
      return [
        "Has a positive belief about the dependability of others",
        "Cross team",
        "Trust",
        "collaboration",
      ];
    if (skill === "distractions")
      return [
        "Avoids distractions if at all possible",
        "Distractions",
        "Non-verbal",
        "communication",
      ];
    if (skill === "easilyExplainsComplexIdeas")
      return [
        "Easily Explains Complex Ideas",
        "Explains ideas",
        "Clarity",
        "communication",
      ];
    if (skill === "empathy")
      return [
        "Demonstrates empathy",
        "Empathy",
        "Emotional intelligence",
        "collaboration",
      ];
    if (skill === "usesRegulators")
      return ["Uses regulators", "Regulators", "Non-verbal", "communication"];
    if (skill === "influences")
      return [
        "Actively influences events",
        "Influences",
        "Initiative",
        "collaboration",
      ];
    if (skill === "managesOwn")
      return [
        "Manages own emotions",
        "Manages own",
        "Emotional intelligence",
        "collaboration",
      ];
    if (skill === "newIdeas")
      return [
        "Adaptable and receptive to new ideas",
        "New ideas",
        "Flexibility",
        "collaboration",
      ];
    if (skill === "openToShare")
      return [
        "Creates an environment where individuals are safe to report errors",
        "Open to share",
        "Culture",
        "communication",
      ];
    if (skill === "positiveBelief")
      return [
        "Has a positive belief about the dependability of others",
        "Positive belief",
        "Trust",
        "collaboration",
      ];
    if (skill === "proactive")
      return [
        "Proactive and self-starting",
        "Proactive",
        "Initiative",
        "collaboration",
      ];
    if (skill === "resilienceFeedback")
      return [
        "Accepts all forms of constructive feedback",
        "Resilience feedback",
        "Resilience",
        "collaboration",
      ];
    if (skill === "signifiesInterest")
      return [
        "Signifies interest in what other people have to say",
        "Signifies interest",
        "Verbal attentiveness",
        "communication",
      ];
    if (skill === "workDemands")
      return [
        "Adjusts easily to changing work demands",
        "Work demands",
        "Flexibility",
        "collaboration",
      ];
    return "";
  };

  getBrightSpots = (sorted, reflection) => {
    let clone = JSON.parse(JSON.stringify(sorted));
    try {
      clone = clone.map((obj) => {
        return {
          field: obj["field"],
          name: this.getCorrectVariableName(obj["field"]),
          self: reflection[obj["field"]],
          team: obj["value"],
          dist: reflection[obj["field"]] - obj["value"],
        };
      });

      clone = clone.sort((a, b) => {
        return a["dist"] - b["dist"];
      });
    } catch (err) {
      console.error(err);
    }
    return clone;
  };

  getBlindSpots = (sorted, reflection) => {
    let clone = JSON.parse(JSON.stringify(sorted));
    try {
      clone = clone.map((obj) => {
        return {
          field: obj["field"],
          name: this.getCorrectVariableName(obj["field"]),
          self: reflection[obj["field"]],
          team: obj["value"],
          dist: reflection[obj["field"]] - obj["value"],
        };
      });

      clone = clone.sort((a, b) => {
        return b["dist"] - a["dist"];
      });
    } catch (err) {
      console.error(err);
    }
    return clone;
  };

  getStrengthAreas = (sorted, reflection) => {
    const result = [];
    try {
      let clone = JSON.parse(JSON.stringify(sorted));
      clone = clone.reverse();
      // clone = clone.slice(0, 3);
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

  getImproveAreas = (sorted, reflection) => {
    const result = [];
    try {
      let clone = JSON.parse(JSON.stringify(sorted));
      // clone = clone.slice(0, 3);
      // console.log(clone);
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

  calculateFacetAverage = (array, facet) => {
    return (
      array
        .filter((item) => {
          return item.name[2] === facet;
        })
        .map((item) => {
          return item.value;
        })
        .reduce((a, b) => a + b, 0) /
      array.filter((item) => {
        return item.name[2] === facet;
      }).length
    );
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

  filterByCommCollab = (arr, commOrCollab) => {
    return arr.filter((item) => {
      return item.name[3] === commOrCollab;
    });
  };

  filterByFacetTraitSelfTeam = (arr, facetOrTrait) => {
    const facetArr = [
      "Non-verbal",
      "Trust",
      "Emotional intelligence",
      "Resilience",
      "Culture",
      "Flexibility",
      "Initiative",
      "Clarity",
      "Verbal attentiveness",
    ];
    let result = [];
    if (facetOrTrait === "facets") {
      for (let i = 0; i < facetArr.length; i++) {
        result.push({
          name: [facetArr[i]],
          self:
            arr
              .filter((item) => {
                return item.name[2] === facetArr[i];
              })
              .map((item) => {
                return item.self;
              })
              .reduce((a, b) => a + b, 0) /
            arr.filter((item) => {
              return item.name[2] === facetArr[i];
            }).length,
          team:
            arr
              .filter((item) => {
                return item.name[2] === facetArr[i];
              })
              .map((item) => {
                return item.team;
              })
              .reduce((a, b) => a + b, 0) /
            arr.filter((item) => {
              return item.name[2] === facetArr[i];
            }).length,
          dist:
            arr
              .filter((item) => {
                return item.name[2] === facetArr[i];
              })
              .map((item) => {
                return item.dist;
              })
              .reduce((a, b) => a + b, 0) /
            arr.filter((item) => {
              return item.name[2] === facetArr[i];
            }).length,
        });
      }
      return result;
    }

    return arr;
  };

  filterByFacetSelf = (arr) => {
    const facetArr = [
      "Non-verbal",
      "Trust",
      "Emotional intelligence",
      "Resilience",
      "Culture",
      "Flexibility",
      "Initiative",
      "Clarity",
      "Verbal attentiveness",
    ];
    let result = [];
    for (let i = 0; i < facetArr.length; i++) {
      result.push({
        name: [facetArr[i]],
        value:
          arr
            .filter((item) => {
              return item.name[2] === facetArr[i];
            })
            .map((item) => {
              return item.value;
            })
            .reduce((a, b) => a + b, 0) /
          arr.filter((item) => {
            return item.name[2] === facetArr[i];
          }).length,
      });
    }

    console.log(result);
    return result;
  };

  filterByFacetOrTrait = (arr, facetOrTrait, blindOrBright) => {
    let result;
    if (!blindOrBright) {
      if (facetOrTrait === "facets") {
        result = this.filterByFacetSelf(arr).filter((item) => {
          return !isNaN(item.value);
        });
        return result;
      }
    } else {
      if (facetOrTrait === "facets") {
        result = this.filterByFacetTraitSelfTeam(arr, facetOrTrait).filter(
          (item) => {
            return !isNaN(item.self) || !isNaN(item.team);
          }
        );
        return result;
      }
    }
    return arr;
  };

  filterResults = (commOrCollab, ft) => {
    //Create new instances of strength, improve, bright, blind
    let strengthsFiltered = this.getStrengthAreas(
      this.state.sorted,
      this.state.averagesRaw
    );
    let improveFiltered = this.getImproveAreas(
      this.state.sorted,
      this.state.averagesRaw
    );
    let blindFiltered = this.getBlindSpots(
      this.state.sorted,
      this.state.reflectionRaw
    );
    let brightFiltered = this.getBrightSpots(
      this.state.sorted,
      this.state.reflectionRaw
    );

    strengthsFiltered = this.filterByCommCollab(
      strengthsFiltered,
      commOrCollab
    );
    improveFiltered = this.filterByCommCollab(improveFiltered, commOrCollab);
    blindFiltered = this.filterByCommCollab(blindFiltered, commOrCollab);
    brightFiltered = this.filterByCommCollab(brightFiltered, commOrCollab);

    strengthsFiltered = this.filterByFacetOrTrait(strengthsFiltered, ft);
    improveFiltered = this.filterByFacetOrTrait(improveFiltered, ft);
    blindFiltered = this.filterByFacetOrTrait(blindFiltered, ft, "blind");
    brightFiltered = this.filterByFacetOrTrait(brightFiltered, ft, "bright");

    blindFiltered = blindFiltered
      .filter((item) => {
        return item["team"] < item["self"];
      })
      .sort((a, b) => {
        return b["dist"] - a["dist"];
      });

    brightFiltered = brightFiltered
      .filter((item) => {
        return item["team"] > item["self"];
      })
      .sort((a, b) => {
        return a["dist"] - b["dist"];
      });

    console.log(brightFiltered);

    this.setState({
      ...this.state,
      improve: improveFiltered,
      strengths: strengthsFiltered,
      blind: blindFiltered,
      bright: brightFiltered,
    });
  };

  filterToggle = (e) => {
    if (e.target.value === "communication") {
      collabState = "communication";
      this.filterResults(e.target.value, traitState);
    }
    if (e.target.value === "collaboration") {
      collabState = "collaboration";
      this.filterResults(e.target.value, traitState);
    }
    if (e.target.value === "traits") {
      traitState = "traits";
      this.filterResults(collabState, e.target.value);
    }
    if (e.target.value === "facets") {
      traitState = "facets";
      this.filterResults(collabState, e.target.value);
    }
  };

  render() {
    const btns = document.querySelectorAll(".facet-button");
    const tabs = document.querySelectorAll(".tab");

    // window.onscroll = function() {
    //   filterBar();
    // };

    // function filterBar() {
    //   if (
    //     document.body.scrollTop > 210 ||
    //     document.documentElement.scrollTop > 210
    //   ) {
    //     document.querySelector(".main-skills-container").style.marginTop =
    //       "85px";
    //     document.querySelector(".skills-btns").className = "skills-btns fixed";
    //   } else {
    //     document.querySelector(".main-skills-container").style.marginTop =
    //       "24px";
    //     document.querySelector(".skills-btns").className = "skills-btns";
    //   }
    // }

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
        if (i === 0) {
          tabs[1].classList = "tab";
        }
        if (i === 1) {
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
                  All marks are average of 5 assessments <br /> (Unless
                  otherwise specified)
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
                  <li>
                    <button
                      className="tab active"
                      onClick={this.filterToggle}
                      value="collaboration"
                    >
                      Collaboration
                    </button>
                  </li>
                </div>
                <div
                  style={{
                    gridColumn: "5/7",
                    textAlign: "left",
                  }}
                >
                  <li>
                    <button
                      className="tab"
                      onClick={this.filterToggle}
                      value="communication"
                    >
                      Communication
                    </button>
                  </li>
                </div>
              </ul>
            </div>
            <div className="skills-btns-dropdown">
              <button
                className="btn primarybtn"
                onClick={this.filterToggle}
                value="collaboration"
              >
                Collaboration
              </button>

              <div className="skills-dropdown-content">
                <button
                  className="btn primarybtn"
                  onClick={this.filterToggle}
                  value="communication"
                >
                  Communication
                </button>
              </div>
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
                  borderRadius: "4px 4px 0 0",
                  borderBottom: "0.5pt solid #d6d6d6",
                  alignItems: "center",
                  height: "30px",
                  background: "white",
                  padding: "24px",
                }}
              >
                <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
                  Dashboard
                </h1>
              </div>
              <div style={{ textAlign: "left", padding: "24px" }}>
                <span style={{ color: "#4070e0" }}>Team review</span>
                <span style={{ color: "#2dd775" }}>Self review</span>
                <div style={{ margin: "16px 0" }}>
                  <button
                    className="facet-button "
                    value="facets"
                    onClick={this.filterToggle}
                  >
                    Facets
                  </button>
                  <button
                    className="facet-button selected"
                    value="traits"
                    onClick={this.filterToggle}
                  >
                    Traits
                  </button>
                </div>
                {/* TEAM FILTER */}
                {/* <div>
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
                </div> */}
              </div>
            </div>

            {(() => {
              if (this.state.strengths.length > 0) {
                return (
                  <div
                    className="grid-areas"
                    style={{ gridArea: "top-strength" }}
                  >
                    <div className="heading">
                      <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
                        Top Strengths
                      </h1>
                    </div>
                    <div className="grid-area-inside">
                      {this.state.strengths
                        .sort((a, b) => b.value - a.value)
                        .slice(0, 3)
                        .map((strength, idx) => {
                          return <SkillBar key={idx} values={strength} />;
                        })}
                    </div>
                  </div>
                );
              }
            })()}
            {(() => {
              if (this.state.improve.length > 0) {
                return (
                  <div
                    className="grid-areas"
                    style={{ gridArea: "areas-to-improve" }}
                  >
                    <div className="heading">
                      <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
                        Areas to Improve
                      </h1>
                    </div>
                    <div className="grid-area-inside">
                      {this.state.improve
                        .slice(0, 3)
                        .sort((a, b) => a.value - b.value)
                        .map((improve, idx) => {
                          return <SkillBar key={idx} values={improve} />;
                        })}
                    </div>
                  </div>
                );
              }
            })()}
            {(() => {
              if (this.state.blind.length > 0) {
                return (
                  <div
                    className="grid-areas"
                    style={{ gridArea: "over-estimation" }}
                  >
                    <div className="heading">
                      <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
                        Overestimation
                      </h1>
                    </div>
                    <div className="grid-area-inside">
                      {this.state.blind.slice(0, 3).map((improve, idx) => {
                        return <SkillBar key={idx} values={improve} />;
                      })}
                    </div>
                  </div>
                );
              }
            })()}
            {(() => {
              if (this.state.bright.length > 0) {
                return (
                  <div
                    className="grid-areas"
                    style={{ gridArea: "under-estimation" }}
                  >
                    <div className="heading">
                      <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
                        Underestimation
                      </h1>
                    </div>
                    <div className="grid-area-inside">
                      {this.state.bright.slice(0, 3).map((improve, idx) => {
                        return <SkillBar key={idx} values={improve} />;
                      })}
                    </div>
                  </div>
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
