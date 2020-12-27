/**
 * PhysicsProjectile
 * @class
 * @typedef {Object} PhysicsProjectile
 * @property {BABYLON.AbstractMesh} mesh
 * @property {BABYLON.Vector3} position
 * @property {BABYLON.Vector3} direction
 * @property {number} force
 * @property {number} mass
 */
class Projectile {
    constructor(mesh, position, direction, force = 80.0, mass = 0.25) {
        this.id = Tools.genUUIDv4();
        this.mesh = mesh;
        this.startingPosition = position;
        this.direction = direction;
        this.startingForce = force;
        this.mass = mass;
        this.currentStep = 0;
        this.collisionCount = 0;
        this.haltAfterNthCollision = 1;
        this.velocity = new BABYLON.Vector3(-Math.sin(direction.y), 0, Math.cos(direction.y));

        Projectile.set(this.id, this);
    }

    stepForward(dt) {
        this.mesh.position.addInPlace(this.velocity);
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