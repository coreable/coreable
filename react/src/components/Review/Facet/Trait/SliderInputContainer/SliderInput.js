import React, { useState, useEffect } from "react";
import {
  SliderConatainer,
  TextContainer,
  Title,
  SubTitle,
  InputContainer,
  IncrementContainer,
  Span,
  DotContainer,
  Dot1,
  Dot2,
  Dot3,
  Dot4,
  Dot5,
} from "./sliderInput-style";
import "./sliderInput.scss";

export default function SliderInput(props) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    setScore(props.score);
  }, [props]);

  const getTitle = () => {
    if (score <= 20) return "Fails to";
    if (score <= 40) return "Under prompting";
    if (score <= 60) return "Habitually";
    if (score <= 80) return "Encourages others";
    return "Teaches";
  };

  const getSubTitle = () => {
    if (score <= 20) return "Doesn't attempt";
    if (score <= 40) return "Only under supervision or prompting";
    if (score <= 60) return "By way of habit: customarily";
    if (score <= 80) return "Gives support and confidence";
    return "Actively shares experience and guides";
  };

  const sliderHandler = (e) => {
    setScore(parseFloat(e.target.value));
    props.saveData({
      trait: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <SliderConatainer>
      <TextContainer>
        <Title>{getTitle()}</Title>
        <SubTitle>{getSubTitle()}</SubTitle>
      </TextContainer>

      <InputContainer>
        <DotContainer>
          <Dot1 score={score} />
          <Dot2 score={score} />
          <Dot3 score={score} />
          <Dot4 score={score} />
          <Dot5 score={score} />
        </DotContainer>
        <IncrementContainer>
          <Span />
          <Span />
          <Span />
          <Span />
        </IncrementContainer>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          // key={this.state.var}
          // id={this.state.var}
          name={props.trait.var}
          onChange={sliderHandler}
          value={score}
          style={{
            backgroundImage: `linear-gradient(90deg, rgb(66, 113, 249) ${score}%, rgb(214, 214, 214) ${score}%)`,
          }}
        />
      </InputContainer>
    </SliderConatainer>
  );
}
