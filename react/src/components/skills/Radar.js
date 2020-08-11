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

import React from "react";
import { Radar } from "react-chartjs-2";
import { Container } from "@material-ui/core";

import "./Radar.scss";

const RadarChart = (props) => {
  if (!props.report) {
    return null;
  }
  // console.log(props.report);
  return (
    <Container className="radar-container">
      <Radar
        options={{
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 10,
              bottom: 0,
            },
          },
          scale: {
            ticks: {
              max: 100,
              min: 0,
              stepSize: 20,
            },
          },
          legend: {
            position: "bottom",
            align: "centre",
            padding: 50,
          },
        }}
        data={{
          labels: [
            "Emotional Intelligence",
            "Initiative",
            "Trust",
            "Flexibility",
            "Clarity",
            "Culture",
            "Non-Verbal",
            "Verbal Attentiveness",
            "Resilience",
          ],
          datasets: [
            {
              label: "Self-review",
              backgroundColor: "rgba(102, 204, 158,0.3)",
              borderColor: "rgba(102, 204, 158,0.8)",
              pointRadius: 0,
              data: [
                props.report?.reflection?.collaboration?.facets?.default
                  ?.emotionalIntelligence || 0,
                props.report?.reflection?.collaboration?.facets?.default
                  ?.initiative || 0,
                props.report?.reflection?.collaboration?.facets?.default
                  ?.trust || 0,
                props.report?.reflection?.collaboration?.facets?.default
                  ?.flex || 0,
                props.report?.reflection?.collaboration?.facets?.default
                  ?.resilience || 0,
                props.report?.reflection?.communication?.facets?.default
                  ?.clarity || 0,
                props.report?.reflection?.communication?.facets?.default
                  ?.culture || 0,
                props.report?.reflection?.communication?.facets?.default
                  ?.nonVerbal || 0,
                props.report?.reflection?.communication?.facets?.default
                  ?.attentive || 0,
              ],
            },
            {
              label: "Team-review",
              backgroundColor: "rgba(0,179,229,0.3)",
              borderColor: "rgba(0,179,229,0.8)",
              pointRadius: 0,
              data: [
                props.report?.average?.collaboration?.facets?.default
                  ?.emotionalIntelligence || 0,
                props.report?.average?.collaboration?.facets?.default
                  ?.initiative || 0,
                props.report?.average?.collaboration?.facets?.default?.trust ||
                  0,
                props.report?.average?.collaboration?.facets?.default?.flex ||
                  0,
                props.report?.average?.collaboration?.facets?.default
                  ?.resilience || 0,
                props.report?.average?.communication?.facets?.default
                  ?.clarity || 0,
                props.report?.average?.communication?.facets?.default
                  ?.culture || 0,
                props.report?.average?.communication?.facets?.default
                  ?.nonVerbal || 0,
                props.report?.average?.communication?.facets?.default
                  ?.attentive || 0,
              ],
            },
          ],
          backgroundColor: "#00c8b3",
        }}
      ></Radar>
    </Container>
  );
};

export default RadarChart;
