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
class PhysicsProjectile {
    constructor(mesh, position, direction, force = 80.0, mass = 0.25) {
        this.id = Tools.genUUIDv4();
        this.mesh = mesh;
        this.position = position;
        this.direction = direction;
        this.force = force;
        this.mass = mass;
        this.currentTick = 0;
        this.collisionCount = 0;
        this.haltAfterNthCollision = 1;

        PhysicsProjectile.set(this.id, this);
    }

    tick(dt) {
        
    }

    dispose() {
        this.mesh.dispose();
        
    }

    static initialize() {
        PhysicsProjectile.physicsProjectileList = {};
    }
    static get(id) {
        if (PhysicsProjectile.has(id)) {
            return PhysicsProjectile.physicsProjectileList[id];
        }
        return 1;
    }
    static has(id) {
        return PhysicsProjectile.physicsProjectileList.hasOwnProperty(id);
    }
    static set(id, physicsProjectile) {
        PhysicsProjectile.physicsProjectileList[id] = physicsProjectile;
        return 0;
    }
    static remove(id) {
        delete PhysicsProjectile.physicsProjectileList[id];
        return 0;
    }
    static list() {
        return PhysicsProjectile.physicsProjectileList;
    }
    static clear() {
        for (let i in PhysicsProjectile.physicsProjectileList) {
            PhysicsProjectile.physicsProjectileList[i].dispose();
        }
        PhysicsProjectile.physicsProjectileList = {};
        return 0;
    }
}
PhysicsProjectile.initialize();