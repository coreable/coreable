import styled from "styled-components";

export const OnboardingContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: whitesmoke;
  height: calc(100vh - 50px);
`;

export const Content = styled.div`
  position: relative;
  height: calc(100vh - 50px);
  width: 100%;
  box-sizing: border-box;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    margin-top: 250px;
    width: 500px;
  }
`;

export const Card = styled.div`
  height: 600px;
  overflow-y: scroll;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: white;

  @media (min-width: 768px) {
    max-height: 500px;
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

export const ButtonContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 30px;

  @media (min-width: 768px) {
    bottom: 130px;
  }
`;

export const Button = styled.button`
  height: 40px;
  width: 100%;
  margin-bottom: 10px;
  background-color: ${(props) =>
    props.backgroundColor === "primary" ? "#4070e0" : "#d6d6d6"};
  color: white;
  font-weight: 700;
  border-radius: 4px;
  border: none;
`;
