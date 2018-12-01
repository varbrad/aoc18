import readFile from '../utils/readFile';

const input = readFile('input-1.txt')
  .split('\n')
  .filter(Boolean)
  .map(Number);

export const part1 = () => input.reduce((acc, n) => acc + n, 0);

export const part2 = () => {
  const cache = { 0: true };
  let current = 0;
  while (1) {
    for (let i = 0; i < input.length; ++i) {
      if (cache[(current += input[i])]) return current;
      cache[current] = true;
    }
  }
};
