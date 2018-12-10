import chalk from 'chalk';

export default (day, part, result, elapsed, maxLen) => {
  console.log(
    chalk.blue(`Day ${day},`),
    chalk.yellow(`Part ${part}:`),
    chalk.green(String(result).padEnd(maxLen, ' ')),
    elapsed > -1 && chalk.red(`(${elapsed.padStart(7, ' ')} ms)`),
  );
};
