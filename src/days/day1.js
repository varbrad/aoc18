const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input.txt', {
  encoding: 'utf-8',
});

export const part1 = () =>
  input
    .split('\n')
    .filter(Boolean)
    .reduce((acc, n) => acc + Number(n), 0);

export const part2 = () => {
  const cache = { 0: true };
  const ns = input.split('\n').filter(Boolean);
  let current = 0;
  while (true) {
    for (let i = 0; i < ns.length; ++i) {
      const int = Number(ns[i]);
      current += int;
      if (cache[current]) return current;
      cache[current] = true;
    }
  }
};
