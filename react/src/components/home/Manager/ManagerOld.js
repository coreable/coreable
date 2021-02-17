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
import Radar from "./RadarManager/Radar";
import SkillBar from "./SkillBar/SkillBar";
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
let collabOrComm = "collaboration";

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

      //New
      rawOrganisation: null,
      rawTutorials: null,
      rawSubjects: null,
      rawTeams: null,
      rawUsers: null,

      newTopStrengths: null,
      newAreasToImprove: null,
      newOverEstimation: null,
      newUnderEstimation: null,
      //

      topStrengths: null,
      areasToImprove: null,
      overEstimation: null,
      underEstimation: null,
    };
  }

  componentDidMount = () => {
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

    //New
    const rawOrganisation = this.utils.saveRawData(report, "organisation");
    const rawSubjects = this.utils.saveRawData(report, "subjects");
    const rawTutorials = this.utils.saveRawData(report, "tutorials");
    const rawTeams = this.utils.saveRawData(report, "teams");
    const rawUsers = this.utils.saveRawData(report, "users");

    const newTopStrengths = this.reviewRanking.getTopStrengths(
      rawUsers,
      collabOrComm
    );
    const newAreasToImprove = this.reviewRanking.getAreasToImprove(
      rawUsers,
      collabOrComm
    );
    const newOverEstimation = this.reviewRanking.getEstimationBy(
      rawUsers,
      collabOrComm,
      "over"
    );
    const newUnderEstimation = this.reviewRanking.getEstimationBy(
      rawUsers,
      collabOrComm,
      "under"
    );

    //
    const organisations = this.utils.dataToState(report, "organisations");
    const subjects = this.utils.dataToState(report, "subjects");
    const tutorials = this.utils.dataToState(report, "tutorials");
    const teams = this.utils.dataToState(report, "teams");
    const users = this.utils.dataToState(report, "users");

    this.setState({
      ...this.state,
      loading: false,
      report,
      organisations,
      tutorials,
      subjects,
      teams,
      users,

      //new
      rawOrganisation,
      rawTutorials,
      rawSubjects,
      rawTeams,
      rawUsers,

      newTopStrengths,
      newAreasToImprove,
      newOverEstimation,
      newUnderEstimation,
    });
  };

  utils = {
    saveRawData: (data, type) => {
      let result = [];

      if (type === "subjects") {
        data["organisation"].map((item) => {
          return item.subject.map((subject) => {
            result.push({ id: subject._id, name: subject.name });
            return subject;
          });
        });
        return result;
      }
      if (type === "tutorials") {
        data["organisation"].map((item) => {
          return item.subject.map((item) => {
            return item.tutorial.map((tutorial) => {
              result.push({ id: tutorial._id, name: tutorial.name });
              return tutorial;
            });
          });
        });
        return result;
      }
      if (type === "teams") {
        data["organisation"].map((item) => {
          return item.subject.map((item) => {
            return item.tutorial.map((tutorial) => {
              return tutorial.team.map((team) => {
                result.push({ id: team._id, name: team.name });
                return team;
              });
            });
          });
        });
        return result;
      }
      if (type === "users") {
        /*eslint array-callback-return: ["off", { allowImplicit: true }]*/
        data["organisation"].map((item) => {
          /*eslint array-callback-return: ["off", { allowImplicit: true }]*/
          return item.subject.map((item) => {
            /*eslint array-callback-return: ["off", { allowImplicit: true }]*/
            return item.tutorial.map((tutorial) => {
              /*eslint array-callback-return: ["off", { allowImplicit: true }]*/
              return tutorial.team.map((team) => {
                /*eslint array-callback-return: ["off", { allowImplicit: true }]*/
                return team.user.map((user) => {
                  result.push({
                    id: user._id,
                    firstName: user.identity.firstName,
                    lastName: user.identity.lastName,
                    organisation: user.organisation,
                    report: user.report,
                    subject: user.subject,
                    team: user.team,
                    tutorial: user.tutorial,
                  });
                });
              });
            });
          });
        });
        return result;
      }
    },
    dataToState: (data, type) => {
      let result = [];

      if (type === "subjects") {
        data["organisation"].map((item) => {
          return item.subject.map((subject) => {
            result.push({ id: subject._id, name: subject.name });
          });
        });
        return result;
      }
      if (type === "tutorials") {
        data["organisation"].map((item) => {
          return item.subject.map((item) => {
            return item.tutorial.map((tutorial) => {
              result.push({ id: tutorial._id, name: tutorial.name });
            });
          });
        });
        return result;
      }
      if (type === "teams") {
        data["organisation"].map((item) => {
          return item.subject.map((item) => {
            return item.tutorial.map((tutorial) => {
              return tutorial.team.map((team) => {
                result.push({ id: team._id, name: team.name });
              });
            });
          });
        });
        return result;
      }
      if (type === "users") {
        data["organisation"].map((item) => {
          return item.subject.map((item) => {
            return item.tutorial.map((tutorial) => {
              return tutorial.team.map((team) => {
                return team.user.map((user) => {
                  result.push({
                    id: user._id,
                    firstName: user.identity.firstName,
                    lastName: user.identity.lastName,
                  });
                  return user;
                });
              });
            });
          });
        });

        return result;
      }
    },
  };

  //New
  reviewRanking = {
    getTopStrengths: (users, collabOrComm) => {
      let result;
      result = this.filterBy.collabOrComm(users, collabOrComm);
      result = this.filterBy.reflection(result);
      result = this.math.getAverageScore(result);
      result = this.myUtil.sortDesc(result);
      return result;
    },
    getAreasToImprove: (users, collabOrComm) => {
      let result;
      result = this.filterBy.collabOrComm(users, collabOrComm);
      result = this.filterBy.reflection(result);
      result = this.math.getAverageScore(result);
      result = this.myUtil.sortAsc(result);
      return result;
    },
    getEstimationBy: (users, collabOrComm, overOrUnder) => {
      let result;
      result = this.filterBy.collabOrComm(users, collabOrComm);
      result = this.filterBy.hasReflectionAndAverage(result);
      let averageReflection = this.math.getAverageScoreBoth(
        result,
        "reflection"
      );
      let averageAverage = this.math.getAverageScoreBoth(result, "average");
      result = this.math.getDifference(averageReflection, averageAverage);
      if (overOrUnder === "over") {
        result = this.myUtil.sortByDifference(result, true);
      } else if (overOrUnder === "under") {
        result = this.myUtil.sortByDifference(result, false);
      }
      return result;
    },
  };

  filterBy = {
    collabOrComm: (users, type) => {
      return users?.map((user) => {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          average: user.report.average[type]?.facets.sorted,
          reflection: user.report.reflection[type]?.facets.sorted,
        };
      });
    },
    reflection: (users) => {
      return users
        ?.filter((user) => {
          return user.reflection;
        })
        .map((user) => {
          return user.reflection;
        });
    },
    hasReflectionAndAverage: (users) => {
      return users.filter((user) => {
        return user.average !== undefined && user.reflection !== undefined;
      });
    },
  };

  math = {
    getAverageScore: (users) => {
      let result = {};
      users.map((user) => {
        user.map((facet) => {
          if (result[facet.field]) {
            result[facet.field] += facet.value;
          } else {
            result[facet.field] = facet.value;
          }
        });
      });
      Object.keys(result).map(function(key, index) {
        result[key] /= users.length;
      });
      return result;
    },
    getAverageScoreBoth: (users, reflectOrAvg) => {
      let result = {};
      users.map((user) => {
        Object.keys(user).map(function(key, index) {
          if (key === reflectOrAvg) {
            user[key].map((facet) => {
              if (result[facet.field]) {
                result[facet.field] += facet.value;
              } else {
                result[facet.field] = facet.value;
              }
            });
          }
        });
      });
      Object.keys(result).map(function(key, index) {
        result[key] /= users.length;
      });
      return result;
    },
    getDifference: (reflection, average) => {
      let result = [];
      Object.keys(reflection).map(function(key, index) {
        result.push({
          name: key,
          average: average[key],
          reflection: reflection[key],
          difference: reflection[key] - average[key],
        });
      });
      return result;
    },
    getDifferenceByFacet: (users) => {
      let result = [];

      users.map((user) => {
        result.push({
          firstname: user.firstName,
          lastname: user.lastName,
          id: user.id,
          reflection: user.reflection,
          average: user.average,
          difference: [
            {
              name: "emotionalIntelligence",
              value:
                this.myUtil.findFieldScoreByFacet(
                  user.reflection,
                  "emotionalIntelligence"
                ) -
                this.myUtil.findFieldScoreByFacet(
                  user.average,
                  "emotionalIntelligence"
                ),
            },
            {
              name: "initiative",
              value:
                this.myUtil.findFieldScoreByFacet(
                  user.reflection,
                  "initiative"
                ) -
                this.myUtil.findFieldScoreByFacet(user.average, "initiative"),
            },
            {
              name: "trust",
              value:
                this.myUtil.findFieldScoreByFacet(user.reflection, "trust") -
                this.myUtil.findFieldScoreByFacet(user.average, "trust"),
            },
            {
              name: "flex",
              value:
                this.myUtil.findFieldScoreByFacet(user.reflection, "flex") -
                this.myUtil.findFieldScoreByFacet(user.average, "flex"),
            },
            {
              name: "resilience",
              value:
                this.myUtil.findFieldScoreByFacet(
                  user.reflection,
                  "resilience"
                ) -
                this.myUtil.findFieldScoreByFacet(user.average, "resilience"),
            },
          ],
        });
      });

      return result;
    },
  };

  myUtil = {
    sortAsc: (object) => {
      let result = [];
      Object.keys(object).map(function(key, index) {
        result.push({ name: key, value: object[key] });
      });
      return result.sort((a, b) => a.value - b.value);
    },
    sortDesc: (object) => {
      let result = [];
      Object.keys(object).map(function(key, index) {
        result.push({ name: key, value: object[key] });
      });
      return result.sort((a, b) => b.value - a.value);
    },
    findFieldScoreByFacet: (facets, facetName) => {
      let result = facets.filter((facet) => {
        if (facet.field === facetName) {
          return facet.value;
        }
      });
      return result[0].value;
    },
    sortByDifference: (facets, positive) => {
      if (positive) {
        return facets.filter((facet) => {
          return facet.difference > 0;
        });
      } else {
        return facets.filter((facet) => {
          return facet.difference < 0;
        });
      }
    },
  };

  //

  filter = {
    bySubject: (users, subjectID) => {
      let result = [];
      if (subjectID === "All") {
        return users;
      }

      users.map((user) => {
        user.subject.map((subject) => {
          if (subject._id === subjectID) {
            result.push(user);
          }
        });
      });
      return result;
    },
    byTutorial: (users, tutorialID) => {
      let result = [];
      if (tutorialID === "All") {
        return users;
      }

      users.map((user) => {
        user.tutorial.map((tutorial) => {
          if (tutorial._id === tutorialID) {
            result.push(user);
          }
        });
      });
      return result;
    },
    byTeam: (users, teamID) => {
      let result = [];
      if (teamID === "All") {
        return users;
      }
      users.map((user) => {
        user.team.map((team) => {
          if (team._id === teamID) {
            result.push(user);
          }
        });
      });
      return result;
    },
    byUser: (users, userID) => {
      let result = [];
      if (userID === "All") {
        return users;
      }
      users.map((user) => {
        if (user.id === userID) {
          result.push(user);
        }
      });
      return result;
    },
    dashboard: (value, type) => {
      const report = this.state.report["organisation"][0]["subject"][0][
        "tutorial"
      ][0]["team"][0]["user"];
      console.log(report);
      const users = this.state.rawUsers;

      let result;
      if (type === "Subject") {
        result = this.filter.bySubject(users, value);
        result = this.filter.byTutorial(result, selectedTutorial);
        result = this.filter.byTeam(result, selectedTeam);
        result = this.filter.byUser(result, selectedUser);
        selectedSubject = value;
      }
      if (type === "Tutorials") {
        result = this.filter.bySubject(users, selectedSubject);
        result = this.filter.byTutorial(result, value);
        result = this.filter.byTeam(result, selectedTeam);
        result = this.filter.byUser(result, selectedUser);
        selectedTutorial = value;
      }
      if (type === "Team") {
        result = this.filter.bySubject(users, selectedSubject);
        result = this.filter.byTutorial(result, selectedTutorial);
        result = this.filter.byTeam(result, value);
        result = this.filter.byUser(result, selectedUser);
        selectedTeam = value;
      }
      if (type === "Individual") {
        result = this.filter.bySubject(users, selectedSubject);
        result = this.filter.byTutorial(result, selectedTutorial);
        result = this.filter.byTeam(result, selectedTeam);
        result = this.filter.byUser(result, value);
        selectedUser = value;
      }

      if (type === "communication") {
        collabOrComm = "communication";
        result = this.filter.bySubject(users, selectedSubject);
        result = this.filter.byTutorial(result, selectedTutorial);
        result = this.filter.byTeam(result, selectedTeam);
        result = this.filter.byUser(result, selectedUser);
      }
      if (type === "collaboration") {
        collabOrComm = "collaboration";
        result = this.filter.bySubject(users, selectedSubject);
        result = this.filter.byTutorial(result, selectedTutorial);
        result = this.filter.byTeam(result, selectedTeam);
        result = this.filter.byUser(result, selectedUser);
      }

      //result is user(s)
      const finalResult = {
        strengths: this.reviewRanking.getTopStrengths(result, collabOrComm),
        areasToImprove: this.reviewRanking.getAreasToImprove(
          result,
          collabOrComm
        ),
        overEstimation: this.reviewRanking.getEstimationBy(
          result,
          collabOrComm,
          "over"
        ),
        underEstimation: this.reviewRanking.getEstimationBy(
          result,
          collabOrComm,
          "under"
        ),
      };

      let listOfUsers;

      if (type === "Individual") {
        listOfUsers = this.state.users;
      } else {
        listOfUsers = result;
      }

      this.setState({
        ...this.state,
        users: listOfUsers,
        newTopStrengths: finalResult["strengths"],
        newAreasToImprove: finalResult["areasToImprove"],
        newOverEstimation: finalResult["overEstimation"],
        newUnderEstimation: finalResult["underEstimation"],
      });
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
            <CommunicationCollaborationTab
              toggle={this.view.toggleTab}
              filterHandler={this.filter.dashboard}
            />
          </div>
          <div className="main-skills-container">
            <DashboardFilter
              filters={{ tutorials, subjects, teams, users }}
              filterHandler={this.filter.dashboard}
            />
            <Index state={this.state} />
            <TopStrengths state={this.state} />
            <AreasToImprove state={this.state} />
            <Overestimation state={this.state} />
            <Underestimation state={this.state} />
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
  const clickHandler = (e) => {
    props.toggle(e);
    props.filterHandler(0, e.target.value);
  };
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
              onClick={clickHandler}
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
              onClick={clickHandler}
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

const Index = (props) => {
  return (
    <div className="grid-areas" style={{ gridArea: "index", height: "445px" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          {collabOrComm === "collaboration" ? "Collaboration" : "Communication"}{" "}
          Index
        </h1>
      </div>
      <div className="grid-area-inside">
        <div className="radar-div">
          <Radar {...props.state} collabOrComms={collabOrComm} />
        </div>
      </div>
    </div>
  );
};

const TopStrengths = (props) => {
  return (
    <div className="grid-areas" style={{ gridArea: "top-strength" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Top Strengths
        </h1>
      </div>
      <div className="grid-area-inside">
        {props.state.newTopStrengths?.slice(0, 3).map((strength, idx) => {
          return (
            <SkillBar
              key={idx}
              values={strength}
              type="strengths"
              isComm={collabOrComm}
            />
          );
        })}
      </div>
    </div>
  );
};

const AreasToImprove = (props) => {
  return (
    <div className="grid-areas" style={{ gridArea: "areas-to-improve" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Areas to Improve
        </h1>
      </div>
      <div className="grid-area-inside">
        {props.state.newAreasToImprove?.slice(0, 3).map((improve, idx) => {
          return (
            <SkillBar
              key={idx}
              values={improve}
              type="areasToImprove"
              isComm={collabOrComm}
            />
          );
        })}
      </div>
    </div>
  );
};

const Overestimation = (props) => {
  return (
    <div className="grid-areas" style={{ gridArea: "over-estimation" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Overestimation
        </h1>
      </div>
      <div className="grid-area-inside">
        {props.state.newOverEstimation?.slice(0, 3).map((over, idx) => {
          return (
            <SkillBar
              key={idx}
              values={over}
              type="overEstimation"
              isComm={collabOrComm}
            />
          );
        })}
      </div>
    </div>
  );
};

const Underestimation = (props) => {
  return (
    <div className="grid-areas" style={{ gridArea: "under-estimation" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Underestimation
        </h1>
      </div>
      <div className="grid-area-inside">
        {props.state.newUnderEstimation?.slice(0, 3).map((under, idx) => {
          return (
            <SkillBar
              key={idx}
              values={under}
              type="underEstimation"
              isComm={collabOrComm}
            />
          );
        })}
      </div>
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
        <div
          className="option"
          data-name={props.title}
          onClick={(e) => {
            filterHandler("All", e.target.parentNode.dataset.name);
          }}
        >
          <input type="checkbox" name="all" id="all" />
          <label
            htmlFor="all"
            onClick={(e) => {
              filterHandler("All", e.target.parentNode.dataset.name);
            }}
          >
            All
          </label>
        </div>
        {list?.map((item, index) => {
          return (
            <div
              className="option"
              key={index}
              data-name={props.title}
              onClick={(e) => {
                filterHandler(item.id, e.target.parentNode.dataset.name);
              }}
            >
              <input type="checkbox" name="testing" id="testing" />
              <label
                htmlFor="testing"
                onClick={(e) => {
                  filterHandler(
                    // isUser ? upperCase(item.firstName) : upperCase(item.name),
                    item.id,
                    e.target.parentNode.dataset.name
                  );
                }}
              >
                {isUser
                  ? `${upperCase(item.firstName)} ${upperCase(item.lastName)}`
                  : upperCase(item.name)}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
