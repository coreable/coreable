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
import { createTeamObject, facets, submitReview } from "./util";
import { ReviewContainer } from "./review-style";
import { set } from "react-ga";

const Review = (props) => {
  const history = useHistory();

  const AUTH_TOKEN = props.app.JWT;
  const team_id = props.location.state.pending._id;
  const tutorial_id = props.location.state.pending.tutorial._id;
  const subject_id = props.location.state.pending.tutorial.subject._id;
  const organisation_id =
    props.location.state.pending.tutorial.subject.organisation._id;
  const me_id = props.app.data.user._id;
  const reviewState = props.location.state.reviewState;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonText, setButtonText] = useState("Next")
  const teamMembers = props.app.data.user.pending;

  const next = () => {
    if(currentIndex === facets.length - 2) {
      setButtonText("Submit") 
    }
    if(currentIndex === facets.length - 1) {
      // submitReview()
    }
    setCurrentIndex(currentIndex + 1);
  };

  const back = () => {
    if(currentIndex <= facets.length - 1) {
      setButtonText("Next")
    }
    if (currentIndex === 0) return history.push("/");
    setCurrentIndex(currentIndex - 1);
  };

  if (!props.location.state || !props.app.data.user) return history.push("/");

  return (
    <ReviewContainer>
      <Facet
        next={next}
        back={back}
        user_id={me_id}
        reviewState={reviewState}
        pending={props.location.state.pending}
        currentIndex={currentIndex}
        facetLength={facets.length}
        facet={facets[currentIndex]}
        {...facets[currentIndex]}
        me={props.app.data.user}
        ReactGA={props.ReactGA}
        facets={facets}
        buttonText={buttonText}
      />
    </ReviewContainer>
  );
};

export default Review;
