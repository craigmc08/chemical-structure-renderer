const node_types = {
  element: true,
  lonepair: true,
};
const edge_types = {
  single: true,
  double: true,
  triple: true,
};

function isValidNode(node, strict) {
  const { id, type, label } = node;
  const hasId = id !== undefined;
  const typeIsValid = type ? !!node_types[type] : false;
  const hasLabel = label !== undefined;

  return (strict ? (hasLabel) : true) && hasId && typeIsValid;
}
function nodeIdReducer(memory, node) {
  if (!memory.allUnique) return memory;
  if (memory.ids[node.id]) {
    memory.allUnique = false;
    return memory;
  }
  memory.ids[node.id] = true;
  return memory;
}
function allNodesValid(nodes, strict) {
  const nodesAreValid =
    Array.isArray(nodes) &&
    nodes.every(node => isValidNode(node, strict));

  const allNodesHaveUniqueIds =
    nodesAreValid &&
    nodes.reduce(
      nodeIdReducer,
      { allUnique: true, ids: {} },
    ).allUnique;

  return nodesAreValid && allNodesHaveUniqueIds;
}

function isValidEdge(edge, strict) {
  const { source, target, relation } = edge;
  const hasSource = source !== undefined;
  const hasTarget = target !== undefined;
  const relationIsValid = relation ? !!edge_types[relation] : false;

  return hasSource && hasTarget && relationIsValid;
}
function edgeConnectionReducer(previousValid, edge, nodes) {
  const sourceIsValid = nodes.findIndex(node => node.id === edge.source) >= 0;
  const targetIsValid = nodes.findIndex(node => node.id === edge.target) >= 0;

  return previousValid && sourceIsValid && targetIsValid;
}
function allEdgesValid(edges, nodes, strict) {
  const edgesAreValid =
    Array.isArray(edges) &&
    edges.every(edge => isValidEdge(edge, strict));

  const allEdgesConnectedToRealNodes =
    edgesAreValid &&
    edges.reduce((previousValid, edge) =>
      edgeConnectionReducer(previousValid, edge, nodes),
      true,
    );

  return edgesAreValid && allEdgesConnectedToRealNodes;
}

export { isValidNode, isValidEdge };
export default function isValidStructure(structure, strict=false) {
  const { directed, nodes, edges } = structure;
  const isUndirected = !directed;

  const areAllNodesValid = allNodesValid(nodes, strict);
  const areAllEdgesValid = allEdgesValid(edges, nodes, strict);

  return (strict ? (isUndirected) : true) && areAllNodesValid && areAllEdgesValid;
}
