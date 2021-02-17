import styled from "styled-components";

export const FacetContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  position: relative;
  overflow-y: hidden;
`;

export const Header = styled.div`
  margin-top: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

export const Image = styled.img`
  width: auto;
  height: 180px;
  margin-bottom: 20px;
`;

export const TraitContainer = styled.div`
  background-color: white;
  position: absolute;
  bottom: 90px;
  width: 100%;
  height: 60vh;
  z-index: 888;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding: 20px;
  padding-top: 10px;
  padding-bottom: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transform: ${(props) =>
    props.surveyOpen ? "translateY(0)" : "translateY(57%)"};
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.25);
`;

export const Traits = styled.div`
  overflow-y: scroll;
`

export const Icon = styled.div`
  font-size: 2rem;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  height: 90px;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid lightgrey;
  z-index: 999;
`;

export const Button = styled.button`
  width: 150px;
  height: 40px;
  margin: 10px;
  border-radius: 4px;
  border: none;
  font-size: 1.3rem;
  font-weight: bold;
  background-color: ${(props) => 
    props.backgroundColor === "primary" ? "#4070e0" : "#d6d6d6"};
  color: white;
`;
