/**
 * Instanced Entity
 */
class InstancedEntity extends AbstractEntity {
    /**
     * Creates an Instanced Entity
     * @param {string} id Unique ID
     * @param {Entity} entity Entity
     * @param {string} [name] Name
     * @param {string} [description] Description
     * @param {string} [iconID] Icon ID
     */
    constructor(id = "", entity = null, name = null, description = null, iconID = null) {
        super(id, name, description);
        if (!(entity instanceof Entity)) {
            entity = Entity.get(entity);
            if (!(entity instanceof Entity)) {
                return null;
            }
        }
        this.entity = entity;
        this.setName(name || this.entity.getName());
        this.setDescription(description || this.entity.getDescription());
        this.setIcon(iconID || this.entity.getIcon());
        this.entityType = this.entity.entityType;
        this.owner = "";
        this.weightModifier = 0;
        this.priceModifier = 0;
        this._useOwnAvailableActions = false;
        this._useOwnDefaultAction = false;
        this._useOwnHiddenAvailableActions = false;
        this._useOwnSpecialProperties = false;
        this._useOwnEffects = false;
        this._useOwnActionEffects = false;
        this.currentMeshStage = 0;
        this.currentTextureStage = 0;
        this.currentMaterialStage = 0;

        InstancedEntity.set(this.id, this);
        this.entity.addInstance(this);
    }
    getEntity() {
        return this.entity;
    }
    hasEntity() {
        return this.entity instanceof Entity;
    }
    getMeshIDs() {
        if (!this.hasEntity()) {
            return "missingMesh";
        }
        return this.entity.getMeshIDs();
    }
    getTextureID() {
        if (!this.hasEntity()) {
            return "missingTexture";
        }
        return this.entity.getTextureID();
    }
    getMaterialID() {
        if (!this.hasEntity()) {
            return "missingMaterial";
        }
        return this.entity.getMaterialID();
    }
    getWeight() {
        if (!this.hasEntity()) {
            return 0;
        }
        return this.entity.getWeight() + this.weightModifier;
    }
    getPrice() {
        if (!this.hasEntity()) {
            return 0;
        }
        return this.entity.getPrice() + this.priceModifier;
    }

    /**
     * Sets Owner
     * @param {CharacterEntity} creatureEntity Character, or undefined
     */
    setOwner(creatureEntity) {
        if (!(creatureEntity instanceof CreatureEntity)) {
            if (CreatureEntity.has(creatureEntity)) {
                creatureEntity = CreatureEntity.get(creatureEntity);
            }
            else {
                return 2;
            }
        }
        this.owner = creatureEntity.id;
        return 0;
    }
    getOwner() {
        return this.owner;
    }
    hasOwner() {
        return CreatureEntity.has(this.owner);
    }
    removeOwner() {
        this.owner = null;
        return 0;
    }
    clearOwner() {
        return this.removeOwner();
    }

    _createOwnSpecialProperties() {
        if (!this.hasEntity()) {
            return 2;
        }
        if (this.entity.getSpecialProperties() instanceof Set) {
            this.specialProperties = new Set(this.entity.getSpecialProperties());
        }
        else {
            this.specialProperties = new Set();
        }
        this._useOwnSpecialProperties = true;
    }
    addSpecialProperty(specialProperty) {
        if (!this.hasEntity()) {
            return 2;
        }
        if (!SpecialPropertyEnum.properties.hasOwnProperty(specialProperty)) {
            if (SpecialPropertyEnum.hasOwnProperty(specialProperty)) {
                specialProperty = SpecialPropertyEnum[specialProperty];
            }
            else {
                return 2;
            }
        }
        if (!this._useOwnSpecialProperties) {
            this._createOwnSpecialProperties();
        }
        this.specialProperties[specialProperty] = true;
        return 0;
    }
    removeSpecialProperty(specialProperty) {
        if (!this.hasEntity()) {
            return 2;
        }
        if (!SpecialPropertyEnum.properties.hasOwnProperty(specialProperty)) {
            if (SpecialPropertyEnum.hasOwnProperty(specialProperty)) {
                specialProperty = SpecialPropertyEnum[specialProperty];
            }
            else {
                return 2;
            }
        }
        if (!this._useOwnSpecialProperties) {
            this._createOwnSpecialProperties();
        }
        delete this.specialProperties[specialProperty];
        return 0;
    }
    getSpecialProperties() {
        if (!this.hasEntity()) {
            return this.specialProperties;
        }
        if (this._useOwnSpecialProperties) {
            return this.specialProperties;
        }
        else {
            return this.entity.getSpecialProperties();
        }
    }
    hasSpecialProperty(specialProperty) {
        if (!this.hasEntity()) {
            return false;
        }
        if (!SpecialPropertyEnum.properties.hasOwnProperty(specialProperty)) {
            if (SpecialPropertyEnum.hasOwnProperty(specialProperty)) {
                specialProperty = SpecialPropertyEnum[specialProperty];
            }
            else {
                return false;
            }
        }
        if (this._useOwnSpecialProperties) {
            return this.specialProperties.hasOwnProperty(specialProperty);
        }
        else {
            return this.entity.hasSpecialProperty(specialProperty);
        }
    }

    _createOwnAvailableActions() {
        if (!this.hasEntity()) {
            return 2;
        }
        this.availableActions = [];
        for (var _action in this.entity.getAvailableActions()) {
            var _availableAction = this.entity.getAvailableAction(_action);
            if (_availableAction instanceof ActionData) {
                this.availableActions[_action] = this.entity.getAvailableAction(_action).clone();
            }
        }
        this._useOwnAvailableActions = true;
    }
    addAvailableAction(actionEnum, actionFunction = undefined, runOnce = false) {
        if (!this.hasEntity()) {
            return 2;
        }
        if (ActionEnum.hasOwnProperty(actionEnum)) {}
        else if (ActionEnum.properties.hasOwnProperty(actionEnum)) {
            actionEnum = ActionEnum.properties[actionEnum].value;
        }
        else {
            return 2;
        }
        if (!this._useOwnAvailableActions) {
            this._createOwnAvailableActions();
        }
        this.availableActions[actionEnum] = new ActionData(actionEnum, actionFunction, runOnce);
        return 0;
    }
    removeAvailableAction(actionEnum) {
        if (!this.hasEntity()) {
            return 2;
        }
        if (!this._useOwnAvailableActions) {
            this._createOwnAvailableActions();
        }
        if (this.availableActions.hasOwnProperty(actionEnum)) {
            if (this.availableActions[actionEnum] instanceof ActionData) {
                this.availableActions[actionEnum].dispose();
            }
            delete this.availableActions[actionEnum];
        }
        return 0;
    }
    getAvailableAction(actionEnum) {
        if (!this.hasEntity()) {
            return 0;
        }
        if (this._useOwnAvailableActions) {
            if (this.availableActions.hasOwnProperty(actionEnum)) {
                return this.availableActions[actionEnum];
            }
        }
        else {
            return this.entity.getAvailableAction(actionEnum);
        }
    }
    getAvailableActions() {
        if (!this.hasEntity()) {
            return this.availableActions;
        }
        if (this._useOwnAvailableActions) {
            return this.availableActions;
        }
        else {
            return this.entity.getAvailableActions();
        }
    }
    hasAvailableAction(actionEnum) {
        if (!this.hasEntity()) {
            return false;
        }
        if (this._useOwnAvailableActions) {
            return this.availableActions.hasOwnProperty(actionEnum);
        }
        else {
            return this.entity.hasAvailableAction(actionEnum);
        }
    }

    _createOwnHiddenAvailableActions() {
        if (!this.hasEntity()) {
            return 0;
        }
        this.hiddenAvailableActions = [];
        for (var _action in this.entity.getHiddenAvailableActions()) {
            var _availableAction = this.entity.getHiddenAvailableAction(_action);
            if (_availableAction instanceof ActionData) {
                this.hiddenAvailableActions[_action] = this.entity.getHiddenAvailableAction(_action).clone();
            }
        }
        this._useOwnHiddenAvailableActions = true;
        return 0;
    }
    /**
     * Adds a hidden available Action when interacting with this Entity
     * @param {String} actionEnum (ActionEnum)
     */
    addHiddenAvailableAction(actionEnum, actionFunction = undefined, runOnce = false) {
        if (!this.hasEntity()) {
            return 2;
        }
        if (actionEnum instanceof ActionData) {
            actionEnum = actionEnum.action;
        }
        if (!this._useOwnHiddenAvailableActions) {
            this._createOwnHiddenAvailableActions();
        }
        actionEnum = this.getAvailableAction(actionEnum);
        if (actionEnum instanceof ActionData) {
            this.hiddenAvailableActions[actionEnum.action] = actionEnum;
        }
        return 0;
    }
    /**
     * Removes a hidden available Action when interacting with this Entity
     * @param  {String} actionEnum (ActionEnum)
     * @return {Booealn}          Whether or not the Action was removed
     */
    removeHiddenAvailableAction(actionEnum) {
        if (!this.hasEntity()) {
            return 2;
        }
        if (actionEnum instanceof ActionData) {
            actionEnum = actionEnum.action;
        }
        if (!this._useOwnHiddenAvailableActions) {
            this._createOwnHiddenAvailableActions();
        }
        if (this.hasHiddenAvailableAction(actionEnum)) {
            delete this.hiddenAvailableActions[actionEnum];
        }
        return 0;
    }
    getHiddenAvailableAction(actionEnum) {
        if (!this.hasEntity()) {
            return 0;
        }
        if (actionEnum instanceof ActionData) {
            actionEnum = actionEnum.action;
        }
        if (this._useOwnHiddenAvailableActions) {
            if (this.hiddenAvailableActions.hasOwnProperty(actionEnum)) {
                return this.hiddenAvailableActions[actionEnum];
            }
        }
        else {
            return this.entity.getHiddenAvailableAction(actionEnum);
        }
        return 0;
    }
    getHiddenAvailableActions() {
        if (!this.hasEntity()) {
            return this.hiddenAvailableActions;
        }
        if (this._useOwnHiddenAvailableActions) {
            return this.hiddenAvailableActions;
        }
        else {
            return this.entity.getHiddenAvailableActions();
        }
    }
    hasHiddenAvailableAction(actionEnum) {
        if (!this.hasEntity()) {
            return false;
        }
        if (actionEnum instanceof ActionData) {
            actionEnum = actionEnum.action;
        }
        if (this._useOwnHiddenAvailableActions) {
            return this.hiddenAvailableActions.hasOwnProperty(actionEnum);
        }
        else {
            return this.entity.hasHiddenAvailableAction(actionEnum);
        }
    }

    setDefaultAction(action) {
        if (!this.hasEntity()) {
            return 2;
        }
        if (this.hasAvailableAction(action)) {
            this._useOwnDefaultAction = true;
            this.defaultAction = action;
        }
    }
    getDefaultAction() {
        if (!this.hasEntity()) {
            return this.defaultAction;
        }
        if (this._useOwnDefaultAction) {
            return this.defaultAction;
        }
        else {
            return this.entity.getDefaultAction();
        }
    }

    addEffect(...blob) {
        if (!this._useOwnEffects) {
            Object.assign(this.effects, this.entity.effects);
            this._useOwnEffects = true;
        }
        return super.addEffect(...blob);
    }
    removeEffect(...blob) {
        if (!this._useOwnEffects) {
            Object.assign(this.effects, this.entity.effects);
            this._useOwnEffects = true;
        }
        return super.removeEffect(...blob);
    }
    getEffects(...blob) {
        if (this._useOwnEffects) {
            return this.effects;
        }
        else {
            return this.entity.getEffects(...blob);
        }
    }

    addActionEffect(...blob) {
        if (!this._useOwnActionEffects) {
            Object.assign(this.actionEffects, this.entity.actionEffects);
            this._useOwnActionEffects = true;
        }
        return super.addActionEffect(...blob);
    }
    removeActionEffect(...blob) {
        if (!this._useOwnActionEffects) {
            Object.assign(this.actionEffects, this.entity.actionEffects);
            this._useOwnActionEffects = true;
        }
        return super.removeActionEffect(...blob);
    }
    getActionEffects(...blob) {
        if (this._useOwnEffects) {
            return this.actionEffects;
        }
        else {
            return this.entity.getActionEffects(...blob);
        }
    }

    objectify() {
        let obj = super.objectify();
        obj["availableActions"] = this.getAvailableActions();
        obj["defaultAction"] = this.getDefaultAction();
        obj["hiddenAvailableActions"] = this.getHiddenAvailableActions();
        obj["materialID"] = this.getMaterialID();
        obj["meshIDs"] = this.getMeshIDs();
        obj["owner"] = AbstractEntity.objectifyProperty(this.getOwner());
        obj["price"] = this.getPrice();
        obj["specialProperties"] = this.getSpecialProperties();
        obj["textureID"] = this.getTextureID();
        obj["weight"] = this.getWeight();
        return obj;
    }
    objectifyMinimal() {
        let obj = super.objectifyMinimal();
        obj["availableActions"] = this.getAvailableActions();
        obj["defaultAction"] = this.getDefaultAction();
        obj["hiddenAvailableActions"] = this.getHiddenAvailableActions();
        obj["materialID"] = this.getMaterialID();
        obj["meshIDs"] = this.getMeshIDs();
        obj["owner"] = AbstractEntity.objectifyProperty(this.getOwner());
        obj["price"] = this.getPrice();
        obj["specialProperties"] = this.getSpecialProperties();
        obj["textureID"] = this.getTextureID();
        obj["weight"] = this.getWeight();
        return obj;
    }
    /**
     * Overrides AbstractEntity.clone
     * @param  {string} id ID
     * @return {Entity} new InstancedEntity
     */
    clone(id = "") {
        if (!this.hasEntity()) {
            return 2;
        }
        let clone = new InstancedEntity(id, this.entity, this.name, this.description, this.iconID);
        clone.assign(this);
        if (this.hasContainer()) {
            clone.setContainer(this.container.clone(String(id).concat("Container")));
        }
        return clone;
    }
    assign(entity, verify = true) {
        if (verify && !(entity instanceof InstancedEntity)) {
            return 2;
        }
        //super.assign(entity);
        if (entity.hasOwnProperty("owner")) this.setOwner(entity.owner);
        if (entity._useOwnAvailableActions) {
            this.availableActions = Object.assign({}, entity.availableActions);
        }
        if (entity._useOwnHiddenAvailableActions) {
            this.hiddenAvailableActions = Object.assign({}, entity.hiddenAvailableActions);
        }
        if (entity._useOwnSpecialProperties) {
            this.specialProperties = Object.assign({}, entity.specialProperties);
        }
        if (entity._useOwnDefaultAction) {
            this.defaultAction = entity.defaultAction;
        }
        if (entity._useOwnEffects) {
            this.effects = entity.cloneEffects();
        }
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        InstancedEntity.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        if (this.hasEntity()) {
            this.entity.removeInstance(this);
        }
        InstancedEntity.remove(this.id);
        if (this._useOwnAvailableActions) {
            for (let action in this.availableActions) {
                if (this.availableActions[action] instanceof ActionData) {
                    this.availableActions[action].dispose();
                }
                delete this.availableActions[action];
            }
            delete this.availableActions;
        }
        if (this._useOwnHiddenAvailableActions) {
            for (let action in this.hiddenAvailableActions) {
                if (this.hiddenAvailableActions[action] instanceof ActionData) {
                    this.hiddenAvailableActions[action].dispose();
                }
                delete this.hiddenAvailableActions[action];
            }
            delete this.hiddenAvailableActions;
        }
        if (this._useOwnSpecialProperties) {
            delete this.specialProperties;
        }
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "InstancedEntity";
    }

    static initialize() {
        InstancedEntity.instancedEntityList = {};
    }
    static get(id) {
        if (InstancedEntity.has(id)) {
            return InstancedEntity.instancedEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return InstancedEntity.instancedEntityList.hasOwnProperty(id);
    }
    static set(id, instancedEntity) {
        InstancedEntity.instancedEntityList[id] = instancedEntity;
        return 0;
    }
    static remove(id) {
        delete InstancedEntity.instancedEntityList[id];
        return 0;
    }
    static list() {
        return InstancedEntity.instancedEntityList;
    }
    static clear() {
        for (let i in InstancedEntity.instancedEntityList) {
            InstancedEntity.instancedEntityList[i].dispose();
        }
        InstancedEntity.instancedEntityList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!InstancedEntity.has(oldID)) {
            return 1;
        }
        InstancedEntity.set(newID, InstancedEntity.get(oldID));
        InstancedEntity.remove(oldID);
        return 0;
    }
}
InstancedEntity.initialize();