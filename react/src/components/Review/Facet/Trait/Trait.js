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

import { Button } from "@material-ui/core";

//When the user arrives on this page,
//write code that creates an object which has the team members details and score variable.
//Store it to localStorage, but make sure that it gets the localStorage object when the next button is clicked.

export default function Trait(props) {
  const trait = props;
  const [teamMembersScore, setTeamMembersScore] = useState(
    JSON.parse(localStorage.getItem("review"))
  );

  console.log(teamMembersScore);

  return (
    <div>
      {trait.desc}
      <p>{trait.para}</p>
      {teamMembersScore.map((person, idx) => {
        return <div key={idx}>{person.user[0].identity.firstName}</div>;
      })}
    </div>
  );
}
