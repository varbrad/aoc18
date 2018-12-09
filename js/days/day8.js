import readFile from '../utils/readFile';

const input = readFile('input-8.txt')
  .trim()
  .split(' ')
  .filter(Boolean)
  .map(Number);

const makeTree = (data, start) => {
  // Get the header info
  const header = data.slice(start, start + 2);
  const node = { header, children: [] };
  // If children
  let childOffset = start + 2;
  for (let i = 0; i < header[0]; ++i) {
    const [child, childEnd] = makeTree(data, childOffset);
    node.children.push(child);
    childOffset = childEnd;
  }
  // Add on the meta data
  node.meta = data.slice(childOffset, childOffset + header[1]);
  // Return our node and it's final offset
  return [node, childOffset + header[1]];
};

const traverseSum = (node, fn) =>
  node.children.reduce((acc, child) => acc + traverseSum(child, fn), fn(node));

export const part1 = () => {
  const [tree] = makeTree(input, 0);
  return traverseSum(tree, node => node.meta.sum());
};

export const part2 = () => {
  const [tree] = makeTree(input, 0);
  const sumNode = node => {
    if (node.children.length === 0) return node.meta.sum();
    return node.meta
      .map(ix => node.children[ix - 1])
      .filter(Boolean)
      .map(sumNode)
      .sum();
  };
  return sumNode(tree);
};
