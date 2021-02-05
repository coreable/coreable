import React from "react";
import { SubTitle, Title } from "../../../home/home-style";
import SkillBar from "../../SkillBar/SkillBar";
import { HeadingContainer, IndexContainer } from "../index/index-styles";
import { capitalize } from "./../../../../Utils/capitalize";
import { SkillBarContainer } from "./../top-strengths/topStrengths-style";

const UnderEstimation = (props) => {
  const { isFacet, isCollab, data } = props;
  const type = isCollab ? "collaboration" : "communcation";

  let underEstimation;

  if (isCollab) {
    if (isFacet) {
      underEstimation = data?.collaborationData?.facets;
    } else {
      underEstimation = data?.collaborationData?.traits;
    }
  } else {
    if (isFacet) {
      underEstimation = data?.communicationData?.facets;
    } else {
      underEstimation = data?.communicationData?.traits;
    }
  }

  return (
    <IndexContainer height={"300"}>
      <HeadingContainer>
        <Title fontSize={"1.6"}>Underestimation</Title>
        <SubTitle fontSize={"1.2"} fontWeight={"500"} color={"grey"}>
          {capitalize(type)}
        </SubTitle>
      </HeadingContainer>
      <SkillBarContainer>
        {underEstimation
          ?.filter((item) => item.difference < 0)
          .sort((a, b) => b.difference - a.difference)
          .slice(0, 3)
          .map((underEstimation, idx) => {
            return (
              <SkillBar
                key={idx}
                values={underEstimation}
                type="underEstimation"
                isFacet={isFacet}
              />
            );
          })}
      </SkillBarContainer>
    </IndexContainer>
  );
};

export default UnderEstimation;
