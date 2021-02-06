// import name,{age} from './title';
// console.log(name);
// console.log(age);

import(/*webapck ChunkName: "hello" */'./hello').then(result => {
    console.log(result.default);
});