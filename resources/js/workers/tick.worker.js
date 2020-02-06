importScripts("../../../vendors/babylonjs/babylon.js", "../Overrides.js", "../classes/Enum.js");
class SimpleEntity {
    constructor(id) {
        this.id = id;
        this.effects = new Set();
        this.instancedEffects = new Set();
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
    createInstance(entity, duration, durationInterval = IntervalEnum.TICK, intervalType = IntervalEnum.TICK, intervalNth = 1, priority = 1000, startTick = currentTick) {
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
    constructor(effect, entity, duration, durationInterval = IntervalEnum.TICK, intervalType = IntervalEnum.TICK, intervalNth = 1, priority = 1000, startTick = currentTick) {
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
    expiresAtTick(tick = currentTick) {
        return tick >= this.expiration;
    }
    triggersAtTick(tick = currentTick) {
        if (tick > this.expiration) {
            return false;
        }
        return Math.abs(tick - (this.start + this.duration)) % this.intervalNth == 0;
    }
    reapply(tick = currentTick) {
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
/*
$ let worker = new Worker("/resources/js/workers/tick.worker.js")
undefined
$ worker.addEventListener('message', function(event) {console.log(event)}, false)
undefined
$ worker.postMessage({cmd:"getTCount"})
undefined
[MessageEvent].data.{...}
*/
let currentTime = 1499088900; // Seconds, 10 digits; not milliseconds, 13 digits
let currentTick = 0;
let currentTurn = 0;
let currentRound = 0;
let incrementor = 1;
let gameTimeMultiplier = 10; // in-game seconds per second
let ticksPerTurn = 10;
let turnsPerRound = 6;
let turnTime = ticksPerTurn * gameTimeMultiplier;
let roundTime = turnTime * turnsPerRound;
let tickInterval = null;
let tickIntervalCount = 1000 / gameTimeMultiplier;
let paused = false;
/**
 * Map<number, Array[{effectID, entityID}]>; map of ticks to arrays of effects and entities
 * @type {Map} 
 */
let scheduledEffects = new Map();
/**
 * Map<number, Array[{effectID, entityID}]>; map of intervals to arrays of effects and entities
 */
let effectsPerNthTick = new Map();
let effectsPerNthTurn = new Map();
let effectsPerNthRound = new Map();
let effectsExpirationTick = new Map();

function tickFunction() {
    currentTime += incrementor;
    if (currentTime % roundTime == 0) { // Round
        currentRound++;
        sendEntityTogglerRequest();
        sendRound();
    }
    if (currentTime % turnTime == 0) { // Turn
        currentTurn++;
        sendTurn();
    }
    if (currentTime % gameTimeMultiplier == 0) { // Tick
        currentTick++;
        triggerScheduledEffects();
        removeScheduledEffectsByTick(currentTick); // effects are triggered first when they're applied; so they should be removed during their final tick
        sendTick();
        sendTimestamp();
    }
}
function stopFunction() {
    paused = true;
    clearInterval(tickInterval);
}
function startFunction() {
    tickInterval = setInterval(tickFunction, tickIntervalCount);
    paused = false;
}
function sendTick() {
    postMessage({"cmd":"tick", "msg":currentTick});
}
function sendTurn() {
    postMessage({"cmd":"turn", "msg":currentTurn});
}
function sendRound() {
    postMessage({"cmd":"round", "msg":currentRound});
}
function sendEntityTogglerRequest() {
    postMessage({"cmd":"entityToggler"});
}
function sendInfo() {
    postMessage({"cmd":"sendInfo", "msg":{"currentTime":currentTime, "gameTimeMultiplier":gameTimeMultiplier, "ticksPerTurn":ticksPerTurn, "turnsPerRound":turnsPerRound, "turnTime":turnTime, "roundTime":roundTime}});
}
function sendDate() {
    postMessage({"cmd":"sendDate", "msg":new Date(currentTime * 1000)});
}
function sendTimestamp() {
    postMessage({"cmd":"sendTimestamp", "msg":currentTime});
}
function sendPaused() {
    postMessage({"cmd":"sendPaused", "msg":paused});
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
function addScheduledEffect(effectID, abstractEntityID, duration, durationInterval = IntervalEnum.TICK, intervalType = IntervalEnum.TICK, intervalNth = 1, priority = 1000) {
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
        duration = duration * ticksPerTurn;
        durationInterval = 1;
    }
    else if (durationInterval == IntervalEnum.ROUND) {
        duration = duration * ticksPerTurn * turnsPerRound;
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
        if (scheduledEffects.has(previousExpiration)) {
            scheduledEffects.get(previousExpiration).remove(effectInstance);
        }
        effectInstance.reapply();
    }
    else {
        effectInstance = effect.createInstance(entity, duration, durationInterval, intervalType, intervalNth, priority, currentTick);
    }

    if (!scheduledEffects.has(effectInstance.getExpiration())) {
        scheduledEffects.set(effectInstance.getExpiration(), []);
    }
    scheduledEffects.get(effectInstance.getExpiration()).push(effectInstance);

    if (intervalType == IntervalEnum.TICK) { // IntervalEnum.TICK default
        if (!effectsPerNthTick.has(intervalNth)) {
            effectsPerNthTick.set(intervalNth, []);
        }
        if (!entityHasEffect) {
            effectsPerNthTick.get(intervalNth).push(effectInstance);
        }
    }
    else if (intervalType == IntervalEnum.TURN) { // IntervalEnum.TURN
        if (!effectsPerNthTurn.has(intervalNth)) {
            effectsPerNthTurn.set(intervalNth, []);
        }
        if (!entityHasEffect) {
            effectsPerNthTurn.get(intervalNth).push(effectInstance);
        }
    }
    else if (intervalType == IntervalEnum.ROUND) { // IntervalEnum.ROUND
        if (!effectsPerNthRound.has(intervalNth)) {
            effectsPerNthRound.set(intervalNth, []);
        }
        if (!entityHasEffect) {
            effectsPerNthRound.get(intervalNth).push(effectInstance);
        }
    }
    console.groupEnd();
    return 0;
}
function removeScheduledEffect(effect, entity = undefined) {
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
        if (effects.getInstances().size < entity.getEffects().size) {
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
function removeScheduledEffectsByTick(tick) {
    if (!scheduledEffects.has(tick)) {
        return 0;
    }
    console.info(`Running removeScheduledEffectsByTick(${tick})`);
    effectsPerNthTick.forEach((array, intervalNth) => {
        array.forEach(instancedEffect => {
            removeInstancedEffect(instancedEffect);
        });
    });
    if (scheduledEffects.has(tick)) {
        scheduledEffects.get(tick).clear();
        scheduledEffects.delete(tick);
    }
}
function removeInstancedEffect(instancedEffect) {
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
    if (!scheduledEffects.has(effectExpiration)) {
        return 1;
    }
    scheduledEffects.get(effectExpiration).remove(instancedEffect);
    if (scheduledEffects.get(effectExpiration).length == 0) {
        scheduledEffects.delete(effectExpiration);
    }
    let effectInterval = instancedEffect.getIntervalType();
    let effectIntervalNth = instancedEffect.getIntervalNth();
    if (effectInterval == IntervalEnum.TICK) {
        effectsPerNthTick.get(effectIntervalNth).remove(instancedEffect);
        if (effectsPerNthTick.get(effectIntervalNth).length == 0) {
            effectsPerNthTick.delete(effectIntervalNth);
        }
    }
    else if (effectInterval == IntervalEnum.TURN) {
        effectsPerNthTurn.get(effectIntervalNth).remove(instancedEffect);
        if (effectsPerNthTurn.get(effectIntervalNth).length == 0) {
            effectsPerNthTurn.delete(effectIntervalNth);
        }
    }
    else if (effectInterval == IntervalEnum.ROUND) {
        effectsPerNthRound.get(effectIntervalNth).remove(instancedEffect);
        if (effectsPerNthRound.get(effectIntervalNth).length == 0) {
            effectsPerNthRound.delete(effectIntervalNth);
        }
    }
    instancedEffect.dispose();
    return 0;
}
function removeEffect(effect) {
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
function removeEntity(entity) {
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
function cleanScheduledEffects() {
    console.info(`Running cleanScheduledEffects()`);
    scheduledEffects.forEach((array, tick) => {
        if (tick < currentTick - 1) {
            removeScheduledEffectsByTick(tick);
        }
    });
    effectsPerNthTick.forEach((array, intervalNth) => {
        if (array.length == 0) {
            effectsPerNthTick.delete(intervalNth);
        }
    });
    effectsPerNthTurn.forEach((array, intervalNth) => {
        if (array.length == 0) {
            effectsPerNthTurn.delete(intervalNth);
        }
    });
    effectsPerNthRound.forEach((array, intervalNth) => {
        if (array.length == 0) {
            effectsPerNthRound.delete(intervalNth);
        }
    });
}
function triggerScheduledEffects() {
    effectsPerNthTick.forEach((array, intervalNth) => {
        let effectsToTrigger = {};
        array.forEach((instancedEffect) => {
            if (instancedEffect.triggersAtTick(currentTick)) {
                if (!effectsToTrigger.hasOwnProperty(instancedEffect.priority)) {
                    effectsToTrigger[instancedEffect.priority] = [];
                }
                effectsToTrigger[instancedEffect.priority].push({0:instancedEffect.getID(), 1:instancedEffect.getEntity().getID()})
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
function sendScheduledEffect(effectID, abstractEntityID) {
    postMessage({"cmd":"triggerScheduledEffect", "msg":{"effectID":effectID, "abstractEntityID":abstractEntityID}});
}

startFunction();
addEventListener('message', (event) => {
    switch (event.data.cmd) {
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
            let number = Number.parseInt(event.data.msg);
            if (isNaN(number) || number == currentTime) {
                break;
            }
            currentTime = number;
            sendTimestamp();
            break;
        }
        case "setTurnTimeInTicks":
        case "setTurnTime": {
            let number = Number.parseInt(event.data.msg);
            if (isNaN(number) || number == ticksPerTurn) {
                break;
            }
            if (number < 1) {
                number = 1;
            }
            ticksPerTurn = number;
            turnTime = number * gameTimeMultiplier;
            roundTime = turnTime * turnsPerRound;
            break;
        }
        case "setRoundTimeInTurns":
        case "setRoundTime": {
            let number = Number.parseInt(event.data.msg);
            if (isNaN(number) || number == turnsPerRound) {
                break;
            }
            turnsPerRound = number;
            if (turnsPerRound < 6) {
                turnsPerRound = 6;
            }
            roundTime = turnTime * turnsPerRound;
            break;
        }
        case "setGameTimeMutliplier": {
            if (!event.data.hasOwnProperty("msg")) {
                break;
            }
            let number = Number.parseInt(event.data.msg);
            if (isNaN(number) || number == gameTimeMultiplier) {
                break;
            }
            gameTimeMultiplier = number;
            if (gameTimeMultiplier < 1) {
                gameTimeMultiplier = 1;
            }
            stopFunction();
            startFunction();
            break;
        }
        case "setCurrentTickRoundTurn": {
            if (!event.data.hasOwnProperty("msg")) {
                break;
            }
            currentTick = Number.parseInt(event.data.msg[0]);
            currentTurn = Number.parseInt(event.data.msg[1]);
            currentRound = Number.parseInt(event.data.msg[2]);
            break;
        }
        case "stop": {
            stopFunction();
            postMessage({"cmd":"stop"});
            break;
        }
        case "start": {
            stopFunction();
            startFunction();
            postMessage({"cmd":"start"});
            break;
        }
        case "addScheduledEffect": {
            if (!event.data.hasOwnProperty("msg")) {
                break;
            }
            addScheduledEffect(...event.data.msg)
            break;
        }
        case "removeScheduledEffect": {
            if (!event.data.hasOwnProperty("msg")) {
                break;
            }
            removeAscheduledEffect(...event.data.msg);
            break;
        }
    };
}, false);