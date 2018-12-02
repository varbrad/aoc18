import log from './utils/log';

import './utils/array';

const argv = require('yargs')
  .nargs('day', 1)
  .nargs('part', 1)
  .describe('day', 'Which day to solve')
  .describe('part', 'Which part to solve').argv;

const { day = 1, part = 0 } = argv;

const { part1, part2 } = eval(`require("./days/day${day}.js")`);

if (part === 0 || part === 1) log(day, 1, part1());
if (part === 0 || part === 2) log(day, 2, part2());
