class AreaNode extends AbstractNode {
    constructor(id, position = BABYLON.Vector3.Zero(), weight = 20, diameter = 0.5, height = 1.0, shape = "CUBE") {
        super(id, position, weight);
        this.mesh = Game.createAreaMesh(this.id, shape, diameter, height, this.position);
        this.possibleTargets = {};
        this.activeTargets = {};
        this.locked = false;
        AreaNode.set(this.id, this);
    }

    setPosition(position) {
        super.setPosition(position);
        if (this.mesh instanceof BABYLON.AbstractMesh) {
            this.mesh.position.copyFrom(this.position);
        }
        return 0;
    }

    addPossibleTarget(mesh) {
        if (this.locked) {
            return 1;
        }
        this.possibleTargets[mesh.id] = mesh;
        return 0;
    }
    removePossibleTarget(mesh) {
        delete this.possibleTargets[mesh.id];
        return 0;
    }
    hasPossibleTarget(mesh) {
        return this.possibleTargets.hasOwnProperty(mesh.id);
    }
    clearPossibleTargets() {
        for (let meshID in this.possibleTargets) {
            delete this.possibleTargets[meshID];
        }
        return 0;
    }

    addActiveTarget(mesh) {
        if (this.locked) {
            return 1;
        }
        this.activeTargetControllers[mesh.id] = mesh;
        return 0;
    }
    removeActiveTarget(mesh) {
        delete this.activeTargetControllers[mesh.id];
        return 0;
    }
    hasActiveTarget(mesh) {
        return this.activeTargets.hasOwnProperty(mesh.id);
    }
    clearActiveTargets() {
        for (let meshID in this.activeTargets) {
            delete this.activeTargets[meshID];
        }
        return 0;
    }

    dispose() {
        this.locked = true;
        this.clearPossibleTargets();
        this.clearActiveTargets();
        delete this.triggerFunction;
        Game.removeMesh(this.mesh);
        AbstractNode.remove(this.id);
        super.dispose();
        return undefined;
    }

    static initialize() {
        AreaNode.areaNodeList = {};
    }
    static get(id) {
        if (AreaNode.has(id)) {
            return AreaNode.areaNodeList[id];
        }
        return 1;
    }
    static has(id) {
        return AreaNode.areaNodeList.hasOwnProperty(id);
    }
    static set(id, abstractNode) {
        AreaNode.areaNodeList[id] = abstractNode;
        return 0;
    }
    static remove(id) {
        delete AreaNode.areaNodeList[id];
        return 0;
    }
    static list() {
        return AreaNode.areaNodeList;
    }
    static clear() {
        for (let i in AreaNode.areaNodeList) {
            AreaNode.areaNodeList[i].dispose();
        }
        AreaNode.areaNodeList = {};
        return 0;
    }
}
AreaNode.initialize();