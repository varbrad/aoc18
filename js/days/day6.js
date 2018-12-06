import readFile from '../utils/readFile';

// readFile('input-6.txt')
const points = readFile('input-6.txt')
  .split('\n')
  .filter(Boolean)
  .map(row =>
    row
      .match(/(\d+), (\d+)/)
      .slice(1)
      .map(Number),
  )
  .map((point, id) => ({ point, id }));

const getBounds = () =>
  points.reduce((bound, { point: [x, y] }) => {
    if (!bound) return [x, y, x, y];
    return [
      Math.min(x, bound[0]),
      Math.min(y, bound[1]),
      Math.max(x, bound[2]),
      Math.max(y, bound[3]),
    ];
  }, null); // left, top, right, down

const distance = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

const padding = 25;

export const part1 = () => {
  const [left, top, right, down] = getBounds();
  const cells = {};
  for (let x = left - padding; x < right + padding; ++x) {
    for (let y = top - padding; y < down + padding; ++y) {
      // Cell
      const { id, dist, tie } = points.reduce((min, { point, id }) => {
        const dist = distance(point, [x, y]);
        if (min === null) return { id, dist };
        if (min.dist === dist) min.tie = true;
        return min.dist > dist ? { id, dist } : min;
      }, null);
      cells[x + ',' + y] = tie ? null : { id, dist };
    }
  }
  const edgeIds = new Set();
  for (let x = left - padding; x < right + padding; ++x) {
    const a = cells[x + ',' + (top - padding)];
    const b = cells[x + ',' + (down + padding - 1)];
    if (a) edgeIds.add(a.id);
    if (b) edgeIds.add(b.id);
  }
  for (let y = top - padding; y < down + padding; ++y) {
    const a = cells[left - padding + ',' + y];
    const b = cells[right + padding - 1 + ',' + y];
    if (a) edgeIds.add(a.id);
    if (b) edgeIds.add(b.id);
  }
  const counts = {};
  Object.keys(cells).forEach(cell => {
    if (!cells[cell]) return;
    const { id } = cells[cell];
    counts[id] = ++counts[id] || 1;
  });
  let max = null;
  Object.keys(counts).forEach(count => {
    if (edgeIds.has(count) || edgeIds.has(Number(count))) return;
    if (max < counts[count]) max = counts[count];
  });
  return max;
};

export const part2 = () => 0;
