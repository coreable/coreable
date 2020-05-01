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
import { Grid, CircularProgress, Container } from "@material-ui/core";

import Loader from "../../Loading/Loading";

let chart = (props) => {
  // if (props.loading) {
  //   return (
  //     // <Grid container direction="column" justify="center" alignItems="center">
  //     //   <CircularProgress />
  //     // </Grid>
  //     <Loader />
  //   );
  // } else {
  return (
    <Container
      style={{ marginTop: "16px", marginBottom: "16pt", height: "100vh" }}
    >
      <Radar
        options={{
          layout: {
            padding: {
              left: 50,
              right: 0,
              top: 40,
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
            "Moral Trust",
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
              // backgroundColor: "rgba(75,192,192,0.2)",
              // borderColor: "rgba(75,192,192,0.4)",
              backgroundColor: "rgba(0,179,229,0.3)",
              borderColor: "rgba(0,179,229,0.8)",
              data: [
                props.average.emotionalIntelligence,
                props.average.initiative,
                props.average.trust,
                props.average.flex,
                props.average.clarity,
                props.average.culture,
                props.average.nonVerbal,
                props.average.attentive,
                props.average.resilience,
              ],
            },
            {
              label: "Team-review",
              // backgroundColor: "rgba(75,192,192,0.2)",
              // borderColor: "rgba(75,192,192,0.4)",
              backgroundColor: "rgba(102, 204, 158,0.3)",
              borderColor: "rgba(102, 204, 158,0.8)",
              data: [
                props.average.emotionalIntelligence,
                props.average.initiative,
                props.average.trust,
                props.average.flex,
                props.average.clarity,
                props.average.culture,
                props.average.nonVerbal,
                props.average.attentive,
                props.average.resilience,
              ],
            },
          ],
          backgroundColor: "#00c8b3",
        }}
      ></Radar>
    </Container>
  );
  // }
};

export default chart;
