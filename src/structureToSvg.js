import isValidStructure from './structureValidator';
import element, { attribute } from './element';

const WIDTH = 1000;
const HEIGHT = 1000;

export default function structureToSvg(structure) {
  if (!isValidStructure(structure)) {
    throw new TypeError('Structure is not valid');
    return '';
  }
  const { nodes, edges } = structure;

  const totalNodes = nodes.length;
  const nodeSpacing = WIDTH / totalNodes;
  const nodeStart = nodeSpacing / 2;
  const nodeRadius = nodeSpacing * 0.5 / 2;

  const nodePositions = nodes.map((node, i) => {
    const x = nodeSpacing * i + nodeStart;
    const y = HEIGHT / 2 - nodeRadius;
    return { x, y, id: node.id };
  });
  const nodeElements = nodes.map((node, i) => {
    const { x, y } = nodePositions[i];
    return new element(
      'circle',
      [
        'cx', x, 'cy', y, 'r', nodeRadius,
        'fill', 'white',
        'stroke', 'black', 'stroke-width', '5',
      ],
    );
  });
  const edgeElements = edges.map(edge => {
    const source = nodePositions.find(pos => pos.id === edge.source);
    const target = nodePositions.find(pos => pos.id === edge.target);
    return new element(
      'path',
      [
        'd', `M${source.x},${source.y} L${target.x},${target.y}`,
        'stroke', 'black', 'stroke-width', '5',
      ],
    )
  });

  return new element(
    'svg',
    [
      'class', 'chemical-structure', 'viewBox', `0 0 ${WIDTH} ${HEIGHT}`,
    ],
    ...edgeElements,
    ...nodeElements,
  );
}
