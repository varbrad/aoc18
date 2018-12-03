import log from './utils/log';

import './utils/array';

const argv = require('yargs')
  .nargs('day', 1)
  .nargs('part', 1)
  .describe('day', 'Which day to solve')
  .describe('part', 'Which part to solve').argv;

const { day = new Date().getDate(), part = 0 } = argv;

const { part1, part2 } = eval(`require("./days/day${day}.js")`);

const logTime = (day, part, fn) => {
  const time = process.hrtime();
  const result = fn();
  const elapsed = process.hrtime(time);
  return [day, part, result, (elapsed[1] / 1000000).toFixed(1)];
};

const logs = [];
if (part === 0 || part === 1) logs.push(logTime(day, 1, part1));
if (part === 0 || part === 2) logs.push(logTime(day, 2, part2));

const maxAnswer = logs
  .map(data => String(data[2]).length)
  .reduce((acc, cur) => (cur > acc ? cur : acc), -1);

logs.forEach(result => log(...result, maxAnswer));
