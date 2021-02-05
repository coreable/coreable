import React from "react";
import { Title } from "../../../home/home-style";
import Radar from "./../../Radar";
import { HeadingContainer, IndexContainer } from "./index-styles";

const Index = (props) => {
  const { state, isCollab } = props;
  const type = isCollab ? "collaboration" : "communcation";

  const capitalize = (str) => {
    if (str.length) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  };

  return (
    <IndexContainer>
      <HeadingContainer>
        <Title fontSize={"1.6"}>{capitalize(type)} index</Title>
      </HeadingContainer>
      <Radar report={state} collabOrComms={type} />
    </IndexContainer>
  );
};

export default Index;
