import React from "react";
import { SubTitle, Title } from "../../../home/home-style";
import SkillBar from "../../SkillBar/SkillBar";
import { HeadingContainer, IndexContainer } from "../index/index-styles";
import { capitalize } from "./../../../../Utils/capitalize";
import { SkillBarContainer } from "./../top-strengths/topStrengths-style";

const AreasToImprove = (props) => {
  const { facetOrTrait, isCollab } = props;
  const type = isCollab ? "collaboration" : "communcation";

  let areasToImprove = facetOrTrait ? props.data?.facets : props.data?.traits;

  return (
    <IndexContainer height={"300"}>
      <HeadingContainer>
        <Title fontSize={"1.6"}>Areas to improve</Title>
        <SubTitle fontSize={"1.2"} fontWeight={"500"} color={"grey"}>
          {capitalize(type)}
        </SubTitle>
      </HeadingContainer>
      <SkillBarContainer>
        {areasToImprove
          ?.sort((a, b) => a.reflection - b.reflection)
          .slice(0, 3)
          .map((improve, idx) => {
            return (
              <SkillBar
                key={idx}
                values={improve}
                type="areasToImprove"
                isFacet={facetOrTrait ? "facet" : "trait"}
              />
            );
          })}
      </SkillBarContainer>
    </IndexContainer>
  );
};

export default AreasToImprove;
