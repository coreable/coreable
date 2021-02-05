import styled from "styled-components";

export const MainGridContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainGrid = styled.div`
  border: none;
  text-align: center;
  z-index: 1;
  width: 100%;
  min-height: 50vh;

  @media (min-width: 768px) {
    width: 80%;
    display: grid;
    justify-content: center;
    grid-template-areas:
      "asideLeft  asideRight"
      "asideLeft  asideRight";
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 3fr;
    grid-gap: 0.33rem;
  }
`;

export const AsideLeft = styled.aside`
  grid-area: asideLeft;
`;
export const AsideRight = styled.aside`
  grid-area: asideRight;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
