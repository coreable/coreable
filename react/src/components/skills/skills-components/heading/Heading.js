import React from "react";
import { Title } from "../../../home/home-style";
import { Container, SubTitle } from "./heading-style";

const Heading = () => {
  return (
    <Container>
      <Title fontSize={"3.6"} fontType={"Heading"} color={"primary"}>
        Find your insights
      </Title>
      <SubTitle fontSize={"1.4"}>Identify your key insights</SubTitle>
    </Container>
  );
};

export default Heading;
