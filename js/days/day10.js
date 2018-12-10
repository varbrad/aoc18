import readFile from '../utils/readFile';

const getInput = () =>
  readFile('input-10.txt')
    .trim()
    .split('\n')
    .map(row =>
      row
        .match(
          /position=<\s*(-?\d+),\s*(-?\d+)> velocity=<\s*(-?\d+),\s*(-?\d+)>/,
        )
        .slice(1)
        .map(Number),
    );

const proceed = points =>
  points.map(([x, y, dx, dy]) => [x + dx, y + dy, dx, dy]);

const getBounds = points =>
  points.reduce((acc, [x, y]) => {
    if (acc === null) return [x, y, x, y];
    return [
      x < acc[0] ? x : acc[0],
      y < acc[1] ? y : acc[1],
      x > acc[2] ? x : acc[2],
      y > acc[3] ? y : acc[3],
    ];
  }, null);

export const solve = () => {
  let points = getInput();
  let largestChain = [0, 0];
  for (let k = 0; k < 50000; ++k) {
    points.sort((a, b) => a[1] - b[1]);
    let maxChain = 1;
    for (let i = 0; i < points.length; ++i) {
      const x = points[i][0];
      let cY = points[i][1] + 1;
      let chain = 1;
      for (let j = i + 1; j < points.length; ++j) {
        const [x2, y2] = points[j];
        if (y2 > cY) break;
        if (x2 === x && y2 === cY) {
          cY++;
          chain++;
        }
      }
      if (chain > maxChain) maxChain = chain;
    }
    //
    if (maxChain > largestChain[1]) largestChain = [k, maxChain, points];
    points = proceed(points);
  }
  // Get bounds
  const [left, top, right, bottom] = getBounds(largestChain[2]);
  const map = {};
  largestChain[2].forEach(([x, y]) => (map[x + ',' + y] = true));
  const output = [];
  for (let y = top; y < bottom + 1; ++y) {
    let row = '';
    for (let x = left; x < right + 1; ++x) {
      row += map[x + ',' + y] ? '#' : '.';
    }
    output.push(row);
  }
  //
  return [output.join('\n'), largestChain[0]];
};

const [string, seconds] = solve();

export const part1 = () => {
  // eslint-disable-next-line no-console
  console.log(string);
  return 'See above';
};
export const part2 = () => seconds;
