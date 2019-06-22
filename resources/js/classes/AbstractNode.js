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
    }
    setPosition(position) {
        if (position instanceof BABYLON.Vector3) {
            this.position.copyFrom(position);
        }
        return this;
    }
    getPosition() {
        return this.position;
    }
    setWeight(weight) {
        weight = Number.parseInt(weight);
        if (!isNaN(weight) || weight > 0) {
            this.weight = weight | 0;
        }
        return this;
    }
    getWeight() {
        return this.weight;
    }
    addNode(abstractNode, updateChild = true) {
        if (abstractNode instanceof AbstractNode) {
            this.connectedNodes.add(abstractNode);
            if (updateChild) {
                abstractNode.connect(this, false);
            }
        }
        return this;
    }
    addNodes(abstractNodeArray, updateChildren = true) {
        if (Symbol.iterator in Object(abstractNodeArray)) {
            abstractNodeArray.forEach(function(abstractNode) {
                if (abstractNode instanceof AbstractNode) {
                    this.addNode(abstractNode, updateChildren);
                }
            });
        }
        return this;
    }
    connect(abstractNode, updateChild = true) {
        return this.addNode(abstractNode, updateChild);
    }
    deleteNode(abstractNode, updateChild = true) {
        if (abstractNode instanceof AbstractNode) {
            this.connectedNodes.delete(abstractNode);
            if (updateChild) {
                abstractNode.deleteNode(this, false);
            }
        }
        return this;
    }
    deleteNodes(abstractNodeArray, updateChildren = true) {
        if (Symbol.iterator in Object(abstractNodeArray)) {
            abstractNodeArray.forEach(function(abstractNode) {
                if (abstractNode instanceof AbstractNode) {
                    this.deleteNode(abstractNode, updateChildren);
                }
            });
        }
        return this;
    }
    disconnect(abstractNode, updateChild = true) {
        return this.deleteNode(abstractNode, updateChild);
    }
    hasNode(abstractNode) {
        return this.connectedNodes.has(abstractNode);
    }
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
    calculatePathTo(otherNode) { // TODO: this :u ughhh
    }
}