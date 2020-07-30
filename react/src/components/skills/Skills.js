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
import SkillBar from "./SkillBar/SkillBar";
import "./Skills.scss";

class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      report: null,
      strengths: null,
      areasToImprove: null,
      overEstimation: null,
      underEstimation: null,
      commOrCollab: "collab",
      traitOrFacet: "facet",
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

    const strengthsResult = this.ranking.getStrengths(
      report,
      "collab",
      "facet"
    );
    const areasToImproveResult = this.ranking.getAreasToImprove(
      report,
      "collab",
      "facet"
    );
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

    this.setState({
      ...this.state,
      loading: false,
      report: report,
      strengths: strengthsResult,
      areasToImprove: areasToImproveResult,
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
    combineData: (data, facetOrTrait) => {
      let finalResult = [];
      let average = data.average;
      let reflection = data.reflection;
      for (var key in average) {
        if (average.hasOwnProperty(key)) {
          // console.log(key + " -> " + result[key]);
          finalResult.push([
            {
              name:
                facetOrTrait === "facet"
                  ? this.utils.getCorrectFacetName(key)
                  : this.utils.getCorrectTraitName(key),
              averageScore: average[key],
              reflectionScore: reflection[key],
              difference: reflection[key] - average[key],
            },
          ]);
        }
      }
      return finalResult;
    },
    getCorrectFacetName: (facet) => {
      if (facet === "emotionalIntelligence") return "Emotional Intelligence";
      if (facet === "flex") return "Flex";
      if (facet === "initiative") return "Initiative";
      if (facet === "resilience") return "Resilience";
      if (facet === "trust") return "Trust";
      if (facet === "attentive") return "Attentive";
      if (facet === "clarity") return "Clarity";
      if (facet === "culture") return "Culture";
      if (facet === "nonVerbal") return "Non Verbal";
    },
    getCorrectTraitName: (trait) => {
      if (trait === "calm")
        return [
          "Remains calm under pressure",
          "Calm",
          "Resilience",
          "collaboration",
        ];
      if (trait === "clearInstructions")
        return [
          "Gives clear instructions",
          "Clear instructions",
          "Clarity",
          "communication",
        ];
      if (trait === "cooperatively")
        return [
          "Is able to work cooperatively",
          "Cooperatively",
          "Trust",
          "collaboration",
        ];
      if (trait === "crossTeam")
        return [
          "Has a positive belief about the dependability of others",
          "Cross team",
          "Trust",
          "collaboration",
        ];
      if (trait === "distractions")
        return [
          "Avoids distractions if at all possible",
          "Distractions",
          "Non-verbal",
          "communication",
        ];
      if (trait === "easilyExplainsComplexIdeas")
        return [
          "Easily Explains Complex Ideas",
          "Explains ideas",
          "Clarity",
          "communication",
        ];
      if (trait === "empathy")
        return [
          "Demonstrates empathy",
          "Empathy",
          "Emotional intelligence",
          "collaboration",
        ];
      if (trait === "usesRegulators")
        return ["Uses regulators", "Regulators", "Non-verbal", "communication"];
      if (trait === "influences")
        return [
          "Actively influences events",
          "Influences",
          "Initiative",
          "collaboration",
        ];
      if (trait === "managesOwn")
        return [
          "Manages own emotions",
          "Manages own",
          "Emotional intelligence",
          "collaboration",
        ];
      if (trait === "newIdeas")
        return [
          "Adaptable and receptive to new ideas",
          "New ideas",
          "Flexibility",
          "collaboration",
        ];
      if (trait === "openToShare")
        return [
          "Creates an environment where individuals are safe to report errors",
          "Open to share",
          "Culture",
          "communication",
        ];
      if (trait === "positiveBelief")
        return [
          "Has a positive belief about the dependability of others",
          "Positive belief",
          "Trust",
          "collaboration",
        ];
      if (trait === "proactive")
        return [
          "Proactive and self-starting",
          "Proactive",
          "Initiative",
          "collaboration",
        ];
      if (trait === "resilienceFeedback")
        return [
          "Accepts all forms of constructive feedback",
          "Resilience feedback",
          "Resilience",
          "collaboration",
        ];
      if (trait === "signifiesInterest")
        return [
          "Signifies interest in what other people have to say",
          "Signifies interest",
          "Verbal attentiveness",
          "communication",
        ];
      if (trait === "workDemands")
        return [
          "Adjusts easily to changing work demands",
          "Work demands",
          "Flexibility",
          "collaboration",
        ];
      return "";
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
    byCommunication: (data) => {
      let averageScore = data.average.communication;
      let reflectionScore = data.reflection.communication;
      return {
        average: averageScore,
        reflection: reflectionScore,
      };
    },
    byTrait: (data) => {
      const averageScore = data.average.traits.default;
      const reflectionScore = data.reflection.traits.default;
      return { average: averageScore, reflection: reflectionScore };
    },
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
        result = this.filter.byCommunication(data);
      }
      if (facetOrTrait === "facet") {
        result = this.filter.byFacet(result);
      }
      if (facetOrTrait === "trait") {
        result = this.filter.byTrait(result);
      }
      result = this.utils.combineData(result, facetOrTrait);
      result = this.filter.byOverEstimation(result);
      return result;
    },
    getUnderEstimation: (data, collabOrComm, facetOrTrait) => {
      let result;
      if (collabOrComm === "collab") {
        result = this.filter.byCollaboration(data);
      }
      if (collabOrComm === "comm") {
        result = this.filter.byCommunication(data);
      }
      if (facetOrTrait === "facet") {
        result = this.filter.byFacet(result);
      }
      if (facetOrTrait === "trait") {
        result = this.filter.byTrait(result);
      }
      result = this.utils.combineData(result, facetOrTrait);
      result = this.filter.byUnderEstimation(result);
      return result;
    },
    getStrengths: (data, collabOrComm, facetOrTrait) => {
      let result;
      if (collabOrComm === "collab") {
        result = this.filter.byCollaboration(data);
      }
      if (collabOrComm === "comm") {
        result = this.filter.byCommunication(data);
      }
      if (facetOrTrait === "facet") {
        result = this.filter.byFacet(result);
      }
      if (facetOrTrait === "trait") {
        result = this.filter.byTrait(result);
      }
      result = result["average"];
      let resultSorted = [];
      for (var key in result) {
        if (result.hasOwnProperty(key)) {
          resultSorted.push({
            name:
              facetOrTrait === "facet"
                ? this.utils.getCorrectFacetName(key)
                : this.utils.getCorrectTraitName(key),
            averageScore: result[key],
          });
        }
      }

      return resultSorted.sort((a, b) => {
        return b.averageScore - a.averageScore;
      });
    },
    getAreasToImprove: (data, collabOrComm, facetOrTrait) => {
      let result;
      if (collabOrComm === "collab") {
        result = this.filter.byCollaboration(data);
      }
      if (collabOrComm === "comm") {
        result = this.filter.byCommunication(data);
      }
      if (facetOrTrait === "facet") {
        result = this.filter.byFacet(result);
      }
      if (facetOrTrait === "trait") {
        result = this.filter.byTrait(result);
      }
      result = result["average"];
      let resultSorted = [];
      for (var key in result) {
        if (result.hasOwnProperty(key)) {
          resultSorted.push({
            name:
              facetOrTrait === "facet"
                ? this.utils.getCorrectFacetName(key)
                : this.utils.getCorrectTraitName(key),
            averageScore: result[key],
          });
        }
      }

      return resultSorted.sort((a, b) => {
        return a.averageScore - b.averageScore;
      });
    },
  };

  handler = {
    filter: (report, commOrCollab, traitOrFacet) => {
      const strength = this.ranking.getStrengths(
        report,
        commOrCollab,
        traitOrFacet
      );
      const areasToImprove = this.ranking.getAreasToImprove(
        report,
        commOrCollab,
        traitOrFacet
      );
      const overEstimation = this.ranking.getOverEstimation(
        report,
        commOrCollab,
        traitOrFacet
      );
      const underEstimation = this.ranking.getUnderEstimation(
        report,
        commOrCollab,
        traitOrFacet
      );

      return {
        strength: strength,
        areasToImprove: areasToImprove,
        underEstimation: underEstimation,
        overEstimation: overEstimation,
      };
    },
    filterToggle: (e) => {
      let report = this.state.report;
      let results;
      // if (e.target.value === "communication") {
      if (e.target.value === "communication") {
        results = this.handler.filter(report, "comm", this.state.traitOrFacet);
        this.setState({ ...this.state, collabOrComm: "comm" });
      }
      if (e.target.value === "collaboration") {
        results = this.handler.filter(
          report,
          "collab",
          this.state.traitOrFacet
        );
        this.setState({ ...this.state, collabOrComm: "collab" });
      }
      if (e.target.value === "traits") {
        results = this.handler.filter(report, this.state.commOrCollab, "trait");
        this.setState({ ...this.state, traitOrFacets: "trait" });
      }
      if (e.target.value === "facets") {
        results = this.handler.filter(report, this.state.commOrCollab, "facet");
        this.setState({ ...this.state, traitOrFacets: "facet" });
      }
      this.setState({
        ...this.state,
        strengths: results["strength"],
        areasToImprove: results["areasToImprove"],
        overEstimation: results["overEstimation"],
        underEstimation: results["underEstimation"],
      });
    },
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

          <div className="radar-div" onClick={this.handler.filterToggle}>
            <Radar {...this.state} />
          </div>
        </div>
      </div>
    );
  }
}

export default Skills;
