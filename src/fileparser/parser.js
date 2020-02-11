
const importRegEx = new RegExp(/(?:import[\s*as{}]+)(?=\b)([A-z,]+)/);
const importPathRegEx = new RegExp(/([A-z\-\.]+)(?:['";\n\r]+)$/);//new RegExp(/(?:(?:(?:[\s'"\.\/@A-z]*)\/)|(?:(from[\s'"\./@]+)))([\.A-z@/]+)/);
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
        if (!/from|require/.test(line)) continue;
        
        const matches = importPathRegEx.exec(line);
        
        if (matches && matches.length > 1) {
            const underscored = matches[1].replace(/-/g, '_');
            imports.push(underscored);
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