import React from "react";
import {
  StepperContainer,
  StepperDot,
  StepperLine,
  StepperLineContainer,
} from "./stepper-style";

function Stepper({ facets, currentIndex }) {
  return (
    <StepperContainer>
      <StepperLineContainer>
        <StepperLine width={currentIndex}/>
      </StepperLineContainer>
      {facets?.map((facet, idx) => {
        return <StepperDot key={idx} currentIndex={currentIndex} id={idx}/>;
      })}
    </StepperContainer>
  );
}

export default Stepper;
