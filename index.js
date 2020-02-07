import {NodeMap} from "./src/nodes/nodeMap";
import {exportParser, importParser} from "./src/fileparser/parser";
import {GraphNode} from "./src/nodes/node";

const fs = require('fs');
const path = require('path');

const readline = require('readline');
const program = require('commander');

let dotstring = '';

const mappedNodes =  new NodeMap();

const parseContent = (path) => {
  const dirContent = fs.readdirSync(path);
  
  dirContent.forEach( content => {
      const isDir = fs.statSync(content).isDirectory();
      if (isDir) {
          parseContent(`${path}/${content}`);
      } else {
          const fileContent = fs.readFileSync(content).toString();
          const imps = importParser(fileContent);
          const exports = exportParser(fileContent);
          
          imps.forEach( imp => {
             if (!mappedNodes.exists(imp)) {
                 const node = new GraphNode(imp);
                 node.addImportedBy(exports);
                 mappedNodes.addNode(node);
             } else {
                 const node = mappedNodes.getNodeByName(imp);
                 node.addImportedBy(exports);
             }
          });
          
      }
  });
};


program
    .version('0.0.1')
    .option('-p --path <path>', 'Path to React Project that should be mapped out')
    .option('-v --verbose', 'Verbose option for extra loggin sugarz')

const main = () => {
    program.parse(process.argv);
    try {
        parseContent(program.path);
        
        while(mappedNodes.hasNext()) {
            const node = mappedNodes.getNext();
            dotstring += node.getDotString();
        }
        
        dotstring = dotstring.replace(/,/g,'');
        fs.writeFileSync('dotstring.txt', `dninetwork {${dotstring}}`);
    } catch (e) {
        console.error(e);
    }
};

main();