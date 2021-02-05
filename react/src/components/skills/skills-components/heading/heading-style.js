import styled from "styled-components";

export const Container = styled.div`
  background: #edf2ff;
  text-align: center;
  height: 225px;
  width: 100%;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px;
  padding-top: 50px;

  @media (min-width: 768px) {
    align-items: center;
  }
`;

export const SubTitle = styled.div`
  margin-top: 10px;
  padding: 0;
  font-size: ${(props) => `${props.fontSize}rem`};
  text-align: left;

  @media (min-width: 768px) {
    font-size: 1.6rem !important;
    text-align: center;
  }
`;
