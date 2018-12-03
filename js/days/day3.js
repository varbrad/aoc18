import readFile from '../utils/readFile';

const input = readFile('input-3.txt')
  .split('\n')
  .filter(Boolean)
  .map(row =>
    row
      .match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/)
      .slice(1)
      .map(Number),
  );

const makeMap = input =>
  input.object((map, [id, x, y, w, h, t]) => {
    for (let Y = y; Y < y + h; ++Y)
      for (let X = x; X < x + w; ++X) map[(t = `${X},${Y}`)] = ++map[t] || 1;
    return map;
  });

export const part1 = () =>
  Object.values(makeMap(input)).reduce((acc, val) => acc + (val > 1), 0);

export const part2 = () =>
  input.first(
    ([id, x, y, w, h], map) => {
      for (let Y = y; Y < y + h; ++Y)
        for (let X = x; X < x + w; ++X) if (map[`${X},${Y}`] > 1) return false;
      return id;
    },
    'who knows', // default return value
    makeMap(input), // include the map to each row
  );
