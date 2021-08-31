import { func, name } from "./1.js";
func();
console.log(name);
setTimeout(() => {
    func();
    let a = import("./2.js");
    console.log(a, 'a');
}, 1900);