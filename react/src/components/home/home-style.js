import styled from "styled-components";

export const Container = styled.div`
  background: whitesmoke;
  box-sizing: border-box;
  position: absolute;
  top: 52px;
  margin: 0 auto;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 52px);
  overflow-y: scroll;
`;

export const HeaderContainer = styled.div`
  box-sizing: border-box;
  padding: 20px;
  background: white;
  margin: 0 auto;
  height: 180px;
  width: 100%;
  z-index: 0;
  color: #4070e0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  @media (min-width: 768px) {
    align-items: center;
  }
`;

export const Title = styled.h1`
  font-size: ${(props) => `${props.fontSize}rem`};
  font-family: ${(props) =>
    props.fontType && "'Times New Roman', Times, serif"};
  @media (min-width: 768px) {
    /* font-size: 3rem !important; */
  }
`;

export const SubTitle = styled.p`
  font-size: ${(props) => `${props.fontSize}rem`};

  @media (min-width: 768px) {
    font-size: 1.6rem !important;
  }
`;

export const Main = styled.div`
  background: transparent;
  border: none;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border: none;
`;
