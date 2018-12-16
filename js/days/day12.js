import readFile from '../utils/readFile';

const [rgx1, rgx2] = [/initial state: (.*)/, /(.{5}) => (.{1})/];

let [[state], ...rules] = readFile('input-12.txt')
  .trim()
  .split('\n')
  .filter(Boolean)
  .map((data, i) => data.match(i === 0 ? rgx1 : rgx2).slice(1));

state = state.split('').reduce((o, v, i) => Object.assign(o, { [i]: v }), {});
rules = rules.reduce((o, [from, to]) => Object.assign(o, { [from]: to }), {});

const getBounds = state =>
  Object.entries(state).reduce(
    ([min, max], [key, val]) => {
      const keyN = Number(key);
      if (val === '#') {
        if (keyN < min) min = keyN;
        if (keyN > max) max = keyN;
      }
      return [min, max];
    },
    [9999, -9999],
  );

const getPattern = (state, n) => {
  let pattern = '';
  for (let i = n; i < n + 5; ++i) pattern += state[i] || '.';
  return pattern;
};

const produce = (state, rules) => {
  const [left, right] = getBounds(state);
  const nextState = Object.assign({}, state);

  for (let x = left - 4; x <= right; ++x) {
    const pattern = getPattern(state, x);
    const oldVal = state[x + 2] || '.';
    const output = rules[pattern] || '.';
    if (oldVal !== output) {
      nextState[x + 2] = output;
    }
  }

  return nextState;
};

const sum = state =>
  Object.entries(state).reduce(
    (sum, [key, val]) => sum + (val === '#' ? Number(key) : 0),
    0,
  );

export const part1 = () => {
  let current = state;
  for (let i = 0; i < 20; ++i) {
    current = produce(current, rules);
  }
  return sum(current);
};

export const part2 = () => {
  let current = state;
  for (let i = 0; i < 200; ++i) {
    current = produce(current, rules);
  }
  const after200 = sum(current);
  const inc = 38 * (50000000000 - 200);
  return after200 + inc;
};
