
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

export default function Trait(props) {
  const trait = props.trait;
  const [teamMembersScore, setTeamMembersScore] = useState();
  const [selectedPerson, setSelectedPerson] = useState(props.userId);
  const user_id = props.user_id;
  const name = props.name;
  const [val, setVal] = useState(props.val ? props.val : 0);
  const variable = props.trait.var;
  const [user, setUser] = useState({});
  const team = props.pending;
  const reviewState = props.reviewState;

  const reviewSubject = new Subject();

  useEffect(() => {
    if (reviewState === 1) {
      const user = props.pending.pending.filter((user) => {
        return user._id === user_id;
      });

      handleSelectedUserChange(user);
    }
  }, []);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const setReview = (review) => {
    reviewSubject.next({ review });
    localStorage.setItem("review", JSON.stringify(review));
  };

  const getReview = () => {
    const review = JSON.parse(localStorage.getItem("review"));
    const team_id = team._id;
    const me_id = props.me._id;
    const trait = variable;
    let id;

    if (reviewState === 1) {
      const returnedUser = props.pending.pending.filter((user) => {
        return user._id === user_id;
      });
      id = returnedUser[0]._id;
    } else {
      id = user._id;
    }

    if (!review[me_id]) {
      review[me_id] = {};
    }
    if (!review[me_id][team_id]) {
      review[me_id][team_id] = {};
    }
    if (!review[me_id][team_id][user_id]) {
      review[me_id][team_id][id] = {};
    }
    if (!review[me_id][team_id][user_id][trait]) {
      review[me_id][team_id][id][trait] = {
        val: -1,
        touched: false,
      };
    }

    return review;
  };

  const updateUserTouchedProperty = (user, review) => {
    let user_id = user[0]._id;

    const team_id = team._id;
    const me_id = props.me._id;
    review[me_id][team_id][user_id][variable].touched = true;
    return review;
  };

  const handleSelectedUserChange = (user) => {
    let user_id = user[0]._id;

    const review = updateUserTouchedProperty(user, getReview());
    const team_id = team._id;

    const me_id = props.me._id;
    const trait = variable;

    setVal(review[me_id][team_id][user_id][trait].val);
    setReview(review);
  };

  const handleSliderChange = (e) => {
    const team_id = team._id;
    const me_id = props.me._id;
    const trait = variable;
    let returnedUser;
    let id;

    if (reviewState === 1) {
      returnedUser = props.pending.pending.filter((user) => {
        return user._id === user_id;
      });
      id = returnedUser[0]._id;
    } else {
      id = user._id;
    }

    try {
      const val = e.target.value;
      setVal(val);

      const review = getReview();
      review[me_id][team_id][id][trait].val = val;
      setReview(review);
      props.sliderUpdatedHandler();

      if (reviewState === 1) {
        handleSelectedUserChange(returnedUser);
      }
    } catch (err) {
      // ignore
    }
  };

  return (
    <TraitContainer>
      <Title fontSize={"1.6"}>{trait.desc}</Title>
      <SubTitle>{trait.para}</SubTitle>
      <SliderInput
        selectedPerson={selectedPerson}
        trait={trait}
        score={val}
        onChange={handleSliderChange}
      />
      <ButtonContainer>
        {team.pending?.map((person, idx) => {
          return (
            <MemberButton
              key={idx}
              selected={team.pending.length === 1 ? true : false}
              onClick={() => handleSelectedUserChange(person)}
            >
              {capitalize(person.identity.firstName)}
            </MemberButton>
          );
        })}
      </ButtonContainer>
    </TraitContainer>
  );
}
