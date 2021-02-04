import styled from "styled-components";

// interface IHeaderProps {
//   fontSize: string;
//   fontWeight: number;
// }

export const Container = styled.div`
  padding-top: 96px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
  background-color: white;

  padding: 0;
`;

export const FormContainer = styled.div`
  box-sizing: border-box;
  padding: 30px;
  width: 100%;
  min-height: 50%;

  @media (min-width: 768px) {
    width: 400px;
    height: 400px;
  }
`;

// export const Header = styled.div<IHeaderProps>`
export const Header = styled.div`
  font-size: ${(props) => `${props.fontSize}rem`};
  font-weight: ${(props) => `${props.fontWeight}`};
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
`;

export const Form = styled.form``;

export const InputContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  box-sizing: border-box;
  padding: 10px;
  border-radius: 4px;
  border: ${(props) => (props.error === true ? "1px solid red" : "none")};
  margin-top: 5px;
  background-color: #fafafa;
  width: 100%;
  height: 40px;
`;

export const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const Button = styled.button`
  height: 40px;
  width: 48%;
  background-color: ${(props) =>
    props.backgroundColor === "primary" ? "#4070e0" : "#d6d6d6"};
  color: white;
  font-weight: 700;
  border-radius: 4px;
  border: none;
`;

export const ErrorMessage = styled.div`
  position: absolute;
  right: 0;
  top: 10px;
  color: red;
`;
