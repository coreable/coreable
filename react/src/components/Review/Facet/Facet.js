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
} from "./facet-style";
import { SubTitle, Title } from "../../home/home-style";

const Facet = (props) => {
  const [surveyOpen, setSurveyOpen] = useState(false);
  
  const facetName = props.name;
  const description = props.desc;
  const traits = props.traits;
  const user_id = props.user_id;


  const facet = props.facet;


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

          {facet.traits.map((trait, index) => {
            return (
              <div className="inside-main-review" key={index}>
                <Trait {...trait} me={props.me}/>
              </div>
            );
          })}
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
