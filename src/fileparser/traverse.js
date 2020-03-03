const {  } = require('@typescript-eslint/parser');
const { parse, TSESTreeOptions, TSESTree, AST_NODE_TYPES } = require('@typescript-eslint/typescript-estree');
const { traverse } = require('eslint/lib/shared/traverser');

const importPathRegEx = new RegExp(/([A-z\-\.]+)(?:['";\n\r]+)/);

/**
 * @typedef {Object} ImportRef
 * @property {string} from
 * @property {string[]} modules
 */

/**
 * 
 * @param {string} filecontent
 * @param {ImportRef[]} importmap
 */
const traverseFileContent = (filecontent, importmap) => {
    try {
        const code = parse(filecontent, {comment: false, jsx: true});
        traverse( code, {
            enter(node) {
                switch( node.type) {
                    case AST_NODE_TYPES.ImportDeclaration:
                        const importSource = importPathRegEx.exec(node.source.raw);
                        if (importSource && importSource.length > 1) {
                            const underscored = importSource[1].replace(/[-.]/g, '_');
                            const modules = node.specifiers.map( 
                              imp => imp.local.name
                            );
                            const importedRef = {
                                from: underscored,
                                modules
                            };
                            
                            importmap.push(importedRef);
                        }
                        break;
                }
            }
        });
    } catch (e) {
        console.log(e);
    }
};

exports.traverseFileContent = traverseFileContent;