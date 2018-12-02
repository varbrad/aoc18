import countBy from 'lodash/countBy';
import difference from 'lodash/difference';
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

const diff = (a, b) => {
  const common = a.filter((char, i) => char === b[i]);
  return common.length + 1 === a.length ? common.join('') : false;
};

export const part2 = () => {
  for (let i = 0; i < input.length - 1; ++i)
    for (let j = i + 1; j < input.length; ++j) {
      const [a, b] = [input[i], input[j]];
      const common = diff(a, b);
      if (common) return common;
    }
};
