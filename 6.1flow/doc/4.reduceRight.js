

let arr = [1,2,3];
let res = arr.reduce((sum,item)=>{
    console.log(sum,item);
    return sum+item;
},0);
console.log(res);