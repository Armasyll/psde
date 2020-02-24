class Entity extends AbstractEntity {
    /**
     * Creates an Entity
     * @param  {string} id           Unique ID
     * @param  {string} name         Name
     * @param  {string} description  Description
     * @param  {string} iconID       Icon ID
     * @param  {EntityEnum} entityType EntityEnum
     */
    constructor(id = undefined, name = undefined, description = undefined, iconID = "genericItem", entityType = EntityEnum.ENTITY) {
        super(id, name, description, iconID);
        this.entityType = entityType;;
        this.weight = 0;
        this.weightModifier = 0;
        this.price = 0;
        this.priceModifier = 0;
        this.meshID = "missingMesh";
        this.textureID = "missingTexture";
        this.materialID = "missingMaterial";

        this.instances = {};

        this.addAvailableAction(ActionEnum.LOOK);
        this.addSpecialProperty(SpecialPropertyEnum.EXISTS);
        this.setDefaultAction(ActionEnum.LOOK);

        Entity.set(this.id, this);
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
        if (Game.hasAvailableMesh(meshID)) {
            this.meshID = meshID;
        }
        else {
            this.meshID = "missingMesh";
        }
        return 0;
    }
    getMeshID() {
        return this.meshID;
    }
    setTextureID(textureID) {
        if (Game.hasAvailableTexture(textureID)) {
            this.textureID = textureID;
        }
        else {
            this.textureID = "missingTexture";
        }
        return 0;
    }
    getTextureID() {
        return this.textureID;
    }
    setMaterialID(materialID) {
        if (Game.hasAvailableMaterial(materialID) || Game.hasAvailableTexture(materialID)) {
            this.materialID = materialID;
        }
        else {
            this.materialID = "missingMaterial";
        }
        return 0;
    }
    getMaterialID() {
        return this.materialID;
    }

    /**
     * Adds an available Action when interacting with this Entity
     * @param {ActionEnum} action ActionEnum
     * @param {function} [actionFunction]
     * @param {boolean} [runOnce]
     */
    addAvailableAction(action, actionFunction = undefined, runOnce = false) {
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
     * @return {Booealn}          Whether or not the Action was removed
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
     * @return {Booealn}          Whether or not the Action was removed
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
     * @return {Set} <Number (SpecialPropertyEnum)>
     */
    getSpecialProperties() {
        return this.specialProperties;
    }
    /**
     * Returns whether or not this Entity has the specific special property
     * @param  {Number}  specialProperty (SpecialPropertyEnum)
     * @return {Boolean} Whether or not this Entity has the specific SpecialPropertyEnum
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
     * @param  {string} id          ID
     * @return {Entity}             new Entity
     */
    clone(id = undefined) {
        let clone = new Entity(id, this.name, this.description, this.icon, this.entityType);
        clone.assign(this);
        return clone;
    }
    createInstance(id = "") {
        let instance = new InstancedEntity(id, this);
        this.instances[instance.getID()] = instance;
        return instance;
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
        for (let actionEnum in entity.availableActions) {
            let actionData = entity.availableActions[actionEnum];
            if (actionData instanceof ActionData) {
                this.addAvailableAction(actionEnum, actionData.actionFunction, actionData.runOnce);
            }
            else {
                this.addAvailableAction(actionEnum);
            }
        }
        for (let actionEnum in entity.hiddenAvailableActions) {
            this.addHiddenAvailableAction(actionEnum);
        }
        for (let specialProperty in entity.specialProperties) {
            this.addSpecialProperty(specialProperty);
        }
        this.setDefaultAction(entity.defaultAction);
        this.setWeight(entity.weight);
        this.setPrice(entity.price);
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
        if (this.hasController()) {
            this.controller.dispose();
        }
        Entity.remove(this.id);
        super.dispose();
        return undefined;
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
}
Entity.initialize();