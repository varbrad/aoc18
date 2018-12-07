import readFile from '../utils/readFile';

const testInput = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`;

const input = testInput //readFile('input-7.txt')
  .split('\n')
  .filter(Boolean)
  .map(row =>
    row
      .match(/Step (\w) must be finished before step (\w) can begin./)
      .slice(1),
  );

export const part1 = () => {
  const map = {};
  const validStarts = new Set('ABCDEFGHIJKLMNOPQRSTUVWYXZ');
  input.forEach(([from, to]) => {
    map[from] = map[from] || new Set();
    map[from].add(to);
    validStarts.delete(to);
  });
  let start = 'Z';
  for (let char of validStarts.values()) if (char < start) start = char;
  console.log(start);
  return 0;
};

export const part2 = () => 0;
