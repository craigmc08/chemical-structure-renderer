# chemical-structure-renderer
Render graph-based chemical structures with svg.

## Usage
### with webpack and npm
First install the package
```sh
npm i -S chemical-structure-renderer
```
Then you can just include it where you need it.
```js
import { structureToTemplateString } from 'chemical-structure-renderer';

const svg = structureToTemplateString(someStructureGraph)
// Add the svg into your html
```
For use with react, I'm planning to make a package that exposes a component you can pass the graph into. I'll add a link here when it's in-progress.

## Graph Structure
The chemical structures are stored as json graphs (following [json-graph-specification](https://github.com/jsongraph/json-graph-specification)). See an example graph for methane (CH<sub>4</sub>) [here](./example-structure.json). There are a couple additional requirements.
##### Graph
`directed` should always be `true`. If not present, it will be assumed to be true.
##### Node
`metadata.type` should be defined, and should be a string with a value of either "element" or "lonepair"
##### Edge
`relation` should be "single", "double", or "triple"

*Note: resonant structures are a planned future feature*
