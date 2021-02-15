import React from "react";
import { Card, Para, Title } from "../card-style";
import svg from "./Group424.svg";

export default function Why() {
  return (
    <Card>
      <Title>Measure, reflect, develop</Title>
      <Para>
        Coreable provides you the ability to measure, reflect and develop your core skills through a growth mindset.
        <br />
        <br />
        Gaining team wide feedback to identify your strengths, areas to improve, brightspot and blindspots for continuous growth.
      </Para>
      <img
        src={svg}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "0.33rem",
        }}
        alt="Why chose coreable"
      />
    </Card>
  );
}
