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
import "./Review.scss";
import Facet from "./Facet/Facet";
import { API_URL } from "../../constants";
import { useHistory } from "react-router-dom";
import { createTeamObject, facets } from "./util";
import { ReviewContainer } from "./review-style";

const Review = (props) => {
  const history = useHistory();
  // const teamId = props.location.state.pending._id;
  // const tutorialId = props.location.state.pending.tutorial._id;
  // const subjectId = props.location.state.pending.tutorial.subject._id;
  // const organisation_id =
  //   props.location.state.pending.tutorial.subject.organisation._id;
  // const me_id = props.app.data.user._id;

  const [currentIndex, setCurrentIndex] = useState(0);
  const teamMembers = props.app.data.user.pending;

  const teamObject = createTeamObject(teamMembers);

  const next = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const back = () => {
    setCurrentIndex(currentIndex - 1);
  };

  if (!props.location.state || !props.app.data.user) return history.push("/");

  return (
    <ReviewContainer>
      <Facet facet={facets[currentIndex]} next={next} back={back} />
    </ReviewContainer>
  );
};

export default Review;
