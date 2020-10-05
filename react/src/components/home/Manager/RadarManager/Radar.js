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

  const collabOrComms = props.collabOrComms;

  let averageFacetsCollab = {
    emotionalIntelligence: 0,
    initiative: 0,
    trust: 0,
    flex: 0,
    resilience: 0,
  };

  let averageFacetsComm = {
    clarity: 0,
    culture: 0,
    nonVerbal: 0,
    attentive: 0,
  };

  let reflectionFacetsCollab = {
    emotionalIntelligence: 0,
    initiative: 0,
    trust: 0,
    flex: 0,
    resilience: 0,
  };

  let reflectionFacetsComm = {
    clarity: 0,
    culture: 0,
    nonVerbal: 0,
    attentive: 0,
  };

  let users =
    props.report["organisation"][0]["subject"][0]["tutorial"][0]["team"][0][
      "user"
    ];

  const addValues = (users, object, averageOrReflection, commOrCollab) => {
    users.forEach((user) => {
      for (const facet in object) {
        if (object.hasOwnProperty(facet)) {
          object[facet] += user.report?.[averageOrReflection]?.[commOrCollab]
            ?.facets?.default?.[facet]
            ? user.report?.[averageOrReflection]?.[commOrCollab]?.facets
                ?.default?.[facet]
            : 0;
        }
      }
    });
  };

  const getAverage = (users, object) => {
    const totalUsers = users.length;

    for (const facet in object) {
      if (object.hasOwnProperty(facet)) {
        object[facet] = object[facet] / totalUsers;
      }
    }
  };

  addValues(users, averageFacetsCollab, "average", "collaboration");
  addValues(users, averageFacetsComm, "average", "communication");
  addValues(users, reflectionFacetsCollab, "reflection", "collaboration");
  addValues(users, reflectionFacetsComm, "reflection", "communication");

  getAverage(users, averageFacetsCollab);
  getAverage(users, averageFacetsComm);
  getAverage(users, reflectionFacetsCollab);
  getAverage(users, reflectionFacetsComm);

  return (
    <Container className="radar-container">
      {collabOrComms === "collaboration" ? (
        <Radar
          options={{
            maintainAspectRatio: false,
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
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
              padding: 10,
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
              {
                label: "Self-review",
                backgroundColor: "rgba(102, 204, 158,0.3)",
                borderColor: "rgba(102, 204, 158,0.8)",
                pointRadius: 0,
                data: [
                  reflectionFacetsCollab.emotionalIntelligence || 0,
                  reflectionFacetsCollab.initiative || 0,
                  reflectionFacetsCollab.trust || 0,
                  reflectionFacetsCollab.flex || 0,
                  reflectionFacetsCollab.resilience || 0,
                ],
              },
              {
                label: "Team-review",
                backgroundColor: "rgba(0,179,229,0.3)",
                borderColor: "rgba(0,179,229,0.8)",
                pointRadius: 0,
                data: [
                  averageFacetsCollab.emotionalIntelligence || 0,
                  averageFacetsCollab.initiative || 0,
                  averageFacetsCollab.trust || 0,
                  averageFacetsCollab.flex || 0,
                  averageFacetsCollab.resilience || 0,
                ],
              },
            ],
            backgroundColor: "#00c8b3",
          }}
        ></Radar>
      ) : (
        <Radar
          options={{
            maintainAspectRatio: false,
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
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
              padding: 10,
            },
          }}
          data={{
            labels: ["Clarity", "Culture", "Non-Verbal", "Resilience"],
            datasets: [
              {
                label: "Self-review",
                backgroundColor: "rgba(102, 204, 158,0.3)",
                borderColor: "rgba(102, 204, 158,0.8)",
                pointRadius: 0,
                data: [
                  reflectionFacetsComm.clarity || 0,
                  reflectionFacetsComm.culture || 0,
                  reflectionFacetsComm.nonVerbal || 0,
                  reflectionFacetsComm.attentive || 0,
                ],
              },
              {
                label: "Team-review",
                backgroundColor: "rgba(0,179,229,0.3)",
                borderColor: "rgba(0,179,229,0.8)",
                pointRadius: 0,
                data: [
                  averageFacetsComm.clarity || 0,
                  averageFacetsComm.culture || 0,
                  averageFacetsComm.nonVerbal || 0,
                  averageFacetsComm.attentive || 0,
                ],
              },
            ],
            backgroundColor: "#00c8b3",
          }}
        ></Radar>
      )}
    </Container>
  );
};

export default RadarChart;
