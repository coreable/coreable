import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import { SKILLS_API } from "../../queries";
import Heading from "./skills-components/heading/Heading";
import Index from "./skills-components/index/Index";
import { Container, MainGrid } from "./skills-style";
import Dashboard from "./skills-components/dashboard/Dashboard";
import TopStrengths from "./skills-components/top-strengths/TopStrengths";
import AreasToImprove from "./skills-components/areas-to-improve/AreasToImprove";
import UnderEstimation from "./skills-components/underestimation/Underestimation";
import OverEstimation from "./skills-components/overestimation/OverEstimation";

let facetOrTrait = "facet";
let stage = 1;

const Results = (props) => {
  const [jwt, setJwt] = useState(localStorage.getItem("JWT"));
  const [collaborationData, setCollaborationData] = useState(null);
  const [communicationData, setCommunicationData] = useState(null);
  const [report, setReport] = useState(null);
  const [isFacet, setIsFacet] = useState(true);
  const [isCollab, setIsCollab] = useState(true);
  const state = {
    jwt,
    collaborationData,
    communicationData,
    report,
    facetOrTrait,
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <Heading />
      <MainGrid>
        <Dashboard setIsCollab={setIsCollab} />
        <Index state={state} isCollab={isCollab} />
        <TopStrengths isCollab={isCollab} facetOrTrait={isFacet} />
        <AreasToImprove isCollab={isCollab} facetOrTrait={isFacet} />
        <UnderEstimation isCollab={isCollab} facetOrTrait={isFacet} />
        <OverEstimation isCollab={isCollab} facetOrTrait={isFacet} />
      </MainGrid>
    </Container>
  );
};

export default Results;
