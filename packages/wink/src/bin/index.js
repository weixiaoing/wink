#!/usr/bin/env node
import { Command } from "commander";

import chalk from "chalk";
import configJson from "../../package.json" with { type: "json" };
import create from "../lib/create.js";

const program = new Command();

program
  .name(configJson.name)
  .usage("<command> [options]")
  .description(chalk.greenBright("CLI for creating projects."))
  .version(configJson.name + "\t" + configJson.version);

program
  .command("config [value]") // config 命令
  .description("inspect and modify the config")
  .option("-g, --get <key>", "get value by key")
  .option("-s, --set <key> <value>", "set option[key] is value")
  .option("-d, --delete <key>", "delete option by key")
  .action((value, keys) => {
    // value 可以取到 [value] 值，keys会获取到命令参数
    console.log(value, keys);
  });

// create part
program
  .command("create <project-name>")
  .description("create a new project")
  .option("-f, --force", "overwrite directory if it exists")
  .action((projectName, options) => {
    create(projectName, options);
  });

// 监听 --help 指令
program.on("--help", function () {
  console.log();
  // 前后两个空行调整格式，更舒适
  console.log(
    ` Run ${chalk.greenBright(
      " wink <command> --help"
    )} for detailed usage of given command.`
  );
  console.log();
});

program.parse();

// console.log(configJson);
