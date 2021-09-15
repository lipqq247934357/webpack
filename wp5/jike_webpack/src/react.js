import React from "react";
import { render } from "react-dom";

const Test = () => {
  return <div>111</div>;
};
const root = document.getElementById("root");
render(<Test></Test>, root);

export default Test;
