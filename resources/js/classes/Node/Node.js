class Node {
    /**
     * Creates a Node
     * @param {string} [id] Unique ID, auto-generated if none given
     * @param {BABYLON.Vector3} position Position
     * @param {number} [weight] Weight
     */
    constructor(id = "", position, weight = 20) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        this.id = id;
        this.position = BABYLON.Vector3.Zero();
        this.weight = 20;
        this.setPosition(position);
        this.setWeight(weight);
        Node.set(this.id, this);
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
     * @param {number} number 
     */
    setWeight(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 20;}
        else {number = number|0}
        this.weight = number;
        return this;
    }
    /**
     * 
     * @returns {number}
     */
    getWeight() {
        return this.weight;
    }
    distance(abstractNode) {
        return BABYLON.Vector3.Distance(this.position, abstractNode.position);
    }
    dispose() {
        this.position.dispose();
        Node.remove(this.id);
        return undefined;
    }

    static initialize() {
        Node.nodeList = {};
    }
    static get(id) {
        if (Node.has(id)) {
            return Node.nodeList[id];
        }
        return 1;
    }
    static has(id) {
        return Node.nodeList.hasOwnProperty(id);
    }
    static set(id, abstractNode) {
        Node.nodeList[id] = abstractNode;
        return 0;
    }
    static remove(id) {
        delete Node.nodeList[id];
        return 0;
    }
    static clear() {
        for (let i in Node.nodeList) {
            Node.nodeList[i].dispose();
        }
        Node.nodeList = {};
        return 0;
    }
}
Node.initialize();