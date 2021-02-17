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

import React, { useState } from "react";
import "./Review.scss";
import Facet from "./Facet/Facet";
import { API_URL } from "../../constants";
import { useHistory } from "react-router-dom";
import { facets, submitReview, submitReview2 } from "./util";
import { ReviewContainer } from "./review-style";
import { set } from "react-ga";
import Stepper from "./Stepper/Stepper";

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
  const [buttonText, setButtonText] = useState("Next");
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const teamMembers = props.app.data.user.pending;

  const next = (questionsAnswered) => {
    if (currentIndex === facets.length - 2) {
      setButtonText("Submit");
    }

    if (currentIndex === facets.length - 1) {
      const review = JSON.parse(localStorage.getItem("review"));

      if (questionsAnswered >= 16 || review.length >= 16) {
        submitReview2(
          AUTH_TOKEN,
          team_id,
          tutorial_id,
          subject_id,
          organisation_id,
          me_id
        )
          .then(() => {
            localStorage.removeItem("review");
            history.push("/skills");
          })
          .catch((err) => console.log(err));
      } else {
        setDisableSubmitButton(true);
        setButtonText("Did you miss any sections?")
      }
      return;
    }

    setCurrentIndex(currentIndex + 1);
  };

  const back = () => {
    if (currentIndex <= facets.length - 1) {
      setButtonText("Next");
      setDisableSubmitButton(false);
    }
    if (currentIndex === 0) return history.push("/");
    setCurrentIndex(currentIndex - 1);
  };

  if (!props.location.state || !props.app.data.user) return history.push("/");

  return (
    <ReviewContainer>
      <Stepper facets={facets} currentIndex={currentIndex}/>
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
        disableSubmitButton={disableSubmitButton}
        setQuestionsAnswered={setQuestionsAnswered}
        questionsAnswered={questionsAnswered}
      />
    </ReviewContainer>
  );
};

export default Review;
