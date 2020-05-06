/*
===========================================================================
Copyright (C) 2020 Coreable
This file is part of Coreable's source code.
Corables source code is free software; you can redistribute it
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

const RadarChart = (props) => {
  return (
    <Container
      style={{
        marginTop: "16px",
        marginBottom: "16pt",
        width: "80vh",
        height: "50vh",
      }}
    >
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
              backgroundColor: "rgba(0,179,229,0.3)",
              borderColor: "rgba(0,179,229,0.8)",
              pointRadius: 0,
              data: [
                props.reflection.emotionalIntelligence,
                props.reflection.initiative,
                props.reflection.trust,
                props.reflection.flex,
                props.reflection.clarity,
                props.reflection.culture,
                props.reflection.nonVerbal,
                props.reflection.attentive,
                props.reflection.resilience,
              ],
            },
            {
              label: "Team-review",
              backgroundColor: "rgba(102, 204, 158,0.3)",
              borderColor: "rgba(102, 204, 158,0.8)",
              pointRadius: 0,
              data: [
                props.averages.emotionalIntelligence,
                props.averages.initiative,
                props.averages.trust,
                props.averages.flex,
                props.averages.clarity,
                props.averages.culture,
                props.averages.nonVerbal,
                props.averages.attentive,
                props.averages.resilience,
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
