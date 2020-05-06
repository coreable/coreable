import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { Container } from "@material-ui/core";

const HorizontalBarWithTeamChart = (props) => {
  if (!props.length) {
    return <div></div>;
  }

  return (
    <Container style={{ marginTop: "16px", marginBottom: "16pt" }}>
      <HorizontalBar
        options={{
          responsive: true,
          scaleOverride: true,
          scaleSteps: 10, // number of ticks
          scaleStepWidth: 10, // tick interval
          scaleBeginAtZero: true,
          scales: {
            xAxes: [
              {
                ticks: {
                  min: 0,
                  max: 100,
                },
              },
            ],
          },
        }}
        data={{
          labels: [props["field"]],
          datasets: [
            {
              label: "Self-review",
              backgroundColor: "rgba(0,179,229,0.3)",
              borderColor: "rgba(0,179,229,0.8)",
              data: [props["self"].toFixed(2)],
            },
            {
              label: "Team-review",
              backgroundColor: "rgba(102, 204, 158,0.3)",
              borderColor: "rgba(102, 204, 158,0.8)",
              data: [props["team"].toFixed(2)],
            },
          ],
        }}
      ></HorizontalBar>
    </Container>
  );
};

export default HorizontalBarWithTeamChart;
