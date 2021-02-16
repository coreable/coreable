import styled from "styled-components";

export const TraitContainer = styled.div`
  padding: 20px;
  box-sizing: border-box;
  width: 100vw;
  min-height: 200px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 15px;
  /* margin-bottom: 15px; */
  border-bottom: 1px solid lightgrey;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`

export const MemberButton = styled.button`
  background-color: ${(props) => props.selected ? "#4070e0" : "lightgrey"};
  height: 30px;
  border: ${(props) => props.selected ? "none" : "1px solid lightgrey"};
  padding: 5px 15px;
  color: ${(props) => props.selected ? "white" : "lightgrey"};
  border-radius: 4px;
  box-sizing: border-box;
  margin-right: 10px;
`