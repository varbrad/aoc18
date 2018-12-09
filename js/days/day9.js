import readFile from '../utils/readFile';

const [players, lastPoints] = readFile('input-9.txt')
  .trim()
  .match(/^(\d+) players; last marble is worth (\d+) points$/)
  .slice(1)
  .map(Number);

const node = (value, left, right) => ({ value, left, right });
const selfNode = value => {
  const n = node(value);
  n.left = n.right = n;
  return n;
};

const addToRight = (target, newNode) => {
  const oldRight = target.right;
  // Set new node neighbours
  newNode.left = target;
  newNode.right = oldRight;
  // Set the left and right neighbours to reflect new node
  target.right = newNode;
  oldRight.left = newNode;
  return newNode;
};

const removeNode = node => {
  node.left.right = node.right;
  node.right.left = node.left;
  return node.value;
};

const move = (node, n) => {
  if (n === 0) return node;
  if (n > 0) return move(node.right, n - 1);
  return move(node.left, n + 1);
};

const solve = maxMarble => {
  const start = selfNode(0);
  const elves = {};
  let nextMarble = 1;
  let elfN = -1;
  let current = start;
  while (nextMarble < maxMarble) {
    elfN = (elfN + 1) % players;
    const marble = nextMarble++;
    if (marble % 23 === 0) {
      current = move(current, -6);
      elves[elfN] = (elves[elfN] || 0) + marble + removeNode(current);
      current = current.left;
    } else {
      current = move(current, 2);
      addToRight(current, node(marble));
    }
  }
  return Object.values(elves).max();
};

export const part1 = () => solve(lastPoints);

export const part2 = () => solve(lastPoints * 100);
