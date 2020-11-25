/**
 * Entity
 * @class
 * @typedef {Object} Entity
 * @extends AbstractEntity
 * @property {EntityEnum} entityType
 * @property {number} weight
 * @property {number} weightModifier
 * @property {number} price
 * @property {number} priceModifier
 * @property {string} meshID
 * @property {Array} meshStages
 * @property {number} currentMeshStage
 * @property {string} textureID
 * @property {Array} textureStages
 * @property {number} currentTextureStage
 * @property {string} materialID
 * @property {Array} materialStages
 * @property {number} currentMaterialStage
 * @property {Object} instances
 */
class Entity extends AbstractEntity {
    /**
     * Creates an Entity
     * @param  {string}  id Unique ID
     * @param  {string}  name Name
     * @param  {string}  [description] Description
     * @param  {string}  [iconID] Icon ID
     * @param  {EntityEnum}  entityType EntityEnum
     */
    constructor(id = "", name = "", description = "", iconID = "genericItem", entityType = EntityEnum.ENTITY) {
        super(id, name, description, iconID);
        /** @type {EntityEnum} */
        this.entityType = entityType;
        /** @type {number} */
        this.weight = 0;
        /** @type {number} */
        this.weightModifier = 0;
        /** @type {number} */
        this.price = 0;
        /** @type {number} */
        this.priceModifier = 0;
        /** @type {string} */
        this.meshID = "missingMesh";
        /** @type {Array} */
        this.meshStages = [];
        /** @type {number} */
        this.currentMeshStage = 0;
        /** @type {string} */
        this.textureID = "missingTexture";
        /** @type {Array} */
        this.textureStages = [];
        /** @type {number} */
        this.currentTextureStage = 0;
        /** @type {string} */
        this.materialID = "missingMaterial";
        /** @type {Array} */
        this.materialStages = [];
        /** @type {number} */
        this.currentMaterialStage = 0;
        /** @type {Object} */
        this.instances = {};

        this.addAvailableAction(ActionEnum.TOUCH);
        this.addAvailableAction(ActionEnum.LOOK);
        this.addSpecialProperty(SpecialPropertyEnum.EXISTS);
        this.setDefaultAction(ActionEnum.LOOK);

        Entity.set(this.id, this);
    }

    setID(id) {
        Entity.remove(this.id);
        super.setID(id);
        Entity.set(this.id, this);
        return 0;
    }

    setWeight(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        this.weight = number;
        return 0;
    }
    getWeight() {
        return this.weight + this.weightModifier;
    }
    setWeightModifier(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        this.weightModifier = number;
        return 0;
    }

    setPrice(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        this.price = number;
        return 0;
    }
    getPrice() {
        return this.price + this.priceModifier;
    }
    setPriceModifier(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        this.priceModifier = number;
        return 0;
    }

    setMeshID(meshID) {
        this.meshID = meshID;
        if (this.meshStages.length == 0) {
            this.addMeshStage(meshID);
            this.currentMeshStage = 0;
        }
        return 0;
    }
    setTextureID(textureID) {
        this.textureID = textureID;
        if (this.textureStages.length == 0) {
            this.addTextureStage(textureID);
            this.currentTextureStage = 0;
        }
        if (this.materialID == "missingMaterial") {
            this.materialID = this.textureID;
        }
        return 0;
    }
    setMaterialID(materialID) {
        this.materialID = materialID;
        if (this.materialStages.length == 0) {
            this.addMaterialStage(materialID);
            this.currentMaterialStage = 0;
        }
        if (this.textureID == "missingTexture") {
            this.textureID = this.materialID;
        }
        return 0;
    }
    hasStage(index) {
        return this.meshStages.hasOwnProperty(index);
    }
    setStage(index = 0, updateChild = true) {
        if (!this.meshStages.indexOf(index) == -1) {
            return 1;
        }
        if (this.currentMeshStage == index) {
            return 0;
        }
        this.currentMeshStage = index;
        this.setMeshID(this.meshStages[index]);
        this.setMaterialID(this.materialStages[index]);
        this.setTextureID(this.textureStages[index]);
        return this;
    }
    addMeshStage(meshID = "missingMesh") {
        this.meshStages.push(meshID);
        return this;
    }
    getMeshStage(index) {
        if (!this.meshStages.hasOwnProperty(index)) {
            index = this.currentMeshStage;
        }
        return this.meshStages[index];
    }
    addMaterialStage(materialID = "missingMaterial") {
        this.materialStages.push(materialID);
        return this;
    }
    getMaterialStage(index = this.currentMaterialStage) {
        if (!this.materialStages.hasOwnProperty(index)) {
            index = this.currentMaterialStage;
        }
        return this.materialStages[index];
    }
    addTextureStage(textureID = "missingTexture") {
        this.textureStages.push(textureID);
        return this;
    }
    getTextureStage(index = this.currentTextureStage) {
        if (!this.textureStages.hasOwnProperty(index)) {
            index = this.currentTextureStage;
        }
        return this.textureStages[index];
    }
    setStages(stages) {
        return this.addStages(stages, true);
    }
    addStages(stages, overwrite = false) {
        if (!(stages instanceof Array)) {
            return 2;
        }
        if (stages.length == 0) {
            return 1;
        }
        if (overwrite) {
            this.meshStages.clear();
            this.materialStages.clear();
            this.textureStages.clear();
        }
        for (let i in stages) {
            if (stages[i] instanceof Array) {
                this.addMeshStage(stages[i][0]);
                if (stages[i].length > 1) {
                    this.addMaterialStage(stages[i][1]);
                }
                else {
                    if (this.meshStages.length == 1) {
                        this.addMaterialStage("missingMaterial");
                    }
                    else {
                        this.addMaterialStage(this.materialStages[i-1]);
                    }
                }
                if (stages[i].length > 2) {
                    this.addTextureStage(stages[i][2]);
                }
                else {
                    if (this.meshStages.length == 1) {
                        this.addTextureStage(this.materialStages[i]);
                    }
                    else {
                        this.addTextureStage(this.textureStages[i-1]);
                    }
                }
            }
        }
        return 0;
    }

    /**
     * Adds an available Action when interacting with this Entity
     * @param {ActionEnum} action ActionEnum
     * @param {function} [actionFunction]
     * @param {boolean} [runOnce]
     */
    addAvailableAction(action, actionFunction = null, runOnce = false) {
        if (action instanceof ActionData) {
            action = action.action;
        }
        else if (!ActionEnum.properties.hasOwnProperty(action)) {
            return 1;
        }
        this.availableActions[action] = new ActionData(action, actionFunction, runOnce);
        return 0;
    }
    /**
     * Removes an available Action when interacting with this Entity
     * @param  {ActionEnum} action (ActionEnum)
     * @returns {boolean} Whether or not the Action was removed
     */
    removeAvailableAction(action) {
        if (action instanceof ActionData) {
            action = action.action;
        }
        else if (!ActionEnum.properties.hasOwnProperty(action)) {
            return 1;
        }
        if (this.availableActions.hasOwnProperty(action)) {
            if (this.availableActions[action] instanceof ActionData) {
                this.availableActions[action].dispose();
            }
            delete this.availableActions[action];
        }
        return 0;
    }
    getAvailableAction(action) {
        if (action instanceof ActionData) {
            action = action.action;
        }
        else if (!ActionEnum.properties.hasOwnProperty(action)) {
            return null;
        }
        if (this.availableActions.hasOwnProperty(action)) {
            return this.availableActions[action];
        }
    }
    getAvailableActions() {
        return this.availableActions;
    }
    hasAvailableAction(action) {
        if (action instanceof ActionData) {
            action = action.action;
        }
        else if (!ActionEnum.properties.hasOwnProperty(action)) {
            return false;
        }
        return this.availableActions.hasOwnProperty(action);
    }

    /**
     * Adds a Hidden Available Action when interacting with this Entity
     * @param {ActionEnum} action (ActionEnum)
     */
    addHiddenAvailableAction(action) {
        if (action instanceof ActionData) {
            action = action.action;
        }
        action = this.getAvailableAction(action);
        if (action instanceof ActionData) {
            this.hiddenAvailableActions[action.action] = action;
        }
        return 0;
    }
    /**
     * Removes a Hidden Available Action when interacting with this Entity
     * @param  {ActionEnum} action (ActionEnum)
     * @returns {boolean} Whether or not the Action was removed
     */
    removeHiddenAvailableAction(action) {
        if (action instanceof ActionData) {
            action = action.action;
        }
        if (this.hasHiddenAvailableAction(action)) {
            delete this.hiddenAvailableActions[action];
        }
        return 0;
    }
    getHiddenAvailableAction(action) {
        if (action instanceof ActionData) {
            action = action.action;
        }
        if (this.hiddenAvailableActions.hasOwnProperty(action)) {
            return this.hiddenAvailableActions[action];
        }
    }
    getHiddenAvailableActions() {
        return this.hiddenAvailableActions;
    }
    hasHiddenAvailableAction(action) {
        if (action instanceof ActionData) {
            action = action.action;
        }
        return this.hiddenAvailableActions.hasOwnProperty(action);
    }

    /**
     * Adds a special property
     * @param {SpecialPropertyEnum} specialProperty
     */
    addSpecialProperty(specialProperty) {
        if (!SpecialPropertyEnum.properties.hasOwnProperty(specialProperty)) {
            if (SpecialPropertyEnum.hasOwnProperty(specialProperty)) {
                specialProperty = SpecialPropertyEnum[specialProperty];
            }
            else {
                return 2;
            }
        }
        this.specialProperties[specialProperty] = true;
        return 0;
    }
    /**
     * Removes a special property
     * @param {SpecialPropertyEnum} specialProperty
     */
    removeSpecialProperty(specialProperty) {
        if (!SpecialPropertyEnum.properties.hasOwnProperty(specialProperty)) {
            return 2;
        }
        delete this.specialProperties[specialProperty];
        return 0;
    }
    /**
     * Returns this Entity's special properties
     * @returns {Set} <Number (SpecialPropertyEnum)>
     */
    getSpecialProperties() {
        return this.specialProperties;
    }
    /**
     * Returns whether or not this Entity has the specific special property
     * @param  {Number}  specialProperty (SpecialPropertyEnum)
     * @returns {boolean} Whether or not this Entity has the specific SpecialPropertyEnum
     */
    hasSpecialProperty(specialProperty) {
        if (!SpecialPropertyEnum.properties.hasOwnProperty(specialProperty)) {
            return false;
        }
        return this.specialProperties.hasOwnProperty(specialProperty);
    }

    setDefaultAction(action) {
        if (this.hasAvailableAction(action)) {
            this.defaultAction = action;
            return 0;
        }
        return 2;
    }
    getDefaultAction() {
        return this.defaultAction;
    }

    resetModifiers() {
        super.resetModifiers();
        this.weightModifier = 0;
        this.priceModifier = 0;
        return 0;
    }

    /**
     * Overrides AbstractEntity.clone
     * @param  {string} id ID
     * @returns {Entity} new Entity
     */
    clone(id = "") {
        let clone = new Entity(id, this.name, this.description, this.icon, this.entityType);
        if (this.hasContainer()) {
            clone.setContainer(this.container.clone(String(clone.id).concat("Container")));
        }
        clone.assign(this);
        return clone;
    }
    createInstance(id = "") {
        return new InstancedEntity(id, this);
    }
    addInstance(instancedEntity) {
        if (!(instancedEntity instanceof InstancedEntity)) {
            if (InstancedEntity.has(instancedEntity)) {
                instancedEntity = InstancedEntity.get(instancedEntity);
            }
            else {
                return 1;
            }
        }
        this.instances[instancedEntity.getID()] = instancedEntity;
        return 0;
    }
    removeInstance(instancedEntity) {
        if (!(instancedEntity instanceof InstancedEntity)) {
            if (InstancedEntity.has(instancedEntity)) {
                instancedEntity = InstancedEntity.get(instancedEntity);
            }
            else {
                return 1;
            }
        }
        delete this.instances[instancedEntity.getID()];
        return 0;
    }
    getInstances() {
        return this.instances;
    }
    /**
     * Clones the entity's values over this
     * @param {Entity} entity 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(entity, verify = true) {
        if (verify && !(entity instanceof Entity)) {
            return 2;
        }
        super.assign(entity, verify);
        if (entity.hasOwnProperty("meshStages")) this.meshStages = [...entity.meshStages];
        if (entity.hasOwnProperty("currentMeshStage")) this.currentMeshStage = entity.currentMeshStage;
        if (entity.hasOwnProperty("textureStages")) this.textureStages = [...entity.textureStages];
        if (entity.hasOwnProperty("currentTextureStage")) this.currentTextureStage = entity.currentTextureStage;
        if (entity.hasOwnProperty("materialStages")) this.materialStages = [...entity.materialStages];
        if (entity.hasOwnProperty("currentMaterialStage")) this.currentMaterialStage = entity.currentMaterialStage;
        if (entity.hasOwnProperty("meshID")) this.setMeshID(entity.meshID);
        if (entity.hasOwnProperty("textureID")) this.setTextureID(entity.textureID);
        if (entity.hasOwnProperty("materialID")) this.setMaterialID(entity.materialID);
        if (entity.hasOwnProperty("availableActions")) {
            for (let actionEnum in entity.availableActions) {
                let actionData = entity.availableActions[actionEnum];
                if (actionData instanceof ActionData) {
                    this.addAvailableAction(actionEnum, actionData.actionFunction, actionData.runOnce);
                }
                else {
                    this.addAvailableAction(actionEnum);
                }
            }
        }
        if (entity.hasOwnProperty("hiddenAvailableActions")) {
            for (let actionEnum in entity.hiddenAvailableActions) {
                this.addHiddenAvailableAction(actionEnum);
            }
        }
        if (entity.hasOwnProperty("specialProperties")) {
            for (let specialProperty in entity.specialProperties) {
                this.addSpecialProperty(specialProperty);
            }
        }
        if (entity.hasOwnProperty("defaultAction")) this.setDefaultAction(entity.defaultAction);
        if (entity.hasOwnProperty("weight")) this.setWeight(entity.weight);
        if (entity.hasOwnProperty("price")) this.setPrice(entity.price);
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        Entity.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        for (let instanceID in this.instances) {
            if (this.instances[instanceID] instanceof InstancedEntity) {
                this.instances[instanceID].dispose();
            }
        }
        Entity.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "Entity";
    }

    static initialize() {
        Entity.entityList = {};
    }
    static get(id) {
        if (Entity.has(id)) {
            return Entity.entityList[id];
        }
        return 1;
    }
    static has(id) {
        return Entity.entityList.hasOwnProperty(id);
    }
    static set(id, entity) {
        Entity.entityList[id] = entity;
        return 0;
    }
    static remove(id) {
        delete Entity.entityList[id];
        return 0;
    }
    static list() {
        return Entity.entityList;
    }
    static clear() {
        for (let i in Entity.entityList) {
            Entity.entityList[i].dispose();
        }
        Entity.entityList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!Entity.has(oldID)) {
            return 1;
        }
        Entity.set(newID, Entity.get(oldID));
        Entity.remove(oldID);
        return 0;
    }
}
Entity.initialize();