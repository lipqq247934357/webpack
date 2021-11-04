// 1.直接引用全局的program
// node ./src/index.js lipeng lipeng -d
const { program } = require('commander');
program.version('0.0.1');
// 2.设置参数
program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');

  // program.argument('<username>', 'user to login')
  // .argument('[password]', 'password for user, if required', 'no password given')
  // .action((username, password) => {
  //   console.log('action', new Date().getTime());
  //   console.log('username:', username);
  //   console.log('password:', password);
  // });
  program.action((params, program) => {
    console.log('params', params);
    // console.log('program', program);
    console.log('action', new Date().getTime());
  });
// 3.运行
console.log('before parse', new Date().getTime());
// console.log('process.argv', process.argv);
program.parse(['-d', '-s'], {
  from: "user",
});

// 4.获取输入的选项
const options = program.opts();
if (options.debug) console.log(options);
console.log('pizza details:');
if (options.small) console.log('- small pizza size');
if (options.pizzaType) console.log(`- ${options.pizzaType}`);

// setTimeout(() => {
//   program.parse(process.argv);
// }, 4000);