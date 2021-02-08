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
import {
  selfCollaborationData,
  teamCollaborationData,
  selfCommunicationData,
  teamCommunicationData,
} from "./radarData";

import "./Radar.scss";

const RadarChart = (props) => {
  const { collabOrComms, stage } = props;

  const dataset = {
    collaboration: {
      self: {
        label: "Self-review",
        backgroundColor: "rgba(102, 204, 158,0.3)",
        borderColor: "rgba(102, 204, 158,0.8)",
        pointRadius: 0,
        data: selfCollaborationData(props),
      },
      team: {
        label: "Team-review",
        backgroundColor: "rgba(0,179,229,0.3)",
        borderColor: "rgba(0,179,229,0.8)",
        pointRadius: 0,
        data: teamCollaborationData(props),
      },
    },
    communication: {
      self: {
        label: "Self-review",
        backgroundColor: "rgba(102, 204, 158,0.3)",
        borderColor: "rgba(102, 204, 158,0.8)",
        pointRadius: 0,
        data: selfCommunicationData(props),
      },
      team: {
        label: "Team-review",
        backgroundColor: "rgba(0,179,229,0.3)",
        borderColor: "rgba(0,179,229,0.8)",
        pointRadius: 0,
        data: teamCommunicationData(props),
      },
    },
  };

  if (!props.report) {
    return null;
  }

  if (collabOrComms === "collaboration") {
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
              "Resilience",
            ],
            datasets: [
              ...[dataset.collaboration.self],
              ...(stage !== 1 ? [dataset.collaboration.team] : []),
            ],
            backgroundColor: "#00c8b3",
          }}
        ></Radar>
      </Container>
    );
  } else {
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
              "Verbal Attentiveness",
              "Clarity",
              "Culture",
              "Non-Verbal",
            ],
            datasets: [
              ...[dataset.communication.self],
              ...(stage !== 1 ? [dataset.communication.team] : []),
            ],
            backgroundColor: "#00c8b3",
          }}
        ></Radar>
      </Container>
    );
  }
};

export default RadarChart;
