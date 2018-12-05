import readFile from '../utils/readFile';
import { iif } from 'rxjs';

const input = readFile('input-5.txt')
  .trim()
  .split('')
  .filter(Boolean)
  .map(char => char.charCodeAt(0));

const isLetter = letter => code => code === letter || code === letter + 32;
const canReact = (ply, i) => Math.abs(ply[i] - ply[i + 1]) === 32;

export const reduce = initial => {
  const [polymer, len] = [initial.slice(), initial.length];
  for (let i = 0; i < polymer.length - 1; )
    canReact(polymer, i) ? (polymer.splice(i, 2), --i) : ++i;
  return polymer.length;
};

export const part1 = () => reduce(input);

export const part2 = () =>
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    .split('')
    .map(char => char.charCodeAt(0))
    .reduce((min, letter) => {
      const strip = input.exclude(isLetter(letter));
      const length = reduce(strip);
      return min === 0 || min > length ? length : min;
    }, 0);
