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

import React, { useState, useEffect } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Trait from "./Trait/Trait";
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
  const [surveyResults, setSurveyResults] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const facets = props.facets;
  const traits = props.traits;
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(
    props.currentIndex === props.facetLength - 1
  );
  const stepsArray = props.facets;
  const currentIndex = props.currentIndex;
  const reviewState = props.reviewState;
  const user_id = props.user_id;
  const facet = props.facet;
  const buttonText = props.buttonText;

  useEffect(() => {
    if (localStorage.getItem("review")) {
      setSurveyResults(JSON.parse(localStorage.getItem("review")));
    }
  }, [refresh]);

  const saveData = (data) => {
    //have to see if there is already a trait in surveyResults
    let exists = false
    surveyResults.map((trait) => {
      if (trait.trait === data.trait) {
        console.log("already exists")
        trait.value = data.value;
        exists = true;
      }
    });
    if(!exists) surveyResults.push(data);
  };

  const nextHandler = () => {
    localStorage.setItem("review", JSON.stringify(surveyResults));
    setRefresh(true);
    props.next();
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
            {facet.traits.map((trait, index) => {
              let score;
              surveyResults.map((trait2) => {
                if(trait.var === trait2.trait) {
                  score = trait2.value
                }
              })
              return (
                <div className="inside-main-review" key={index}>
                  <Trait
                    trait={trait}
                    name={trait.name}
                    key={trait.name}
                    me={props.me}
                    traitName={trait.name}
                    pending={props.pending}
                    reviewState={reviewState}
                    user_id={user_id}
                    saveData={saveData}
                    score={score}
                  />
                </div>
              );
            })}
          </Traits>
        </TraitContainer>
      </FacetContainer>
      <ButtonContainer>
        <Button onClick={props.back}>Back</Button>
        <Button backgroundColor={"primary"} onClick={nextHandler}>
          {buttonText}
        </Button>
      </ButtonContainer>
    </>
  );
};

export default Facet;
