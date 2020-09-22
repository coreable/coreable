import React, { Component } from "react";

import { API_URL } from "../../../constants";
import { SKILLS_API } from "../../../queries";

import "./Results.scss";
import SkillBar from "./SkillBar/SkillBar";
import Radar from "./Radar/Radar";

export default class Results extends Component {
  constructor(props) {
    super();

    this.state = {
      JWT: localStorage.getItem("JWT"), //this.props.app.JWT
      collaborationData: null,
      communicationData: null,
      report: null,
    };
  }

  componentDidMount = () => {
    let collaborationData = null;
    let communicationData = null;
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

    let collaborationData = this.filterBy.collaboration(result);
    let communicationData = this.filterBy.communication(result);

    collaborationData = this.util.convertToArray(collaborationData);
    communicationData = this.util.convertToArray(communicationData);

    this.util.setStateValues(collaborationData, communicationData);
  }

  util = {
    convertToArray: (object) => {
      let result = [];

      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          result.push({
            trait: {
              facet: this.util.getFacetName(key),
              trait: this.util.getCorrectTraitDetails(key),
            },
            value: object[key],
          });
        }
      }

      return result.sort((a, b) => a.value - b.value);
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
          return "Calm";
        case "empathy":
          return "Empathy";
        case "cooperatively":
          return "Cooperatively";
        case "influences":
          return "Influences";
        case "managesOwn":
          return "Manages own";
        case "newIdeas":
          return "New ideas";
        case "positiveBelief":
          return "Positive belief";
        case "proactive":
          return "Proactive";
        case "resilienceFeedback":
          return "Resilience feedback";
        case "clearInstructions":
          return "Clear instructions";
        case "crossTeam":
          return "Cross team";
        case "distractions":
          return "Distractions";
        case "easilyExplainsComplexIdeas":
          return "Easily explains complex ideas";
        case "openToShare":
          return "Open to share";
        case "signifiesInterest":
          return "Signifies interest";
        default:
          return "Uses regulators";
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
  };

  filterBy = {
    communication: (data) => {
      return data.reflection?.communication?.traits?.default;
    },
    collaboration: (data) => {
      return data.reflection?.collaboration?.traits?.default;
    },
  };

  render() {
    return (
      <div className="review-container">
        <Heading />
        <div className="skills-main">
          <div className="main-skills-container">
            <CollabIndex state={this.state.report} />
            <CollabTopStrengths data={this.state.collaborationData} />
            <CollabAreasToImprove data={this.state.collaborationData} />

            <CommsIndex state={this.state.report} />
            <CommsTopStrengths data={this.state.communicationData} />
            <CommsAreasToImprove data={this.state.communicationData} />
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
          <Radar {...props.state} collabOrComms="collaboration" />
        </div>
      </div>
    </div>
  );
};

const CollabTopStrengths = (props) => {
  const topStrengths = props.data?.sort((a, b) => b.value - a.value);

  return (
    <div className="grid-areas" style={{ gridArea: "collab-top-strength" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Top Strengths
        </h1>
      </div>
      <div className="grid-area-inside">
        {topStrengths?.slice(0, 3).map((strength, idx) => {
          return <SkillBar key={idx} values={strength} />;
        })}
      </div>
    </div>
  );
};

const CollabAreasToImprove = (props) => {
  const areasToImprove = props.data?.sort((a, b) => a.value - b.value);
  return (
    <div className="grid-areas" style={{ gridArea: "collab-areas-to-improve" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Areas to Improve
        </h1>
      </div>
      <div className="grid-area-inside">
        {areasToImprove?.slice(0, 3).map((improve, idx) => {
          return <SkillBar key={idx} values={improve} />;
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
          <Radar {...props.state} collabOrComms="communication" />
        </div>
      </div>
    </div>
  );
};

const CommsTopStrengths = (props) => {
  const topStrengths = props.data?.sort((a, b) => b.value - a.value);

  return (
    <div className="grid-areas" style={{ gridArea: "comms-top-strength" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Top Strengths
        </h1>
      </div>
      <div className="grid-area-inside">
        {topStrengths?.slice(0, 3).map((strength, idx) => {
          return <SkillBar key={idx} values={strength} />;
        })}
      </div>
    </div>
  );
};

const CommsAreasToImprove = (props) => {
  const areasToImprove = props.data?.sort((a, b) => a.value - b.value);
  return (
    <div className="grid-areas" style={{ gridArea: "comms-areas-to-improve" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Areas to Improve
        </h1>
      </div>
      <div className="grid-area-inside">
        {areasToImprove?.slice(0, 3).map((improve, idx) => {
          return <SkillBar key={idx} values={improve} />;
        })}
      </div>
    </div>
  );
};
