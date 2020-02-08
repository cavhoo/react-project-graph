
const importRegEx = new RegExp(/(?:import[\s*as{}]+)(?=\b)([A-z,]+)/);
const importPathRegEx = new RegExp(/((?:from[\s'"]+)|(?:require[\('"]+))([\.A-z/@]+)/);
const classRegExp = new RegExp(/(?:class[\s]+)([A-z]+)/, 'g');

const exportRegEx = new RegExp(/(?:export[\sclass|const|interface|default]+)([A-z0-9_]+)/);
/**
 * @param {string} fileContents
 * @returns {string[]}
 */
const importParser = (fileContents) => {
    const lines =  fileContents.split(/\r|\n/g);
    const imports = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.indexOf('import') < 0) continue;
        
        const matches = importRegEx.exec(line);
        
        if (matches && matches.length > 1) {
            imports.push(matches[1]);
        }
    }
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