import styled from "styled-components";

export const SlidesContainer = styled.div`
  width: 100%;
  height: 600px;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Title = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 20px;
`;

export const Card = styled.div`
  min-height: 400px;
  width: 100%;
  padding: 20px;
  padding-top: 10px;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media (min-width: 768px) {
    height: 500px;
    border-radius: 4px;
    overflow-y: scroll;
    -webkit-box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
    ::-webkit-scrollbar {
      width: 0px; /* Remove scrollbar space */
      background: transparent; /* Optional: just make scrollbar invisible */
    }
  }
`;

export const StepperContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 60px;
  height: 40px;
  margin-bottom: 10px;
`;

export const Stepper = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.slideCounter >= 1 ? "navy" : "lightgrey"};

  &:before {
    position: absolute;
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${(props) =>
      props.slideCounter >= 0 ? "navy" : "lightgrey"};
    left: 0px;
  }

  &:after {
    position: absolute;
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${(props) =>
      props.slideCounter >= 2 ? "navy" : "lightgrey"};
    right: 0px;
  }
`;
