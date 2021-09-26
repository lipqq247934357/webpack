import a from "./amountX.png";
import "./index.css";
import Test from "./react";
import name from "./treeShaking";
function component() {
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = 'hello webpack';
  console.log(name);

  return element;
}

document.body.appendChild(component());