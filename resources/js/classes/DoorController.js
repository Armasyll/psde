class DoorController extends EntityController {
    constructor(_id, _mesh, _entity) {
        super (_id, _mesh, _entity);

        this.mesh = _mesh;
        this.entity = _entity;
        
        this.mesh.checkCollisions = true;

        this.entity.setDefaultAction(ActionEnum.OPEN);

        this.opensInward = false;
        this.avStartRot = this.mesh.rotation.clone();
        this.avEndRot = undefined;
        this.setOpensOutward();

        Game.doorControllers[this.id] = this;
    }
    getOpen() {
    	return this.avEndRot.equals(this.mesh.rotation);
    }
    setOpensOutward() {
        this.opensInward = false;
        this.avEndRot = this.avStartRot.add(new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), 0));
    }
    setOpensInward() {
    	this.opensInward = true;
        this.avEndRot = this.avStartRot.subtract(new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), 0));
    }
    doOpen() {
        this.mesh.rotation = this.avEndRot;
        this.entity.setDefaultAction(ActionEnum.CLOSE);
    }
    doClose() {
        this.mesh.rotation = this.avStartRot;
        this.entity.setDefaultAction(ActionEnum.OPEN);
    }
    dispose() {
        delete Game.doorControllers[this.id];
        super.dispose();
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}