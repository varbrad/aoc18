import countBy from 'lodash/countBy';
import readFile from '../utils/readFile';

const input = readFile('input-2.txt')
  .split('\n')
  .filter(Boolean)
  .map(id => id.split(''));

export const part1 = () =>
  input
    .map(id => Object.values(countBy(id)))
    .reduce(
      ([twos, threes], vs) => [twos + vs.includes(2), threes + vs.includes(3)],
      [0, 0],
    )
    .reduce((p, c) => c * p, 1);

export const part2 = () =>
  input.findCompare((a, b) => {
    const common = a.filter((char, i) => char === b[i]);
    return common.length + 1 === a.length && common.join('');
  });
