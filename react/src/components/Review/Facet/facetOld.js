
/*
===========================================================================
Copyright (C) 2020 Coreable
This file is part of Coreable's source code.
Coreables source code is free software; you can redistribute it
and/or modify it under the terms of the End-user license agreement.
Coreable's source code is distributed in the hope that it will be
useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
You should have received a copy of the license along with the 
Coreable source code.
===========================================================================
*/

import React, { Component, useState, useEffect } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Trait from "./Trait/Trait";
import Stepper from "../../Stepper/Stepper";
import "../Review.scss";
import {
  FacetContainer,
  Image,
  Header,
  ButtonContainer,
  Button,
  TraitContainer,
  Icon,
  Traits,
} from "./facet-style";
import { SubTitle, Title } from "../../home/home-style";

const Facet = (props) => {
  const [surveyOpen, setSurveyOpen] = useState(false);

  const facet = props.facets;
  const traits = props.traits;
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(props.currentIndex === props.facetLength - 1)
  const stepsArray = props.facets;
  const currentIndex = props.currentIndex;
  const reviewState = props.reviewState;
  const user_id = props.user_id

  const getReviews = () => {
    return JSON.parse(localStorage.getItem("review"));
  };

  const validateReview = (review) => {
    if (!review["calm"]) return false;
    if (!review["clearInstructions"]) return false;
    if (!review["cooperatively"]) return false;
    if (!review["crossTeam"]) return false;
    if (!review["distractions"]) return false;
    if (!review["easilyExplainsComplexIdeas"]) return false;
    if (!review["empathy"]) return false;
    if (!review["usesRegulators"]) return false;
    if (!review["influences"]) return false;
    if (!review["managesOwn"]) return false;
    if (!review["newIdeas"]) return false;
    if (!review["openToShare"]) return false;
    if (!review["positiveBelief"]) return false;
    if (!review["proactive"]) return false;
    if (!review["resilienceFeedback"]) return false;
    if (!review["signifiesInterest"]) return false;
    if (!review["workDemands"]) return false;
    return true;
  };

  const getIsSubmitButtonDisabled = () => {
    const currentIndex = props.currentIndex;
    const facetLength = props.facetLength;
    if (currentIndex !== facetLength - 1) {
      return false;
    }
    const me_id = props.me._id;
    const team_id = props.pending._id;
    const reviews = getReviews();
    if (!reviews[me_id]) {
      return true;
    }
    if (!reviews[me_id][team_id]) {
      return true;
    }
    for (const user in reviews[me_id][team_id]) {
      const isValid = validateReview(reviews[me_id][team_id][user]);
      if (!isValid) {
        return true;
      }
    }
    return false;
  };

  const sliderUpdatedHandler = () => {
    const currentIndex = props.currentIndex;
    const facetLength = props.facetLength;
    if (currentIndex !== facetLength - 1) {
      return false;
    } else {
      setIsSubmitDisabled(getIsSubmitButtonDisabled())
    }
  };

  return (
    <>
      <FacetContainer>
        <Header>
          <Image src={facet.image}></Image>
          <Title fontType={true} fontSize={"2.4"} color={"primary"}>
            {facet.name}
          </Title>
          <SubTitle fontSize={"1.2"}>{facet.desc}</SubTitle>
        </Header>

        <TraitContainer surveyOpen={surveyOpen}>
          <Icon onClick={() => setSurveyOpen(!surveyOpen)}>
            {surveyOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </Icon>

          <Traits>
            {facet.map((trait, index) => {
              return (
                <div className="inside-main-review" key={index}>
                  <Trait
                    trait={trait}
                    name={trait.name}
                    key={trait.name}
                    me={props.me}
                    traitName={trait.name}
                    pending={props.pending}
                    sliderUpdatedHandler={sliderUpdatedHandler}
                    reviewState={reviewState}
                    user_id={user_id}
                  />
                </div>
              );
            })}
          </Traits>
        </TraitContainer>
      </FacetContainer>
      <ButtonContainer>
        <Button onClick={props.back}>Back</Button>
        <Button backgroundColor={"primary"} onClick={props.next}>
          Next
        </Button>
      </ButtonContainer>
    </>
  );
};

export default Facet;
