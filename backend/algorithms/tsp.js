export function isConnected(nodes, edges) {
  const visited = new Set();
  const queue = [nodes[0]];
  visited.add(nodes[0]);

  while (queue.length > 0) {
    const current = queue.shift();
    for (const edge of edges) {
      if (edge.from === current && !visited.has(edge.to)) {
        visited.add(edge.to);
        queue.push(edge.to);
      } else if (edge.to === current && !visited.has(edge.from)) {
        visited.add(edge.from);
        queue.push(edge.from);
      }
    }
  }

  return visited.size === nodes.length;
}

export function solveTSP(nodes, edges, startNode) {
  const getWeight = (from, to) => {
    const edge = edges.find(
      (e) =>
        (e.from === from && e.to === to) ||
        (e.from === to && e.to === from)
    );
    return edge ? edge.weight : Infinity;
  };

  const visited = new Set();
  const tour = [startNode];
  visited.add(startNode);
  let current = startNode;

  while (visited.size < nodes.length) {
    let nearest = null;
    let minWeight = Infinity;

    for (const node of nodes) {
      if (!visited.has(node)) {
        const w = getWeight(current, node);
        if (w < minWeight) {
          minWeight = w;
          nearest = node;
        }
      }
    }

    if (nearest === null) break;
    visited.add(nearest);
    tour.push(nearest);
    current = nearest;
  }

  tour.push(startNode);
  return tour;
}

export function validateTSP(userAnswer, correctSolution, edges, startNode, nodes) {
  if (userAnswer[0] !== startNode) return false;
  if (userAnswer[userAnswer.length - 1] !== startNode) return false;
  if (userAnswer.length !== nodes.length + 1) return false;

  const visited = new Set(userAnswer.slice(0, -1));
  if (visited.size !== nodes.length) return false;
  for (const node of nodes) {
    if (!visited.has(node)) return false;
  }

  const getWeight = (from, to) => {
    const edge = edges.find(
      (e) =>
        (e.from === from && e.to === to) ||
        (e.from === to && e.to === from)
    );
    return edge ? edge.weight : Infinity;
  };

  const tourWeight = (tour) => {
    let total = 0;
    for (let i = 0; i < tour.length - 1; i++) {
      total += getWeight(tour[i], tour[i + 1]);
    }
    return total;
  };

  return tourWeight(userAnswer) === tourWeight(correctSolution);
}