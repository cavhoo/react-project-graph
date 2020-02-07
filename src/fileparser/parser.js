
const importRegEx = new RegExp(/(?:import[\s*as{}]+)(?=\b)([A-z,]+)/);
const importPathRegEx = new RegExp(/((?:from[\s'"]+)|(?:require[\('"]+))([\.A-z/@]+)/);
const classRegExp = new RegExp(/(?:class[\s]+)([A-z]+)/, 'g');

const exportRegEx = new RegExp(/(?:export)/);
/**
 * @param {string} fileContents
 * @returns {string[]}
 */
export const importParser = (fileContents) => {
    const lines =  fileContents.split(/\r|\n/g);
    
    return lines.map( line => importRegEx(line));
};

/**
 * 
 * @param {string} fileContents
 * @returns {string[]}
 */
export const exportParser = (fileContents) => {
    return exportRegEx.exec(fileContents);
};