import React from "react";
import { SubTitle, Title } from "../../../home/home-style";
import SkillBar from "../../SkillBar/SkillBar";
import { HeadingContainer, IndexContainer } from "../index/index-styles";
import { capitalize } from "./../../../../Utils/capitalize";
import { SkillBarContainer } from "./../top-strengths/topStrengths-style";

const OverEstimation = (props) => {
  const { isFacet, isCollab, data } = props;
  const type = isCollab ? "collaboration" : "communcation";

  let overEstimation;

  if (isCollab) {
    if (isFacet) {
      overEstimation = data?.collaborationData?.facets;
    } else {
      overEstimation = data?.collaborationData?.traits;
    }
  } else {
    if (isFacet) {
      overEstimation = data?.communicationData?.facets;
    } else {
      overEstimation = data?.communicationData?.traits;
    }
  }

  return (
    <IndexContainer height={"300"}>
      <HeadingContainer>
        <Title fontSize={"1.6"}>OverEstimation</Title>
        <SubTitle fontSize={"1.2"} fontWeight={"500"} color={"grey"}>
          {capitalize(type)}
        </SubTitle>
      </HeadingContainer>
      <SkillBarContainer>
        {overEstimation
          ?.filter((item) => item.difference > 0)
          .sort((a, b) => b.difference - a.difference)
          .slice(0, 3)
          .map((overEstimation, idx) => {
            return (
              <SkillBar
                key={idx}
                values={overEstimation}
                type="overEstimation"
                isFacet={isFacet}
              />
            );
          })}
      </SkillBarContainer>
    </IndexContainer>
  );
};

export default OverEstimation;
