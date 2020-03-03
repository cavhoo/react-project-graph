/**
 * @typedef {Object} import
 * @property {string} nodename
 * @property {boolean} used
 */

class GraphNode {
    /**
     * @param {string} nodename
     */
    constructor(nodename) {
        this.nodename = nodename;
        /**
         * @type {import[]}
         */
        this.importedBy = [];
    }

    /**
     * 
     * @param {import} nodes
     */
    addImportedBy(...nodes) {
        nodes.forEach( node => {
            if (this.importedBy.indexOf(node) < 0) {
                this.importedBy.push(node);
            }
        });
    }

    
    /**
     * @param {string} nodename
     */
    removeImportedBy(nodename) {
        const index = this.importedBy.findIndex( imp => imp.nodename === nodename);
        if (index > 0) {
            this.importedBy.splice(index, 1);
        }
    }
    
    getDotString() {
        let dotstring = '';

        this.importedBy.forEach( imp => {
            const edgeColor = imp.used ? 'edge [color=black]' : 'edge [color=red]'; 
            const str = `${edgeColor};${imp.nodename}->${this.nodename};\n`;
            dotstring += str;
        });
        return dotstring;
    }
}

module.exports.GraphNode = GraphNode;