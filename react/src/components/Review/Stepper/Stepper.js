import React, { useState } from "react";
import {
  GroupStep,
  StepperContainer,
  StepperDot,
  StepperLine,
  StepperLineContainer,
} from "./stepper-style";

function Stepper({ facets, currentIndex }) {
  const totalFacets = facets.length;
  const [facetCounter, setFacetCounter] = useState(0);

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
