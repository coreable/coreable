import React, { useEffect, useState } from "react";
import Heading from "./skills-components/heading/Heading";
import Index from "./skills-components/index/Index";
import { Container } from "./skills-style";
import {
  MainGridContainer,
  MainGrid,
  AsideLeft,
  AsideRight,
} from "./grid-style";
import Dashboard from "./skills-components/dashboard/Dashboard";
import TopStrengths from "./skills-components/top-strengths/TopStrengths";
import AreasToImprove from "./skills-components/areas-to-improve/AreasToImprove";
import UnderEstimation from "./skills-components/underestimation/Underestimation";
import OverEstimation from "./skills-components/overestimation/OverEstimation";
import { fetchData } from "./../../Utils/fetchSkillsData";
import {
  collaboration,
  communication,
  setFacetsOrTraits,
  setCommOrCollabData,
} from "./../../Utils/filterBy";

let facetOrTrait = "facet";

const Results = () => {
  const jwt = localStorage.getItem("JWT");
  const [collaborationData, setCollaborationData] = useState(null);
  const [communicationData, setCommunicationData] = useState(null);
  const [report, setReport] = useState(null);
  const [isFacet, setIsFacet] = useState(true);
  const [isCollab, setIsCollab] = useState(true);
  const [stage, setStage] = useState(1);
  const state = {
    jwt,
    collaborationData,
    communicationData,
    report,
    facetOrTrait,
  };

  useEffect(() => {
    fetchData().then((data) => {
      let reviewStage = 1;
      setReport(data);

      if (data["average"]["sorted"].length > 0) {
        setStage(2);
        reviewStage = 2;
      }
      const commData = communication(data, reviewStage);
      const collabData = collaboration(data, reviewStage);

      const commFacets = setFacetsOrTraits(commData, "facets", reviewStage);
      const commTraits = setFacetsOrTraits(commData, "traits", reviewStage);
      const collabFacets = setFacetsOrTraits(collabData, "facets", reviewStage);
      const collabTraits = setFacetsOrTraits(collabData, "traits", reviewStage);

      setCommunicationData(setCommOrCollabData(commFacets, commTraits));
      setCollaborationData(setCommOrCollabData(collabFacets, collabTraits));
    });
  }, []);

  return (
    <Container>
      <Heading />
      <MainGridContainer>
        <MainGrid>
          <AsideLeft>
            <Dashboard setIsCollab={setIsCollab} setIsFacet={setIsFacet} />
            <Index state={state} isCollab={isCollab} />
          </AsideLeft>
          <AsideRight>
            <TopStrengths isCollab={isCollab} isFacet={isFacet} data={state} />
            <AreasToImprove
              isCollab={isCollab}
              isFacet={isFacet}
              data={state}
            />
            {stage === 2 && (
              <>
                <UnderEstimation
                  isCollab={isCollab}
                  isFacet={isFacet}
                  data={state}
                />
                <OverEstimation
                  isCollab={isCollab}
                  isFacet={isFacet}
                  data={state}
                />
              </>
            )}
          </AsideRight>
        </MainGrid>
      </MainGridContainer>
    </Container>
  );
};

export default Results;
