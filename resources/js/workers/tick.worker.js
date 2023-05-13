importScripts("../../../vendors/babylonjs/babylon.js", "../BabylonOverrides.js", "../Overrides.js", "../classes/Enum.js");
class SimpleEntity {
    constructor(id) {
        this.id = id;
        this.effects = new Set();
        this.instancedEffects = new Set();
        this.scheduledCommands = new Set();
        this.locked = false;
        this.enabled = true;
        SimpleEntity.set(id, this);
    }
    getID() {
        return this.id;
    }
    getEffects() {
        return this.effects;
    }
    addEffect(effect) {
        if (this.locked || !this.enabled) {
            return 1;
        }
        if (!(effect instanceof SimpleEffect)) {
            if (SimpleEffect.has(effect)) {
                effect = SimpleEffect.get(effect);
            }
            else {
                return 2;
            }
        }
        this.effects.add(effect);
        return 0;
    }
    removeEffect(effect, updateChild = false) {
        if (this.locked || !this.enabled) {
            return 1;
        }
        if (!(effect instanceof SimpleEffect)) {
            if (SimpleEffect.has(effect)) {
                effect = SimpleEffect.get(effect);
            }
            else {
                return 2;
            }
        }
        if (this.effects.has(effect)) {
            this.effects.delete(effect);
        }
        if (updateChild) {
            this.instancedEffects.forEach((instancedEffect) => {
                if (instancedEffect.getEntity() == effect) {
                    this.removeInstancedEffect(instancedEffect, false);
                }
            });
        }
        return 0;
    }
    addInstancedEffect(instancedEffect) {
        if (this.locked || !this.enabled) {
            return 1;
        }
        if (!(instancedEffect instanceof InstancedSimpleEffect)) {
            if (InstancedSimpleEffect.has(instancedEffect)) {
                instancedEffect = InstancedSimpleEffect.get(instancedEffect);
            }
            else {
                return 2;
            }
        }
        this.instancedEffects.add(instancedEffect);
        this.addEffect(instancedEffect.getEffect());
        return 0;
    }
    removeInstancedEffect(instancedEffect, updateChild = false) {
        if (this.locked || !this.enabled) {
            return 1;
        }
        if (!(instancedEffect instanceof InstancedSimpleEffect)) {
            if (InstancedSimpleEffect.has(instancedEffect)) {
                instancedEffect = InstancedSimpleEffect.get(instancedEffect);
            }
            else {
                return 2;
            }
        }
        this.instancedEffects.delete(instancedEffect);
        if (updateChild) {
            this.removeEffect(instancedEffect.getEffect(), false);
        }
        return 0;
    }
    findInstancedEffect(effect) {
        this.instancedEffects.forEach((instancedEffect) => {
            if (instancedEffect.getEffect() == effect) {
                return instancedEffect;
            }
        });
        return 1;
    }
    hasInstancedEffect(instancedEffect) {
        if (!(instancedEffect instanceof InstancedSimpleEffect)) {
            if (InstancedSimpleEffect.has(instancedEffect)) {
                instancedEffect = InstancedSimpleEffect.get(instancedEffect);
            }
            else {
                return false;
            }
        }
        return this.instancedEffects.has(instancedEffect);
    }
    getInstancedEffects() {
        return this.instancedEffects;
    }
    hasEffect(effect) {
        if (!(effect instanceof SimpleEffect)) {
            if (SimpleEffect.has(effect)) {
                effect = SimpleEffect.get(effect);
            }
            else {
                return false;
            }
        }
        return this.effects.has(effect);
    }
    dispose() {
        this.locked = true;
        this.enabled = false;
        this.instancedEffects.forEach((instancedEffect) => {
            instancedEffect.dispose();
        });
        SimpleEntity.remove(this.id);
    }
    static initialize() {
        SimpleEntity.simpleEntityList = new Map();
    }
    static set(id, simpleEntity) {
        SimpleEntity.simpleEntityList.set(id, simpleEntity)
        return 0;
    }
    static get(id) {
        return SimpleEntity.simpleEntityList.get(id);
    }
    static has(id) {
        return SimpleEntity.simpleEntityList.has(id);
    }
    static list() {
        return SimpleEntity.simpleEntityList;
    }
    static remove(id) {
        SimpleEntity.simpleEntityList.delete(id);
    }
}
SimpleEntity.initialize();
class SimpleEffect {
    constructor(id) {
        this.id = id;
        this.entities = new Set();
        this.instances = new Set();
        this.locked = true;
        this.enabled = true;
        SimpleEffect.set(this.id, this);
    }
    getID() {
        return this.id;
    }
    getInstances() {
        return this.instances;
    }
    addEntity(entity) {
        if (!(entity instanceof SimpleEntity)) {
            if (SimpleEntity.has(entity)) {
                entity = SimpleEntity.get(entity);
            }
            else {
                return 2;
            }
        }
        if (entity.locked) {
            return 0;
        }
        this.entities.add(entity);
        return 0;
    }
    removeEntity(entity, updateChild) {
        if (!(entity instanceof SimpleEntity)) {
            if (SimpleEntity.has(entity)) {
                entity = SimpleEntity.get(entity);
            }
            else {
                return 2;
            }
        }
        if (updateChild) {
            if (entity.hasEffect(this)) {
                entity.findInstancedEffect(this).dispose();
            }
        }
        this.entities.delete(entity);
        return 0;
    }
    addInstance(instance) {
        if (!(instance instanceof InstancedSimpleEffect)) {
            if (InstancedSimpleEffect.has(instance)) {
                instance = InstancedSimpleEffect.get(instance);
            }
            else {
                return 2;
            }
        }
        this.instances.add(instance);
        return 0;
    }
    removeInstance(instance, updateChild = false) {
        if (!(instance instanceof InstancedSimpleEffect)) {
            if (InstancedSimpleEffect.has(instance)) {
                instance = InstancedSimpleEffect.get(instance);
            }
            else {
                return 2;
            }
        }
        if (updateChild) {
            this.removeEntity(instance.getEntity(), false);
        }
        this.instances.delete(instance);
        return 0;
    }
    createInstance(entity, duration, durationInterval = IntervalEnum.TICK, intervalType = IntervalEnum.TICK, intervalNth = 1, priority = 1000, startTick = Tick.currentTick) {
        if (!this.enabled) {
            return 1;
        }
        let instancedEffect = new InstancedSimpleEffect(this, entity, duration, durationInterval, intervalType, intervalNth, priority, startTick);
        return instancedEffect;
    }
    dispose() {
        this.locked = true;
        this.enabled = false;
        this.instances.forEach((instance) => {
            instance.dispose();
        });
        return undefined;
    }
    static initialize() {
        SimpleEffect.simpleEffectList = new Map();
    }
    static set(id, simpleEffect) {
        SimpleEffect.simpleEffectList.set(id, simpleEffect)
        return 0;
    }
    static get(id) {
        return SimpleEffect.simpleEffectList.get(id);
    }
    static has(id) {
        return SimpleEffect.simpleEffectList.has(id);
    }
    static list() {
        return SimpleEffect.simpleEffectList;
    }
    static remove(id) {
        SimpleEffect.simpleEffectList.delete(id);
    }
}
SimpleEffect.initialize();
class InstancedSimpleEffect {
    constructor(effect, entity, duration, durationInterval = IntervalEnum.TICK, intervalType = IntervalEnum.TICK, intervalNth = 1, priority = 1000, startTick = Tick.currentTick) {
        if (!(effect instanceof SimpleEffect)) {
            if (SimpleEffect.has(effect)) {
                effect = SimpleEffect.get(effect);
            }
            else {
                return undefined;
            }
        }
        if (!(entity instanceof SimpleEntity)) {
            if (SimpleEntity.has(entity)) {
                entity = SimpleEntity.get(entity);
            }
            else {
                return undefined;
            }
        }
        this.effect = effect;
        this.entity = entity;
        this.id = String(this.effect.id).concat((this.entity.id).capitalize());
        this.duration = duration;
        this.durationInterval = durationInterval;
        this.intervalType = intervalType;
        this.intervalNth = intervalNth;
        this.priority = priority;
        this.start = startTick;
        this.expiration = this.duration + this.start;
        InstancedSimpleEffect.set(this.id, this);
        this.entity.addInstancedEffect(this);
        this.effect.addInstance(this);
    }
    getID() {
        return this.id;
    }
    getEffect() {
        return this.effect;
    }
    getEntity() {
        return this.entity;
    }
    getDuration() {
        return this.duration;
    }
    getStart() {
        return this.start;
    }
    getExpiration() {
        return this.expiration;
    }
    getDurationInterval() {
        return this.durationInterval;
    }
    getIntervalType() {
        return this.intervalType;
    }
    getIntervalNth() {
        return this.intervalNth;
    }
    getPiority() {
        return this.priority;
    }
    expiresAtTick(tick = Tick.currentTick) {
        return tick >= this.expiration;
    }
    triggersAtTick(tick = Tick.currentTick) {
        if (tick > this.expiration) {
            return false;
        }
        return Math.abs(tick - (this.start + this.duration)) % this.intervalNth == 0;
    }
    reapply(tick = Tick.currentTick) {
        this.start = tick;
        this.expiration = this.duration + this.start;
    }
    dispose() {
        this.entity.removeInstancedEffect(this, true);
        this.effect.removeInstance(this, true);
        InstancedSimpleEffect.remove(this.id);
    }

    static initialize() {
        InstancedSimpleEffect.instancedSimpleEffectList = new Map();
    }
    static set(id, simpleEffectInstance) {
        InstancedSimpleEffect.instancedSimpleEffectList.set(id, simpleEffectInstance)
        return 0;
    }
    static get(id) {
        return InstancedSimpleEffect.instancedSimpleEffectList.get(id);
    }
    static has(id) {
        return InstancedSimpleEffect.instancedSimpleEffectList.has(id);
    }
    static list() {
        return InstancedSimpleEffect.instancedSimpleEffectList;
    }
    static remove(id) {
        InstancedSimpleEffect.instancedSimpleEffectList.delete(id);
    }
}
InstancedSimpleEffect.initialize();
class Tick {
    static initialize() {
        Tick.debugMode = false;
        /*
        $ let worker = new Worker("/resources/js/workers/tick.worker.js")
        undefined
        $ worker.addEventListener('message', function(event) {console.log(event)}, false)
        undefined
        $ worker.postMessage({cmd:"getTCount"})
        undefined
        [MessageEvent].data.{...}
        */
        Tick.currentTime = 1499088900; // Seconds, 10 digits; not milliseconds, 13 digits
        Tick.currentTick = 0;
        Tick.currentTurn = 0;
        Tick.currentRound = 0;
        Tick.incrementor = 1;
        Tick.gameTimeMultiplier = 10; // in-game seconds per second
        Tick.ticksPerTurn = 10;
        Tick.turnsPerRound = 6;
        Tick.turnTime = Tick.ticksPerTurn * Tick.gameTimeMultiplier;
        Tick.roundTime = Tick.turnTime * Tick.turnsPerRound;
        Tick.tickInterval = null;
        Tick.tickIntervalCount = 1000 / Tick.gameTimeMultiplier;
        Tick.paused = false;
        Tick.entityLogicPort = null;
        /**
         * Map<number, Array[{effectID, entityID}]>; map of ticks to arrays of effects and entities
         * @type {Map} 
         */
        Tick.scheduledEffects = new Map();
        /**
         * Map<number, Array[{effectID, entityID}]>; map of intervals to arrays of effects and entities
         */
        Tick.effectsPerNthTick = new Map();
        Tick.effectsPerNthTurn = new Map();
        Tick.effectsPerNthRound = new Map();
        Tick.effectsExpirationTick = new Map();
        /**
         * Object<number, Object<entityID, string>>; map of ticks to arrays of entities and strings(commands)
         */
        Tick.scheduledCommands = {};
        Tick.start();
        addEventListener('message', Tick.gameWorkerOnMessage, false);
    }
    static tick() {
        Tick.currentTime += Tick.incrementor;
        Tick.sendTimestamp();
        if (Tick.currentTime % Tick.roundTime == 0) { // Round
            Tick.currentRound++;
            Tick.sendRound();
            Tick.sendEntityTogglerRequest();
        }
        if (Tick.currentTime % Tick.turnTime == 0) { // Turn
            Tick.currentTurn++;
            Tick.sendTurn();
        }
        if (Tick.currentTime % Tick.gameTimeMultiplier == 0) { // Tick
            Tick.currentTick++;
            Tick.sendTick();
            Tick.triggerScheduledCommands();
            Tick.triggerScheduledEffects();
            Tick.removeScheduledEffectsByTick(Tick.currentTick); // effects are triggered first when they're applied; so they should be removed during their final tick
        }
        return 0;
    }
    static stop() {
        Tick.paused = true;
        clearInterval(Tick.tickInterval);
        return 0;
    }
    static start() {
        Tick.tickInterval = setInterval(Tick.tick, Tick.tickIntervalCount);
        Tick.paused = false;
    }
    static sendTick() {
        return Tick.broadcastMessage("tick", 0, [Tick.currentTick]);
    }
    static sendTurn() {
        return Tick.broadcastMessage("turn", 0, [Tick.currentTurn]);
    }
    static sendRound() {
        return Tick.broadcastMessage("round", 0, [Tick.currentRound]);
    }
    static sendEntityTogglerRequest() {
        return Tick.gameWorkerPostMessage("entityToggler", 0);
    }
    static sendInfo() {
        return Tick.broadcastMessage("sendInfo", 0, [Tick.currentTime, Tick.gameTimeMultiplier, Tick.ticksPerTurn, Tick.turnsPerRound, Tick.turnTime, Tick.roundTime]);
    }
    static sendDate() {
        return Tick.broadcastMessage("sendDate", 0, [new Date(Tick.currentTime * 1000)]);
    }
    static sendTimestamp() {
        return Tick.broadcastMessage("sendTimestamp", 0, [Tick.currentTime]);
    }
    static sendPaused() {
        return Tick.broadcastMessage("sendPaused", 0, [Tick.paused]);
    }
    /**
     * 
     * @param {string} effectID 
     * @param {string} abstractEntityID 
     * @param {number} duration Duration in nth as specified by durationInterval; rendered down to ticks
     * @param {IntervalEnum} durationInterval Interval of the duration
     * @param {IntervalEnum} intervalType Interval in which the effect is applied during its duration
     * @param {number} intervalNth Every nth of the intervalType the effect is applied
     */
    static addScheduledEffect(effectID, abstractEntityID, duration, durationInterval = IntervalEnum.TICK, intervalType = IntervalEnum.TICK, intervalNth = 1, priority = 1000) {
        console.info(`Running addScheduledEffect(${effectID}, ${abstractEntityID}, ${duration}, ${durationInterval}, ${intervalType}, ${intervalNth})`);
        console.group("Adding Scheduled Effect");
        // TODO: have the effect be a sub-index; Map<number, Map<string, Array[{}]>>
        // TODO: ^, and AbstractEntityID
        if (durationInterval == IntervalEnum.ONCE) {
            console.info(`Duration is one-and-done; no need.`);
            console.groupEnd();
            return 0;
        }
        else if (durationInterval == IntervalEnum.TURN) {
            duration = duration * Tick.ticksPerTurn;
            durationInterval = 1;
        }
        else if (durationInterval == IntervalEnum.ROUND) {
            duration = duration * Tick.ticksPerTurn * Tick.turnsPerRound;
            durationInterval = 1;
        }

        let effect = null;
        if (!SimpleEffect.has(effectID)) {
            effect = new SimpleEffect(effectID);
        }
        else {
            effect = SimpleEffect.get(effectID);
        }
        if (!(effect instanceof SimpleEffect)) {
            console.warn(`Effect (${effectID}) could not be created.`);
            console.groupEnd();
            return 2;
        }
        else if (!effect.enabled) {
            console.warn(`Effect (${effect.id}) is disabled, so it cannot by used.`);
            console.groupEnd();
            return 1;
        }

        let entity = null;
        if (!SimpleEntity.has(abstractEntityID)) {
            entity = new SimpleEntity(abstractEntityID);
        }
        else {
            entity = SimpleEntity.get(abstractEntityID);
        }
        if (!(entity instanceof SimpleEntity)) {
            console.warn(`Entity (${abstractEntityID}) could not be created.`);
            console.groupEnd();
            return 2;
        }
        else if (!entity.enabled) {
            console.warn(`Entity (${entity.id}) is disabled, so it cannot be used.`);
            console.groupEnd();
            return 1;
        }

        let effectInstance = null;
        let entityHasEffect = entity.hasEffect(effect);
        if (entityHasEffect) {
            effectInstance = entity.findInstancedEffect(effect);
            if (!(effectInstance instanceof InstancedSimpleEffect)) {
                console.warn(`Could not find Entity's (${entity.id}) instance of Effect (${effect.id}).`);
                console.groupEnd();
                return 2;
            }
            let previousExpiration = previousEffectInstance.getExpiration();
            if (Tick.scheduledEffects.has(previousExpiration)) {
                Tick.scheduledEffects.get(previousExpiration).remove(effectInstance);
            }
            effectInstance.reapply();
        }
        else {
            effectInstance = effect.createInstance(Tick.entity, Tick.duration, Tick.durationInterval, Tick.intervalType, Tick.intervalNth, Tick.priority, Tick.currentTick);
        }

        if (!Tick.scheduledEffects.has(effectInstance.getExpiration())) {
            Tick.scheduledEffects.set(effectInstance.getExpiration(), []);
        }
        Tick.scheduledEffects.get(effectInstance.getExpiration()).push(effectInstance);

        if (intervalType == IntervalEnum.TICK) { // IntervalEnum.TICK default
            if (!Tick.effectsPerNthTick.has(intervalNth)) {
                Tick.effectsPerNthTick.set(intervalNth, []);
            }
            if (!entityHasEffect) {
                Tick.effectsPerNthTick.get(intervalNth).push(effectInstance);
            }
        }
        else if (intervalType == IntervalEnum.TURN) { // IntervalEnum.TURN
            if (!Tick.effectsPerNthTurn.has(intervalNth)) {
                Tick.effectsPerNthTurn.set(intervalNth, []);
            }
            if (!entityHasEffect) {
                Tick.effectsPerNthTurn.get(intervalNth).push(effectInstance);
            }
        }
        else if (intervalType == IntervalEnum.ROUND) { // IntervalEnum.ROUND
            if (!Tick.effectsPerNthRound.has(intervalNth)) {
                Tick.effectsPerNthRound.set(intervalNth, []);
            }
            if (!entityHasEffect) {
                Tick.effectsPerNthRound.get(intervalNth).push(effectInstance);
            }
        }
        console.groupEnd();
        return 0;
    }
    static removeScheduledEffect(effect, entity = undefined) {
        if (!(effect instanceof SimpleEffect)) {
            if (SimpleEffect.has(effect)) {
                effect = SimpleEffect.get(effect);
            }
            else {
                return 1;
            }
        }
        if (!(entity instanceof SimpleEntity) && entity != undefined) {
            if (SimpleEntity.has(entity)) {
                entity = SimpleEntity.get(entity);
            }
            else {
                return 1;
            }
        }
        console.info(`Running removeScheduledEffect(${effect.id}, ${entity instanceof SimpleEntity ? entity.id : "undefined"})`);
        if (entity instanceof SimpleEntity) {
            if (!entity.hasEffect(effect)) {
                return 0;
            }
            if (effect.getInstances().size < entity.getEffects().size) {
                effect.getInstances().forEach((instancedEffect) => {
                    if (instancedEffect.getEntity() == entity) {
                        removeInstancedEffect(instancedEffect);
                        return true;
                    }
                });
            }
            else {
                entity.getInstancedEffects().forEach((instancedEffect) => {
                    if (instancedEffect.getEffect() == effect) {
                        removeInstancedEffect(instancedEffect);
                        return true;
                    }
                });
            }
        }
        else {
            removeEffect(effect);
        }
        return 0;
    }
    static removeScheduledEffectsByTick(tick) {
        if (!Tick.scheduledEffects.has(tick)) {
            return 0;
        }
        console.info(`Running removeScheduledEffectsByTick(${tick})`);
        Tick.effectsPerNthTick.forEach((array, intervalNth) => {
            array.forEach(instancedEffect => {
                removeInstancedEffect(instancedEffect);
            });
        });
        if (Tick.scheduledEffects.has(tick)) {
            Tick.scheduledEffects.get(tick).clear();
            Tick.scheduledEffects.delete(tick);
        }
    }
    static removeInstancedEffect(instancedEffect) {
        if (!(instancedEffect instanceof InstancedSimpleEffect)) {
            if (InstancedSimpleEffect.has(instancedEffect)) {
                instancedEffect = InstancedSimpleEffect.get(instancedEffect);
            }
            else {
                return 1;
            }
        }
        console.info(`Running removeInstancedEffect(${instancedEffect.id})`);
        let effectExpiration = instancedEffect.getExpiration();
        if (!Tick.scheduledEffects.has(effectExpiration)) {
            return 1;
        }
        Tick.scheduledEffects.get(effectExpiration).remove(instancedEffect);
        if (Tick.scheduledEffects.get(effectExpiration).length == 0) {
            Tick.scheduledEffects.delete(effectExpiration);
        }
        let effectInterval = instancedEffect.getIntervalType();
        let effectIntervalNth = instancedEffect.getIntervalNth();
        if (effectInterval == IntervalEnum.TICK) {
            Tick.effectsPerNthTick.get(effectIntervalNth).remove(instancedEffect);
            if (Tick.effectsPerNthTick.get(effectIntervalNth).length == 0) {
                Tick.effectsPerNthTick.delete(effectIntervalNth);
            }
        }
        else if (effectInterval == IntervalEnum.TURN) {
            Tick.effectsPerNthTurn.get(effectIntervalNth).remove(instancedEffect);
            if (Tick.effectsPerNthTurn.get(effectIntervalNth).length == 0) {
                Tick.effectsPerNthTurn.delete(effectIntervalNth);
            }
        }
        else if (effectInterval == IntervalEnum.ROUND) {
            Tick.effectsPerNthRound.get(effectIntervalNth).remove(instancedEffect);
            if (Tick.effectsPerNthRound.get(effectIntervalNth).length == 0) {
                Tick.effectsPerNthRound.delete(effectIntervalNth);
            }
        }
        postMessage({"cmd":"removeScheduledEffect", "sta":0, "msg":[instancedEffect.effect.id, instancedEffect.entity.id]});
        instancedEffect.dispose();
        return 0;
    }
    static removeEffect(effect) {
        if (!(effect instanceof SimpleEffect)) {
            if (SimpleEffect.has(effect)) {
                effect = SimpleEffect.get(effect);
            }
            else {
                return 1;
            }
        }
        console.info(`Running removeEffect(${effect.id})`);
        effect.enabled = false;
        effect.getInstances().forEach((instancedEffect) => {
            removeInstancedEffect(instancedEffect);
        });
        effect.dispose();
    }
    static removeEntity(entity) {
        if (!(entity instanceof SimpleEntity) && entity != undefined) {
            if (SimpleEntity.has(entity)) {
                entity = SimpleEntity.get(entity);
            }
            else {
                return 1;
            }
        }
        console.info(`Running removeEntity(${entity.id})`);
        entity.locked = true;
        entity.enabled = false;
        entity.getInstancedEffects().forEach((instancedEffect) => {
            removeInstancedEffect(instancedEffect);
        });
        entity.dispose();
        return 0;
    }
    static cleanScheduledEffects() {
        console.info(`Running cleanScheduledEffects()`);
        Tick.scheduledEffects.forEach((array, tick) => {
            if (tick < Tick.currentTick - 1) {
                removeScheduledEffectsByTick(tick);
            }
        });
        Tick.effectsPerNthTick.forEach((array, intervalNth) => {
            if (array.length == 0) {
                Tick.effectsPerNthTick.delete(intervalNth);
            }
        });
        Tick.effectsPerNthTurn.forEach((array, intervalNth) => {
            if (array.length == 0) {
                Tick.effectsPerNthTurn.delete(intervalNth);
            }
        });
        Tick.effectsPerNthRound.forEach((array, intervalNth) => {
            if (array.length == 0) {
                Tick.effectsPerNthRound.delete(intervalNth);
            }
        });
    }
    static triggerScheduledEffects() {
        Tick.effectsPerNthTick.forEach((array, intervalNth) => {
            let effectsToTrigger = {};
            array.forEach((instancedEffect) => {
                if (instancedEffect.triggersAtTick(Tick.currentTick)) {
                    if (!effectsToTrigger.hasOwnProperty(instancedEffect.priority)) {
                        effectsToTrigger[instancedEffect.priority] = [];
                    }
                    effectsToTrigger[instancedEffect.priority].push({0:instancedEffect.effect.id, 1:instancedEffect.entity.id})
                }
            });
            for (let priority in effectsToTrigger) {
                effectsToTrigger[priority].forEach((entry) => {
                    console.info(`Triggering InstancedEffect (${entry[0]}) for Entity (${entry[1]})`);
                    sendScheduledEffect(entry[0], entry[1]);
                });
            }
        });
    }
    static sendScheduledEffect(effectID, abstractEntityID) {
        return Tick.entityLogicWorkerPostMessage("triggerScheduledEffect", 0, [effectID, abstractEntityID]);
    }
    static addScheduledCommand(addTick, abstractEntityID, commandString) {
        addTick += Tick.currentTick;
        return setScheduledCommand(addTick, abstractEntityID, commandString);
    }
    static setScheduledCommand(scheduledTick, abstractEntityID, commandString) {
        if (Tick.scheduledCommands[scheduledTick] == undefined) {
            Tick.scheduledCommands[scheduledTick] = {};
        }
        if (Tick.scheduledCommands[scheduledTick][abstractEntityID] == undefined) {
            Tick.scheduledCommands[scheduledTick][abstractEntityID] = [];
        }
        Tick.scheduledCommands[scheduledTick][abstractEntityID].push(commandString);
        return 0;
    }
    static triggerScheduledCommands() {
        if (!Tick.scheduledCommands.hasOwnProperty(Tick.currentTick)) {
            return 0;
        }
        let currentCommands = Tick.scheduledCommands[Tick.currentTick];
        for (let abstractEntityID in currentCommands) {
            if (currentCommands[abstractEntityID].length > 0) {
                currentCommands[abstractEntityID].forEach((commandString) => {
                    sendScheduledCommand(abstractEntityID, commandString);
                });
                currentCommands[abstractEntityID].clear();
            }
            delete currentCommands[abstractEntityID];
        }
        delete Tick.scheduledCommands[Tick.currentTick];
        return 0;
    }
    static cleanScheduledCommands() {
        for (let i in Tick.scheduledCommands) {
            if (i < Tick.currentTick) {
                delete Tick.scheduledCommands[i];
            }
        }
        return 0;
    }
    static sendScheduledCommand(abstractEntityID, commandString) {
        Tick.entityLogicWorkerPostMessage("triggerScheduledCommand", 0, [commandString, abstractEntityID]);
        return 0;
    }
    static broadcastMessage(command, status = 0, message, callbackID = null, options = null) {
        Tick.entityLogicWorkerPostMessage(command, status, message, null, options);
        Tick.gameWorkerPostMessage(command, status, message, callbackID, options);
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
    static entityLogicWorkerPostMessage(command, status = 0, message, callbackID = null, options = null) {
        let obj = {"cmd": command, "sta": status, "msg": message};
        if (callbackID) {
            obj["callbackID"] = callbackID;
        }
        if (options) {
            Tick.entityLogicPort.postMessage(obj, options);
        }
        else {
            Tick.entityLogicPort.postMessage(obj);
        }
        return 0;
    }
    static entityLogicWorkerOnMessage(event) {
        let status = event.data["sta"];
        let callbackID = event.data["callbackID"];
        let message = event.data["msg"];
        switch (message) {
            case "": {
                break;
            }
        }
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
        let obj = {"cmd": command, "sta": status, "msg": message};
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
    static gameWorkerOnMessage(event) {
        let status = event.data["sta"];
        let callbackID = event.data["callbackID"];
        let message = event.data["msg"];
        switch (event.data["cmd"]) {
            case "connectEntityLogic": {
                Tick.entityLogicPort = event.ports[0];
                Tick.entityLogicPort.onmessage = Tick.entityLogicWorkerOnMessage;
                Tick.gameWorkerPostMessage("connectedToEntityLogic", 0, "Connected to EntityLogicWorker", callbackID);
                break;
            }
            case "getInfo": {
                sendInfo();
                break;
            }
            case "getDate": {
                sendDate();
                break;
            }
            case "getSeconds":
            case "getTimestamp": {
                sendTimestamp();
                break;
            }
            case "setTimestamp": {
                let number = Number.parseInt(message[0]);
                if (isNaN(number) || number == Tick.currentTime) {
                    break;
                }
                Tick.currentTime = number;
                sendTimestamp();
                break;
            }
            case "setTurnTimeInTicks":
            case "setTurnTime": {
                let number = Number.parseInt(message[0]);
                if (isNaN(number) || number == Tick.ticksPerTurn) {
                    break;
                }
                if (number < 1) {
                    number = 1;
                }
                Tick.ticksPerTurn = number;
                Tick.turnTime = number * Tick.gameTimeMultiplier;
                Tick.roundTime = Tick.turnTime * Tick.turnsPerRound;
                break;
            }
            case "setRoundTimeInTurns":
            case "setRoundTime": {
                let number = Number.parseInt(message[0]);
                if (isNaN(number) || number == Tick.turnsPerRound) {
                    break;
                }
                Tick.turnsPerRound = number;
                if (Tick.turnsPerRound < 6) {
                    Tick.turnsPerRound = 6;
                }
                Tick.roundTime = Tick.turnTime * Tick.turnsPerRound;
                break;
            }
            case "setGameTimeMutliplier": {
                if (!event.data.hasOwnProperty("msg")) {
                    break;
                }
                let number = Number.parseInt(message[0]);
                if (isNaN(number) || number == Tick.gameTimeMultiplier) {
                    break;
                }
                Tick.gameTimeMultiplier = number;
                if (Tick.gameTimeMultiplier < 1) {
                    Tick.gameTimeMultiplier = 1;
                }
                Tick.stop();
                Tick.start();
                break;
            }
            case "setCurrentTickRoundTurn": {
                if (!event.data.hasOwnProperty("msg")) {
                    break;
                }
                Tick.currentTick = Number.parseInt(message[0]);
                Tick.currentTurn = Number.parseInt(message[1]);
                Tick.currentRound = Number.parseInt(message[2]);
                break;
            }
            case "stop": {
                Tick.stop();
                postMessage({"cmd":"stop"});
                break;
            }
            case "start": {
                Tick.stop();
                Tick.start();
                postMessage({"cmd":"start"});
                break;
            }
            case "addScheduledEffect": {
                if (!event.data.hasOwnProperty("msg")) {
                    break;
                }
                else if (Object.keys(message).length != 7) {
                    console.log("brk");
                    break;
                }
                addScheduledEffect(message[0], message[1], message[2], message[3], message[4], message[5], message[6]);
                break;
            }
            case "removeScheduledEffect": {
                if (!event.data.hasOwnProperty("msg")) {
                    break;
                }
                else if (Object.keys(message).length != 2) {
                    break;
                }
                removeAscheduledEffect(message[0], message[1]);
                break;
            }
            case "addScheduledCommand": {
                if (!event.data.hasOwnProperty("msg")) {
                    break;
                }
                else if (Object.keys(message).length != 3) {
                    break;
                }
                addScheduledCommand(message[0], message[1], message[2]);
                break;
            }
            case "setScheduledCommand": {
                if (!event.data.hasOwnProperty("msg")) {
                    break;
                }
                else if (Object.keys(message).length != 3) {
                    break;
                }
                setScheduledCommand(message[0], message[1], message[2]);
                break;
            }
        };
    }
}
Tick.initialize();