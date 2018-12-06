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
  input.object((map, [, ...rect]) =>
    rect.loop((x, y) => (map[`${x},${y}`] = ++map[`${x},${y}`] || 1), map),
  );

export const part1 = () =>
  Object.values(makeMap(input)).reduce((acc, val) => acc + (val > 1), 0);

export const part2 = () =>
  input.first(
    ([id, ...rect], map) =>
      rect.loopIf((x, y) => map[`${x},${y}`] > 1, false, id),
    'who knows', // default return value
    makeMap(input), // include the map to each row
  );
