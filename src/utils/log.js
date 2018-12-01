import chalk from 'chalk';

export default (day, part, result) => {
  console.log(
    chalk.blue(`Day ${day},`),
    chalk.yellow(`Part ${part}:`),
    chalk.green(result),
  );
};
