import styled from "styled-components";

export const ReviewCardContainer = styled.div`
  text-align: left;
  width: 100%;
  height: ${(props) => (props.height ? `${props.height}px` : "220px")};
  background: white;
  padding: 20px;
  margin-bottom: 2px;

  @media (min-width: 768px) {
    box-sizing: border-box;
    margin: 10px;
    width: 300px;
    height: 260px;
    border-radius: 4px;
    -webkit-box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: bold;
  justify-content: center;
  align-content: center;
  margin: 0 auto;
  margin-top: 10px;
  text-transform: none;

  background-color: #4070e0;
  color: white;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  border: none;
  &:disabled {
    background-color: #d6d6d6 !important;
    color: white !important;
    cursor: not-allowed !important;
    border: none !important;
  }
  &:focus {
    outline: none;
  }
`;
