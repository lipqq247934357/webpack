import React from 'react';
import ReactDom from 'react-dom';
import './css/1.css';
import './css/1.less';
import './css/1.scss';
const a = 100;
console.log(a);
let logo = require('./images/1.png');
let image = new Image();
image.src = logo.default;
document.body.append(image);

const func = (a, b) => a + b;
console.log(func(1,2));
ReactDom.render(<h1>hello,11111</h1>, document.getElementById('root'));