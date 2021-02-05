import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  box-sizing: border-box;
  background-color: white;
`;

export const Select = styled.select`
  width: 100%;
  height: 30px;
  border: none;
  background: #fafafa;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const Button = styled.button`
  width: 80px;
  height: 30px;
  margin-right: 10px;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? "#4070e0" : "white")};
  color: ${(props) => (props.active ? "white" : "grey")};
  border: ${(props) => (props.active ? "none" : "1px solid lightgrey")};
`;
