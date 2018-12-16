import readFile from '../utils/readFile';

const input = Number(readFile('input-14.txt').trim());

const step = (elves, scores) => {
  const total = elves.map(elf => scores[elf]).sum();
  String(total)
    .split('')
    .forEach(digit => {
      scores.push(Number(digit));
    });
  return elves.forEach(
    (elf, ix) => (elves[ix] = (elf + 1 + scores[elf]) % scores.length),
  );
};

export const part1 = () => {
  let elves = [0, 1];
  const scores = [3, 7];
  for (let i = 0; i < input; ++i) step(elves, scores);
  return scores.slice(input, input + 10).join('');
};

export const part2 = () => {
  const input = '02918';
  let elves = [0, 1];
  const scores = new Uint8Array();
  scores.push(3, 7);
  const stringInput = String(input);
  const inputLen = stringInput.length;
  while (true) {
    step(elves, scores);
    const last = scores.slice(scores.length - inputLen, scores.length).join('');
    if (last === stringInput) return scores.length - inputLen;
  }
};
