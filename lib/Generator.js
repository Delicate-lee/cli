const { getRepoList } = require('./http')
const ora = require('ora')
const inquirer = require('inquirer')

async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message)
  // 开始加载动画
  spinner.start()

  try {
    const result = await fn(...args)
    spinner.succeed()
  } catch(error) {
    spinner.fail('Request failed, refetch ...')
  }
}

class Generator {
  constructor (name, targetDir) {
    this.name = name
    this.targetDir = targetDir
  }


  async getRepo() {
    // 从远程拉取模板数据
    const repoList = await wrapLoading(getRepoList, 'waiting fetch template')
    if(!repoList) return

    const repos = repoList.map(item => item.name)

    // 用户选择模板名称
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'Please choose a template to create project'
    })

    // return 用户选择的名称
    return repo
  }

  // 核心创建逻辑
  // 1）获取模板名称
  // 2）获取tag名称
  // 3）下载模板到模板目录
  async create() {
    const repo = await this.getRepo()
    console.log('用户选择了，repo=' + repo)
  }
}

module.exports = Generator