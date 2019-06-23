class AbstractNode {
    /**
     * Creates an AbstractNode
     * @param {string} [id] Unique ID, auto-generated if none given
     * @param {BABYLON.Vector3} position Position
     * @param {number} [weight] Weight
     * @param {Set<AbstractNode>} [connectedNode] Connected nodes
     */
    constructor(id = "", position, weight = 20, connectedNodes = []) {
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
        this.connect(connectedNodes);
        Game.setAbstractNode(this.id, this);
    }
    getID() {
        return this.id;
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
            }, this);
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
        else if (abstractNode instanceof AbstractNode) {
            return this.addNode(abstractNode, updateChild);
        }
        return this;
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
            }, this);
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
        else if (abstractNode instanceof AbstractNode) {
            return this.deleteNode(abstractNode, updateChild);
        }
        return this;
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
    distance(abstractNode) {
        return BABYLON.Vector3.Distance(this.position, abstractNode.position);
    }
    dispose() {
        this.connectedNodes.forEach(function(abstractNode) {
            abstractNode.deleteNode(this, false);
        }, this);
        this.connectedNodes.clear();
        this.position.dispose();
        return undefined;
    }
    aStar(endNode) {
        let startNode = this;
        let openList = [startNode];
        let currentNode = openList[0];
        let closedList = [];
        let childParentDistance = new Map();
        let nodeHList = new Map();
        let nodeGList = new Map();
        let nodeFList = new Map();
        while (openList.length > 0) {
            currentNode = (() => {
                let lowInd = 0;
                let lowIndCost = openList[lowInd].distance(startNode) + (nodeHList.get(openList[lowInd]) || 0);
                for (let i = 1; i < openList.length; i++) {
                    let lowF = openList[lowInd].distance(startNode) + (nodeHList.get(openList[lowInd]) || 0);
                    let iF = openList[i].distance(startNode) + (nodeHList.get(openList[i]) || 0);
                    if (iF < lowF) {
                        lowInd = i;
                        lowIndCost = iF;
                    }
                }
                return openList[lowInd];
            })();
            if (currentNode == endNode) {
                let path = [];
                while (currentNode != startNode) {
                    path.push(currentNode);
                    currentNode = childParentDistance.get(currentNode)[0];
                }
                path.push(startNode);
                return path.reverse();
            }
            closedList.push(currentNode);
            openList.splice(openList.indexOf(currentNode), 1);
            currentNode.connectedNodes.forEach(function(neighbor) {
                if(!closedList.contains(neighbor)) {
                    let gScore = currentNode.distance(startNode) + 1;
                    let gScoreIsBest = false;
                    if(!openList.contains(neighbor)) {
                        gScoreIsBest = true;
                        nodeHList.set(neighbor, neighbor.distance(endNode));
                        openList.push(neighbor);
                    }
                    else if(gScore < neighbor.distance(startNode)) {
                        gScoreIsBest = true;
                    }
                    if(gScoreIsBest) {
                        childParentDistance.set(neighbor, [currentNode, neighbor.distance(currentNode)]);
                        nodeGList.set(neighbor, neighbor.distance(startNode));
                        nodeFList.set(neighbor, neighbor.distance(startNode) + neighbor.distance(endNode));
                    }
                }
            }, this);
        }
    }
}
__checkAbstractNode = function() {
    let a = new AbstractNode("a", BABYLON.Vector3.Zero(), 20);
    let b1 = new AbstractNode("b1", new BABYLON.Vector3(10, 7, 2), 20);
    let b2 = new AbstractNode("b2", new BABYLON.Vector3(10, 13, 2), 20);
    let c1 = new AbstractNode("c1", new BABYLON.Vector3(15, 4, 4), 20);
    let c2 = new AbstractNode("c2", new BABYLON.Vector3(15, 10, 4), 20);
    let c3 = new AbstractNode("c3", new BABYLON.Vector3(15, 16, 4), 20);
    let d = new AbstractNode("d", new BABYLON.Vector3(20, 10, 6), 20);
    a.connect([b1, b2]);
    b1.connect([c1, c2]);
    b2.connect([c1, c3]);
    c2.connect(d);
    console.log(a.aStar(d));
}