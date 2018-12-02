import readFile from '../utils/readFile';

const input = readFile('input-2.txt')
  .split('\n')
  .filter(Boolean)
  .map(id => id.split(''));

export const part1 = () => {
  let [twos, threes] = [0, 0];
  input.forEach(id => {
    const counts = {};
    id.forEach(char => (counts[char] = counts[char] ? counts[char] + 1 : 1));
    Object.values(counts).some(c => c == 2) && ++twos;
    Object.values(counts).some(c => c === 3) && ++threes;
  });
  return twos * threes;
};

const oneDiff = (a, b) => {
  let diffs = 0;
  let diffI = -1;
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) ++diffs, (diffI = i);
    if (diffs > 1) return [false];
  }
  if (diffs === 1) {
    const common = a.slice();
    common.splice(diffI, 1);
    return [true, common.join('')];
  }
  return [false];
};

export const part2 = () => {
  for (let i = 0; i < input.length - 1; ++i) {
    const a = input[i];
    for (let j = i + 1; j < input.length; ++j) {
      const b = input[j];
      const [found, string] = oneDiff(a, b);
      if (found) return string;
    }
  }
};
