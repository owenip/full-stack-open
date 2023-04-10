import chalk from "chalk";

const log = console.log;

const info = (...params) => {
    log(chalk.green('INFO:'), ...params.map(param => chalk.green(param)));
};

const error = (...params) => {
    log(chalk.red('ERROR:'), ...params.map(param => chalk.blue(param)));
};

export {
    info, error
};