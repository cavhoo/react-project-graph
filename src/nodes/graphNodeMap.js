class GraphNodeMap {
    constructor() {
        /**
         * @type {number}
         */
        this.index = 0;
        /**
         * @type {GraphNode | null}
         */
        this.nextElement = null;
        /**
         * @type {GraphNode | null}
         */
        this.prevElement = null;
        /**
         * @type {GraphNode[]}
         */
        this.map = [];
        this.keys = [];
    }

    /**
     * Returns the number of nodes inside the map
     * @returns {number}
     */
    count() {
        return this.map.length;
    }

    /**
     * Returns true if the Node already exists inside the map
     * @param {string} nodeName
     */
    exists(nodeName) {
        let found = false;
        for (let i = 0; i < this.map.length; i++) {
            const n = this.map[i];
            if (n.nodename === nodeName) found = true;
        }
        return found;
    }

    /**
     * 
     * @param {string} nodename
     * @returns {GraphNode}
     */
    getNodeByName(nodename) {
        return this.map.find( node => node.nodename === nodename);
    }

    /**
     * Adds a node to the map if it's not already there, otherwise nothing happens
     * @param {GraphNode} node
     * @param {string | null} key
     */
    addNode(node, key= null) {
        if (!this.exists(node)) {
            this.map.push(node);
            if (key) {
                this.keys.push(key);
            }
        }
    }

    /**
     * Returns true if the map has another element to return based on the current index
     * @returns {boolean}
     */
    hasNext() {
        return !!this.map[this.index + 1];
    }

    /**
     * Returns true if the map has a previous element based on the current index
     * @returns {boolean}
     */
    hasPrevious() {
        return !!this.map[this.index - 1];
    }

    /**
     * Gets the next node from the map, if there is none it will return null
     * @returns {GraphNode|null}
     */
    getNext() {
        if (this.hasNext()) {
            this.prevElement = this.map[this.index];
            this.index = this.index + 1;
            this.nextElement = this.map[this.index];
            return this.nextElement;
        } else {
            return null;
        }
    }

    /**
     * Gets the previous node from the map, if there is none it will return null
     * @returns {GraphNode|null}
     */
    getPrev() {
        if (this.hasPrevious()) {
            this.nextElement = this.map[this.index];
            this.index = this.index - 1;
            this.prevElement = this.map[this.index];
            return this.prevElement;    
        } else {
            return null;
        }
    }
}

module.exports.GraphNodeMap = GraphNodeMap;