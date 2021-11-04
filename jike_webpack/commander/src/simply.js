// 1.直接引用全局的program
const { program } = require('commander');
program.version('0.0.1');
// 2.设置参数
program
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza');

// 3.设置执行函数
program.action((params, program) => {
    console.log('params', params);
    console.log('action', new Date().getTime());
});
// 4.运行
console.log('before parse', new Date().getTime());
program.parse(['-d', '-s'], {
    from: "user",
});