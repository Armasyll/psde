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
class Projectile {
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

        Projectile.set(this.id, this);
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
        if (this.currentStep > 30) {
            let hit = Game.scene.pickWithRay(this.ray, (pickedMesh) => {
                if (pickedMesh.hasController()) {
                    return true;
                }
            });
            if (hit.hit) {
                this.falling = false;
                this.hit = hit;
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
        Projectile.projectileList = {};
    }
    static get(id) {
        if (Projectile.has(id)) {
            return Projectile.projectileList[id];
        }
        return 1;
    }
    static has(id) {
        return Projectile.projectileList.hasOwnProperty(id);
    }
    static set(id, physicsProjectile) {
        Projectile.projectileList[id] = physicsProjectile;
        return 0;
    }
    static remove(id) {
        delete Projectile.projectileList[id];
        return 0;
    }
    static list() {
        return Projectile.projectileList;
    }
    static clear() {
        for (let i in Projectile.projectileList) {
            Projectile.projectileList[i].dispose();
        }
        Projectile.projectileList = {};
        return 0;
    }
}
Projectile.initialize();