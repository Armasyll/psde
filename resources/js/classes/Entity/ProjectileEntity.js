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
    /**
     * Creates a Projectile Entity
     * @param  {string}  id Unique ID
     * @param  {string}  name Name
     * @param  {string}  [description] Description
     * @param  {string}  [iconID] Image ID
     */
    constructor(id = "", name = "", description = "", iconID = "genericItemIcon") {
        super(id, name, description, iconID);
    }

    dispose() {
        return 0;
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