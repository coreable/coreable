import React from "react";
import { SubTitle, Title } from "../../../home/home-style";
import SkillBar from "../../SkillBar/SkillBar";
import { HeadingContainer, IndexContainer } from "../index/index-styles";
import { capitalize } from "./../../../../Utils/capitalize";
import { SkillBarContainer } from "./../top-strengths/topStrengths-style";

const AreasToImprove = (props) => {
  const { isFacet, isCollab, data } = props;
  const type = isCollab ? "collaboration" : "communcation";

  let areasToImprove;

  if (isCollab) {
    if (isFacet) {
      areasToImprove = data?.collaborationData?.facets;
    } else {
      areasToImprove = data?.collaborationData?.traits;
    }
  } else {
    if (isFacet) {
      areasToImprove = data?.communicationData?.facets;
    } else {
      areasToImprove = data?.communicationData?.traits;
    }
  }

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
                isFacet={isFacet ? "facet" : "trait"}
              />
            );
          })}
      </SkillBarContainer>
    </IndexContainer>
  );
};

export default AreasToImprove;
