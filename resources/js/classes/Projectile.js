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
    constructor(mesh, position, rotation, force = 80.0, mass = 0.25) {
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

        Projectile.set(this.id, this);
    }

    doMove() {
        let dt = Game.engine.getDeltaTime() / 1000;
        this.mesh.movePOV(0, 0, this.startingForce * dt);
        this.currentStep++;
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