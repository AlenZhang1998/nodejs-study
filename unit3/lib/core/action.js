var inquirer = require('inquirer')
var config = require('../../config')
const downloadFun = require('../../test/download')

const myAction = async (project,args)=>{
  const answer = await inquirer
  .prompt([
    {
      type:'list',
      choices:config.framework,
      name:'framework',
      message:'请选择你的框架',
    }
  ])
  console.log(answer, config.url[answer.framework]);
  // 下载代码包
  await downloadFun(config.url[answer.framework], project)
}

module.exports = myAction