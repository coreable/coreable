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
      JWT: null, //this.props.app.JWT
      collaborationData: null,
      communicationData: null,
    };
  }

  componentDidMount = () => {
    let collaborationData;
    let communicationData;
    let data = this.getData;

    collaborationData = this.filterBy.collaboration(data);
    communicationData = this.filterBy.communication(data);

    collaborationData = this.util.getTopStrengths(collaborationData);
    communicationData = this.util.getTopStrengths(communicationData);

    collaborationData = this.util.getAreasToImprove(collaborationData);
    communicationData = this.util.getAreasToImprove(communicationData);

    this.util.setStateValues(collaborationData, communicationData);
  };

  async getData() {
    const query = SKILLS_API;
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        JWT: this.state.JWT,
      },
      body: JSON.stringify(query),
    };

    const res = await fetch(API_URL, options).then((data) => data.json());
    const { data, errors } = res.data.me;

    if (errors) {
      console.error(errors);
      return false;
    }

    return data.user.report;
  }

  util = {
    getTopStrengths: (data) => {},
    getAreasToImprove: (data) => {},
    setStateValues: (collaborationData, communicationData) => {
      this.setState({
        ...this.state,
        collaborationData,
        communicationData,
      });
    },
  };

  filterBy = {
    communication: (data) => {},
    collaboration: (data) => {},
  };

  render() {
    return (
      <div className="review-container">
        <Heading />
        <div className="skills-main">
          <div className="main-skills-container">
            <div className="collab-results-left">
              <CollabIndex />
              <CollabTopStrengths />
              <CollabAreasToImprove />
            </div>
            <div className="comms-results-right">
              <CommsIndex />
              <CommsTopStrengths />
              <CommsAreasToImprove />
            </div>
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

const CollabIndex = () => {
  return (
    <div className="grid-areas" style={{ gridArea: "collab-index" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Collaboration index
        </h1>
      </div>
      <div className="grid-area-inside">
        <div className="radar-div">{/* <Radar /> */}</div>
      </div>
    </div>
  );
};

const CollabTopStrengths = (props) => {
  return (
    <div
      className="grid-areas"
      style={{ gridArea: "top-strength", height: "445px" }}
    >
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Top Strengths
        </h1>
      </div>
      <div className="grid-area-inside">
        {/* {props.state.topStrengths?.slice(0, 3).map((strength, idx) => {
          return (
            <SkillBar
              key={idx}
              values={strength}
              type="strengths"
              isComm={collabOrComm}
            />
          );
        })} */}
      </div>
    </div>
  );
};

const CollabAreasToImprove = (props) => {
  return (
    <div
      className="grid-areas"
      style={{ gridArea: "areas-to-improve", height: "445px" }}
    >
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Areas to Improve
        </h1>
      </div>
      <div className="grid-area-inside">
        {/* {props.state.areasToImprove?.slice(0, 3).map((improve, idx) => {
          return (
            <SkillBar
              key={idx}
              values={improve}
              type="areasToImprove"
              isComm={collabOrComm}
            />
          );
        })} */}
      </div>
    </div>
  );
};

const CommsIndex = (props) => {
  return (
    <div className="grid-areas" style={{ gridArea: "collab-index" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Communication index
        </h1>
      </div>
      <div className="grid-area-inside">
        <div className="radar-div">{/* <Radar /> */}</div>
      </div>
    </div>
  );
};

const CommsTopStrengths = (props) => {
  return (
    <div
      className="grid-areas"
      style={{ gridArea: "top-strength", height: "445px" }}
    >
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Top Strengths
        </h1>
      </div>
      <div className="grid-area-inside">
        {/* {props.state.topStrengths?.slice(0, 3).map((strength, idx) => {
          return (
            <SkillBar
              key={idx}
              values={strength}
              type="strengths"
              isComm={collabOrComm}
            />
          );
        })} */}
      </div>
    </div>
  );
};

const CommsAreasToImprove = (props) => {
  return (
    <div
      className="grid-areas"
      style={{ gridArea: "areas-to-improve", height: "445px" }}
    >
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Areas to Improve
        </h1>
      </div>
      <div className="grid-area-inside">
        {/* {props.state.areasToImprove?.slice(0, 3).map((improve, idx) => {
          return (
            <SkillBar
              key={idx}
              values={improve}
              type="areasToImprove"
              isComm={collabOrComm}
            />
          );
        })} */}
      </div>
    </div>
  );
};
