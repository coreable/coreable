import React, { Component } from "react";

import { API_URL } from "../../constants";
import { SKILLS_API } from "../../queries";

import "./Skills.scss";
import SkillBar from "./SkillBar/SkillBar";
import Radar from "./Radar";

let facetOrTrait = "facet";
let stage = 1;

export default class Results extends Component {
  constructor(props) {
    super();

    this.state = {
      JWT: localStorage.getItem("JWT"), //this.props.app.JWT
      collaborationData: null,
      communicationData: null,
      report: null,
      facetOrTrait: "facet",
    };

    this.util.checkState(props);
  }

  componentDidMount = (props) => {
    this.getData();
  };

  async getData() {
    const query = SKILLS_API;
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        JWT: localStorage.getItem("JWT"),
      },
      body: JSON.stringify(query),
    };

    const res = await fetch(API_URL, options).then((data) => data.json());
    const { data, errors } = res.data.me;

    if (errors) {
      console.error(errors);
      return false;
    }

    const result = data.user.report;

    this.setState({
      ...this.state,
      report: result,
    });

    let commData = this.filterBy.communicationData(result);
    let collabData = this.filterBy.collaborationData(result);

    let commFacets = this.util.setFacetsOrTraits(commData, "facets");
    let collabFacets = this.util.setFacetsOrTraits(collabData, "facets");

    let commTraits = this.util.setFacetsOrTraits(commData, "traits");
    let collabTraits = this.util.setFacetsOrTraits(collabData, "traits");

    let comm = this.util.setCommOrCollabData(commFacets, commTraits);
    let collab = this.util.setCommOrCollabData(collabFacets, collabTraits);

    this.util.setStateValues(collab, comm);
  }

  util = {
    checkState: (props) => {
      let count = 0;
      const arrayToLoop = props["app"]["data"]["user"]["pending"];

      for (let i = 0; i < arrayToLoop.length; i++) {
        if (arrayToLoop[i]["tutorial"]["subject"]["state"] == 2) {
          count++;
        }
      }

      if (count === arrayToLoop.length) {
        stage = 2;
      }
    },
    setCommOrCollabData: (facets, traits) => {
      return {
        facets: facets,
        traits: traits,
      };
    },
    setFacetsOrTraits: (report, facetOrTrait) => {
      let result = [];
      let averageObject = report["average"][facetOrTrait]["default"];
      let reflectionObject = report["reflection"][facetOrTrait]["default"];

      for (const key in averageObject) {
        if (averageObject.hasOwnProperty(key)) {
          result.push({
            name:
              facetOrTrait === "facets"
                ? {
                    facet: this.util.getCorrectSpelling(key),
                  }
                : {
                    facet: this.util.getFacetName(key),
                    trait: this.util.getCorrectTraitDetails(key),
                  },
            average: averageObject[key],
            reflection: reflectionObject[key],
            difference: reflectionObject[key] - averageObject[key],
          });
        }
      }

      return result.sort((a, b) => a.average - b.average);
    },
    setStateValues: (collaborationData, communicationData) => {
      this.setState({
        ...this.state,
        collaborationData: collaborationData,
        communicationData: communicationData,
      });
    },
    getFacetName: (trait) => {
      switch (trait) {
        case "calm":
          return "Resilience";
        case "empathy":
          return "Emotional Intelligence";
        case "cooperatively":
          return "Trust";
        case "influences":
          return "Initiative";
        case "managesOwn":
          return "Emotional Intelligence";
        case "newIdeas":
          return "Flexibility";
        case "positiveBelief":
          return "Trust";
        case "proactive":
          return "Initiative";
        case "resilienceFeedback":
          return "Resilience";
        case "clearInstructions":
          return "Clarity";
        case "crossTeam":
          return "Culture";
        case "distractions":
          return "Non-verbal";
        case "easilyExplainsComplexIdeas":
          return "Clarity";
        case "openToShare":
          return "Verbal Attentiveness";
        case "signifiesInterest":
          return "Non-verbal";
        default:
          return "Culture";
      }
    },
    getCorrectTraitDetails: (trait) => {
      switch (trait) {
        case "calm":
          return "Remains calm under pressure";
        case "empathy":
          return "Demonstrates empathy";
        case "cooperatively":
          return "Ability to work cooperatively";
        case "influences":
          return "Actively influences events";
        case "managesOwn":
          return "Manages own emotions";
        case "newIdeas":
          return "Adaptable and receptive to new ideas";
        case "positiveBelief":
          return "Has a positive belief about the dependability of others";
        case "proactive":
          return "Proactive and self-starting";
        case "resilienceFeedback":
          return "Accepts constructive feedback";
        case "clearInstructions":
          return "Gives clear instructions";
        case "crossTeam":
          return "Creates an environment where individuals feel safe to report errors";
        case "distractions":
          return "Avoids distractions if at all possible";
        case "easilyExplainsComplexIdeas":
          return "Easily explains complex ideas";
        case "openToShare":
          return "Builds a strong sense of openness, trust and community";
        case "signifiesInterest":
          return "Signifies interest in what other people have to say";
        default:
          return "Demonstrates active listening by appearing relaxed, friendly facial expressions, open posture, eye contact, full attention and non-verbal acknowledgments during interactions";
      }
    },
    getCorrectSpelling: (trait) => {
      switch (trait) {
        case "flex":
          return "Flex";
        case "initiative":
          return "Initiative";
        case "trust":
          return "Trust";
        case "emotionalIntelligence":
          return "Emotional Intelligence";
        case "resilience":
          return "Resilience";
        case "attentive":
          return "Attentive";
        case "clarity":
          return "Clarity";
        case "nonVerbal":
          return "Non Verbal";
        case "culture":
          return "Culture";
        default:
          break;
      }
    },
  };

  filterBy = {
    communicationData: (report) => {
      let result = {
        average: report["average"]["communication"],
        reflection: report["reflection"]["communication"],
      };

      return result;
    },
    collaborationData: (report) => {
      let result = {
        average: report["average"]["collaboration"],
        reflection: report["reflection"]["collaboration"],
      };

      return result;
    },
  };

  handler = {
    filterToggle: (e) => {
      facetOrTrait = e.target.value;
      this.setState({
        ...this.state,
        facetOrTrait: e.target.value,
      });
    },
  };

  render() {
    return (
      <div className="review-container">
        <Heading />
        <div className="skills-main" style={{ display: "block" }}>
          <div style={{ marginTop: "20px" }}>
            <button
              className="facet-button selected"
              value="facet"
              onClick={this.handler.filterToggle}
            >
              Facets
            </button>
            <button
              className="facet-button "
              value="trait"
              onClick={this.handler.filterToggle}
            >
              Traits
            </button>
          </div>
          <div className="main-skills-container">
            <CollabIndex state={this.state.report} />
            <CollabTopStrengths data={this.state.collaborationData} />
            <CollabAreasToImprove data={this.state.collaborationData} />

            {stage === 2 && (
              <React.Fragment>
                <CollabOverEstimation data={this.state.collaborationData} />
                <CollabUnderEstimation data={this.state.collaborationData} />
              </React.Fragment>
            )}

            <CommsIndex state={this.state.report} />
            <CommsTopStrengths data={this.state.communicationData} />
            <CommsAreasToImprove data={this.state.communicationData} />

            {stage === 2 && (
              <React.Fragment>
                <CommsOverEstimation data={this.state.communicationData} />
                <CommsUnderEstimation data={this.state.communicationData} />
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const Heading = () => {
  return (
    <div className="top-background">
      <div className="skills-main-grid">
        <div className="skill-grid">
          <h1 style={{ color: "white" }}>Your Results</h1>
          <p
            style={{
              fontSize: "1.4rem",
              marginBottom: "35pt",
              color: "#d6d6d6",
            }}
          >
            All marks are an average of 5 assessments <br /> (Unless otherwise
            specified)
          </p>
        </div>
      </div>
    </div>
  );
};

const CollabIndex = (props) => {
  return (
    <div className="grid-areas" style={{ gridArea: "collab-index" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Collaboration index
        </h1>
      </div>
      <div className="grid-area-inside">
        <div className="radar-div">
          <Radar report={props.state} collabOrComms="collaboration" />
        </div>
      </div>
    </div>
  );
};

const CollabTopStrengths = (props) => {
  let topStrengths =
    facetOrTrait === "facet" ? props.data?.facets : props.data?.traits;

  return (
    <div className="grid-areas" style={{ gridArea: "collab-top-strength" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Top Strengths
        </h1>
        <p>Collaboration</p>
      </div>
      <div className="grid-area-inside">
        {topStrengths
          ?.sort((a, b) => b.average - a.average)
          .slice(0, 3)
          .map((strength, idx) => {
            return (
              <SkillBar
                key={idx}
                values={strength}
                type="strengths"
                isFacet={facetOrTrait}
              />
            );
          })}
      </div>
    </div>
  );
};

const CollabAreasToImprove = (props) => {
  let areasToImprove =
    facetOrTrait === "facet" ? props.data?.facets : props.data?.traits;

  return (
    <div className="grid-areas" style={{ gridArea: "collab-areas-to-improve" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Areas to Improve
        </h1>
        <p>Collaboration</p>
      </div>
      <div className="grid-area-inside">
        {areasToImprove
          ?.sort((a, b) => a.average - b.average)
          .slice(0, 3)
          .map((improve, idx) => {
            return (
              <SkillBar
                key={idx}
                values={improve}
                type="areasToImprove"
                isFacet={facetOrTrait}
              />
            );
          })}
      </div>
    </div>
  );
};

const CollabOverEstimation = (props) => {
  let overEstimation =
    facetOrTrait === "facet" ? props.data?.facets : props.data?.traits;

  return (
    <div className="grid-areas" style={{ gridArea: "collab-overestimation" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Overestimation
        </h1>
        <p>Communication</p>
      </div>
      <div className="grid-area-inside">
        {overEstimation
          ?.filter((item) => item.difference > 0)
          .sort((a, b) => b.difference - a.difference)
          .slice(0, 3)
          .map((overEstimation, idx) => {
            return (
              <SkillBar
                key={idx}
                values={overEstimation}
                type="overEstimation"
                isFacet={facetOrTrait}
              />
            );
          })}
      </div>
    </div>
  );
};

const CollabUnderEstimation = (props) => {
  let underEstimation =
    facetOrTrait === "facet" ? props.data?.facets : props.data?.traits;

  return (
    <div className="grid-areas" style={{ gridArea: "collab-underestimation" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Underestimation
        </h1>
        <p>Communication</p>
      </div>
      <div className="grid-area-inside">
        {underEstimation
          ?.filter((item) => item.difference < 0)
          .sort((a, b) => b.difference - a.difference)
          .slice(0, 3)
          .map((underEstimation, idx) => {
            return (
              <SkillBar
                key={idx}
                values={underEstimation}
                type="underEstimation"
                isFacet={facetOrTrait}
              />
            );
          })}
      </div>
    </div>
  );
};

const CommsIndex = (props) => {
  return (
    <div className="grid-areas" style={{ gridArea: "comms-index" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Communication index
        </h1>
      </div>
      <div className="grid-area-inside">
        <div className="radar-div">
          <Radar report={props.state} collabOrComms="communication" />
        </div>
      </div>
    </div>
  );
};

const CommsTopStrengths = (props) => {
  let topStrengths =
    facetOrTrait === "facet" ? props.data?.facets : props.data?.traits;

  return (
    <div className="grid-areas" style={{ gridArea: "comms-top-strength" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Top Strengths
        </h1>
        <p>Communication</p>
      </div>
      <div className="grid-area-inside">
        {topStrengths
          ?.sort((a, b) => b.average - a.average)
          .slice(0, 3)
          .map((strength, idx) => {
            return (
              <SkillBar
                key={idx}
                values={strength}
                type="strengths"
                isFacet={facetOrTrait}
              />
            );
          })}
      </div>
    </div>
  );
};

const CommsAreasToImprove = (props) => {
  let areasToImprove =
    facetOrTrait === "facet" ? props.data?.facets : props.data?.traits;

  return (
    <div className="grid-areas" style={{ gridArea: "comms-areas-to-improve" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Areas to Improve
        </h1>
        <p>Communication</p>
      </div>
      <div className="grid-area-inside">
        {areasToImprove
          ?.sort((a, b) => a.average - b.average)
          .slice(0, 3)
          .map((improve, idx) => {
            return (
              <SkillBar
                key={idx}
                values={improve}
                type="areasToImprove"
                isFacet={facetOrTrait}
              />
            );
          })}
      </div>
    </div>
  );
};

const CommsOverEstimation = (props) => {
  let overEstimation =
    facetOrTrait === "facet" ? props.data?.facets : props.data?.traits;

  return (
    <div className="grid-areas" style={{ gridArea: "comms-overestimation" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Overestimation
        </h1>
        <p>Communication</p>
      </div>
      <div className="grid-area-inside">
        {overEstimation
          ?.filter((item) => item.difference > 0)
          .sort((a, b) => b.difference - a.difference)
          .slice(0, 3)
          .map((overEstimation, idx) => {
            return (
              <SkillBar
                key={idx}
                values={overEstimation}
                type="overEstimation"
                isFacet={facetOrTrait}
              />
            );
          })}
      </div>
    </div>
  );
};

const CommsUnderEstimation = (props) => {
  let underEstimation =
    facetOrTrait === "facet" ? props.data?.facets : props.data?.traits;

  return (
    <div className="grid-areas" style={{ gridArea: "comms-underestimation" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Underestimation
        </h1>
        <p>Communication</p>
      </div>
      <div className="grid-area-inside">
        {underEstimation
          ?.filter((item) => item.difference < 0)
          .sort((a, b) => b.difference - a.difference)
          .slice(0, 3)
          .map((underEstimation, idx) => {
            return (
              <SkillBar
                key={idx}
                values={underEstimation}
                type="underEstimation"
                isFacet={facetOrTrait}
              />
            );
          })}
      </div>
    </div>
  );
};
