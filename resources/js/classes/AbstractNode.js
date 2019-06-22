class AbstractNode {
    /**
     * Creates an AbstractNode
     * @param {string} [id] Unique ID, auto-generated if none given
     * @param {BABYLON.Vector3} position Position
     * @param {number} [weight] Weight
     * @param {Set<AbstractNode>} [connectedNode] Connected nodes
     */
    constructor(id = "", position, weight = 20, connectedNode = []) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        this.id = id;
        this.position = BABYLON.Vector3.Zero();
        this.setPosition(position);
        this.weight = 20;
        this.setWeight(weight);
        this.connectedNodes = new Set();
        this.addNodes(connectedNodes);
    }
    /**
     * 
     * @param {BABYLON.Vector3} position 
     */
    setPosition(position) {
        if (position instanceof BABYLON.Vector3) {
            this.position.copyFrom(position);
        }
        return this;
    }
    /**
     * 
     * @returns {BABYLON.Vector3}
     */
    getPosition() {
        return this.position;
    }
    /**
     * 
     * @param {number} weight 
     */
    setWeight(weight) {
        weight = Number.parseInt(weight);
        if (!isNaN(weight) || weight > 0) {
            this.weight = weight | 0;
        }
        return this;
    }
    /**
     * 
     * @returns {number}
     */
    getWeight() {
        return this.weight;
    }
    /**
     * 
     * @param {AbstractNode} abstractNode 
     * @param {boolean} updateChild 
     */
    addNode(abstractNode, updateChild = true) {
        if (abstractNode instanceof AbstractNode) {
            this.connectedNodes.add(abstractNode);
            if (updateChild) {
                abstractNode.connect(this, false);
            }
        }
        return this;
    }
    /**
     * 
     * @param {Set<AsbtractNode>} abstractNodes 
     * @param {boolean} updateChildren 
     */
    addNodes(abstractNodes, updateChildren = true) {
        if (Symbol.iterator in Object(abstractNodes)) {
            abstractNodes.forEach(function(abstractNode) {
                if (abstractNode instanceof AbstractNode) {
                    this.addNode(abstractNode, updateChildren);
                }
            });
        }
        return this;
    }
    /**
     * 
     * @param {any} abstractNode 
     * @param {boolean} updateChild 
     */
    connect(abstractNode, updateChild = true) {
        if (Symbol.iterator in Object(abstractNode)) {
            return this.addNodes(abstractNode, updateChild);
        }
        else {
            return this.addNode(abstractNode, updateChild);
        }
    }
    /**
     * 
     * @param {AbstractNode} abstractNode 
     * @param {boolean} updateChild 
     */
    deleteNode(abstractNode, updateChild = true) {
        if (abstractNode instanceof AbstractNode) {
            this.connectedNodes.delete(abstractNode);
            if (updateChild) {
                abstractNode.deleteNode(this, false);
            }
        }
        return this;
    }
    /**
     * 
     * @param {Set<AbstractNode>} abstractNodes 
     * @param {boolean} updateChildren 
     */
    deleteNodes(abstractNodes, updateChildren = true) {
        if (Symbol.iterator in Object(abstractNodes)) {
            abstractNodes.forEach(function(abstractNode) {
                if (abstractNode instanceof AbstractNode) {
                    this.deleteNode(abstractNode, updateChildren);
                }
            });
        }
        return this;
    }
    /**
     * 
     * @param {any} abstractNode 
     * @param {boolean} updateChild 
     */
    disconnect(abstractNode, updateChild = true) {
        if (Symbol.iterator in Object(abstractNode)) {
            return this.deleteNodes(abstractNode, updateChild);
        }
        else {
            return this.deleteNode(abstractNode, updateChild);
        }
    }
    /**
     * Returns whether or not this node is directly attached to the passed node.
     * @param {AbstractNode} abstractNode 
     */
    hasNode(abstractNode) {
        return this.connectedNodes.has(abstractNode);
    }
    /**
     * Returns whether or not this node is directly attached to the passed node.
     * @param {AbstractNode} abstractNode 
     */
    connectedTo(abstractNode) {
        return this.hasNode(abstractNode);
    }
    dispose() {
        this.connectedNodes.forEach(function(abstractNode) {
            abstractNode.deleteNode(this, false);
        });
        this.connectedNodes.clear();
        this.position.dispose();
        return undefined;
    }
}