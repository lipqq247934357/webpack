import dd, { func, name } from "./1.js";
func();
console.log(name);
console.log('dd', dd);
setTimeout(() => {
    func();
    console.log(dd);
    console.log(dd);
    let a = import("./2.js");
    console.log(a, 'a');
}, 1900);

// import dd from "./2.js";
// console.log(dd, 'd');
// setTimeout(() => {
//     console.log(dd, 'd');
// }, 200);