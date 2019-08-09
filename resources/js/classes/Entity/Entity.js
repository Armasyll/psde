class Entity extends AbstractEntity {
    /**
     * Creates an Entity
     * @param  {string} id           Unique ID
     * @param  {string} name         Name
     * @param  {string} description  Description
     * @param  {string}  iconID       Image ID
     * @param  {EntityEnum} entityType EntityEnum
     */
    constructor(id = undefined, name = undefined, description = undefined, iconID = "genericItem", entityType = EntityEnum.ENTITY) {
        super(id, name, description, iconID);
        this.entityType = entityType;;
        this.weight = 0;
        this.price = 0;
        this.health = 10;
        this.healthMax = 10;
        this.healthMaxOffset = 0;
        this.meshID = "missingMesh";
        this.textureID = "missingTexture";
        this.materialID = "missingMaterial";

        this.instances = {};

        this.addAvailableAction(ActionEnum.LOOK);
        this.addSpecialProperty(SpecialPropertyEnum.EXISTS);
        this.setDefaultAction(ActionEnum.LOOK);

        Game.setEntity(this.id, this);
    }

    setWeight(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        this.weight = number;
        return this;
    }
    getWeight() {
        return this.weight;
    }

    setPrice(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        this.price = number;
        return this;
    }
    getPrice() {
        return this.price;
    }

    setHealth(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        if (this.godMode) {
            this.health = this.getMaxHealth();
            return this;
        }
        if (number + this.health > this.healthMax) {
            number = this.healthMax;
        }
        else if (number + this.health < 0) {
            number = 0;
        }
        if (this.essential) {
            if (number < 1) {
                number = 1;
            }
        }
        this.health = number;
        if (this.health <= 0) {
            this.living = false;
            if (this.hasController()) {
                this.controller.doDeath();
            }
        }
        return this;
    }
    addHealth(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (number > 0) {
            this.setHealth(this.health + number);
        }
        return this;
    }
    subtractHealth(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (number > 0) {
            this.setHealth(this.health - number);
        }
        return this;
    }
    getHealth() {
        return this.health;
    }

    setMaxHealth(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        if (number <= 0) {
            number = 1;
        }
        this.healthMax = number;
        if (this.health > this.getMaxHealth()) {
            this.health = this.getMaxHealth();
        }
        return this;
    }
    addMaxHealth(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (number > 0) {
            this.setMaxHealth(this.healthMax + number);
        }
        return this;
    }
    subtractMaxHealth(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (number > 0) {
            this.setMaxHealth(this.healthMax - number);
        }
        return this;
    }
    getMaxHealth() {
        return this.healthMax + this.healthMaxOffset;
    }

    setMeshID(meshID) {
        if (Game.hasAvailableMesh(meshID)) {
            this.meshID = meshID;
        }
        else {
            this.meshID = "missingMesh";
        }
        return this;
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
        return this;
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
        return this;
    }
    getMaterialID() {
        return this.materialID;
    }

    /**
     * Adds an available Action when interacting with this Entity
     * @param {ActionEnum} action (ActionEnum)
     */
    addAvailableAction(action, _function = undefined, runOnce = false) {
        if (action instanceof ActionData) {
            action = action.action;
        }
        else if (!ActionEnum.properties.hasOwnProperty(action)) {
            return this;
        }
        this.availableActions[action] = new ActionData(action, _function, runOnce);
        return this;
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
            return this;
        }
        if (this.availableActions.hasOwnProperty(action)) {
            if (this.availableActions[action] instanceof ActionData) {
                this.availableActions[action].dispose();
            }
            delete this.availableActions[action];
        }
        return this;
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
        return this;
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
        return this;
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
            return 2;
        }
        this.specialProperties.add(specialProperty);
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
        this.specialProperties.remove(specialProperty);
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
        return this.specialProperties.has(specialProperty);
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

    clone(id = undefined) {
        let entity = new Entity(id, this.name, this.description, this.icon, this.entityType);
        // variables from AbstractEntity
        entity.availableActions = Object.assign({}, this.availableActions);
        entity.hiddenAvailableActions = Object.assign({}, this.hiddenAvailableActions);
        entity.specialProperties = new Set(this.specialProperties);
        entity.defaultAction = this.defaultAction;
        // variables from Entity
        entity.weight = this.weight;
        entity.price = this.price;
        entity.health = this.health;
        return entity;
    }
    createInstance(id = "") {
        let instance = new InstancedEntity(id, this);
        this.instances[instance.getID()] = instance;
        return instance;
    }
    addInstance(instancedEntity) {
        this.instances[instancedEntity.getID()] = instance;
        return 0;
    }
    getInstances() {
        return this.instances;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        for (let instanceID in this.instances) {
            if (this.instances[instanceID] instanceof InstancedEntity) {
                this.instances[instanceID].dispose();
            }
        }
        if (this.hasController) {
            this.controller.dispose();
        }
        Game.removeEntity(this.id);
        super.dispose();
        return undefined;
    }
}