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
// import SkillBar from "../../skills/SkillBar/SkillBar";
import {
  Redirect,
  // Route
} from "react-router-dom";

import "./Manager.scss";

class Skills extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const btns = document.querySelectorAll(".facet-button");
    const tabs = document.querySelectorAll(".tab");

    window.onscroll = function() {
      filterBar();
    };

    function filterBar() {
      if (
        document.body.scrollTop > 210 ||
        document.documentElement.scrollTop > 210
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

          {/* <div className="radar-div">
            <Radar {...this.state} />
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
                <div>
                  <label>Team</label>
                  <br />
                  <select
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  >
                    <option>All</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid-areas" style={{ gridArea: "top-strength" }}>
              <div className="heading">
                <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
                  Top Strengths
                </h1>
              </div>
              <div className="grid-area-inside"></div>
            </div>

            <div
              className="grid-areas"
              style={{ gridArea: "areas-to-improve" }}
            >
              <div className="heading">
                <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
                  Areas to Improve
                </h1>
              </div>
              <div className="grid-area-inside"></div>
            </div>

            <div className="grid-areas" style={{ gridArea: "over-estimation" }}>
              <div className="heading">
                <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
                  Overestimation
                </h1>
              </div>
              <div className="grid-area-inside"></div>
            </div>

            <div
              className="grid-areas"
              style={{ gridArea: "under-estimation" }}
            >
              <div className="heading">
                <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
                  Underestimation
                </h1>
              </div>
              <div className="grid-area-inside"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Skills;
