import React, { useState } from "react";
import { SubTitle, Title } from "../../../home/home-style";
import { Button, ButtonContainer, Container, Select } from "./dashboard-style";

const Dashboard = (props) => {
  const { setIsCollab } = props;
  const [isFacetActive, setIsFacetActive] = useState(true);
  const [isTraitActive, setIsTraitActive] = useState(false);

  const clickHandler = (facetOrTrait) => {
    if (facetOrTrait === "facets") {
      setIsFacetActive(true);
      setIsTraitActive(false);
    } else {
      setIsFacetActive(false);
      setIsTraitActive(true);
    }
  };

  const collabCommHandler = (e) => {
    e.target.value === "communication" && setIsCollab(false);
    e.target.value === "collaboration" && setIsCollab(true);
  };

  return (
    <Container>
      <Title fontSize={"1.7"}>Your dashboard</Title>
      <SubTitle fontSize={"1.2"} fontWeight={"500"}>
        Skills
      </SubTitle>
      <Select id="type" onChange={collabCommHandler}>
        <option value="communication">Communcation</option>
        <option value="collaboration" selected>
          Collaboration
        </option>
      </Select>
      <ButtonContainer>
        <Button active={isFacetActive} onClick={() => clickHandler("facets")}>
          Facets
        </Button>
        <Button active={isTraitActive} onClick={() => clickHandler("traits")}>
          Traits
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Dashboard;
