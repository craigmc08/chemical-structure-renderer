const angles = {
  1: [ 0 ],
  2: [ 0, 180 ],
  3: [ 0, 120, 240 ],
  4: [ 0, 90, 180, 240 ],
  5: [ 0, 72, 144, 216, 288 ],
  6: [ 0, 60, 120, 180, 240, 300 ],
};
const distances = {
  single: 100,
  double: 66,
  triple: 50,
};

function getNodeRelativePositions(node, edges) {
  const { id } = node;
  const nodeEdges = edges.filter(edge => edge.source === id || edge.target === id);
  const numNodeEdges = nodeEdges.length;

  return nodeEdges.reduce((arr, edge, i) => {
    const otherId = edge.source === id ? edge.target : edge.source;
    arr.push({ angle: angles[numNodeEdges][i], distance: distances[edge.relation], id: otherId });
    return arr;
  }, []);
}

export { getNodeRelativePositions };
export default function nodeRelationParser(nodes, edges) {
  const nodesSurrounding = nodes.map(node => {
    const { id } = node;

    const relativePositions = getNodeRelativePositions(node, edges);

    return {
      id,
      relativePositions,
    };
  });
  return nodesSurrounding;
}
