import readFile from '../utils/readFile';

const FS = '/';
const BS = '\\';
const CROSS = '+';
const [UP, RIGHT, DOWN, LEFT] = [0, 1, 2, 3];
const STRAIGHT = 4;
const isCart = symbol => /[><^v]/.test(symbol);
const getDir = symbol => '^>v<'.indexOf(symbol);

const FS_MAP = {
  [UP]: RIGHT,
  [RIGHT]: UP,
  [DOWN]: LEFT,
  [LEFT]: DOWN,
};

const BS_MAP = {
  [UP]: LEFT,
  [RIGHT]: DOWN,
  [DOWN]: RIGHT,
  [LEFT]: UP,
};

const input = readFile('input-13.txt')
  .split('\n')
  .map((row, y) =>
    row.split('').reduce((map, item, x) => {
      map[x + ',' + y] = item;
      return map;
    }, {}),
  )
  .reduce((o, row) => Object.assign(o, row), {});

const setup = state => {
  const carts = [];
  const newState = Object.assign({}, state);
  let id = 0;
  Object.entries(state).forEach(([key, val]) => {
    if (isCart(val)) {
      const [x, y] = key.split(',').map(Number);
      const dir = getDir(val);
      carts.push({ id: ++id, x, y, dir, turn: LEFT });
      newState[key] = getDir % 2 === 0 ? '|' : '-';
    }
  });
  return [newState, carts];
};

const step = (state, carts) => {
  carts.forEach(cart => {
    // If cart is dead, then skip
    if (cart.dead) return;
    // Move the cart
    if (cart.dir === LEFT || cart.dir === RIGHT) {
      cart.x += cart.dir === LEFT ? -1 : 1;
    } else {
      cart.y += cart.dir === UP ? -1 : 1;
    }
    // Whats underneath the cart?
    const piece = state[cart.x + ',' + cart.y];
    if (piece === FS) {
      cart.dir = FS_MAP[cart.dir];
    } else if (piece === BS) {
      cart.dir = BS_MAP[cart.dir];
    } else if (piece === CROSS) {
      if (cart.turn === LEFT) {
        cart.turn = STRAIGHT;
        cart.dir = (cart.dir - 1 + 4) % 4;
      } else if (cart.turn === STRAIGHT) {
        cart.turn = RIGHT;
      } else {
        cart.turn = LEFT;
        cart.dir = (cart.dir + 1) % 4;
      }
    }

    // Is there another cart underneath us?
    const otherCart = carts.find(
      cart2 =>
        cart.id !== cart2.id &&
        cart.x === cart2.x &&
        cart.y === cart2.y &&
        !cart2.dead,
    );
    if (otherCart) {
      cart.dead = true;
      otherCart.dead = true;
    }
  });
  carts = carts.filter(cart => !cart.dead);
  // Sort the carts by y, then x
  carts.sort((a, b) => a.y - b.y || a.x - b.x);
  return carts;
};

export const part1 = () => {
  let [state, carts] = setup(input);
  let crashCart;
  let steps = 0;
  while (!crashCart) {
    carts = step(state, carts);
    ++steps;
    crashCart = carts.find(cart => cart.dead);
  }
  const { x, y } = crashCart;
  return `${x},${y} in ${steps} ticks`;
};

export const part2 = () => {
  let [state, carts] = setup(input);
  let remaining = carts.length;
  let steps = 0;
  while (remaining > 1) {
    carts = step(state, carts);
    ++steps;
    remaining = carts.filter(cart => !cart.dead).length;
  }
  const { x, y } = carts.find(cart => !cart.dead);
  return `${x},${y} in ${steps} ticks`;
};
