import React from "react";

const styling = {
  backgroundColor: "red",
  height: "50px",
  width: "200px",
};
function Button(props) {
  const buttonText = props.name;
  return <button style={{ styling }}>{buttonText}</button>;
}

export default Button;
