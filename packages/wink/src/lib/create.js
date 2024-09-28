import chalk from "chalk";
import fs from "fs-extra";
import gitclone from "git-clone/promise.js";
import path from "path";
const Create = async (projectName, options) => {
  const cwd = process.cwd();
  const targetDire = path.join(cwd, projectName);
  if (fs.existsSync(targetDire)) {
    if (options.force) {
      await fs.remove(targetDire);
    } else {
      console.log(
        `directory already exists! or try ${chalk.green(
          `dawn create ${projectName} --force`
        )} to overwrite it`
      );
      return;
    }
  }
  await cloneTemplate(
    "https://github.com/weixiaoing/webpack-react-router.git",
    projectName
  );
  console.log("finish");
};
const cloneTemplate = async (gitUrl, projectName) => {
  await gitclone(gitUrl, projectName, {
    checkout: "master",
    shallow: true,
  })
    .then(() => {
      console.log("clone finish");
      // 删除.git
      fs.removeSync(path.join(projectName, ".git"));
    })
    .catch((err) => {
      console.log(err);
    });
};
export default Create;
