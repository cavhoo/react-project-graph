const fs = require('fs');
const program = require('commander');

const {importParser, exportParser} = require('./src/fileparser/parser');
const {GraphNodeMap} = require('./src/nodes/graphNodeMap');
const {GraphNode} = require('./src/nodes/graphNode');
const {occurences} = require('./src/utils/occurences');
const mappedNodes = new GraphNodeMap();

const parseContent = (path) => {
  const dirContent = fs.readdirSync(path);

  dirContent.forEach(content => {
    const isDir = fs.statSync(`${path}/${content}`).isDirectory();
    if (isDir) {
      parseContent(`${path}/${content}`);
    } else {
      if (!/(index|test|d)\./.test(content) && /\.(js|ts)/.test(content)) {
        //console.log("Parsing: ", `${path}/${content}`);
        const fileContent = fs.readFileSync(`${path}/${content}`).toString();
        const imps = importParser(fileContent);
        const exports = exportParser(fileContent);
        const escapedFilename = content.replace(/[.-]+/g, '_' );
        imps.forEach(imp => {
          const hasUnusedImports = imp.modules.some( mod => occurences(fileContent, mod, false) === 1);
          if (!mappedNodes.exists(imp.from)) {
            const node = new GraphNode(imp.from);
            node.addImportedBy(...[{nodename: escapedFilename, used: !hasUnusedImports}]);
            mappedNodes.addNode(node);
          } else {
            const node = mappedNodes.getNodeByName(imp.from);
            node.addImportedBy(...[{nodename: escapedFilename, used: !hasUnusedImports}]);
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
  let dotstring = '';
  program.parse(process.argv);
  try {
    parseContent(program.path);

    while (mappedNodes.hasNext()) {
      const node = mappedNodes.getNext();
      dotstring += node.getDotString();
    }

    dotstring = dotstring.replace(/,/g, '');

    const outFile = process.cwd() + '/' + program.out;
    console.log("Writing DOT String => ", outFile);
    fs.writeFileSync(outFile, `digraph {${dotstring}}`);
  } catch (e) {
    console.error(e);
  }
};

main();