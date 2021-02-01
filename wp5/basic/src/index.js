import './css/1.css';
import './css/1.less';
import './css/1.scss';
const a = 100;
console.log(a);
let logo = require('./images/1.png');
let image = new Image();
image.src = logo.default;
document.body.append(image);
