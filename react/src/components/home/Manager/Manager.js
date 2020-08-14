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

import React, { Component, useEffect } from "react";
// import SkillBar from "../../skills/SkillBar/SkillBar";
import { API_URL } from "../../../constants";
import { MANAGER_API } from "../../../queries";
import {
  Redirect,
  // Route
} from "react-router-dom";
import "./Manager.scss";

let selectedTutorial = "All";
let selectedSubject = "All";
let selectedTeam = "All";
let selectedUser = "All";

class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      report: null,
      organisations: null,
      tutorials: null,
      subjects: null,
      teams: null,
      users: null,

      topStrengths: null,
      areasToImprove: null,
      overEstimation: null,
      underEstimation: null,
    };
  }

  componentDidMount = () => {
    // console.log(this.props);
    this.fetchData();
  };

  fetchData = async () => {
    const query = MANAGER_API;
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        JWT: this.props.app.JWT,
      },
      body: JSON.stringify(query),
    };

    const response = await fetch(API_URL, options).then((data) => data.json());
    const { data, errors } = response.data.manager;

    console.log("data", data.manager);
    // console.log(this.props.app.data);

    // I know this is shit code
    // It's to compile without warnings
    if (errors && data) {
      console.log(data);
    }

    if (errors) {
      console.error(errors[0]["message"]);
      return false;
    }

    let report = data.manager;

    const organisations = this.utils.dataToState(report, "organisations");
    const tutorials = this.utils.dataToState(report, "tutorials");
    const subjects = this.utils.dataToState(report, "subjects");
    const teams = this.utils.dataToState(report, "teams");
    const users = this.utils.dataToState(report, "users");

    //NOTE: if("all") -> then average all scores
    //set topStrengths, areasToImprove etc. by averaging all scores

    const topStrengths = this.ranking.getStrengths(
      report,
      "All", //subject
      "All", //tutorials
      "All", //team
      "All" //user
    );
    // const areasToImprove;
    // const overEstimation;
    // const underEstimation;

    this.setState({
      ...this.state,
      loading: false,
      report,
      organisations,
      tutorials,
      subjects,
      teams,
      users,
    });
  };

  utils = {
    dataToState: (data, type) => {
      let result = [];
      if (type === "tutorials") {
        data.tutorial.map((tutorial) =>
          result.push({ id: tutorial._id, name: tutorial.name })
        );
        return result;
      }
      if (type === "subjects") {
        data.subject.map((subject) =>
          result.push({ id: subject._id, name: subject.name })
        );
        return result;
      }
      if (type === "teams") {
        data.team.map((team) => result.push({ id: team._id, name: team.name }));
        return result;
      }
      if (type === "users") {
        data.user.map((user) =>
          result.push({
            id: user._id,
            firstName: user.identity.firstName,
            lastName: user.identity.lastName,
          })
        );
        return result;
      }
    },
    averageScores: (data, type) => {
      let result = [];

      return result;
    },
  };

  ranking = {
    getStrengths: (report, tutorial, subject, team, user) => {
      let result;
      result = this.filter.byTutorial(report["user"], tutorial);
      // result = this.filter.bySubject(result, subject);
      // result = this.filter.byTeam(result, team);
      // result = this.filter.byUser(result, user);
      console.log("result", result);
      return result;
    },
  };

  filter = {
    byTutorial: (report, tutorial) => {
      let result = [];
      if (tutorial === "All") {
        return report;
      }
      result = report.filter((user) => {
        console.log("user tutorial", user.tutorial);
        return user["tutorial"]["name"] === tutorial.toLowerCase();
      });
      console.log("byTutorial", result);
      return result;
    },
    bySubject: (report, subject) => {},
    byTeam: (report, team) => {},
    byUser: (report, user) => {},
    getFilteredResults: (e) => {
      this.view.toggleTab(e);
    },
    // central: (report, value) => {
    //   let result;
    //   result = this.filter.byTutorial(report, selectedTutorial);
    //   result = this.filter.bySubject(result, selectedSubject)
    //   result = this.filter.byTeam(result, selectedTeam)
    //   result = this.filter.byUser(result, selectedUser)
    //   return result;
    // },
    dashboard: (value, type) => {
      const report = this.state.report["user"];
      let result;
      if (type === "Subject") {
        result = this.filter.byTutorial(report, selectedTutorial);
        result = this.filter.bySubject(result, value);
        result = this.filter.byTeam(result, selectedTeam);
        result = this.filter.byUser(result, selectedUser);
        selectedSubject = value;
      }
      if (type === "Tutorials") {
        result = this.filter.byTutorial(report, value);
        console.log("dashboard filter", result);
        result = this.filter.bySubject(result, value);
        result = this.filter.byTeam(result, selectedTeam);
        result = this.filter.byUser(result, selectedUser);
        selectedTutorial = value;
      }
      if (type === "Team") {
        result = this.filter.byTutorial(report, selectedTutorial);
        result = this.filter.bySubject(result, value);
        result = this.filter.byTeam(result, value);
        result = this.filter.byUser(result, selectedUser);
        selectedTeam = value;
      }
      if (type === "Individual") {
        result = this.filter.byTutorial(report, selectedTutorial);
        result = this.filter.bySubject(result, value);
        result = this.filter.byTeam(result, selectedTeam);
        result = this.filter.byUser(result, value);
        selectedUser = value;
      }
    },
  };

  view = {
    toggleTab: (e) => {
      let currentBtn = e.target;
      if (currentBtn.className === "tab") {
        let btns = document.querySelectorAll("#tab");
        btns.forEach((btn) => {
          btn.className = "tab";
        });
        currentBtn.classList.add("active");
      }
    },
  };

  render() {
    const { tutorials, subjects, teams, users } = this.state;

    window.onscroll = function() {
      filterBar();
    };

    function filterBar() {
      if (
        document.body.scrollTop > 212 ||
        document.documentElement.scrollTop > 212
      ) {
        document.querySelector(".main-skills-container").style.marginTop =
          "85px";
        document.querySelector(".skills-btns").className = "skills-btns fixed";
      } else {
        document.querySelector(".main-skills-container").style.marginTop =
          "24px";
        document.querySelector(".skills-btns").className = "skills-btns";
      }
    }

    if (!this.props.app.data) {
      return <Redirect to="/manager-login"></Redirect>;
    }

    return (
      <div className="review-container">
        <Heading />
        <div className="skills-main">
          <div
            style={{
              paddingLeft: "0",
              paddingRight: "0",
              width: "100%",
            }}
          >
            <CommunicationCollaborationTab toggle={this.view.toggleTab} />
          </div>
          <div className="main-skills-container">
            <DashboardFilter
              filters={{ tutorials, subjects, teams, users }}
              filterHandler={this.filter.dashboard}
            />
            <CollaborationIndex />
            <TopStrengths />
            <AreasToImprove />
            <Overestimation />
            <Underestimation />
          </div>
        </div>
      </div>
    );
  }
}

export default Manager;

const Heading = () => {
  return (
    <div className="top-background">
      <div className="skills-main-grid">
        <div className="skill-grid">
          <h1 style={{ color: "white" }}>Your Skills</h1>
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

const DashboardFilter = (props) => {
  const { subjects, teams, tutorials, users } = props.filters;

  useEffect(() => {
    handlers.selectBox();
    // return () => {
    //   cleanup;
    // };
  });
  const handlers = {
    selectBox: function() {},
  };

  return (
    <div className="filter" style={{ zIndex: "3" }}>
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
          Manager's dashboard
        </h1>
      </div>
      <div
        className="dashboard-menu"
        style={{
          textAlign: "left",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <SelectBox
          title="Subject"
          list={subjects}
          isUser={false}
          filterHandler={props.filterHandler}
        />
        <SelectBox
          title="Tutorials"
          list={tutorials}
          isUser={false}
          filterHandler={props.filterHandler}
        />
        <SelectBox
          title="Team"
          list={teams}
          isUser={false}
          filterHandler={props.filterHandler}
        />
        <SelectBox
          title="Individual"
          list={users}
          isUser={true}
          filterHandler={props.filterHandler}
        />
      </div>
    </div>
  );
};

const CommunicationCollaborationTab = (props) => {
  return (
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
              id="tab"
              className="tab active"
              onClick={props.toggle}
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
              id="tab"
              className="tab"
              onClick={props.toggle}
              value="communication"
            >
              Communication
            </button>
          </li>
        </div>
      </ul>
    </div>
  );
};

const CollaborationIndex = () => {
  return (
    <div className="grid-areas" style={{ gridArea: "index", height: "439px" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Collaboration Index
        </h1>
      </div>
      <div className="grid-area-inside">
        {/* <div className="radar-div">
  <Radar {...this.state} />
</div> */}
      </div>
    </div>
  );
};

const TopStrengths = () => {
  return (
    <div className="grid-areas" style={{ gridArea: "top-strength" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Top Strengths
        </h1>
      </div>
      <div className="grid-area-inside"></div>
    </div>
  );
};

const AreasToImprove = () => {
  return (
    <div className="grid-areas" style={{ gridArea: "areas-to-improve" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Areas to Improve
        </h1>
      </div>
      <div className="grid-area-inside"></div>
    </div>
  );
};

const Overestimation = () => {
  return (
    <div className="grid-areas" style={{ gridArea: "over-estimation" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Overestimation
        </h1>
      </div>
      <div className="grid-area-inside"></div>
    </div>
  );
};

const Underestimation = () => {
  return (
    <div className="grid-areas" style={{ gridArea: "under-estimation" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Underestimation
        </h1>
      </div>
      <div className="grid-area-inside"></div>
    </div>
  );
};

const SelectBox = (props) => {
  let list = props.list;
  let isUser = props.isUser;

  useEffect(() => {
    addEventListeners();
  });

  const filterHandler = (value, title) => {
    props.filterHandler(value, title);
  };

  const upperCase = (word) => {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
  };

  const addEventListeners = () => {
    let selectBoxes = document.querySelectorAll(".select-box");

    selectBoxes.forEach((selectBox) => {
      let selected = selectBox.querySelector(".selected");
      let optionContainer = selectBox.querySelector(".options-container");
      selected.addEventListener("click", function() {
        optionContainer.classList.add("active");
        let options = selectBox.querySelectorAll(".option");
        options.forEach((option) => {
          option.addEventListener("click", function(e) {
            selected.textContent = option.querySelector("label").textContent;
            optionContainer.classList.remove("active");
          });
        });
      });
    });
  };

  return (
    <div className="select-box">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <p>{props.title}</p>
      <div className="selected">All</div>
      <i style={{ fontSize: "20px" }} className="fa">
        &#xf107;
      </i>
      <div className="options-container" data-name={props.title}>
        <div className="option">
          <input type="checkbox" name="all" id="all" />
          <label htmlFor="all">All</label>
        </div>
        {list?.map((item, index) => {
          return (
            <div
              className="option"
              key={index}
              onClick={(e) => {
                filterHandler(
                  isUser ? upperCase(item.firstName) : upperCase(item.name),
                  e.target.parentNode.dataset.name
                );
              }}
            >
              <input type="checkbox" name="testing" id="testing" />
              <label
                htmlFor="testing"
                onClick={(e) => {
                  filterHandler(
                    isUser ? upperCase(item.firstName) : upperCase(item.name),
                    e.target.parentNode.parentNode.dataset.name
                  );
                }}
              >
                {isUser ? upperCase(item.firstName) : upperCase(item.name)}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
