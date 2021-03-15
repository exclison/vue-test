#!/usr/bin/env node

const { Command, option } = require("commander");
const program = new Command();
program
  .command('create <app-name>')
  .description('create a new project powered by vue-cli-service')//创建一个由vue-cli服务驱动的新项目
  .option('-p, --preset <presetName>', 'Skip prompts and use saved or remote preset')//跳过提示并使用已保存或远程预设
  .option('-d, --default', 'Skip prompts and use default preset')//跳过提示并使用默认预设
  .option('-i, --inlinePreset <json>', 'Skip prompts and use inline JSON string as preset')//跳过提示并使用内联 JSON 字符串作为预设
  .option('-m, --packageManager <command>', 'Use specified npm client when installing dependencies')//安装依赖项时使用指定的npm客户端
  .option('-r, --registry <url>', 'Use specified npm registry when installing dependencies (only for npm)')//安装依赖项时使用指定的npm注册表（仅限npm）
  .option('-g, --git [message]', 'Force git initialization with initial commit message')//强制git初始化与初始提交消息
  .option('-n, --no-git', 'Skip git initialization')//跳过git初始化
  .option('-f, --force', 'Overwrite target directory if it exists')//如果存在，则覆盖目标目录
  .option('--merge', 'Merge target directory if it exists')//如果存在合并目标目录
  .option('-c, --clone', 'Use git clone when fetching remote preset')//获取远程预设时使用 git 克隆
  .option('-x, --proxy <proxyUrl>', 'Use specified proxy when creating project')//创建项目时使用指定代理
  .option('-b, --bare', 'Scaffold project without beginner instructions')//没有初学者说明的脚手架项目
  .option('--skipGetStarted', 'Skip displaying "Get started" instructions')//跳过显示"开始"说明
  .action((name, options) => {
      console.log(name,options)
    // if (minimist(process.argv.slice(3))._.length > 1) {
    //   //您提供了多个参数。第一个将用作应用程序的名称，其余的将被忽略。
    //   console.log(chalk.yellow('\n Info: You provided more than one argument. The first one will be used as the app\'s name, the rest are ignored.'))
    // }
    // // --git makes commander to default git to true
    // // 强制git初始化与初始提交消息 设置forceGit 为true
    // if (process.argv.includes('-g') || process.argv.includes('--git')) {
    //   options.forceGit = true
    // }
    /*
    options:{
      preset,
      default,
      inlinePreset,
      packageManager,
      registry,
      git,
      no,
      force,
      merge,
      clone,
      proxy,
      bare,
      skipGetStarted,
    }
    */
    // require('../lib/create')(name, options)
  })
// program.version("0.0.1");

// program.option('-d,--debug','output extra debugging')
// program.parse(process.argv)

// const options = program.opts()
// console.log(options)

// 通过绑定处理函数实现命令（这里的指令描述为放在`.command`中）
// 返回新生成的命令（即该子命令）以供继续配置
// program
//   .command("clone <source> [destination]")
//   .description("clone a repository into a newly created directory")
//   .action((source, destination) => {
//     console.log("clone command called");
//   });
// program
//   .command("build")
//   .description("clone a repository into a newly created directory")
//   .action(() => {
//     console.log("build command called");
//   });

// // 通过独立的的可执行文件实现命令 (注意这里指令描述是作为`.command`的第二个参数)
// // 返回最顶层的命令以供继续添加子命令
// program
//   .command("start <service>", "start named service")
//   .command("stop [service]", "stop named service, or all if no name supplied");

// program
//   .version("0.1.0")
//   .arguments("<username> [password]")
//   .description("test command", {
//     username: "user to login",
//     password: "password for user, if required",
//   })
//   .action((username, password) => {
//     console.log("username:", username);
//     console.log("environment:", password || "no password given");
//   });

// program
//   .version("0.0.1")
//   .description("Fake package manager")
//   .command("install [name]", "install one or more packages")
//   .alias("i")
//   .command("search [query]", "search with optional query")
//   .alias("s")
//   .command("update", "update installed packages", {
//     executableFile: "myUpdateSubCommand",
//   })
//   .command("list", "list packages installed", { isDefault: true });

program.parse(process.argv);


