import { func, name } from "./1.js";
func();
console.log(name);
setTimeout(() => {
    func();
}, 1900);