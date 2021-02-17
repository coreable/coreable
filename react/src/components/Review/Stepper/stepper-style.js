import styled from "styled-components";

export const StepperContainer = styled.div`
  margin-top: 70px;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const GroupStep = styled.div`
  height: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const StepperDot = styled.span`
  height: 14px;
  width: 14px;
  border-radius: 50%;
  border: ${(props) =>
    props.currentIndex >= props.id ? "3px solid #4070e0" : "lightgrey"};
  background-color: ${(props) =>
    props.currentIndex === props.id
      ? "white"
      : props.currentIndex > props.id
      ? "#4070e0"
      : "lightgrey"};
  box-sizing: border-box;
  z-index: 999;
  margin-right: 20px;
  transition: all 0.3s linear;
`;

export const StepperLineContainer = styled.div`
  height: 3px;
  width: calc(14px * 9 + 20px * 8);
  background-color: lightgrey;
  position: absolute;
  left: 20px;
  z-index: 888;
`;

export const StepperLine = styled.div`
  height: 100%;
  width: ${(props) => `${props.width * 35.75}px`};
  background-color: #4070e0;
  transition: all 0.2s linear;
`;

// backgroundImage: `linear-gradient(90deg, rgb(66, 113, 249) ${score}%, rgb(214, 214, 214) ${score}%)`
