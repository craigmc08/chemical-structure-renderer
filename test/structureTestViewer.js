import structureToSvg from './structureToSvg';
import exampleStructure from '../example-structure.json';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';

const outputFile = path.join(__dirname, 'test.html');
const svg = structureToSvg(exampleStructure);
fs.writeFileSync(outputFile, svg);
exec(`${outputFile}`);
