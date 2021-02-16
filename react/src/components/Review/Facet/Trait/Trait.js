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

import React, { Component, useEffect, useState } from "react";
import Ranking from "./Ranking/Ranking";
import TeamRank from "./TeamRank/TeamRank";
import SliderIndicator from "./SliderIndicator";
import { Subject } from "rxjs";

import { ButtonContainer, MemberButton, TraitContainer } from "./trait-style";
import { SubTitle, Title } from "../../../home/home-style";
import SliderInput from "./SliderInputContainer/SliderInput";
import { Button } from "../facet-style";

export default function Trait(props) {
  const trait = props.trait;
  const [teamMembersScore, setTeamMembersScore] = useState();
  const [selectedPerson, setSelectedPerson] = useState(props.userId);
  const user_id = props.user_id;
  const name = props.name;
  const [val, setVal] = useState(props.score ? props.score : 0);
  const variable = props.trait.var;
  const [user, setUser] = useState({});
  const team = props.pending;
  const reviewState = props.reviewState;

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    setVal(props.score);
  }, [props]);


  return (
    <TraitContainer>
      <Title fontSize={"1.6"}>{trait.desc}</Title>
      <SubTitle>{trait.para}</SubTitle>
      <SliderInput
        selectedPerson={selectedPerson}
        trait={trait}
        score={val}
        saveData={props.saveData}
      />
      <ButtonContainer>
        {team.pending?.map((person, idx) => {
          return (
            <MemberButton
              key={idx}
              selected={team.pending.length === 1 ? true : false}
              onClick={() => console.log("hello")}
            >
              {capitalize(person.identity.firstName)}
            </MemberButton>
          );
        })}
      </ButtonContainer>
    </TraitContainer>
  );
}
