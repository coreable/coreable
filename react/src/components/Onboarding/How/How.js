import React from "react";
import { Card, Para, Title } from "../card-style";
import svg from "./Group421.svg";

export default function How() {
  return (
    <Card>
      <Title>Behaviour based reviews</Title>
      <Para>
        Coreable uses a behaviour-based five-band system to measure these
        traits. <br /> <br />
        The five bands are: unable to, under prompting, habitually, encourages
        others and teaches others. <br /> <br />
        You will be required to provide feedback on yourself and each member of
        your team.
      </Para>
      <img
        src={svg}
        style={{ width: "100%", height: "auto", borderRadius: "0.33rem" }}
        alt="How coreable works"
      />
    </Card>
  );
}
