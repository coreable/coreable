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
import Radar from "../../skills/Radar";
import SkillBar from "./SkillBar/SkillBar";
import { API_URL } from "../../../constants";
import { MANAGER_API } from "../../../queries";
import {
  Redirect,
  // Route
} from "react-router-dom";
import "./Manager.scss";
import { result } from "lodash";

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
    let usersInfo =
      data.manager["organisation"][0]["subject"][0]["tutorial"][0]["team"][0][
        "user"
      ];

    const organisations = this.utils.dataToState(report, "organisations");
    const tutorials = this.utils.dataToState(report, "tutorials");
    const subjects = this.utils.dataToState(report, "subjects");
    const teams = this.utils.dataToState(report, "teams");
    const users = this.utils.dataToState(report, "users");

    const topStrengths = this.ranking.getStrengths(usersInfo, collabOrComm);
    const areasToImprove = this.ranking.getAreasToImprove(
      usersInfo,
      collabOrComm
    );
    const overEstimation = this.ranking.getOverEstimation(
      usersInfo,
      collabOrComm
    );
    const underEstimation = this.ranking.getUnderEstimation(
      usersInfo,
      collabOrComm
    );

    this.setState({
      ...this.state,
      loading: false,
      report,
      organisations,
      tutorials,
      subjects,
      teams,
      users,

      topStrengths,
      areasToImprove,
      overEstimation,
      underEstimation,
    });
  };

  utils = {
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
                });
              });
            });
          });
        });

        return result;
      }
    },
    averageScores: (data, type) => {
      let result = [];

      return result;
    },
    switchCollaboration: (array, resultArray) => {
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
          switch (array[i][j].field) {
            case "emotionalIntelligence":
              resultArray[0].averageScore += array[i][j].value;
              if (i === array.length - 1) {
                resultArray[0].averageScore =
                  resultArray[0].averageScore / array.length;
              }
              break;
            case "initiative":
              resultArray[1].averageScore += array[i][j].value;
              if (i === array.length - 1) {
                resultArray[1].averageScore =
                  resultArray[1].averageScore / array.length;
              }
              break;
            case "trust":
              resultArray[2].averageScore += array[i][j].value;
              if (i === array.length - 1) {
                resultArray[2].averageScore =
                  resultArray[2].averageScore / array.length;
              }
              break;
            case "flex":
              resultArray[3].averageScore += array[i][j].value;
              if (i === array.length - 1) {
                resultArray[3].averageScore =
                  resultArray[3].averageScore / array.length;
              }
              break;
            case "resilience":
              resultArray[4].averageScore += array[i][j].value;
              if (i === array.length - 1) {
                resultArray[4].averageScore =
                  resultArray[4].averageScore / array.length;
              }
              break;
            default:
              break;
          }
        }
      }
      return resultArray;
    },
    switchCommunication: (array, resultArray) => {
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
          switch (array[i][j].field) {
            case "attentive":
              resultArray[0].averageScore += array[i][j].value;
              if (i === array.length - 1) {
                resultArray[0].averageScore =
                  resultArray[0].averageScore / array.length;
              }
              break;
            case "clarity":
              resultArray[1].averageScore += array[i][j].value;
              if (i === array.length - 1) {
                resultArray[1].averageScore =
                  resultArray[1].averageScore / array.length;
              }
              break;
            case "culture":
              resultArray[2].averageScore += array[i][j].value;
              if (i === array.length - 1) {
                resultArray[2].averageScore =
                  resultArray[2].averageScore / array.length;
              }
              break;
            case "nonVerbal":
              resultArray[3].averageScore += array[i][j].value;
              if (i === array.length - 1) {
                resultArray[3].averageScore =
                  resultArray[3].averageScore / array.length;
              }
              break;
            default:
              break;
          }
        }
      }
      return resultArray;
    },
    combineData: (array, resultArray) => {
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
          for (let k = 0; k < array[i][j].length; k++) {
            resultArray.forEach((facet) => {
              if (facet.code === array[i][j][k].name) {
                facet.averageScore += array[i][j][k].averageScore;
                facet.reflectionScore += array[i][j][k].reflectionScore;

                if (i === array.length - 1) {
                  facet.averageScore = facet.averageScore / array.length;
                  facet.reflectionScore = facet.reflectionScore / array.length;
                  facet.difference = facet.reflectionScore - facet.averageScore;
                }
              }
            });
          }
        }
      }
      return resultArray;
    },
    getDifference: (userReport) => {
      let result = [];

      userReport.average.forEach((facet) => {
        result.push({
          name: facet.field,
          averageScore: facet.value,
          reflectionScore: userReport.reflection.find(
            (o) => o.field === facet.field
          ).value,
          difference:
            userReport.reflection.find((o) => o.field === facet.field).value -
            facet.value,
        });
      });
      return result;
    },
  };

  ranking = {
    collabTemplate: [
      { name: "Emotional Intelligence", averageScore: 0 },
      { name: "Initiative", averageScore: 0 },
      { name: "Trust", averageScore: 0 },
      { name: "Flex", averageScore: 0 },
      { name: "Resilience", averageScore: 0 },
    ],
    commsTemplate: [
      { name: "Attentive", averageScore: 0 },
      { name: "Clarity", averageScore: 0 },
      { name: "Culture", averageScore: 0 },
      { name: "Non Verbal", averageScore: 0 },
    ],
    collabDetailed: [
      {
        name: "Emotional Intelligence",
        code: "emotionalIntelligence",
        averageScore: 0,
        reflectionScore: 0,
        difference: 0,
      },
      {
        name: "Initiative",
        code: "initiative",
        averageScore: 0,
        reflectionScore: 0,
        difference: 0,
      },
      {
        name: "Trust",
        code: "trust",
        averageScore: 0,
        reflectionScore: 0,
        difference: 0,
      },
      {
        name: "Flex",
        code: "flex",
        averageScore: 0,
        reflectionScore: 0,
        difference: 0,
      },
      {
        name: "Resilience",
        code: "resilience",
        averageScore: 0,
        reflectionScore: 0,
        difference: 0,
      },
    ],
    commsDetailed: [
      {
        name: "Attentive",
        code: "attentive",
        averageScore: 0,
        reflectionScore: 0,
        difference: 0,
      },
      {
        name: "Clarity",
        code: "clarity",
        averageScore: 0,
        reflectionScore: 0,
        difference: 0,
      },
      {
        name: "Culture",
        code: "culture",
        averageScore: 0,
        reflectionScore: 0,
        difference: 0,
      },
      {
        name: "Non Verbal",
        code: "nonVerbal",
        averageScore: 0,
        reflectionScore: 0,
        difference: 0,
      },
    ],
    getStrengths: (report, collabOrComm) => {
      let result;
      let finalResult;

      if (collabOrComm === "communication") {
        finalResult = JSON.parse(JSON.stringify(this.ranking.commsTemplate));
        result = this.filter.byCommunication(report);
      }

      if (collabOrComm === "collaboration") {
        finalResult = JSON.parse(JSON.stringify(this.ranking.collabTemplate));
        result = this.filter.byCollaboration(report);
      }

      let averageResults = result
        .filter((user) => {
          return user.average;
        })
        .map((user) => {
          return user.average;
        });

      if (collabOrComm === "collaboration") {
        finalResult = this.utils
          .switchCollaboration(averageResults, finalResult)
          .sort((a, b) => b.averageScore - a.averageScore);
      }

      if (collabOrComm === "communication") {
        finalResult = this.utils
          .switchCommunication(averageResults, finalResult)
          .sort((a, b) => b.averageScore - a.averageScore);
      }

      return finalResult;
    },
    //Fine lowest average scores combined.
    getAreasToImprove: (report, collabOrComm) => {
      let result;
      let finalResult;

      if (collabOrComm === "communication") {
        finalResult = JSON.parse(JSON.stringify(this.ranking.commsTemplate));
        result = this.filter.byCommunication(report);
      }
      if (collabOrComm === "collaboration") {
        finalResult = JSON.parse(JSON.stringify(this.ranking.collabTemplate));
        result = this.filter.byCollaboration(report);
      }

      let averageResults = result
        .filter((user) => {
          return user.average;
        })
        .map((user) => {
          return user.average;
        });

      if (collabOrComm === "collaboration") {
        finalResult = this.utils
          .switchCollaboration(averageResults, finalResult)
          .sort((a, b) => a.averageScore - b.averageScore);
      }

      if (collabOrComm === "communication") {
        finalResult = this.utils
          .switchCommunication(averageResults, finalResult)
          .sort((a, b) => a.averageScore - b.averageScore);
      }

      return finalResult;
    },
    getOverEstimation: (report, collabOrComm) => {
      let result;
      let finalResult;

      if (collabOrComm === "communication") {
        finalResult = JSON.parse(JSON.stringify(this.ranking.commsDetailed));
        result = this.filter.byCommunication(report);
      }
      if (collabOrComm === "collaboration") {
        finalResult = JSON.parse(JSON.stringify(this.ranking.collabDetailed));
        result = this.filter.byCollaboration(report);
      }

      result = this.filter.byDidReflection(result);
      let returnData = [];

      result.forEach((user) => {
        returnData.push([this.utils.getDifference(user)]);
      });

      finalResult = this.utils
        .combineData(returnData, finalResult)
        .sort((a, b) => b.difference - a.difference);

      return finalResult;
    },
    //reflection < average
    getUnderEstimation: (report, collabOrComm) => {
      let result;
      let finalResult;

      if (collabOrComm === "communication") {
        finalResult = JSON.parse(JSON.stringify(this.ranking.commsDetailed));
        result = this.filter.byCommunication(report);
      }
      if (collabOrComm === "collaboration") {
        finalResult = JSON.parse(JSON.stringify(this.ranking.collabDetailed));
        result = this.filter.byCollaboration(report);
      }

      result = this.filter.byDidReflection(result);
      let returnData = [];

      result.forEach((user) => {
        returnData.push([this.utils.getDifference(user)]);
      });

      finalResult = this.utils
        .combineData(returnData, finalResult)
        .sort((a, b) => a.difference - b.difference);

      return finalResult;
    },
  };

  filter = {
    byDidReflection: (report) => {
      return report.filter((user) => {
        return user.reflection;
      });
    },
    bySubject: (report, subjectID) => {
      if (subjectID === "All") {
        return report;
      }

      return report.filter((user) => {
        return user.subject.filter((subject) => {
          return subject._id === subjectID;
        });
      });
    },
    byTutorial: (report, tutorialID) => {
      if (tutorialID === "All") {
        return report;
      }

      return report.filter((user) => {
        return user.tutorial.filter((tutorial) => {
          return tutorial._id === tutorialID;
        });
      });
    },
    byTeam: (report, teamID) => {
      if (teamID === "All") {
        return report;
      }

      return report.filter((user) => {
        return user.team.filter((team) => {
          return team._id === teamID;
        });
      });
    },
    byUser: (report, userID) => {
      if (userID === "All") {
        return report;
      }

      return report.filter((user) => {
        return user._id === userID;
      });
    },
    byCollaboration: (users) => {
      return users?.map((user) => {
        return {
          id: user._id,
          firstName: user.identity.firstName,
          lastName: user.identity.lastName,
          average: user.report.average.collaboration?.facets.sorted,
          reflection: user.report.reflection.collaboration?.facets.sorted,
        };
      });
    },
    byCommunication: (users) => {
      return users?.map((user) => {
        return {
          id: user._id,
          firstName: user.identity.firstName,
          lastName: user.identity.lastName,
          average: user.report.average.communication?.facets.sorted,
          reflection: user.report.reflection.communication?.facets.sorted,
        };
      });
    },
    getFilteredResults: (e) => {
      this.view.toggleTab(e);
    },
    dashboard: (value, type) => {
      const report = this.state.report["organisation"][0]["subject"][0][
        "tutorial"
      ][0]["team"][0]["user"];
      let result;
      if (type === "Subject") {
        result = this.filter.bySubject(report, value);
        result = this.filter.byTutorial(result, selectedTutorial);
        result = this.filter.byTeam(result, selectedTeam);
        result = this.filter.byUser(result, selectedUser);
        selectedSubject = value;
      }
      if (type === "Tutorials") {
        result = this.filter.bySubject(report, selectedSubject);
        result = this.filter.byTutorial(result, value);
        result = this.filter.byTeam(result, selectedTeam);
        result = this.filter.byUser(result, selectedUser);
        selectedTutorial = value;
      }
      if (type === "Team") {
        result = this.filter.bySubject(report, selectedSubject);
        result = this.filter.byTutorial(result, selectedTutorial);
        result = this.filter.byTeam(result, value);
        result = this.filter.byUser(result, selectedUser);
        selectedTeam = value;
      }
      if (type === "Individual") {
        result = this.filter.bySubject(report, selectedSubject);
        result = this.filter.byTutorial(result, selectedTutorial);
        result = this.filter.byTeam(result, selectedTeam);
        result = this.filter.byUser(result, value);
        selectedUser = value;
      }

      // console.log("result", result);

      if (type === "communication") {
        collabOrComm = "communication";
        result = this.filter.bySubject(report, selectedSubject);
        result = this.filter.byTutorial(result, selectedTutorial);
        result = this.filter.byTeam(result, selectedTeam);
        result = this.filter.byUser(result, selectedUser);
      }
      if (type === "collaboration") {
        collabOrComm = "collaboration";
        result = this.filter.bySubject(report, selectedSubject);
        result = this.filter.byTutorial(result, selectedTutorial);
        result = this.filter.byTeam(result, selectedTeam);
        result = this.filter.byUser(result, selectedUser);
      }

      //result is user(s)
      const finalResult = {
        strengths: this.ranking.getStrengths(result, collabOrComm),
        areasToImprove: this.ranking.getAreasToImprove(result, collabOrComm),
        overEstimation: this.ranking.getOverEstimation(result, collabOrComm),
        underEstimation: this.ranking.getUnderEstimation(result, collabOrComm),
      };

      this.setState({
        ...this.state,
        topStrengths: finalResult["strengths"],
        areasToImprove: finalResult["areasToImprove"],
        overEstimation: finalResult["overEstimation"],
        underEstimation: finalResult["underEstimation"],
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
            <CollaborationIndex state={this.state} />
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

const CollaborationIndex = (props) => {
  return (
    <div className="grid-areas" style={{ gridArea: "index", height: "439px" }}>
      <div className="heading">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
          Collaboration Index
        </h1>
      </div>
      <div className="grid-area-inside">
        <div className="radar-div">{/* <Radar {...props.state} /> */}</div>
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
        {props.state.topStrengths?.slice(0, 3).map((strength, idx) => {
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
        {props.state.areasToImprove?.slice(0, 3).map((improve, idx) => {
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
        {props.state.overEstimation?.slice(0, 3).map((over, idx) => {
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
        {props.state.underEstimation?.slice(0, 3).map((under, idx) => {
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
