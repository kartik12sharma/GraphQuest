function find(parent, node) {
  if (parent[node] !== node) {
    parent[node] = find(parent, parent[node]);
  }
  return parent[node];
}

function union(parent, a, b) {
  parent[find(parent, a)] = find(parent, b);
}

export function solveMST(nodes, edges) {
  const sorted = [...edges].sort((a, b) => a.weight - b.weight);
  const parent = {};
  nodes.forEach((n) => (parent[n] = n));

  const mst = [];
  for (const edge of sorted) {
    const rootA = find(parent, edge.from);
    const rootB = find(parent, edge.to);
    if (rootA !== rootB) {
      union(parent, edge.from, edge.to);
      mst.push(edge);
    }
    if (mst.length === nodes.length - 1) break;
  }
  return mst;
}

export function validateMST(userAnswer, correctSolution) {
  if (userAnswer.length !== correctSolution.length) return false;
  const normalize = (edge) =>
    [edge.from, edge.to].sort().join('-') + '-' + edge.weight;
  const correctSet = new Set(correctSolution.map(normalize));
  return userAnswer.every((edge) => correctSet.has(normalize(edge)));
}