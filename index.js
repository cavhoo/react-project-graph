
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const program = require('commander');

const { importParser, exportParser } = require('./src/fileparser/parser');
const {GraphNodeMap} = require('./src/nodes/graphNodeMap');
const {GraphNode} = require('./src/nodes/graphNode');

const mappedNodes =  new GraphNodeMap();


let dotstring = '';
const parseContent = (path) => {
  const dirContent = fs.readdirSync(path);
  
  dirContent.forEach( content => {
      const isDir = fs.statSync(`${path}/${content}`).isDirectory();
      if (isDir) {
          parseContent(`${path}/${content}`);
      } else {
          if (/(js|ts)/.test(content)) {
              console.log("Parsing: ", content);
              const fileContent = fs.readFileSync(`${path}/${content}`).toString();
              const imps = importParser(fileContent);
              const exports = exportParser(fileContent);
              
              imps.forEach( imp => {
                 if (!mappedNodes.exists(imp)) {
                     const node = new GraphNode(imp);
                     node.addImportedBy(...exports);
                     mappedNodes.addNode(node);
                 } else {
                     const node = mappedNodes.getNodeByName(imp);
                     node.addImportedBy(...exports);
                 }
              });
          }
      }
  });
};


program
    .version('0.0.1')
    .option('-p --path <path>', 'Path to React Project that should be mapped out')
    .option('-o --out <out>', 'Output file to save the DOT valid string to')
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
        
        const outFile = program.out;
        
        fs.writeFileSync(outFile, `dinetwork {${dotstring}}`);
    } catch (e) {
        console.error(e);
    }
};

main();