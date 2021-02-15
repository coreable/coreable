import React from "react";
import { Card, Para, Title } from "../card-style";
import svg from "./Group425.svg";

export default function What() {
  return (
    <Card>
      <Title>Facets and traits</Title>
      <Para>
        The core skills are first broken down into multiple facets and facets
        then broken down into behaviour based traits. <br /> <br />
        For example collaboration consists of five facets, one of which is:
        Emotional Intelligence. <br /> <br />
        Emotional Intelligence is than broken down into three behavioural
        traits, one of which is: Shows Empathy
      </Para>
      <img
        src={svg}
        style={{ width: "100%", height: "auto", borderRadius: "0.33rem" }}
        alt="Facets and traits"
      />
    </Card>
  );
}
