const ora = require('ora')

const spinner = ora().start()
spinner.text = 'loading...'

setTimeout(() => {
	spinner.color = 'yellow';
  console.log('等着吧你');
  spinner.succeed('结束')
}, 1000);