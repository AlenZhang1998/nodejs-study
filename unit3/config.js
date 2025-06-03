const myAction = require('./action')

const mycommander = function (program) {
  program
  .command('create <project> [args...]') //command是创建一个命令比如：mycli create xxxx a b c d
  .alias('crt') // //给你的create命令取别名为crt 使用时可以 mycli crt xxxx
  .description('创建项目')//对这个命令进行描述

  .action(myAction)
}

module.exports = mycommander