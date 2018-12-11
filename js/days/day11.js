import readFile from '../utils/readFile';

const input = Number(readFile('input-11.txt').trim());

const generateGrid = (serial, w, h) => {
  const cells = {};
  for (let x = 1; x <= w; ++x) {
    for (let y = 1; y <= h; ++y) {
      const rackID = x + 10;
      let power = rackID * y;
      power += serial;
      power *= rackID;
      power = Math.floor((power / 100) % 10);
      power -= 5;
      cells[x + ',' + y] = power;
    }
  }
  return cells;
};

const sum = (cells, sX, sY) => {
  let total = 0;
  for (let y = sY; y < sY + 3; ++y) {
    for (let x = sX; x < sX + 3; ++x) {
      total += cells[x + ',' + y];
    }
  }
  return total;
};

export const part1 = () => {
  const cells = generateGrid(input, 300, 300);
  let [max, cell] = [-1, -1];
  for (let y = 1; y <= 298; ++y) {
    for (let x = 1; x <= 298; ++x) {
      const count = sum(cells, x, y);
      if (count > max) {
        max = count;
        cell = x + ',' + y;
      }
    }
  }
  return cell;
};

export const part2 = () => '???';
