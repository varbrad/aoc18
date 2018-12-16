import readFile from '../utils/readFile';
import DLNode from '../utils/dll';

const input = Number(readFile('input-14.txt').trim());

// const step = (elves, scores) => {
//   const sum = elves.map(elf => scores[elf]).sum();
//   String(sum)
//     .split('')
//     .forEach(digit => scores.push(Number(digit)));
//   elves.forEach((elf, i) => {
//     elves[i] = (elf + 1 + scores[elf]) % scores.length;
//   });
// };

const step = (elves, end, length) => {
  const sum = elves.map(elf => elf.node.value).sum();
  String(sum)
    .split('')
    .forEach(digit => {
      end = end.addToRight(new DLNode(Number(digit))).right;
      ++length;
    });
  elves.forEach(elf => {
    const inc = elf.node.value + 1;
    elf.node = elf.node.traverse(inc);
  });
  return [end, length];
};

export const part1 = () => {
  let start = new DLNode(3).selfLink();
  let end = start.addToRight(new DLNode(7)).right;
  let length = 2;
  const elves = [{ node: start }, { node: end }];
  //
  while (length < 10 + input) {
    [end, length] = step(elves, end, length);
  }
  let score = '';
  let node = start;
  for (let i = 0; i < input; ++i) {
    node = node.right;
  }
  for (let i = 0; i < 10; ++i) {
    score += String(node.value);
    node = node.right;
  }
  return score;
};

const print = (node, len) => {
  let l = '';
  for (let i = 0; i < len; ++i) {
    l += node.value;
    node = node.right;
  }
  return l;
};

export const part2 = () => {
  let start = new DLNode(3).selfLink();
  let end = start.addToRight(new DLNode(7)).right;
  let length = 2;
  const elves = [{ node: start }, { node: end }];
  //
  for (let i = 0; i < 15000000; ++i) {
    [end, length] = step(elves, end, length);
  }
  const str = print(start, length);
  return str.indexOf(String(input));
};