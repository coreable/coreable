import styled from "styled-components";

export const NavBarContainer = styled.div`
  position: fixed;
  z-index: 998;
  height: 50px;
  width: 100%;
  background-color: ${(props) => (props.scroll > 50 ? "white" : "#0653cd")};
  box-shadow: ${(props) =>
    props.scroll > 50 && "0px 1px 9px -1px rgba(0, 56, 140, 1)"};
  opacity: ${(props) => (props.scroll > 50 ? "0.85" : "1")};
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const NavBarContents = styled.div`
  height: 100%;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  background-color: ${(props) => (props.scroll > 50 ? "white" : "#0653cd")};
  justify-content: space-between;
  align-items: center;
  display: flex;
  @media (min-width: 768px) {
    width: 90%;
    justify-content: flex-start;
  }
`;

export const Logo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
`;

export const NavbarItems = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const HamburgerMenu = styled.div`
  width: 40px;
  height: 40px;
  color: white;
  justify-content: flex-end;
  align-items: center;
  display: flex;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const NavbarMenu = styled.div`
  position: absolute;
  left: 0;
  top: 50px;
  z-index: 999;
  height: calc(100vh - 50px);
  width: 100%;
  background-color: white;
  opacity: 0.85;
  transition: all 0.2s ease-in-out;
  transform: ${(props) =>
    props.isOpen ? "translateX(0%)" : "translateX(100%)"};
`;

export const UnorderedList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: hidden;
  display: flex;
  color: ${(props) => props.color === "white" && "white"};
  font-size: ${(props) => `${props.fontSize}rem`};
  flex-direction: ${(props) => `${props.direction}`};
`;

export const ListItems = styled.li`
  display: flex;
  flex-direction: column;
  height: 70px;
  width: 100%;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
`;
