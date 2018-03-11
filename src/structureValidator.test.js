import isValidStructure, { isValidNode, isValidEdge } from './structureValidator';
import exampleStructure from '../example-structure.json';

test('nodes with invalid type are not valid', () => {
  expect(isValidNode({ id: 0, type: 'atom', label: 'C' })).toBe(false);
});
test('nodes without label are valid when not in strict mode', () => {
  expect(isValidNode({ id: 0, type: 'element' })).toBe(true);
});
test('nodes without label are not valid in strict mode', () => {
  expect(isValidNode({ id: 0, type: 'element' }, true)).toBe(false);
});

test('edges with invalid relation are not valid', () => {
  expect(isValidEdge({ source: 0, target: 1, relation: 'quadruple' })).toBe(false);
});

test('example structure is valid in strict and unstrict mode', () => {
  expect(isValidStructure(exampleStructure)).toBe(true);
  expect(isValidStructure(exampleStructure, true)).toBe(true);
});
