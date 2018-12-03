import readFile from '../utils/readFile';

const input = readFile('input-3.txt')
  .split('\n')
  .filter(Boolean)
  .map(row => row.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/));

const makeMap = input => {
  const map = {};
  input.forEach(row => {
    const [_, id, x, y, w, h] = row.map(Number);
    for (let Y = y; Y < y + h; ++Y) {
      for (let X = x; X < x + w; ++X) {
        const str = `${X}-${Y}`;
        loops++;
        map[str] = map[str] || 0;
        map[str]++;
      }
    }
  });
  return map;
};

export const part1 = () => {
  const map = makeMap(input);
  return Object.values(map).reduce((acc, val) => acc + (val > 1), 0);
};

export const part2 = () => {
  const map = makeMap(input);
  outer: for (let i = 0; i < input.length; ++i) {
    const row = input[i];
    const [_, id, x, y, w, h] = row.map(Number);
    for (let Y = y; Y < y + h; ++Y) {
      for (let X = x; X < x + w; ++X) {
        const str = `${X}-${Y}`;
        if (map[str] > 1) continue outer;
      }
    }
    return id;
  }
  return 'who knows';
};
