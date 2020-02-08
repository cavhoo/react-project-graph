class GraphNode {
    /**
     * @param {string} nodename
     */
    constructor(nodename) {
        this.nodename = nodename;
        this.importedBy = [];
    }

    /**
     * 
     * @param {string} nodes
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
        const index = this.importedBy.indexOf(nodename);
        if (index > 0) {
            this.importedBy.splice(index, 1);
        }
    }
    
    getDotString() {
        let dotstring = '';

        this.importedBy.forEach( imp => {
           const str = `${imp}->${this.nodename};`;
           dotstring += str;
        });
        return dotstring;
        
        //return `{${this.importedBy.join(' ')}} -> ${this.nodename};`;
    }
}

module.exports.GraphNode = GraphNode;