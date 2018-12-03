import readFile from '../utils/readFile';

const input = readFile('input-1.txt')
  .split('\n')
  .filter(Boolean)
  .map(Number);

export const part1 = () => input.reduce((acc, n) => acc + n, 0);

export const part2 = () =>
  input.until(
    (value, { cache, data }) => {
      if (cache[(data.current += value)]) return data.current;
      cache[data.current] = true;
    },
    { cache: { 0: true }, data: { current: 0 } },
  );
