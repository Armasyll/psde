class DoorController extends EntityController {
    constructor(_id, _avatar, _entity) {
        super (_id, _avatar, _entity);

        this.avatar = _avatar;
        this.entity = _entity;
        
        this.avatar.checkCollisions = true;

        this.entity.setDefaultAction("open");

        this.opensInward = false;
        this.avStartRot = this.avatar.rotation.clone();
        this.avEndRot = undefined;
        this.setOpensOutward();

        Game.doorControllers[this.id] = this;
    }
    getOpen() {
    	return this.avEndRot.equals(this.avatar.rotation);
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
        this.avatar.rotation = this.avEndRot;
        this.entity.setDefaultAction("close");
    }
    doClose() {
        this.avatar.rotation = this.avStartRot;
        this.entity.setDefaultAction("open");
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