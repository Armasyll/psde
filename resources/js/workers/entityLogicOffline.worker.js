importScripts("../Overrides.js");
importScripts("../classes/Tools.js");
importScripts("../classes/DND.js");
importScripts("../classes/DND5E.js");

importScripts("../classes/Enum.js");
importScripts("../classes/Callback.js");

importScripts("../classes/ActionData.js");
importScripts("../classes/Dialogue.js");
importScripts("../classes/Cell.js");
importScripts("../classes/TeleportMarker.js");
importScripts("../classes/Cosmetic.js");
importScripts("../classes/Container.js");
importScripts("../classes/CharacterClass/CharacterClass.js");
importScripts("../classes/CharacterClass/ClasslessClass.js");
importScripts("../classes/CharacterClass/SorcererClass.js");

importScripts("../classes/Effect.js");

importScripts("../classes/Entity/AbstractEntity.js");
importScripts("../classes/Entity/SoulEntity.js");
importScripts("../classes/Entity/Entity.js");
importScripts("../classes/Entity/FurnitureEntity.js");
importScripts("../classes/Entity/LightingEntity.js");
importScripts("../classes/Entity/DisplayEntity.js");
importScripts("../classes/Entity/DoorEntity.js");
importScripts("../classes/Entity/CreatureEntity.js");
importScripts("../classes/Entity/CharacterEntity.js");
importScripts("../classes/Entity/ItemEntity.js");
importScripts("../classes/Entity/BookEntity.js");
importScripts("../classes/Entity/EquipmentEntity.js");
importScripts("../classes/Entity/ClothingEntity.js");
importScripts("../classes/Entity/WeaponEntity.js");
importScripts("../classes/Entity/ShieldEntity.js");
importScripts("../classes/Entity/ProjectileEntity.js");
importScripts("../classes/Entity/KeyEntity.js");
importScripts("../classes/Entity/ConsumableEntity.js");
importScripts("../classes/Entity/PlantEntity.js");
importScripts("../classes/Entity/SpellEntity.js");

importScripts("../classes/Entity/Instance/Entity.js");
importScripts("../classes/Entity/Instance/FurnitureEntity.js");
importScripts("../classes/Entity/Instance/LightingEntity.js");
importScripts("../classes/Entity/Instance/DisplayEntity.js");
importScripts("../classes/Entity/Instance/ItemEntity.js");
importScripts("../classes/Entity/Instance/BookEntity.js");
importScripts("../classes/Entity/Instance/KeyEntity.js");
importScripts("../classes/Entity/Instance/EquipmentEntity.js");
importScripts("../classes/Entity/Instance/ClothingEntity.js");
importScripts("../classes/Entity/Instance/WeaponEntity.js");
importScripts("../classes/Entity/Instance/ShieldEntity.js");
importScripts("../classes/Entity/Instance/ProjectileEntity.js");
importScripts("../classes/Entity/Instance/ConsumableEntity.js");
importScripts("../classes/Entity/Instance/PlantEntity.js");
importScripts("../classes/Entity/Instance/SpellEntity.js");

/**
 * EntityLogic
 * @class
 * @typedef {Object} EntityLogic
 */
class EntityLogic {
    static initialize() {
        EntityLogic.debugMode = false;
        EntityLogic.debugVerbosity = 0;
        EntityLogic.tickPort = null;
        EntityLogic.transformsPort = null;
        EntityLogic.useNative = false;

        EntityLogic.currentTime = 0;
        EntityLogic.currentTick = 0;
        EntityLogic.currentRound = 0;
        EntityLogic.currentTurn = 0;
        EntityLogic.gameTimeMultiplier = 10;
        EntityLogic.ticksPerTurn = 10;
        EntityLogic.turnsPerRound = 6;
        EntityLogic.turnTime = EntityLogic.ticksPerTurn * EntityLogic.gameTimeMultiplier;
        EntityLogic.roundTime = EntityLogic.turnTime * EntityLogic.turnsPerRound;

        EntityLogic.cellLocations = {};
        EntityLogic.characterLocations = {};

        EntityLogic.playerEntity = null;
        EntityLogic.previousCell = null;
        EntityLogic.currentCell = null;

        EntityLogic.importingCellLocations = true;

        EntityLogic.initializePhaseTwo();
        return 0;
    }
    static initializePhaseTwo() {
        EntityLogic.importEffects();
        EntityLogic.importClasses();
        EntityLogic.importSpells();
        EntityLogic.importItems();
        EntityLogic.importConsumables();
        EntityLogic.importBooks();
        EntityLogic.importCosmetics();
        EntityLogic.importFurniture();
        EntityLogic.importPlants();
        EntityLogic.importDialogues();
        EntityLogic.importCharacters();
        EntityLogic.importCellLocations("../../json/cells.json", EntityLogic.initializePhaseThree);
        EntityLogic.importTeleportMarkers();
        return 0;
    }
    static initializePhaseThree() {
        // TODO: don't be lazy, load when needed >:v
        EntityLogic.importCells(); // imports ALL the cells :V
        addEventListener('message', EntityLogic.gameWorkerOnMessage, false);
        EntityLogic.gameWorkerPostMessage("initialized");
        return 0;
    }
    static tickWorkerOnMessage(event) {
        if (EntityLogic.debugMode && EntityLogic.verbosity > 3) console.group(`Running EntityLogic.tickWorkerOnMessage`);
        if (!event.data.hasOwnProperty("cmd") || !event.data.hasOwnProperty("msg")) {
            if (EntityLogic.debugMode && EntityLogic.verbosity > 3) console.groupEnd();
            return 2;
        }
        
        /** @type {number} */
        let status = event.data["sta"];
        if (EntityLogic.debugMode && EntityLogic.verbosity > 3) console.info(`with command (${event.data["cmd"]})`);
        /** @type {string} UUIDv4 */
        let callbackID = event.data["callbackID"];
        if (EntityLogic.debugMode && EntityLogic.verbosity > 3) console.info(`and callbackID (${callbackID})`);
        /** @type {any} */
        let message = event.data["msg"];
        
        if (EntityLogic.debugMode && EntityLogic.verbosity > 3 && message) console.info(`and message`);
        switch (event.data.cmd) {
            case "triggerScheduledEffect": {
                if (!Effect.has(message[0])) {
                    return 2;
                }
                if (!AbstractEntity.has(message[1])) {
                    return 2;
                }
                if (EntityLogic.debugMode && EntityLogic.verbosity > 3) console.log(`Caught triggerScheduledEffect(${message[0]}, ${message[1]})`);
                let effect = Effect.get(message[0]);
                let abstractEntity = AbstractEntity.get(message[1]);
                abstractEntity.applyEffect(effect);
                break;
            }
            case "removeScheduledEffect": {
                if (!Effect.has(message[0])) {
                    return 2;
                }
                if (!AbstractEntity.has(message[1])) {
                    return 2;
                }
                if (EntityLogic.debugMode && EntityLogic.verbosity > 3) console.log(`Caught removeScheduledEffect(${message[0]}, ${message[1]})`);
                let effect = Effect.get(message[0]);
                let abstractEntity = AbstractEntity.get(message[1]);
                abstractEntity.removeEffect(effect);
                break;
            }
            case "triggerScheduledCommand": {
                //console.log(e.data["msg"]);
                break;
            }
            case "tick": {
                EntityLogic.currentTick = message;
                break;
            }
            case "turn": {
                EntityLogic.currentTurn = message;
                break;
            }
            case "round": {
                EntityLogic.currentRound = message;
                break;
            }
        }
        if (EntityLogic.debugMode && EntityLogic.verbosity > 3) console.groupEnd();
        return 0;
    }
    /**
     * 
     * @param {string} command 
     * @param {number} status 
     * @param {(Array<string>|object)} [message] 
     * @param {string} [callbackID] 
     * @param {object} [options] 
     */
    static tickWorkerPostMessage(command, status = 0, message, callbackID = null, options = null) {
        let obj = {"cmd": command, "sta": status, "msg": message};
        if (callbackID) {
            obj["callbackID"] = callbackID;
        }
        if (options) {
            EntityLogic.tickPort.postMessage(obj, options);
        }
        else {
            EntityLogic.tickPort.postMessage(obj);
        }
        return 0;
    }
    static transformsWorkerOnMessage(event) {
        if (EntityLogic.debugMode && EntityLogic.verbosity > 3) console.group(`Running EntityLogic.transformsWorkerOnMessage`);
        if (!event.data.hasOwnProperty("cmd") || !event.data.hasOwnProperty("msg")) {
            if (EntityLogic.debugMode && EntityLogic.verbosity > 3) console.groupEnd();
            return 2;
        }
        
        /** @type {number} */
        let status = event.data["sta"];
        if (EntityLogic.debugMode && EntityLogic.verbosity > 3) console.info(`with command (${event.data["cmd"]})`);
        /** @type {string} UUIDv4 */
        let callbackID = event.data["callbackID"];
        if (EntityLogic.debugMode && EntityLogic.verbosity > 3) console.info(`and callbackID (${callbackID})`);
        /** @type {any} */
        let message = event.data["msg"];
        
        if (EntityLogic.debugMode && EntityLogic.verbosity > 3 && message) console.info(`and message`);
        switch (event.data["cmd"]) {
            case "fireProjectile":
            case "inArea":
            case "inFrontOf":
            case "withinRange": {
                if (status == 0) {
                    Callback.run(callbackID, message);
                }
                else if (Callback.has(callbackID)) {
                    Callback.setRun(callbackID);
                }
                break;
            }
        }
        if (EntityLogic.debugMode && EntityLogic.verbosity > 3) console.groupEnd();
        return 0;
    }
    /**
     * 
     * @param {string} command 
     * @param {number} status 
     * @param {(Array<string>|object)} [message] 
     * @param {string} [callbackID] 
     * @param {object} [options] 
     */
    static transformsWorkerPostMessage(command, status = 0, message, callbackID = null, options = null) {
        let obj = {"cmd": command, "sta": status, "msg": message};
        if (callbackID) {
            obj["callbackID"] = callbackID;
        }
        if (options) {
            EntityLogic.transformsPort.postMessage(obj, options);
        }
        else {
            EntityLogic.transformsPort.postMessage(obj);
        }
        return 0;
    }
    static gameWorkerOnMessage(event) {
        if (EntityLogic.debugMode) console.group(`Running EntityLogic.gameWorkerOnMessage`);
        if (!event.data.hasOwnProperty("cmd") || !event.data.hasOwnProperty("msg")) {
            if (EntityLogic.debugMode) console.groupEnd();
            return 2;
        }

        /** @type {number} */
        let status = event.data["sta"];
        if (EntityLogic.debugMode) console.info(`with command (${event.data["cmd"]})`);
        /** @type {string} UUIDv4 */
        let callbackID = event.data["callbackID"];
        if (EntityLogic.debugMode) console.info(`and callbackID (${callbackID})`);
        /** @type {any} */
        let message = event.data["msg"];
        if (EntityLogic.debugMode && message) console.info(`and message`);
        
        switch (event.data["cmd"]) {
            case "setDebugMode": {
                EntityLogic.debugMode = message["debugMode"] == true;
                break;
            }
            case "actionAttack":
            case "actionAttackMain": {
                let actor = AbstractEntity.get(message["actorID"]);
                let target = AbstractEntity.get(message["targetID"]);
                if (actor == -1) {
                    EntityLogic.gameWorkerPostMessage("actionAttack", 1, false, callbackID);
                    break;
                }
                let weapon = null;
                if (actor instanceof CreatureEntity) {
                    weapon = actor.getMainWeapon();
                }
                EntityLogic.actionAttack(target, actor, weapon, callbackID);
                break;
            }
            case "actionAttackSub": {
                let actor = AbstractEntity.get(message["actorID"]);
                let target = AbstractEntity.get(message["targetID"]);
                if (actor == -1) {
                    EntityLogic.gameWorkerPostMessage("actionAttack", 1, false, callbackID);
                    break;
                }
                let weapon = actor.getSubWeapon();
                EntityLogic.actionAttack(target, actor, weapon, callbackID);
                break;
            }
            case "actionCast": {
                let actor = AbstractEntity.get(message["actorID"]);
                let target = AbstractEntity.get(message["targetID"]);
                if (actor == -1) {
                    EntityLogic.gameWorkerPostMessage("actionCast", 1, false, callbackID);
                    break;
                }
                let spell = SpellEntity.get(message["spellID"]);
                EntityLogic.actionCast(target, actor, spell, callbackID);
                break;
            }
            case "actionClose": {
                let actor = AbstractEntity.get(message["actorID"]);
                let target = AbstractEntity.get(message["targetID"]);
                if (target == 1 || actor == 1) {
                    EntityLogic.gameWorkerPostMessage("actionOpen", 1, false, callbackID);
                    break;
                }
                target.setClose();
                EntityLogic.gameWorkerPostMessage("actionClose", 0, !target.getOpen(), callbackID);
                break;
            }
            case "actionDrop": {
                let actor = AbstractEntity.get(message["actorID"]);
                let target = AbstractEntity.get(message["targetID"]);
                if (actor == 1 || target == 1) {
                    EntityLogic.gameWorkerPostMessage("actionDrop", 1, null, callbackID);
                    break;
                }
                let result = false;
                if (target.equipped) {
                    result = actor.unequip(target) == 0;
                    if (!result) {
                        EntityLogic.gameWorkerPostMessage("actionDrop", 202, null, callbackID); // TODO: plan an integer response system; 202 isn't catastrophic failure in this instance :l
                        break;
                    }
                }
                EntityLogic.gameWorkerPostMessage("actionDrop", 0, {"targetID":target.id, "actorID":actor.id, "actionDrop": (actor.removeItem(target) === 0)}, callbackID);
                EntityLogic.gameWorkerPostMessage("createItemAtController", 0, {"entityID":target.id, "controllerID":actor.id}, callbackID);
                break;
            }
            case "actionEquip": {
                /** @property {CharacterEntity} actor Actor */
                let actor = AbstractEntity.get(message["actorID"]);
                let target = AbstractEntity.get(message["targetID"]);
                if (actor == 1 || target == 1) {
                    EntityLogic.gameWorkerPostMessage("actionEquip", 1, {"actorID":actorID, "targetID":targetID, "actionEquip": false}, callbackID);
                    break;
                }
                EntityLogic.gameWorkerPostMessage("actionEquip", 0, {"actorID":actor.id, "targetID":target.id, "actionEquip": (actor.equip(target) === 0)}, callbackID);
                break;
            }
            case "actionHold": {
                let actor = AbstractEntity.get(message["actorID"]);
                let target = AbstractEntity.get(message["targetID"]);
                if (actor == 1 || target == 1) {
                    EntityLogic.gameWorkerPostMessage("actionHold", 1, {"actorID":actorID, "targetID":targetID, "actionHold": false}, callbackID);
                    break;
                }
                EntityLogic.gameWorkerPostMessage("actionHold", 0, {"actorID":actor.id, "targetID":target.id, "actionHold": (actor.hold(target) === 0)}, callbackID);
                break;
            }
            case "actionLook": {
                let actor = AbstractEntity.get(message["actorID"]);
                let target = AbstractEntity.get(message["targetID"]);
                if (actor == 1 || target == 1) {
                    EntityLogic.gameWorkerPostMessage("actionLook", 1, null, callbackID);
                    break;
                }
                EntityLogic.actionLook(target, actor, callbackID);
                break;
            }
            case "actionOpen": {
                let actor = AbstractEntity.get(message["actorID"]);
                let target = AbstractEntity.get(message["targetID"]);
                if (target == 1 || actor == 1) {
                    EntityLogic.gameWorkerPostMessage("actionOpen", 1, false, callbackID);
                    break;
                }
                EntityLogic.actionOpen(target, actor, callbackID);
                break;
            }
            case "actionRelease": {
                let actor = AbstractEntity.get(message["actorID"]);
                let target = AbstractEntity.get(message["targetID"]);
                if (actor == 1 || target == 1) {
                    EntityLogic.gameWorkerPostMessage("actionRelease", 1, null, callbackID);
                    break;
                }
                let result = actor.release(target) == 0;
                EntityLogic.gameWorkerPostMessage("actionRelease", 0, result, callbackID);
                break;
            }
            case "actionTake": {
                let target = AbstractEntity.get(message["targetID"]);
                let actor = AbstractEntity.get(message["actorID"]);
                if (target == 1 || actor == 1) {
                    EntityLogic.gameWorkerPostMessage("actionTake", 1, null, callbackID);
                    break;
                }
                EntityLogic.actionTake(target, actor, callbackID);
                break;
            }
            case "actionTalk": {
                let actor = AbstractEntity.get(message["actorID"]);
                let target = AbstractEntity.get(message["targetID"]);
                if (target == 1 || actor == 1) {
                    EntityLogic.gameWorkerPostMessage("actionTalk", 1, `Target (${message["targetID"]}) or Actor (${message["actorID"]}) don't exist.`, callbackID);
                    break;
                }
                if (!target.hasDialogue()) {
                    EntityLogic.gameWorkerPostMessage("actionTalk", 1, `Target (${target.id}) doesn't have a dialogue.`, callbackID);
                    break;
                }
                if (!Dialogue.has(target.getDialogue())) {
                    EntityLogic.gameWorkerPostMessage("actionTalk", 1, "Dialogue doesn't exist.", callbackID);
                    break;
                }
                /** @type {Dialogue} dialogue */
                let dialogue = Dialogue.get(target.getDialogue());
                let dialogueObject = dialogue.objectify(target, actor);
                EntityLogic.gameWorkerPostMessage("actionTalk", 0, dialogueObject, callbackID);
                break;
            }
            case "actionTouch": {
                let actor = AbstractEntity.get(message["actorID"]);
                let target = AbstractEntity.get(message["targetID"]);
                if (actor == 1 || target == 1) {
                    EntityLogic.gameWorkerPostMessage("actionTouch", 1, null, callbackID);
                    break;
                }
                EntityLogic.actionTouch(target, actor, callbackID);
                break;
            }
            case "actionUnequip": {
                let actor = AbstractEntity.get(message["actorID"]);
                let target = AbstractEntity.get(message["targetID"]);
                if (actor == 1 || target == 1) {
                    EntityLogic.gameWorkerPostMessage("actionUnequip", 1, null, callbackID);
                    break;
                }
                let result = actor.unequip(target) == 0;
                EntityLogic.gameWorkerPostMessage("actionUnequip", 0, result, callbackID);
                break;
            }
            case "addAllClothing": {
                if (!AbstractEntity.has(message["target"])) {
                    EntityLogic.gameWorkerPostMessage("addAllClothing", 2, {}, callbackID);
                    break;
                }
                let target = AbstractEntity.get(message["target"]);
                for (let item in ClothingEntity.list()) {
                    target.addItem(ClothingEntity.get(item));
                }
                EntityLogic.gameWorkerPostMessage("addAllClothing", 0, {"targetName": target.getName(), "targetID": target.id}, callbackID);
                if (target == EntityLogic.playerEntity) {
                    EntityLogic.sendPlayerEntityUpdates();
                }
                break;
            }
            case "addAllItems": {
                if (!AbstractEntity.has(message["target"])) {
                    EntityLogic.gameWorkerPostMessage("addAllItems", 2, {}, callbackID);
                    break;
                }
                let target = AbstractEntity.get(message["target"]);
                for (let item in ItemEntity.list()) {
                    target.addItem(ItemEntity.get(item));
                }
                EntityLogic.gameWorkerPostMessage("addAllItems", 0, {"targetName": target.getName(), "targetID": target.id}, callbackID);
                if (target == EntityLogic.playerEntity) {
                    EntityLogic.sendPlayerEntityUpdates();
                }
                break;
            }
            case "addAllKeys": {
                if (!AbstractEntity.has(message["target"])) {
                    EntityLogic.gameWorkerPostMessage("addAllKeys", 2, {}, callbackID);
                    break;
                }
                let target = AbstractEntity.get(message["target"]);
                for (let item in KeyEntity.list()) {
                    target.addItem(KeyEntity.get(item));
                }
                EntityLogic.gameWorkerPostMessage("addAllKeys", 0, {"targetName": target.getName(), "targetID": target.id}, callbackID);
                if (target == EntityLogic.playerEntity) {
                    EntityLogic.sendPlayerEntityUpdates();
                }
                break;
            }
            case "addAllWeapons": {
                if (!AbstractEntity.has(message["target"])) {
                    EntityLogic.gameWorkerPostMessage("addAllWeapons", 2, {}, callbackID);
                    break;
                }
                let target = AbstractEntity.get(message["target"]);
                for (let item in WeaponEntity.list()) {
                    target.addItem(WeaponEntity.get(item));
                }
                EntityLogic.gameWorkerPostMessage("addAllWeapons", 0, {"targetName": target.getName(), "targetID": target.id}, callbackID);
                if (target == EntityLogic.playerEntity) {
                    EntityLogic.sendPlayerEntityUpdates();
                }
                break;
            }
            case "addItem": {
                if (!AbstractEntity.has(message["target"])) {
                    EntityLogic.gameWorkerPostMessage("addItem", 2, {}, callbackID);
                    break;
                }
                if (!AbstractEntity.has(message["entityID"])) {
                    EntityLogic.gameWorkerPostMessage("addItem", 2, {}, callbackID);
                    break;
                }
                let target = AbstractEntity.get(message["target"]);
                if (!target.hasContainer()) {
                    EntityLogic.gameWorkerPostMessage("addItem", 1, {"targetName": target.getName(), "targetID": target.id}, callbackID);
                    break;
                }
                let entity = AbstractEntity.get(message["entityID"]);
                let amount = Number.parseInt(message["amount"]) || 1;
                if (entity instanceof ItemEntity) {
                    for (let i = 0; i < amount; i++) {
                        target.addItem(entity.createInstance());
                    }
                }
                else {
                    EntityLogic.gameWorkerPostMessage("addItem", 1, {"targetName": target.getName(), "targetID": target.id, "entityID": entity}, callbackID);
                    break;
                }
                EntityLogic.gameWorkerPostMessage("addItem", 0, {"targetName": target.getName(), "targetID": target.id, "amount": amount, "itemName": entity.getName(), "itemID": entity.id}, callbackID);
                if (target == EntityLogic.playerEntity) {
                    EntityLogic.sendPlayerEntityUpdates();
                }
                break;
            }
            case "addMoney": {
                let target = null;
                if (!AbstractEntity.has(message["target"])) {
                    EntityLogic.gameWorkerPostMessage("addMoney", 2, {}, callbackID);
                    break;
                }
                target = AbstractEntity.get(message["target"]);
                if (!target.hasOwnProperty("money")) {
                    EntityLogic.gameWorkerPostMessage("addMoney", 1, {"targetName": target.getName(), "targetID": target.id, "amount": target.money}, callbackID);
                    break;
                }
                let amount = Number.parseInt(message["amount"]) || 1;
                target.modifyMoney(amount);
                EntityLogic.gameWorkerPostMessage("addMoney", 0, {"targetName": target.getName(), "targetID": target.id, "amount": target.money}, callbackID);
                if (target == EntityLogic.playerEntity) {
                    EntityLogic.sendPlayerEntityUpdates();
                }
                break;
            }
            case "assignPlayerResponse": {
                Callback.run(callbackID, message);
                break;
            }
            case "clearCacheResponse": {
                Callback.run(callbackID, message);
                break;
            }
            case "connectTick": {
                EntityLogic.tickPort = event.ports[0];
                EntityLogic.tickPort.onmessage = EntityLogic.tickWorkerOnMessage;
                EntityLogic.gameWorkerPostMessage("connectedToTick", 0, "Connected to TickWorker", callbackID);
                break;
            }
            case "connectTransforms": {
                EntityLogic.transformsPort = event.ports[0];
                EntityLogic.transformsPort.onmessage = EntityLogic.transformsWorkerOnMessage;
                EntityLogic.gameWorkerPostMessage("connectedToTransforms", 0, "Connected to TransformsWorker", callbackID);
                break;
            }
            case "createCharacterResponse": {
                Callback.run(callbackID, message);
                break;
            }
            case "getCell": {
                if (Cell.has(message["cellID"])) {
                    EntityLogic.gameWorkerPostMessage("getCellResponse", 0, Cell.get(message["cellID"]).objectify(), callbackID);
                }
                break;
            }
            case "getCellResponse": {
                Callback.run(callbackID, message);
                break;
            }
            case "getCharacter": {
                if (!(message instanceof Array)) {
                    break;
                }
                let ids = {};
                message.forEach((entityID) => {
                    if (CharacterEntity.has(entityID)) {
                        ids[entityID] = CharacterEntity.get(entityID).stringify();
                    }
                });
                if (Object.keys(ids).length == 0) {
                    EntityLogic.gameWorkerPostMessage("getCharacterEntity", 1, null, callbackID);
                }
                else {
                    EntityLogic.gameWorkerPostMessage("getCharacterEntity", 0, ids, callbackID);
                }
                break;
            }
            case "getConditions": {
                if (!(message instanceof Object)) {
                    break;
                }
                if (!message.hasOwnProperty("entityID")) {
                    EntityLogic.gameWorkerPostMessage("getConditions", 2, null, callbackID);
                }
                if (CreatureEntity.has(message["entityID"])) {
                    EntityLogic.gameWorkerPostMessage("getConditions", 0, CreatureEntity.get(message["entityID"]).getConditions(), callbackID);
                }
                else {
                    EntityLogic.gameWorkerPostMessage("getConditions", 1, null, callbackID);
                }
                break;
            }
            case "getDialogue": {
                if (!(message instanceof Object)) {
                    break;
                }
                if (!Dialogue.has(message["dialogueID"])) {
                    EntityLogic.gameWorkerPostMessage("getDialogue", 1, null, callbackID);
                }
                let targetEntity = AbstractEntity.get(message["targetID"]);
                let actorEntity = AbstractEntity.get(message["actorID"]);
                let dialogue = Dialogue.get(message["dialogueID"]);
                EntityLogic.gameWorkerPostMessage("getDialogue", 0, dialogue.stringify(targetEntity, actorEntity), callbackID);
                break;
            }
            case "getDialogues": {
                if (!(message instanceof Object)) {
                    break;
                }
                let ids = {};
                let targetEntity = AbstractEntity.get(message["targetID"]);
                let actorEntity = AbstractEntity.get(message["actorID"]);
                message["dialogueID"].forEach((dialogueID) => {
                    if (Dialogue.has(dialogueID)) {
                        let dialogue = Dialogue.get(dialogueID);
                        ids[dialogueID] = dialogue.stringify(true, targetEntity, actorEntity);
                        for (let option in dialogue.options) {
                            let subDialogue = dialogue.options[option].dialogue;
                            ids[subDialogue.id] = subDialogue.stringify(true, targetEntity, actorEntity)
                        }
                    }
                });
                if (Object.keys(ids).length == 0) {
                    EntityLogic.gameWorkerPostMessage("getDialogue", 1, null, callbackID);
                }
                else {
                    EntityLogic.gameWorkerPostMessage("getDialogue", 0, ids, callbackID);
                }
                break;
            }
            case "getEntities": {
                if (!(message instanceof Array)) {
                    break;
                }
                let response = {};
                message.forEach((entityID) => {
                    if (AbstractEntity.has(entityID)) {
                        response[entityID] = AbstractEntity.get(entityID).objectify();
                    }
                });
                if (Object.keys(response).length == 0) {
                    EntityLogic.gameWorkerPostMessage("getEntities", 1, null, callbackID);
                }
                else {
                    EntityLogic.gameWorkerPostMessage("getEntities", 0, response, callbackID);
                }
                break;
            }
            case "getEntity": {
                if (!message.hasOwnProperty("entityID")) {
                    EntityLogic.gameWorkerPostMessage("getEntity", 2, null, callbackID);
                    break;
                }
                if (AbstractEntity.has(message["entityID"])) {
                    EntityLogic.gameWorkerPostMessage("getEntity", 0, AbstractEntity.get(message["entityID"]).objectify(), callbackID);
                }
                else {
                    EntityLogic.gameWorkerPostMessage("getEntity", 1, null, callbackID);
                }
                break;
            }
            case "getHeld":
            case "getEquipment": {
                if (!AbstractEntity.has(message["entityID"])) {
                    EntityLogic.gameWorkerPostMessage("getEquipment", 1, {}, callbackID);
                    break;
                }
                let obj = {};
                let entity = AbstractEntity.get(message["entityID"]);
                if (entity != 1 && entity.hasOwnProperty("equipment")) {
                    let entityObj = {};
                    entityObj["id"] = entity.id;
                    entityObj["controller"] = entity.id;
                    entityObj["equipment"] = AbstractEntity.objectifyProperty(entity.equipment);
                    entityObj["held"] = AbstractEntity.objectifyProperty(entity.held);
                    obj[entity.id] = entityObj;
                }
                EntityLogic.gameWorkerPostMessage("getEquipment", 0, obj, callbackID);
                break;
            }
            case "getInventory": {
                if (!AbstractEntity.has(message["entityID"])) {
                    EntityLogic.gameWorkerPostMessage("getInventory", 1, {}, callbackID);
                }
                let entity = AbstractEntity.get(message["entityID"]);
                if (!entity.hasContainer()) {
                    EntityLogic.gameWorkerPostMessage("getInventory", 0, {}, callbackID);
                }
                else {
                    EntityLogic.gameWorkerPostMessage("getInventory", 0, EntityLogic.generateInventoryResponse(entity), callbackID);
                }
                break;
            }
            case "getMoney": {
                let target = null;
                if (!AbstractEntity.has(message["target"])) {
                    EntityLogic.gameWorkerPostMessage("getMoney", 2, {}, callbackID);
                    break;
                }
                target = AbstractEntity.get(message["target"]);
                if (!target.hasOwnProperty("money")) {
                    EntityLogic.gameWorkerPostMessage("getMoney", 1, {"targetName": target.getName(), "targetID": target.id}, callbackID);
                    break;
                }
                EntityLogic.gameWorkerPostMessage("getMoney", 0, {"targetName": target.getName(), "targetID": target.id, "amount": target.money}, callbackID);
                break;
            }
            case "hasCell": {
                if (!message.hasOwnProperty("cellID")) {
                    EntityLogic.gameWorkerPostMessage("hasCell", 2, null, callbackID);
                    break;
                }
                if (Cell.has(message["cellID"])) {
                    EntityLogic.gameWorkerPostMessage("hasCell", 0, {"callID": message["cellID"], "hasCell":true}, callbackID);
                }
                else {
                    EntityLogic.gameWorkerPostMessage("hasCell", 0, {"callID": message["cellID"], "hasCell":false}, callbackID);
                }
                break;
            }
            case "hasCells": {
                let ids = {};
                message.forEach((entityID) => {
                    if (Cell.has(entityID)) {
                        ids[entityID] = true;
                    }
                    else {
                        ids[entityID] = false;
                    }
                });
                EntityLogic.gameWorkerPostMessage("hasCells", 0, ids, callbackID);
                break;
            }
            case "hasEntity": {
                if (!message.hasOwnProperty("entityID")) {
                    EntityLogic.gameWorkerPostMessage("hasEntity", 2, null, callbackID);
                    break;
                }
                if (AbstractEntity.has(message["entityID"])) {
                    EntityLogic.gameWorkerPostMessage("hasEntity", 0, {"callID": message["entityID"], "hasEntity":true}, callbackID);
                }
                else {
                    EntityLogic.gameWorkerPostMessage("hasEntity", 0, {"callID": message["entityID"], "hasEntity":false}, callbackID);
                }
                break;
            }
            case "hasEntities": {
                let ids = {};
                message.forEach((entityID) => {
                    if (AbstractEntity.has(entityID)) {
                        ids[entityID] = true;
                    }
                    else {
                        ids[entityID] = false;
                    }
                });
                EntityLogic.gameWorkerPostMessage("hasEntities", 0, ids, callbackID);
                break;
            }
            case "hasInstancedEntity": {
                let ids = {};
                message.forEach((entityID) => {
                    if (InstancedEntity.has(entityID)) {
                        ids[entityID] = true;
                    }
                    else {
                        ids[entityID] = false;
                    }
                });
                EntityLogic.gameWorkerPostMessage("hasInstancedEntity", 0, ids, callbackID);
                break;
            }
            case "hasInventory": {
                let ids = {};
                message.forEach((entityID) => {
                    if (Container.has(entityID)) {
                        ids[entityID] = true;
                    }
                    else {
                        ids[entityID] = false;
                    }
                });
                EntityLogic.gameWorkerPostMessage("hasInventory", 0, ids, callbackID);
                break;
            }
            case "hasItem": {
                let response = {"hasItem": false}
                if (!message.hasOwnProperty("target") || !AbstractEntity.has(message["target"])) {
                    EntityLogic.gameWorkerPostMessage("hasItem", 1, response, callbackID);
                    break;
                }
                if (!message.hasOwnProperty("entityID") || !AbstractEntity.has(message["entityID"])) {
                    EntityLogic.gameWorkerPostMessage("hasItem", 1, response, callbackID);
                    break;
                }
                let entity = AbstractEntity.get(message["target"]);
                let item = AbstractEntity.get(message["entityID"]);
                response["hasItem"] = entity.hasItem(item);
                EntityLogic.gameWorkerPostMessage("hasItem", 1, response, callbackID);
                break;
            }
            case "hasAvailableMesh": {
                break;
            }
            case "hasAvailableTexture": {
                break;
            }
            case "hasController": {
                break;
            }
            case "hasLoadedMesh": {
                break;
            }
            case "hasLoadedTexture": {
                break;
            }
            case "hasMesh": {
                break;
            }
            case "hasTexture": {
                break;
            }
            case "kill": {
                break;
            }
            case "loadCellResponse": {
                Callback.run(callbackID, message);
                break;
            }
            case "loadCellAndSetPlayerAt": {
                EntityLogic.loadCellAndSetPlayerAt(message["cellID"], message["position"], null, message["options"]);
                break;
            }
            case "loadEntitiesResponse": {
                Callback.run(callbackID, message);
                break;
            }
            case "loadPlayerAt": {
                EntityLogic.createPlayerAt(message["position"], message["options"], null, callbackID);
                break;
            }
            case "purgeCacheResponse": {
                Callback.run(callbackID, message);
                break;
            }
            case "removeController": {
                break;
            }
            case "setCachedCellResponse": {
                Callback.run(callbackID, message, true, true);
                break;
            }
            case "setCachedEntityResponse": {
                Callback.run(callbackID, message, true, true);
                break;
            }
            case "setController": {
                Callback.run(callbackID, message);
                break;
            }
            case "setDialogue": {
                if (!(message instanceof Object)) {
                    break;
                }
                let dialogue = Dialogue.get(message["dialogueID"]);
                let targetEntity = AbstractEntity.get(message["targetID"]);
                let actorEntity = AbstractEntity.get(message["actorID"]);
                
                if (dialogue == 1 || targetEntity == 1 || actorEntity == 1) {
                    EntityLogic.gameWorkerPostMessage("setDialogue", 1, null, callbackID);
                }
                else {
                    EntityLogic.gameWorkerPostMessage("setDialogue", 0, dialogue.stringify(targetEntity, actorEntity), callbackID);
                }
                break;
            }
            case "setMoney": {
                let target = null;
                if (!AbstractEntity.has(message["target"])) {
                    EntityLogic.gameWorkerPostMessage("setMoney", 2, {}, callbackID);
                    break;
                }
                target = AbstractEntity.get(message["target"]);
                if (!target.hasOwnProperty("money")) {
                    EntityLogic.gameWorkerPostMessage("setMoney", 1, {"targetName": target.getName(), "targetID": target.id, "amount": target.money}, callbackID);
                    break;
                }
                let amount = Number.parseInt(message["amount"]) || 1;
                target.setMoney(amount);
                EntityLogic.gameWorkerPostMessage("setMoney", 0, {"targetName": target.getName(), "targetID": target.id, "amount": target.money}, callbackID);
                if (target == EntityLogic.playerEntity) {
                    EntityLogic.sendPlayerEntityUpdates();
                }
                break;
            }
            case "setPlayer": {
                if (AbstractEntity.has(message["entityID"])) {
                    EntityLogic.setPlayerEntity(message["entityID"]);
                }
                break;
            }
            case "unassignPlayerResponse": {
                Callback.run(callbackID, message);
                break;
            }
            case "unloadCellResponse": {
                Callback.run(callbackID, message);
                break;
            }
            case "useNative": {
                EntityLogic.useNative = (message["useNative"] === true);
                break;
            }
        };
        console.groupEnd();
    }
    static setPlayerEntity(entityID = "", parentCallbackID = null) {
        if (!AbstractEntity.has(entityID)) {
            return 1;
        }
        EntityLogic.playerEntity = AbstractEntity.get(entityID);
        EntityLogic.gameWorkerPostMessage("getEntity", 0, EntityLogic.playerEntity.objectify(), parentCallbackID);
        EntityLogic.sendPlayerEntityUpdates();
        return 0;
    }
    static getPlayerEntity() {
        return EntityLogic.playerEntity;
    }
    static hasPlayerEntity() {
        return EntityLogic.playerEntity instanceof AbstractEntity;
    }
    static actionAttack(target, actor, weapon, parentCallbackID) {
        /** @type {string} UUIDv4 */
        let callbackID = Tools.genUUIDv4();
        Callback.create(callbackID, parentCallbackID, [target, actor, weapon], EntityLogic.actionAttackResponse);
        EntityLogic.transformsWorkerPostMessage("withinRange", 0, [target.id, actor.id, 1.5], callbackID);
        return 0;
    }
    static actionAttackResponse(target, actor, weapon, response, parentCallbackID) {
        let attackRoll = EntityLogic.calculateAttack(actor, weapon);
        if (attackRoll == 1) {
            EntityLogic.gameWorkerPostMessage("actionAttack", 0, AttackResponseEnum.MISS, Callback.get(parentCallbackID).parent);
        }
        else {
            let damageRoll = EntityLogic.calculateDamage(target, actor, weapon, attackRoll >= 20)*-1;
            target.modifyHealth(damageRoll)
            EntityLogic.gameWorkerPostMessage("updateEntity", 0, {"id":target.id, "health":target.getHealth()});
            if (target.getHealth() <= 0) {
                EntityLogic.gameWorkerPostMessage("doDeath", 0, {"controllerID": target.id});
            }
            EntityLogic.gameWorkerPostMessage("actionAttack", 0, AttackResponseEnum.FINISH, Callback.get(parentCallbackID).parent);
        }
        return 0;
    }
    static actionCast(target, actor, spell, parentCallbackID) {
        /** @type {string} UUIDv4 */
        let callbackID = Tools.genUUIDv4();
        Callback.create(callbackID, parentCallbackID, [target, actor, spell], EntityLogic.actionCastResponse);
        EntityLogic.transformsWorkerPostMessage("withinRange", 0, [target.id, actor.id, 1.5], callbackID);
        return 0;
    }
    static actionCastResponse(target, actor, spell, response, parentCallbackID) { //TODO: this
        let attackRoll = EntityLogic.calculateAttack(actor, spell);
        if (attackRoll == 1) {
            
        }
        else {
            let attackerDC = 8 + attacker.getSpellcastingAbilityModifier() + attacker.getProficiencyBonus(); // + any special modifiers
            let targetDC = target.getAbility(spell.savingAbility);
            if (attackerDC > targetDC) {
                EntityLogic.calculateDamageWithSpell(target, actor, spell, attackRoll >= 20);
            }
            else {

            }
        }
        return 0;
    }
    static actionLook(target, actor, parentCallbackID) {
        EntityLogic.gameWorkerPostMessage("actionLook", 0, target.generateDescription(), parentCallbackID);
        return 0;
    }
    static actionOpen(target, actor, parentCallbackID) {
        switch (target.getClassName()) {
            case "InstancedDoorEntity":
            case "DoorEntity": {
                EntityLogic.actionOpenDoor(target, actor, parentCallbackID);
                break;
            }
            case "InstancedFurnitureEntity":
            case "FurnitureEntity": {
                EntityLogic.actionOpenFurniture(target, actor, parentCallbackID);
                break;
            }
            case "CreatureEntity": {
                EntityLogic.actionOpenCreature(target, actor, parentCallbackID);
                break;
            }
        }
        return 0;
    }
    static actionOpenFurniture(target, actor, parentCallbackID) {
        let response = EntityLogic.generateActionOpenResponse(target, actor);
        if (response["isOpened"]) {
            target.setOpen();
        }
        if (target.hasContainer()) {
            EntityLogic.gameWorkerPostMessage("actionOpen", 0, response, parentCallbackID);
            let inventoryResponse = EntityLogic.generateInventoryResponse(target, actor);
            EntityLogic.gameWorkerPostMessage("getOtherInventory", 0, inventoryResponse, parentCallbackID);
        }
        else {
            EntityLogic.gameWorkerPostMessage("actionOpen", 0, response, parentCallbackID);
        }
        return 0;
    }
    static actionOpenContainer(target, actor, parentCallbackID) {
        let response = EntityLogic.generateActionOpenResponse(target, actor);
        EntityLogic.gameWorkerPostMessage("actionOpen", 0, response, parentCallbackID);
        let inventoryResponse = EntityLogic.generateInventoryResponse(target, actor);
        EntityLogic.gameWorkerPostMessage("getOtherInventory", 0, inventoryResponse, parentCallbackID);
        return 0;
    }
    /**
     * How morbid.
     * @param {CreatureController} target 
     * @param {EntityController} actor 
     * @param {string|null} parentCallbackID 
     */
    static actionOpenCreature(target, actor, parentCallbackID) {
        if (!target.hasContainer()) {
            return 0;
        }
        return 0;
    }
    static actionOpenDoor(target, actor, parentCallbackID) {
        let response = EntityLogic.generateActionOpenResponse(target, actor);
        if (response["isOpened"]) {
            if (target.hasTeleportMarker()) {
                EntityLogic.loadCellAndSetPlayerAt(target.teleportMarker.getCellID(), target.teleportMarker.position, target.teleportMarker.rotation);
            }
            else {
                target.setOpen();
            }
        }
        EntityLogic.gameWorkerPostMessage("actionOpen", 0, response, parentCallbackID);
        return 0;
    }
    static generateActionOpenResponse(target, actor) {
        let response = {"isOpened":false, "isLocked":false, "isBlocked": false, "justUnlocked": false, "soundEffects": []};
        
        if (target.isEntityLocked()) {
            if (actor.hasItem(target.getKey())) {
                response["isOpened"] = true;
                response["isLocked"] = false;
                response["justUnlocked"] = true;
                response["soundEffects"].push(target.getSoundEffect("unlock"));
                response["soundEffects"].push(target.getSoundEffect("open"));
            }
            else {
                response["isLocked"] = true;
                response["soundEffects"].push(target.getSoundEffect("unlockFailed"));
            }
        }
        else if (target.isBlocked()) {
            response["isBlocked"] = true;
            response["soundEffects"].push(target.getSoundEffect("stuck"));
        }
        else {
            response["isOpened"] = true;
            response["soundEffects"].push(target.getSoundEffect("open"));
        }
        return response;
    }
    static generateInventoryResponse(target, actor) {
        if (!target.hasContainer()) {
            return {};
        }
        return {
            "id": target.id,
            "entityType": target.entityType,
            "controller": target.id,
            "container": target.container.objectify(),
        }
    }
    static actionTake(target, actor, parentCallbackID) {
        /** @type {string} UUIDv4 */
        let callbackID = Tools.genUUIDv4();
        Callback.create(callbackID, parentCallbackID, [target, actor], EntityLogic.actionTakeResponse);
        EntityLogic.transformsWorkerPostMessage("withinRange", 0, [target.id, actor.id, 1.5], callbackID);
        return 0;
    }
    static actionTakeResponse(target, actor, response, callbackID) {
        actor.addItem(target);
        EntityLogic.gameWorkerPostMessage("removeItem", 0, target.id);
        if (target == EntityLogic.playerEntity || actor == EntityLogic.playerEntity) {
            EntityLogic.sendPlayerEntityUpdates();
        }
        return 0;
    }
    static actionTouch(target, actor, parentCallbackID) {
        EntityLogic.gameWorkerPostMessage("actionTouch", 0, target.getTouch(actor), parentCallbackID);
        return 0;
    }
    /**
     * 
     * @param {string} command 
     * @param {number} status 
     * @param {(Array<string>|object)} [message] 
     * @param {string} [callbackID] 
     * @param {object} [options] 
     */
    static gameWorkerPostMessage(command, status = 0, message, callbackID = null, options = null) {
        let obj = {"cmd": command, "sta": status, "msg": JSON.stringify(message)};
        if (callbackID) {
            obj["callbackID"] = callbackID;
        }
        if (options) {
            postMessage(obj, options);
        }
        else {
            postMessage(obj);
        }
        return 0;
    }
    static loadJSON(file, onload = null, onerror = null, onfinal = null) {
        if (EntityLogic.useNative) {
            return Tools.loadJSONNative(file, onload, onerror, onfinal);
        }
        return Tools.loadJSONBrowser(file, onload, onerror, onfinal);
    }
    static importScript(file, onload = null, onerror = null) {
        importScripts(file);
        return 0;
    }
    static importEffects() {
        return EntityLogic.importScript("../../json/effects.js");
    }
    static importClasses() {
        return EntityLogic.importScript("../../json/characterClasses.js");
    }
    static importConsumables() {
        return EntityLogic.importScript("../../json/consumables.js");
    }
    static importDialogues() {
        return EntityLogic.importScript("../../json/dialogues.js");
    }
    static importBooks() {
        return EntityLogic.importScript("../../json/books.js");
    }
    static setCellLocation(id, location) {
        EntityLogic.cellLocations[id] = location;
        return 0;
    }
    static setCellLocationsFromJSON(jsonBlob, callback = null) {
        for (let id in jsonBlob) {
            EntityLogic.setCellLocation(id, jsonBlob[id]);
        }
        EntityLogic.importingCellLocations = false;
        if (typeof callback == "function") {
            callback();
        }
        return 0;
    }
    static importCellLocations(jsonFile = "../../json/cells.json", callback = null) {
        EntityLogic.loadJSON(String(jsonFile), EntityLogic.setCellLocationsFromJSON, null, callback);
        return 0;
    }
    static importCells() {
        for (let id in EntityLogic.cellLocations) {
            EntityLogic.importCell(id);
        }
        return 0;
    }
    static importCell(id, callback = null) {
        if (!EntityLogic.cellLocations.hasOwnProperty(id)) {
            return 1;
        }
        EntityLogic.loadJSON(String("../../json/").concat(EntityLogic.cellLocations[id]), EntityLogic.importCellPhaseTwo, null, callback);
        return 0;
    }
    static importCellPhaseTwo(jsonBlob) {
        Cell.loadFromJSON(jsonBlob);
        return 0;
    }
    static importTeleportMarkers() {
        return EntityLogic.importScript("../../json/teleportMarkers.js");
    }
    static importItems() {
        return EntityLogic.importScript("../../json/items.js");
    }
    static importFurniture() {
        return EntityLogic.importScript("../../json/furniture.js");
    }
    static importPlants() {
        return EntityLogic.importScript("../../json/plants.js");
    }
    static importSpells() {
        return EntityLogic.importScript("../../json/spells.js");
    }
    static importCosmetics() {
        return EntityLogic.importScript("../../json/cosmetics.js");
    }
    static importCharacters() {
        return EntityLogic.importScript("../../json/characters.js");
    }

    static removeController(id) {
        EntityLogic.gameWorkerPostMessage("removeController", 0, {"controllerID": id}, null);
        return 0;
    }

    static createCell(cellID = "limbo", options = {}, parentCallbackID = null) {
        if (!Cell.has(cellID)) {
            cellID = "limbo";
        }
        if (EntityLogic.debugMode) console.log(`Running createCell(${cellID}, ..., ${parentCallbackID})`);
        EntityLogic.loadCell(cellID, Callback.create("createCellPhaseOne", parentCallbackID, [cellID, options], EntityLogic.createCellPhaseTwo));
        return 0;
    }
    static createCellPhaseTwo(cellID, options, response, parentCallbackID) {
        if (EntityLogic.debugMode) console.log(`Running createCellPhaseTwo(${cellID}, ..., ${parentCallbackID})`);
        EntityLogic.gameWorkerPostMessage("unassignPlayer", 0, null, Callback.create("unassignPlayerCallback-" + Tools.genUUIDv4(), parentCallbackID, [cellID, options], EntityLogic.createCellPhaseThree));
        return 0;
    }
    static createCellPhaseThree(cellID, options, response, parentCallbackID) {
        if (EntityLogic.debugMode) console.log(`Running createCellPhaseThree(${cellID}, ..., ${parentCallbackID})`);
        EntityLogic.gameWorkerPostMessage("unloadCell", 0, { "cellID": cellID }, Callback.create("unloadCellCallback-" + Tools.genUUIDv4(), parentCallbackID, [cellID, options], EntityLogic.createCellPhaseFour));
        return 0;
    }
    static createCellPhaseFour(cellID, options, response, parentCallbackID) {
        if (EntityLogic.debugMode) console.log(`Running createCellPhaseFour(${cellID}, ..., ${parentCallbackID})`);
        EntityLogic.gameWorkerPostMessage("clearCache", 0, null, Callback.create("clearCacheCallback-" + Tools.genUUIDv4(), parentCallbackID, [cellID, options], EntityLogic.createCellPhaseFive));
        return 0;
    }
    static createCellPhaseFive(cellID, options, response, parentCallbackID) {
        if (EntityLogic.debugMode) console.log(`Running createCellPhaseFive(${cellID}, ..., ${parentCallbackID})`);
        EntityLogic.gameWorkerPostMessage("setCachedCell", 0, Cell.get(cellID).objectify(), Callback.create("setCachedCellCallback-" + Tools.genUUIDv4(), parentCallbackID, [cellID, options], EntityLogic.createCellPhaseSix));
        return 0;
    }
    static createCellPhaseSix(cellID, options, response, parentCallbackID) {
        if (EntityLogic.debugMode) console.log(`Running createCellPhaseSix(${cellID}, ..., ${parentCallbackID})`);
        EntityLogic.gameWorkerPostMessage("loadCell", 0, { "cellID": cellID }, Callback.create("loadCellCallback-" + Tools.genUUIDv4(), parentCallbackID, [cellID, options], EntityLogic.createCellPhaseSeven));
        return 0;
    }
    static createCellPhaseSeven(cellID, options, response, parentCallbackID) {
        if (EntityLogic.debugMode) console.log(`Running createCellPhaseSeven(${cellID}, ..., ${parentCallbackID})`);
        EntityLogic.gameWorkerPostMessage("loadEntitiesByCellID", 0, { "cellID": cellID }, Callback.create("loadEntitiesCallback-" + Tools.genUUIDv4(), parentCallbackID, [cellID, options]));
        return 0;
    }

    static createPlayerAt(position, options, response, parentCallbackID) {
        if (EntityLogic.debugMode) console.log(`Running createPlayerAt(..., ${parentCallbackID})`);
        if (!EntityLogic.hasPlayerEntity()) {
            EntityLogic.setPlayerEntity("player");
        }
        EntityLogic.gameWorkerPostMessage("createCharacter", 0, { "instanceID": EntityLogic.playerEntity.id, "entityID": EntityLogic.playerEntity.id, "position": position, "options": {} }, Callback.create("createPlayerCharacter-" + Tools.genUUIDv4(), parentCallbackID, [position, options], EntityLogic.createPlayerAtPhaseTwo));
        return 0;
    }
    static createPlayerAtPhaseTwo(position, options, response, parentCallbackID) {
        if (EntityLogic.debugMode) console.log(`Running createPlayerAtPhaseTwo(..., parentCallbackID)`);
        EntityLogic.gameWorkerPostMessage("assignPlayer", 0, { "controllerID":EntityLogic.playerEntity.id }, Callback.create("assignPlayer-" + Tools.genUUIDv4(), parentCallbackID, [position, options]));
        return 0;
    }

    static unloadCell(cellID = EntityLogic.currentCell, parentCallbackID = null) {
        if (!Cell.has(cellID)) {
            return 1;
        }
        let cell = Cell.get(cellID);
        for (let i = 0; i < cell.instancedEntities.length; i++) {
            EntityLogic.removeController(cell.instancedEntities[i].id);
            AbstractEntity.get(entityID).dispose();
        }
        return 0;
    }
    static loadCellAndSetPlayerAt(cellID, position, rotation, options, parentCallbackID = null) {
        EntityLogic.createCell(
            cellID,
            options,
            Callback.create(
                null,
                parentCallbackID,
                [position, options],
                EntityLogic.createPlayerAt
            )
        );
        return 0;
    }
    /**
     * 
     * @param {string} cellID Cell ID
     * @param {(string|null)} parentCallbackID 
     */
    static loadCell(cellID, parentCallbackID = null) {
        if (!Cell.has(cellID)) {
            return 1;
        }
        let cell = Cell.get(cellID);
        EntityLogic.previousCell = EntityLogic.currentCell;
        EntityLogic.currentCell = cell;
        for (let i = 0; i < cell.furniture.length; i++) {
            //[instanceID, entityID, position, rotation, scaling, options]
            /** @type {InstancedFurnitureEntity} */
            let entity = FurnitureEntity.get(cell.furniture[i][1]).createInstance(cell.furniture[i][0]);
            entity.assign(cell.furniture[i][5], false);
        }
        for (let i = 0; i < cell.doors.length; i++) {
            //[entityID, name, teleportMarker, aMeshIDs, materialID, position, rotation, scaling, options]
            /** @type {DoorEntity} */
            let entity = new DoorEntity(cell.doors[i][0], cell.doors[i][1]);
            if (cell.doors[i][2] instanceof Array) {
                entity.setTeleportMarker(new TeleportMarker(...cell.doors[i][2]));
            }
            entity.setMeshIDs(cell.doors[i][3]);
            entity.setMaterialID(cell.doors[i][4]);
            entity.assign(cell.doors[i][8], false);
        }
        for (let i = 0; i < cell.lighting.length; i++) {
            //[instanceID, entityID, position, rotation, scaling, options]
            /** @type {InstancedLightingEntity} */
            let entity = LightingEntity.get(cell.lighting[i][1]).createInstance(cell.lighting[i][0]);
            entity.assign(cell.lighting[i][5], false);
        }
        for (let i = 0; i < cell.displays.length; i++) {
            //[instancedID, entityID, position, rotation, scaling, options]
            /** @type {InstancedDisplayEntity} */
            let entity = DisplayEntity.get(cell.displays[i][1]).createInstance(cell.displays[i][0])
            entity.assign(cell.displays[i][5], false);
        }
        for (let i = 0; i < cell.items.length; i++) {
            //[instanceID, entityID, position, rotation, scaling, options]
            /** @type {InstancedItemEntity} */
            let entity = ItemEntity.get(cell.items[i][1]).createInstance(cell.items[i][0]);
            entity.assign(cell.items[i][5], false);
        }
        for (let i = 0; i < cell.creatures.length; i++) {
            //[instanceID, entityID, position, rotation, scaling, options]
            /** @type {CreatureEntity} */
            if (typeof cell.characters[i][5] == "object") {
                if (cell.characters[i][5].hasOwnProperty("instanced") && cell.characters[i][5]["instanced"] == true) {
                    let entity = CreatureEntity.get(cell.creatures[i][1]).createInstance(cell.creatures[i][0]);
                    entity.assign(cell.creatures[i][5], false);
                }
            }
        }
        for (let i = 0; i < cell.characters.length; i++) {
            //[instanceID, entityID, position, rotation, scaling, options]
            /** @type {CharacterEntity} */
            if (typeof cell.characters[i][5] == "object") {
                if (cell.characters[i][5].hasOwnProperty("instanced") && cell.characters[i][5]["instanced"] == true) {
                    let entity = CharacterEntity.get(cell.characters[i][1]).createInstance(cell.characters[i][0]);
                    entity.assign(cell.creatures[i][5], false);
                }
            }
        }
        Callback.run(parentCallbackID);
        return 0;
    }
    /**
     * Creates a FurnitureEntity
     * @param {string} [id] Unique ID
     * @param {string} name Name
     * @param {string} [description] Description
     * @param {string} [iconID] Icon ID
     * @param {Array.<String>} aMeshIDs Array of Mesh IDs
     * @param {string} textureID Texture ID
     * @param {FurnitureEnum} furnitureType FurnitureEnum
     * @param {number} weight Weight in kilograms
     * @param {number} price Price, non-decimal
     */
    static createFurnitureEntity(id, name = "", description = "", iconID = "", aMeshIDs = ["missingMesh"], textureID = "missingMaterial", furnitureType = FurnitureEnum.NONE, weight = 1, price = 1) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        let entity = new FurnitureEntity(id, name, description, iconID, furnitureType);
        if (entity instanceof AbstractEntity) {
            entity.setMeshIDs(aMeshIDs);
            entity.setTextureID(textureID);
            entity.setPrice(price);
            entity.setWeight(weight);
            return entity;
        }
        return null;
    }
    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} [description] 
     * @param {string} [iconID] 
     * @param {Array.<String>} aMeshIDs 
     * @param {string} textureID 
     */
    static createLightingEntity(id = "", name = "", description = "", iconID = "", aMeshIDs = ["missingMesh"], textureID = "missingMaterial", lightingType = null, lightingPositionOffset = [0, 0, 0]) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        let entity = new LightingEntity(id, name, description, iconID, lightingType, lightingPositionOffset);
        if (entity instanceof AbstractEntity) {
            entity.setMeshIDs(aMeshIDs);
            entity.setTextureID(textureID);
            return entity;
        }
        return null;
    }
    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} [description] 
     * @param {string} [iconID] 
     * @param {Array.<String>} aMeshIDs 
     * @param {string} textureID 
     */
    static createDisplayEntity(id = "", name = "", description = "", iconID = "", aMeshIDs = ["missingMesh"], textureID = "missingMaterial") {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        let entity = new DisplayEntity(id, name, description, iconID);
        if (entity instanceof AbstractEntity) {
            entity.setMeshIDs(aMeshIDs);
            entity.setTextureID(textureID);
            return entity;
        }
        return null;
    }
    /**
     * Creates a PlantEntity
     * @param  {string} [id] Unique ID, auto-generated if none given
     * @param  {string} [name] Name
     * @param  {Array.<String>} [aMeshIDs] Array of Mesh IDs
     * @param  {string} [materialID] Texture ID
     * @param  {array} [stages] Stages
     * @param  {object} [options] Options
     * @return {PlantEntity} 
     */
    static createPlantEntity(id = "", name = "Plant",  description = "", iconID = "missingIcon", aMeshIDs = ["missingMesh"], materialID = "missingMaterial", plantType = PlantEnum.GRASS, stages = [], options = {}) {
        id = Tools.filterID(id);
        if ((id.length == 0)) {
            id = Tools.genUUIDv4();
        }
        if (EntityLogic.debugMode) console.log(`Running EntityLogic.createPlantEntity(${id}, ${name}, ${description}, ${iconID}, ${aMeshIDs}, ${materialID}, ${plantType}, ${stages})`);
        let entity = new PlantEntity(id, name, description, iconID, plantType, stages);
        if (entity instanceof AbstractEntity) {
            entity.setMeshIDs(aMeshIDs);
            entity.setMaterialID(materialID);
            entity.addStages(stages);
            return entity;
        }
        return null;
    }
    /**
     * Creates an ItemEntity
     * @param {string} [id] Unique ID, auto-generated if none given
     * @param {string} name Name
     * @param {string} [description] Description
     * @param {string} [iconID] Icon ID
     * @param {Array.<String>} aMeshIDs Array of Mesh IDs
     * @param {string} textureID Texture ID
     * @param {ItemEnum} itemType ItemEnum
     * @param {number} [subType] Dependant on itemType
     * @param {number} [weight] Weight in kilograms
     * @param {number} [price] Price, non-decimal
     * @returns {(ItemEntity|number)} An ItemEntity or an integer status code
     */
    static createItemEntity(id, name = "", description = "", iconID = "", aMeshIDs = ["missingMesh"], textureID = "missingMaterial", itemType = ItemEnum.GENERAL, subType = 0, weight = 1, price = 0) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        let entity = null;
        switch (itemType) {
            case ItemEnum.GENERAL: {
                entity = new ItemEntity(id, name, description, iconID);
                break;
            }
            case ItemEnum.APPAREL: {
                entity = new ClothingEntity(id, name, description, iconID, subType);
                break;
            }
            case ItemEnum.WEAPON: {
                entity = new WeaponEntity(id, name, description, iconID, subType);
                break;
            }
            case ItemEnum.SHIELDS: {
                entity = new ShieldEntity(id, name, description, iconID);
                break;
            }
            case ItemEnum.KEY: {
                entity = new KeyEntity(id, name, description, iconID);
                break;
            }
            case ItemEnum.BOOK: {
                entity = new BookEntity(id, name, description, iconID);
                break;
            }
            case ItemEnum.CONSUMABLE: {
                entity = new ConsumableEntity(id, name, description, iconID, subType);
                break;
            }
            default: {
                entity = new ItemEntity(id, name, description, iconID);
            }
        }
        if (entity instanceof AbstractEntity) {
            entity.setMeshIDs(aMeshIDs);
            entity.setTextureID(textureID);
            return entity;
        }
        return null;
    }
    /**
     * 
     * @param {string} id Unique ID, auto-generated if none given
     * @param {string} name Name
     * @param {string} [description] Description
     * @param {string} [iconID] Icon ID
     * @param {CreatureTypeEnum} [creatureType] Creature Type
     * @param {CreatureSubTypeEnum} [creatureSubType] Creature Sub-Type
     * @param {SexEnum} [sex] SexEnum
     * @param {number} [age] Age
     * @param {Array.<String>} aMeshIDs Array of mesh IDs
     * @param {string} materialID Material ID
     * @param {object} [options] Options
     */
    static createCharacterEntity(id = "", name = "", description = "", iconID = "genericCharacterIcon", creatureType = CreatureTypeEnum.HUMANOID, creatureSubType = CreatureSubTypeEnum.FOX, sex = SexEnum.MALE, age = 18, aMeshIDs = ["missingMesh"], materialID = "missingMaterial", options = {}) {
        id = Tools.filterID(id);
        if ((id.length == 0)) {
            id = Tools.genUUIDv4();
        }
        if (EntityLogic.debugMode) console.log(`Running EntityLogic.createCharacterEntity(${id}, ${name}, ${description}, ${iconID}, ${creatureType}, ${creatureSubType}, ${sex}, ${age}, ${aMeshIDs}, ${materialID})`);
        let characterEntity = new CharacterEntity(id, name, description, iconID, creatureType, creatureSubType, sex, age, undefined);
        let soulEntity = new SoulEntity(String(id).concat("Soul"), name, description);
        soulEntity.assign(characterEntity, false); // Assuming this soul is just initialized, copy over some needed properties from its body
        soulEntity.setCharisma(10);
        soulEntity.setIntelligence(10);
        soulEntity.setWisdom(10);
        characterEntity.setSoul(soulEntity, false); // Assign the body its soul, without updating its properties, because they've already been set
        if (typeof options == "object") {
            for (let i in options) {
                switch (i) {
                    case "eye":
                    case "eyes": {
                        characterEntity.setEyeType(options[i]);
                        break;
                    }
                    case "eyeColor":
                    case "eyesColor":
                    case "eyeColour":
                    case "eyesColour": {
                        characterEntity.setEyeColour(options[i]);
                        break;
                    }
                }
            }
        }
        if (aMeshIDs[0] == "missingMesh" || aMeshIDs[0] == undefined || aMeshIDs.length == 0) {
            if (characterEntity.getCreatureType() == CreatureTypeEnum.HUMANOID) {
                if (characterEntity.getCreatureSubType() == CreatureSubTypeEnum.FOX) {
                    if (characterEntity.getSex() == SexEnum.MALE) {
                        characterEntity.setMeshIDs(["foxM"]);
                    }
                    else {
                        characterEntity.setMeshIDs(["foxF"]);
                    }
                }
                else if (characterEntity.getCreatureSubType() == CreatureSubTypeEnum.SHEEP) {
                    if (characterEntity.getSex() == SexEnum.MALE) {
                        characterEntity.setMeshIDs(["sheepM"]);
                    }
                    else {
                        characterEntity.setMeshIDs(["sheepF"]);
                    }
                }
            }
            else if (characterEntity.getCreatureType() == CreatureTypeEnum.UNDEAD) {
                if (characterEntity.getCreatureSubType() == CreatureSubTypeEnum.SKELETON) {
                    characterEntity.setMeshIDs(["foxSkeletonN"]);
                }
            }
        }
        else {
            characterEntity.setMeshIDs(aMeshIDs);
        }
        if (materialID == "missingMaterial" || materialID == "missingTexture" || materialID == undefined) {
            /** @type {string} texture ID */
            let textureID = "missingTexture";
            if (characterEntity.getCreatureType() == CreatureTypeEnum.HUMANOID) {
                if (characterEntity.getCreatureSubType() == CreatureSubTypeEnum.FOX) {
                    textureID = "foxRed";
                }
                else if (characterEntity.getCreatureSubType() == CreatureSubTypeEnum.SHEEP) {
                    textureID = "sheepWhite";
                }
            }
            else if (characterEntity.getCreatureType() == CreatureTypeEnum.UNDEAD) {
                if (characterEntity.getCreatureSubType() == CreatureSubTypeEnum.SKELETONFOX) {
                    textureID = "bone01";
                }
            }
            characterEntity.setTextureID(textureID);
            characterEntity.setMaterialID(textureID);
        }
        else {
            characterEntity.setTextureID(materialID);
            characterEntity.setMaterialID(materialID);
        }
        return characterEntity;
    }
    /**
     * Creates a Cosmetic
     * @param {string} [id] Unique ID, auto-generated if none given
     * @param {string} name Name
     * @param {string} [description] Description
     * @param {string} [iconID] Icon ID
     * @param {Array.<String>} aMeshIDs Array of Mesh IDs
     * @param {string} textureID Texture ID
     * @param {ApparelSlotEnum} equipmentSlot ApparelSlotEnum
     * @returns {(Cosmetic|number)} A Cosmetic or an integer status code
     */
    static createCosmetic(id, name = "", description = "", iconID = "", aMeshIDs = ["missingMesh"], textureID = "missingMaterial", equipmentSlot = ApparelSlotEnum.HEAD) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        let cosmetic = new Cosmetic(id, name, description, iconID, aMeshIDs, textureID, equipmentSlot);
        if (cosmetic instanceof Cosmetic) {
            return cosmetic;
        }
        return null;
    }
    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} description 
     * @param {string} iconID 
     * @param {object} options 
     */
    static createEffect(id = "", name = "", description = "", iconID = "", options = {}) {
        let effect = new Effect(id, name, description, iconID);
        effect.assign(options);
        return effect;
    }
    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} description 
     * @param {string} iconID 
     * @param {Array.<String>} aMeshIDs 
     * @param {string} materialID 
     * @param {object} options 
     */
    static createSpell(id = "", name = "", description = "", iconID = "", aMeshIDs = [""], materialID = "", options = {}) {
        let spell = new SpellEntity(id, name, description, iconID);
        spell.setMeshIDs(aMeshIDs);
        spell.setMaterialID(materialID);
        spell.assign(options);
        return spell;
    }
    /**
     * 
     * @param {Effect} effect 
     * @param {AbstractEntity} target 
     * @param {AbstractEntity} actor 
     */
    static addScheduledEffect(effect, target, actor) {
        if (!(effect instanceof Effect)) {
            if (Effect.has(effect)) {
                effect = Effect.get(effect);
            }
            else {
                return 2;
            }
        }
        if (!(target instanceof AbstractEntity)) {
            if (AbstractEntity.has(target)) {
                target = AbstractEntity.get(target);
            }
            else {
                return 2;
            }
        }
        EntityLogic.tickWorkerPostMessage(
            "addScheduledEffect",
            0,
            [
                effect.id,
                target.id,
                effect.getDuration(),
                effect.getDurationInterval(),
                effect.getIntervalType(),
                effect.getIntervalNth(),
                effect.getPriority()
            ]
        );
    }
    /**
     * 
     * @param {Effect} effect 
     * @param {AbstractEntity} target 
     */
    static removeScheduledEffect(effect, target, actor) {
        if (!(effect instanceof Effect)) {
            if (Effect.has(effect)) {
                effect = Effect.get(effect);
            }
            else {
                return 2;
            }
        }
        if (!(target instanceof AbstractEntity)) {
            if (AbstractEntity.has(target)) {
                target = AbstractEntity.get(target);
            }
            else {
                return 2;
            }
        }
        EntityLogic.tickWorkerPostMessage(
            "removeScheduledEffect",
            0,
            [effect.id, target.id]
        );
    }
    static addScheduledCommand(addTick, target, commandString) {
        addTick = (Number.parseInt(addTick)|0) + EntityLogic.currentTick;
        return EntityLogic.setScheduledCommand(addTick, target, commandString);
    }
    static setScheduledCommand(scheduledTick = 0, target, commandString = "") {
        if (EntityLogic.debugMode) {console.group(`Running EntityLogic.setScheduledCommand(...)`)}
        scheduledTick = Number.parseInt(scheduledTick);
        if (scheduledTick <= EntityLogic.currentTick) {
            if (EntityLogic.debugMode) {console.error("Tick was below or at current tick; cannot use."); console.groupEnd();}
            return 1;
        }
        if (target instanceof AbstractEntity) {
            target = target.id;
        }
        else if (!AbstractEntity.has(target)) {
            if (EntityLogic.debugMode) {console.error(`Entity (${target}) doesn't exist.`); console.groupEnd();}
            return 1;
        }
        if (AbstractEntity.get(target).isDisabled()) {
            if (EntityLogic.debugMode) {console.warn(`Entity (${target}) is disabled and can't be used.`); console.groupEnd();}
            return 1;
        }
        commandString = String(commandString);
        if (commandString.length == 0) {
            if (EntityLogic.debugMode) {console.error("Command missing or invalid."); console.groupEnd();}
            return 1;
        }
        if (EntityLogic.debugMode) {
            console.log("Sending scheduled command with...");
            console.info(`tick: ${scheduledTick}`);
            console.info(`entity: ${target}`);
            console.info(`commandString: ${commandString}`);
            console.groupEnd();
        }
        EntityLogic.tickWorkerPostMessage(
            "setScheduledCommand",
            0,
            [scheduledTick, target, commandString]
        );
        return 0;
    }

    static calculateAttack(attacker, weapon = null, advantage = null) {
        let attackRoll = DND.roll(1, 20);
        if (advantage === true) {
            let tempRoll = DND.roll(1, 20);
            if (tempRoll > attackRoll) {
                attackRoll = tempRoll;
            }
        }
        else if (advantage === false) {
            let tempRoll = DND.roll(1, 20);
            if (tempRoll < attackRoll) {
                attackRoll = tempRoll;
            }
        }
        if (weapon instanceof InstancedWeaponEntity || weapon instanceof WeaponEntity) {
            if (attacker.hasProficiency(weapon)) {
                attackRoll += attacker.getProficiencyBonus();
            }
            if (weapon.isFinesse()) {
                if (attacker.getDexterity() > attacker.getStrength()) {
                    attackRoll += DND5E.calculateAbilityModifier(attacker.getDexterity());
                }
                else {
                    attackRoll += DND5E.calculateAbilityModifier(attacker.getStrength());
                }
            }
            else if (weapon.isRange()) {
                attackRoll += DND5E.calculateAbilityModifier(attacker.getDexterity());
            }
            else if (weapon.getWeaponCategory() == WeaponCategoryEnum.SIMPLE_MELEE || weapon.getWeaponCategory() == WeaponCategoryEnum.MARTIAL_MELEE) {
                attackRoll += DND5E.calculateAbilityModifier(attacker.getStrength());
            }
        }
        else if (weapon instanceof SpellEntity) {
            if (attacker.hasEquipmentInSlot("CHEST")) {
                if (!attacker.hasProficiencyInEquipmentSlot("CHEST")) {
                    attackRoll = 1;
                }
            }
            if (spell.hasComponent(SpellComponentEnum.VERBAL) && attacker.hasCondition(ConditionEnum.SILENCED)) {
                attackRoll = 1;
            }
            if (spell.hasComponent(SpellComponentEnum.SOMATIC)) {
                if (!attacker.hasFreeHand()) {
                    attackRoll = 1;
                }
                else if (!attacker.hasProficiencyInEquipmentSlot("FOREARM_L") && !attacker.hasProficiencyInEquipmentSlot("FOREARM_R")) {
                    attackRoll = 1;
                }
            }
            if (spell.hasComponent(SpellComponentEnum.MATERIAL)) {
                let hasMaterialComponents = true;
                spell.getMaterialComponents().forEach((itemEntity) => {
                    if (!attacker.hasItem(itemEntity)) {
                        hasMaterialComponents = false;
                    }
                });
                if (!hasMaterialComponents) {
                    attackRoll = 1;
                }
            }
            if (attackRoll != 1) {
                attackRoll += attacker.getSpellcastingAbilityModifier() + attacker.getProficiencyBonus();
            }
        }
        if (attackRoll > 20) {
            attackRoll = 20;
        }
        else if (attackRoll < 1) {
            attackRoll = 1;
        }
        return attackRoll;
    }
    static calculateDamage(target, attacker, weapon, critical = false) {
        let damageRoll = 0;
        if (weapon instanceof InstancedWeaponEntity || weapon instanceof WeaponEntity) {
            damageRoll = EntityLogic.calculateDamageWithWeapon(target, attacker, weapon, critical);
        }
        else if (weapon instanceof SpellEntity) {
            damageRoll = EntityLogic.calculateDamageWithSpell(target, attacker, weapon, critical);
        }
        else {
            damageRoll = EntityLogic.calculateDamageWithUnarmed(target, attacker, critical);
        }
        return damageRoll;
    }
    static calculateDamageWithWeapon(target, attacker, weapon, critical = false) {
        let damageRoll = 0;
        if (weapon.getHealth() == 0) { // It's basically an improvised weapon at this point
            damageRoll = DND.roll(1, 4); // roll 1d4
        }
        else {
            damageRoll = DND.roll(weapon.getDamageRollCount() * (critical ? 2 : 1), weapon.getDamageRoll());
            if (weapon.isFinesse()) {
                if (attacker.getDexterity() > attacker.getStrength()) {
                    damageRoll += DND5E.calculateAbilityModifier(attacker.getDexterity());
                }
                else {
                    damageRoll += DND5E.calculateAbilityModifier(attacker.getStrength());
                }
            }
            else {
                let weaponCategory = weapon.getWeaponCategory();
                if (weaponCategory == WeaponCategoryEnum.SIMPLE_RANGED) {
                    damageRoll += DND5E.calculateAbilityModifier(attacker.getDexterity());
                }
                else if (weaponCategory == WeaponCategoryEnum.MARTIAL_RANGED) {
                    damageRoll += DND5E.calculateAbilityModifier(attacker.getDexterity());
                }
                else if (weaponCategory == WeaponCategoryEnum.SIMPLE_MELEE) {
                    damageRoll += DND5E.calculateAbilityModifier(attacker.getStrength());
                }
                else if (weaponCategory == WeaponCategoryEnum.MARTIAL_MELEE) {
                    damageRoll += DND5E.calculateAbilityModifier(attacker.getStrength());
                }
            }
        }
        if (target.isImmuneTo(weapon.getDamageType())) {
            damageRoll = 0;
        }
        else if (target.isResistantTo(weapon.getDamageType())) {
            damageRoll /= 2;
        }
        else if (target.isVulnerableTo(weapon.getDamageType())) {
            damageRoll *= 2;
        }
        return damageRoll;
    }
    static calculateDamageWithSpell(target, attacker, spell, critical = false) {
        if (spell.getDamageType() != DamageEnum.NONE) { // TODO: increase spell damage based on various spell parameters
            damageRoll = DND.roll(spell.getDamageRollCount(), spell.getDamageRoll());
        }
        for (let priority in spell.getEffects()) {
            spell.getEffects()[priority].forEach((effectsObjects) => {
                for (let effectObject in effectsObjects) {
                    if (effectObject["targetType"] == TargetEnum.SELF) {
                        attacker.addEffect(effectObject["effect"], attacker, spell);
                    }
                    else {
                        target.addEffect(effectObject["effect"], attacker, spell);
                    }
                }
            });
        }
        return damageRoll;
    }
    static calculateDamageWithUnarmed(target, attacker, critical = false) {
        let damageRoll = 0;
        switch (attacker.getSize()) {
            case SizeEnum.FINE:
            case SizeEnum.DIMINUTIVE: { damageRoll = 0; }
            case SizeEnum.SMALL: { damageRoll = DND.roll(1, 2) }
            case SizeEnum.MEDIUM: { damageRoll = DND.roll(1, 3) }
            case SizeEnum.LARGE: { damageRoll = DND.roll(1, 4) }
            case SizeEnum.HUGE: { damageRoll = DND.roll(1, 6) }
            case SizeEnum.GARGANTUAN: { damageRoll = DND.roll(1, 8) }
            case SizeEnum.COLOSSAL: { damageRoll = DND.roll(2, 6) }
        }
        return damageRoll;
    }

    static sendPlayerEntityUpdates() {
        if (EntityLogic.debugMode) console.info(`Running EntityLogic.sendPlayerEntityUpdates`);
        EntityLogic.gameWorkerPostMessage("updateEntity", 0, EntityLogic.playerEntity.objectify());
        return 0;
    }
    static sendEntityUpdate(entityID, property = null) {
        if (EntityLogic.debugMode) console.group(`Running EntityLogic.sendEntityUpdate`);
        let entity = null;
        if (entityID instanceof AbstractEntity) {
            entity = entityID;
        }
        else if (AbstractEntity.has(entityID)) {
            entity = AbstractEntity.get(entityID);
        }
        else {
            if (EntityLogic.debugMode) {
                console.warn(`Entity id "${entityID}" not found`);
                console.groupEnd();
            }
            return 1;
        }
        if (property == null || !entity.hasOwnProperty(property)) {
            if (EntityLogic.debugMode) {
                console.info(`Entity id "${entityID.id}" lacks property "${String(property)}"`);
                console.groupEnd();
            }
            EntityLogic.gameWorkerPostMessage("updateEntity", 0, entity.objectify());
            return 0;
        }
        else if (entity.hasOwnProperty(property)) {
            if (EntityLogic.debugMode) {
                console.info(`Entity id "${entityID.id}" found with property "${String(property)}"`);
                console.groupEnd();
            }
            let obj = {"id":entity.id, "controller":entity.id};
            obj[property] = AbstractEntity.objectifyProperty(entity[property]);
            EntityLogic.gameWorkerPostMessage("updateEntity", 0, obj);
            return 0;
        }
        return 1;
    }
}
EntityLogic.initialize();