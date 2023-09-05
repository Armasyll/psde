/**
 * Projectile Controller
 */
class ProjectileController extends ItemController {
    /**
     * Creates a Spell Controller
     * @param {string} id 
     * @param {BABYLON.AbstractMesh} aMeshes 
     * @param {object} entityObject 
     */
    constructor(id = "", aMeshes = [], entityObject = {}, position, rotation, scaling, force, mass) {
        super(id, aMeshes, entityObject);
        if (!this.hasMesh()) {
            return undefined;
        }
        this.bHasRunPostConstructProjectile = false;
        this.mesh.position.copyFrom(position);
        this.mesh.rotation.copyFrom(rotation);
        this.startingPosition = position;
        this.startingRotation = rotation;
        this.startingForce = force;
        this.mass = mass;
        this.currentStep = 0;
        this.collisionCount = 0;
        this.haltAfterNthCollision = 1;
        this.grounded = false;
        this.falling = true;
        this.intendedMovement = BABYLON.Vector3.Zero();
        this.ray = new BABYLON.Ray(this.mesh.position, BABYLON.Vector3.Forward(), 0.25);
        /*this.rayHelper = new BABYLON.RayHelper(this.ray);
        this.rayHelper.show(Game.scene);*/
        this.hit = null;

        ProjectileController.set(this.id, this);
        this.postConstruct();
    }
    postConstruct() {
        if (this.bHasRunPostConstructProjectile) {
            return 0;
        }
        super.postConstruct();
        this.bHasRunPostConstructProjectile = true;
        return 0;
    }

    moveAV() {
        this.doMove();
    }
    doMove() {
        if (this.currentStep > 1023) {
            this.falling = false;
        }
        if (!this.falling) {
            return 0;
        }
        let dt = Game.engine.getDeltaTime() / 1000;
        this.intendedMovement = this.mesh.calcMovePOV(0, 0, this.startingForce * dt);
        this.mesh.position.addInPlace(this.intendedMovement);
        this.ray.origin = this.mesh.position;
        this.ray.direction = this.mesh.forward.negate();
        if (this.currentStep > 6) {
            let hit = Game.scene.pickWithRay(this.ray, (pickedMesh) => {
                if (pickedMesh.hasController()) {
                    return true;
                }
            });
            if (hit.hit) {
                this.falling = false;
                this.hit = hit;
                this.mesh.setParent(hit.pickedMesh);
                return 0;
            }
        }
        this.currentStep++;
        return 0;
    }

    updateID(newID) {
        super.updateID(newID);
        ProjectileController.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        ProjectileController.remove(this.id);
        super.dispose();
        return null;
    }
    getClassName() {
        return "ProjectileController";
    }

    static initialize() {
        ProjectileController.ProjectileControllerList = {};
    }
    static get(id) {
        if (ProjectileController.has(id)) {
            return ProjectileController.ProjectileControllerList[id];
        }
        return 1;
    }
    static has(id) {
        return ProjectileController.ProjectileControllerList.hasOwnProperty(id);
    }
    static set(id, ProjectileController) {
        ProjectileController.ProjectileControllerList[id] = ProjectileController;
        return 0;
    }
    static remove(id) {
        delete ProjectileController.ProjectileControllerList[id];
        return 0;
    }
    static list() {
        return ProjectileController.ProjectileControllerList;
    }
    static clear() {
        for (let i in ProjectileController.ProjectileControllerList) {
            ProjectileController.ProjectileControllerList[i].dispose();
        }
        ProjectileController.ProjectileControllerList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!ProjectileController.has(oldID)) {
            return 1;
        }
        ProjectileController.set(newID, ProjectileController.get(oldID));
        ProjectileController.remove(oldID);
        return 0;
    }
}
ProjectileController.initialize();