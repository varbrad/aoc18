import chalk from 'chalk';

export default (day, part, result, elapsed = -1) => {
  console.log(
    chalk.blue(`Day ${day},`),
    chalk.yellow(`Part ${part}:`),
    chalk.green(result),
    elapsed > -1 && chalk.red(`(${elapsed.padStart(5, ' ')} ms)`),
  );
};
