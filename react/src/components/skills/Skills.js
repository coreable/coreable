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

import { Redirect } from "react-router-dom";
import { API_URL } from "../../constants";
import { SKILLS_API } from "../../queries";
import Radar from "./Radar";
// import SkillBar from "./SkillBar/SkillBar";
import "./Skills.scss";

let collabState = "collaboration";
let traitState = "trait";

class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      report: null,
      strengths: null, //top scores, DONE
      areasToImprove: null, //lowest scores, DONE
      overEstimation: null, //reflect > average
      underEstimation: null, //reflect < average
      default: {
        isCollab: true,
        isFacet: true,
      },
    };
  }

  componentDidMount = async () => {
    this.props.ReactGA.pageview("/skills");
    const query = SKILLS_API;
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

    const report = data.user.report;

    //
    const strengths = report.average.collaboration.facets.default;
    const areasToImprove = report.average.collaboration.facets.default;

    // const strengths = this.ranking.getStrengths(report,"collab")
    // const areasToImprove = this.ranking.areasToImprove(report, "collab")
    const overEstimationResult = this.ranking.getOverEstimation(
      report,
      "collab",
      "facet"
    );
    const underEstimationResult = this.ranking.getUnderEstimation(
      report,
      "collab",
      "facet"
    );

    const strengthsArray = this.utils.sortBy(
      this.utils.convertToArray(strengths),
      "down"
    );
    const areasToImproveArray = this.utils.sortBy(
      this.utils.convertToArray(areasToImprove),
      "up"
    );
    // let overEstimationArray = [];
    // let underEstimationArray = [];

    this.setState({
      ...this.state,
      loading: false,
      report,
      strengths: strengthsArray,
      areasToImprove: areasToImproveArray,
      overEstimation: overEstimationResult,
      underEstimation: underEstimationResult,
    });
  };

  utils = {
    convertToArray: (object) => {
      let result = [];
      for (var facet in object) {
        result.push({ facet: object[facet] });
      }
      return result;
    },
    sortBy: (array, increOrDecre) => {
      if (increOrDecre === "down") {
        return array.sort((a, b) => b["facet"] - a["facet"]);
      }
      if (increOrDecre === "up") {
        return array.sort((a, b) => a["facet"] - b["facet"]);
      }
    },
    combineData: (data) => {
      let finalResult = [];
      let average = data.average;
      let reflection = data.reflection;
      for (var key in average) {
        if (average.hasOwnProperty(key)) {
          // console.log(key + " -> " + result[key]);
          finalResult.push([
            {
              name: key,
              averageScore: average[key],
              reflectionScore: reflection[key],
              difference: reflection[key] - average[key],
            },
          ]);
        }
      }
      return finalResult;
    },
  };

  filter = {
    byCollaboration: (data) => {
      const averageScore = data.average.collaboration;
      const reflectionScore = data.reflection.collaboration;
      return {
        average: averageScore,
        reflection: reflectionScore,
      };
    },
    byCommunication: (data) => {},
    byTrait: (data) => {},
    byFacet: (data) => {
      const averageScore = data.average.facets.default;
      const reflectionScore = data.reflection.facets.default;
      return { average: averageScore, reflection: reflectionScore };
    },
    byOverEstimation: (data) => {
      return data.filter((item) => {
        return item[0].difference > 0;
      });
    },
    byUnderEstimation: (data) => {
      return data.filter((item) => {
        return item[0].difference < 0;
      });
    },
  };

  ranking = {
    getOverEstimation: (data, collabOrComm, facetOrTrait) => {
      let result;
      if (collabOrComm === "collab") {
        result = this.filter.byCollaboration(data);
      }
      if (collabOrComm === "comm") {
        result = this.filter.byCommunication(result);
      }
      if (facetOrTrait === "facet") {
        result = this.filter.byFacet(result);
      }
      if (facetOrTrait === "trait") {
        result = this.filter.byTrait(result);
      }
      result = this.utils.combineData(result);
      result = this.filter.byOverEstimation(result);
      return result;
    },
    getUnderEstimation: (data, collabOrComm, facetOrTrait) => {
      let result;
      if (collabOrComm === "collab") {
        result = this.filter.byCollaboration(data);
      }
      if (collabOrComm === "comm") {
        result = this.filter.byCommunication(result);
      }
      if (facetOrTrait === "facet") {
        result = this.filter.byFacet(result);
      }
      if (facetOrTrait === "trait") {
        result = this.filter.byTrait(result);
      }
      result = this.utils.combineData(result);
      result = this.filter.byUnderEstimation(result);
      console.log(result);
      return result;
    },
    getStrengths: () => {},
    getAreasToImprove: () => {},
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
        <div className="top-background">
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
                All marks are average of 5 assessments <br /> (Unless otherwise
                specified)
              </p>
            </div>
          </div>
        </div>

        <div className="skills-main">
          <div
            style={{
              paddingLeft: "0",
              paddingRight: "0",
              width: "100%",
            }}
          ></div>

          <div className="radar-div">
            <Radar {...this.state} />
          </div>
        </div>
      </div>
    );
  }
}

export default Skills;
