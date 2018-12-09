import readFile from '../utils/readFile';
import DLNode from '../utils/dll';

const [players, lastPoints] = readFile('input-9.txt')
  .trim()
  .match(/^(\d+) players; last marble is worth (\d+) points$/)
  .slice(1)
  .map(Number);

const solve = maxMarble => {
  const start = new DLNode(0).selfLink();
  const elves = {};
  let nextMarble = 1;
  let elfN = -1;
  let current = start;
  while (nextMarble < maxMarble) {
    elfN = (elfN + 1) % players;
    const marble = nextMarble++;
    if (marble % 23 === 0) {
      current = current.traverse(-6);
      elves[elfN] = (elves[elfN] || 0) + marble + current.remove();
      current = current.left;
    } else {
      current = current.traverse(2);
      current.addToRight(new DLNode(marble));
    }
  }
  return Object.values(elves).max();
};

export const part1 = () => solve(lastPoints);

export const part2 = () => solve(lastPoints * 100);
