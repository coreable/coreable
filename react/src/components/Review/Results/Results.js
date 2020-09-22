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
            trait: key,
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
            <div className="collab-results-left">
              <CollabIndex />
              <CollabTopStrengths data={this.state.collaborationData} />
              <CollabAreasToImprove data={this.state.collaborationData} />
            </div>
            <div className="comms-results-right">
              <CommsIndex />
              <CommsTopStrengths data={this.state.communicationData} />
              <CommsAreasToImprove data={this.state.communicationData} />
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
  const topStrengths = props.data?.sort((a, b) => b.value - a.value);

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
        {areasToImprove?.slice(0, 3).map((improve, idx) => {
          return <SkillBar key={idx} values={improve} />;
        })}
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
  const topStrengths = props.data?.sort((a, b) => b.value - a.value);

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
        {areasToImprove?.slice(0, 3).map((improve, idx) => {
          return <SkillBar key={idx} values={improve} />;
        })}
      </div>
    </div>
  );
};
