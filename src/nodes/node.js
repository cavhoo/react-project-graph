export class GraphNode {
    /**
     * @param {string} nodename
     */
    constructor(nodename) {
        this.nodename = nodename;
        this.importedBy = [];
    }

    /**
     * 
     * @param {string} nodename
     */
    addImportedBy(...nodes) {
        nodes.forEach( node => {
            if (this.importedBy.indexOf(node) < 0) {
                this.importedBy.push(node);
            }
        })
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
        return `${this.nodename}<-{${this.importedBy.join(',')}}`;
        
        //return this.importedBy.reduce( (acc, nodename, idx) => acc += `${nodename}->${this.nodename};`, "");
    }
}