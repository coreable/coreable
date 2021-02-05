import React from "react";
import { SubTitle, Title } from "../../../home/home-style";
import SkillBar from "../../SkillBar/SkillBar";
import { HeadingContainer, IndexContainer } from "../index/index-styles";
import { capitalize } from "./../../../../Utils/capitalize";
import { SkillBarContainer } from "./topStrengths-style";

const TopStrengths = (props) => {
  const { facetOrTrait, isCollab } = props;
  const type = isCollab ? "collaboration" : "communcation";

  let topStrengths = facetOrTrait ? props.data?.facets : props.data?.traits;

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
                isFacet={facetOrTrait ? "facet" : "trait"}
              />
            );
          })}
      </SkillBarContainer>
    </IndexContainer>
  );
};

export default TopStrengths;
