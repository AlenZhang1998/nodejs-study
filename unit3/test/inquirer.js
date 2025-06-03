const inquirer = require('inquirer')

inquirer
  .prompt([
    {
      type: 'input',
      name: 'username',
      message: '请输入你的名字'
    }
  ])
  .then((answers) => {
    console.log(answers)
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  })