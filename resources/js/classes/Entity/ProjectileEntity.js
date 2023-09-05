/**
 * PhysicsProjectile
 * @class
 * @typedef {Object} PhysicsProjectile
 * @property {BABYLON.AbstractMesh} mesh
 * @property {BABYLON.Vector3} position
 * @property {BABYLON.Vector3} rotation
 * @property {number} force
 * @property {number} mass
 */
class ProjectileEntity extends ItemEntity {
    constructor(mesh, position, rotation, force = 1.0, mass = 0.25) {
        this.id = Tools.genUUIDv4();
        this.mesh = mesh;
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

        ProjectileEntity.set(this.id, this);
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

    dispose() {
        this.mesh.dispose();
        
    }

    static initialize() {
        ProjectileEntity.projectileList = {};
    }
    static get(id) {
        if (ProjectileEntity.has(id)) {
            return ProjectileEntity.projectileList[id];
        }
        return 1;
    }
    static has(id) {
        return ProjectileEntity.projectileList.hasOwnProperty(id);
    }
    static set(id, physicsProjectile) {
        ProjectileEntity.projectileList[id] = physicsProjectile;
        return 0;
    }
    static remove(id) {
        delete ProjectileEntity.projectileList[id];
        return 0;
    }
    static list() {
        return ProjectileEntity.projectileList;
    }
    static clear() {
        for (let i in ProjectileEntity.projectileList) {
            ProjectileEntity.projectileList[i].dispose();
        }
        ProjectileEntity.projectileList = {};
        return 0;
    }
}
ProjectileEntity.initialize();