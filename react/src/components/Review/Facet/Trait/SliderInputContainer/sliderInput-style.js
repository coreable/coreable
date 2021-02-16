import styled from "styled-components";

export const SliderConatainer = styled.div`
  width: 100%;
`;

export const TextContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  margin-bottom: 5px;
  font-size: 1.2rem;
  font-weight: 500;
  color: #0653cd;
`;

export const SubTitle = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: grey;
  margin: 0;
`;

export const InputContainer = styled.div`
  width: 100%;
  position: relative;
  margin-top: 25px;
`;

export const IncrementContainer = styled.div`
  width: 100%;
  position: absolute;
  top: -20px;
  left: 0;
  height: 20px;
  background-color: transparent;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  z-index: 0;
`;

export const Span = styled.span`
  background-color: white;
  height: 20px;
  width: 1px;
  z-index: 3;
  transform: translateY(20px);
`;

export const DotContainer = styled.div`
  width: 100%;
  position: absolute;
  top: -25px;
  left: 0;
  height: 20px;
  background-color: transparent;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 0;
`;

export const Dot1= styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) => props.score > 0 ? "#4070e0" : "lightgrey"};
`;

export const Dot2 = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) => props.score > 20 ? "#4070e0" : "lightgrey"};
`;

export const Dot3 = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) => props.score > 40 ? "#4070e0" : "lightgrey"};
`;

export const Dot4 = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) => props.score > 60 ? "#4070e0" : "lightgrey"};
`;

export const Dot5 = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) => props.score > 80 ? "#4070e0" : "lightgrey"};
`;
