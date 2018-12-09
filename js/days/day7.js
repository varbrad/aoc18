import readFile from '../utils/readFile';

const input = readFile('input-7.txt')
  .split('\n')
  .filter(Boolean)
  .map(row =>
    row
      .match(/Step (\w) must be finished before step (\w) can begin./)
      .slice(1),
  );

const makeNode = (nodes, id) => {
  if (!nodes[id]) nodes[id] = { id, from: new Set(), to: new Set() };
  return nodes[id];
};

export const part1 = () => {
  const nodes = {};
  input.forEach(([from, to]) => {
    makeNode(nodes, from);
    makeNode(nodes, to);
    nodes[from].to.add(to);
    nodes[to].from.add(from);
  });
  // Get any objects where their from set is empty
  const available = Object.values(nodes).filter(node => node.from.size === 0);
  let output = '';
  while (available.length) {
    const node = available.shift();
    output += node.id;
    // Add all the `to` from this node that have all their `from` in output
    [...node.to.values()].forEach(toNodeId => {
      const toNode = nodes[toNodeId];
      const fullyConnected = [...toNode.from.values()].every(fromNodeId =>
        output.includes(fromNodeId),
      );
      if (
        fullyConnected &&
        !output.includes(toNodeId) &&
        !available.includes(toNode)
      ) {
        available.push(toNode);
      }
    });
    available.sort((a, b) => (a.id > b.id ? 1 : -1));
  }
  return output;
};

export const part2 = () => 0;
