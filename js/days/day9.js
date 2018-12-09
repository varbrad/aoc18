import readFile from '../utils/readFile';
import DLNode from '../utils/dll';

const [players, lastPoints] = readFile('input-9.txt')
  .trim()
  .match(/^(\d+) players; last marble is worth (\d+) points$/)
  .slice(1)
  .map(Number);

const solve = maxMarble => {
  const [start, elves] = [new DLNode(0).selfLink(), {}];
  let [nextMarble, elf, current] = [0, -1, start];
  while (++nextMarble < maxMarble) {
    elf = (elf + 1) % players;
    if (nextMarble % 23 === 0) {
      current = current.traverse(-6);
      elves[elf] = (elves[elf] || 0) + nextMarble + current.remove();
      current = current.left;
    } else {
      current = current.traverse(2).addToRight(new DLNode(nextMarble));
    }
  }
  return Object.values(elves).max();
};

export const part1 = () => solve(lastPoints);
export const part2 = () => solve(lastPoints * 100);
