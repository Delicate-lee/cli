#! /usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const figlet = require('figlet')

program
  // 定义命令和参数
  .command('create <app-name>')
  .description('create a new project')
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    // console.log('name:', name, 'options:', options)
    require('../lib/create.js')(name, options)
  })

  //配置config命令
  program
    .command('config [value]')
    .description('inspect and modify the config')
    .option('-g, --get <path>', 'get value from option')
    .option('-s, --set <path> <value>')
    .option('-d, --delete <path>', 'delete option from config')
    .action((value, options) => {
      console.log(value, options)
    })

    program 
      // 监听help执行
      .on('--help', () => {
        // 使用figlet绘制logo
        console.log('\r\n' + figlet.textSync('zhurong', {
          font: 'Ghost',
          horizontalLayout: 'default',
          verticalLayout: 'default',
          width: 80,
          whitespaceBreak: true
        }))

        console.log(`\r\nRun ${chalk.cyan(`dl <command> --help`)} for detailed usage of given command\r\n`)
      })

  program
    // 配置版本号信息
    .version(`v${require('../package.json').version}`)
    .usage('<command>[option]')

  // 解析用户执行命令传入参数
  program.parse(process.argv)