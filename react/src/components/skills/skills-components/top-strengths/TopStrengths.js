import React from "react";
import { SubTitle, Title } from "../../../home/home-style";
import SkillBar from "../../SkillBar/SkillBar";
import { HeadingContainer, IndexContainer } from "../index/index-styles";
import { capitalize } from "./../../../../Utils/capitalize";
import { SkillBarContainer } from "./topStrengths-style";

const TopStrengths = (props) => {
  const { isFacet, isCollab, data } = props;
  const type = isCollab ? "collaboration" : "communcation";

  let topStrengths;

  if (isCollab) {
    if (isFacet) {
      topStrengths = data?.collaborationData?.facets;
    } else {
      topStrengths = data?.collaborationData?.traits;
    }
  } else {
    if (isFacet) {
      topStrengths = data?.communicationData?.facets;
    } else {
      topStrengths = data?.communicationData?.traits;
    }
  }

  return (
    <IndexContainer height={"300"}>
      <HeadingContainer>
        <Title fontSize={"1.6"}>Top Strengths</Title>
        <SubTitle fontSize={"1.2"} fontWeight={"500"} color={"grey"}>
          {capitalize(type)}
        </SubTitle>
      </HeadingContainer>
      <SkillBarContainer>
        {topStrengths
          ?.sort((a, b) => b.reflection - a.reflection)
          .slice(0, 3)
          .map((strength, idx) => {
            return (
              <SkillBar
                key={idx}
                values={strength}
                type="strengths"
                isFacet={isFacet ? "facet" : "trait"}
              />
            );
          })}
      </SkillBarContainer>
    </IndexContainer>
  );
};

export default TopStrengths;
