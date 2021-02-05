import styled from "styled-components";

export const NavBarContainer = styled.div`
  height: 50px;
  width: 100%;
  background: #0653cd;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const NavBarContents = styled.div`
  height: 100%;
  width: 90%;
  background: #0653cd;
  justify-content: space-between;
  align-items: center;
  display: flex;
  @media (min-width: 768px) {
    width: 70%;
  }
`;

export const Logo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
`;

export const HamburgerMenu = styled.div`
  width: 40px;
  height: 40px;
  color: white;
  justify-content: flex-end;
  align-items: center;
  display: flex;
`;
