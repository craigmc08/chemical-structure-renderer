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

function getNodeRelativePositions(nodeEdges, node) {
  const { id } = node;

  return nodeEdges.reduce((obj, edge, i) => {
    const otherId = edge.source === id ? edge.target : edge.source;
    obj[id] = { angle: angles[numNodeEdges][i], distance: distances[edge.relation] };
    return obj;
  }, {});
}

export { getNodeRelativePositions };
export default function nodeRelationParser(nodes, edges) {
  const nodesSurrounding = nodes.map(node => {
    const { id } = node;

    const nodeEdges = edges.filter(edge => edge.source === id || edge.target === id);
    const numNodeEdges = nodeEdges.length;

    const relativePositions = getNodeRelativePositions(nodeEdges, node);
  });
}
