import React from "react";
import How from "./How/How";
import { SlidesContainer, Title, Card, StepperContainer, Stepper } from "./onboardingSlides-style";
import What from "./What/What";
import Why from "./Why/Why";

const OnboardingSlides = ({ slideCounter }) => {
  const onboardingTitle = ["Why use Coreable?", "What are Facets and Traits?"];

  const title = () => {
    if (slideCounter === 0) return onboardingTitle[0];
    return onboardingTitle[1];
  };

  const slideSelector = () => {
    if(slideCounter === 0) return <Why/>
    if(slideCounter === 1) return <What/>
    if(slideCounter === 2) return <How/>
  }
  return (
    <SlidesContainer>
      <Title> {title()} </Title>
      <Card>
        <StepperContainer>
          <Stepper slideCounter={slideCounter}/>
        </StepperContainer>
        {slideSelector()}
      </Card>
    </SlidesContainer>
  );
};

export default OnboardingSlides;
