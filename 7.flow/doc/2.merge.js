function merge(options1,options2){

}
let options1 = {
    module:{
        rules:[
            'rule1'
        ]
    }
}
let options2 = {
    module:{
        rules:[
            'rule2'
        ]
    }
}

let options = {...options1,...options2};
console.log('====================================');
console.log(options);
console.log('====================================');