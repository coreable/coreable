import React from "react";
import { Title } from "../../../home/home-style";
import Radar from "./../../Radar";
import { HeadingContainer, IndexContainer } from "./index-styles";
import { capitalize } from "./../../../../Utils/capitalize";

const Index = (props) => {
  const { state, isCollab, stage } = props;
  const type = isCollab ? "collaboration" : "communcation";

  return (
    <IndexContainer height={"200"}>
      <HeadingContainer>
        <Title fontSize={"1.6"}>{capitalize(type)} index</Title>
      </HeadingContainer>
      <Radar report={state} collabOrComms={type} stage={stage}/>
    </IndexContainer>
  );
};

export default Index;
