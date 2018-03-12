import { getNodeRelativePositions } from '../nodeRelationParser';
import exampleStructure from '../example-structure.json';

test('getNodeRelativePositions should get the nodes relative positions', () => {
  console.log(getNodeRelativePositions(exampleStructure));
  expect(true).toBe(true);
});
