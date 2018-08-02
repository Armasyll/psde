class DoorController extends EntityController {
    constructor(_id, _avatar, _entity) {
        super (_id, _avatar, _entity);

        this.setDefaultAction("open");

        this.open = false;
        this.move = true;
        this._opened = false;
        this._opening = false;
        this._closing = false;
        this.opensInward = true;
        this.avStartRot = this.avatar.rotation.clone();
        this.avEndRot = this.avStartRot.add(new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), 0));

        Game.doorControllers[this.id] = this;
    }
    setOpen(_open) {
    	this.open = _open == true;
    	this.move = true;
    }
    getOpen() {
    	return this.open;
    }
    setOpensInward(_opensInward) {
    	this.opensInward = _opensInward == true;
    	if (this.opensInward) {
    		this.avEndRot.y = Math.abs(this.avEndRot.y);
    	}
    	else {
        	this.avEndRot.y = -Math.abs(this.avEndRot.y);
        }
    }
    getOpensInward() {
    	return this.opensInward;
    }
    moveAV() {
        if (!(this.avatar instanceof BABYLON.Mesh) && !(this.avatar instanceof BABYLON.InstancedMesh)) {
            return undefined;
        }
        if (!this.move) {
        	return;
        }
    	if (this.open) {
    		if (this.avatar.rotation.equals(this.avEndRot)) {
        		this.setDefaultAction("close");
    			this.move = false;
    			return;
    		}
    		this.doOpen();
    	}
    	else {
    		if (this.avatar.rotation.equals(this.avStartRot)) {
       			this.setDefaultAction("open");
    			this.move = false;
    			return;
    		}
    		this.doClose();
    	}
    }
    doOpen() {
    	this.avatar.rotation = this.avEndRot;
    }
    doClose() {
    	this.avatar.rotation = this.avStartRot;
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