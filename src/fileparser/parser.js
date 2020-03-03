const { traverseFileContent } = require('./traverse');

const importPathRegEx = new RegExp(/([A-z\-\.]+)(?:['";\n\r]+)$/);
const exportRegEx = new RegExp(/(?:export[\sclass|const|interface|default]+)([A-z0-9_]+)/);
/**
 * @method importParser
 * @param {string} fileContents
 * @returns {ImportRef[]}
 */
const importParser = (fileContents) => {
    const lines =  fileContents.split(/\r|\n/g);
    const imports = [];
    traverseFileContent(fileContents, imports);
    return imports;
};

/**
 * 
 * @param {string} fileContents
 * @returns {string[]}
 */
const exportParser = (fileContents) => {
    const lines =  fileContents.split(/\r|\n/g);
    const exportmap = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.indexOf('export') < 0) continue;
        const matches = exportRegEx.exec(line);

        if (matches && matches.length > 1) {
            exportmap.push(matches[1]);
        }
    }
    return exportmap;
};

exports.importParser = importParser;
exports.exportParser = exportParser;