importScripts("../../../vendors/babylonjs/babylon.js", "../Overrides.js");
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
        if (instancedEffect instanceof InstancedSimpleEffect) {
            instancedEffect = instancedEffect.getEffect();
        }
        else if (InstancedSimpleEffect.has(instancedEffect)) {
            instancedEffect = InstancedSimpleEffect.get(instancedEffect);
        }
        this.instancedEffects.add(instancedEffect);
        this.addEffect(instancedEffect.getEffect());
        return 0;
    }
    removeInstancedEffect(instancedEffect, updateChild = false) {
        if (this.locked || !this.enabled) {
            return 1;
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
    hasEffect(effect) {
        if (!(effect instanceof SimpleEffect)) {
            if (SimpleEffect.has(effect)) {
                effect = SimpleEffect.get(effect);
            }
            else {
                return false;
            }
        }
        return this.entity.effects.has(effect);
    }
    dispose() {
        this.locked = true;
        this.enabled = false;
        this.instancedEffects.forEach((instancedEffect) => {
            instancedEffect.dispose();
        });
        this.instancedEffects.clear();
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
class SimpleEffect {
    constructor(id, duration, durationInterval, intervalType, intervalNth) {
        this.id = id;
        this.duration = duration;
        this.durationInterval = durationInterval;
        this.intervalType = intervalType;
        this.intervalNth = intervalNth;
        this.entities = new Set();
        this.instances = new Set();
        SimpleEffect.set(this.id, this);
    }
    getID() {
        return this.id;
    }
    getDuration() {
        return this.duration;
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
    createInstance(entity, startTick = currentTick) {
        let instancedEffect = new SimpleEffectInstance(this, entity, startTick);
        return instancedEffect;
    }
    dispose() {
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
class SimpleEffectInstance {
    constructor(effect, entity, startTick) {
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
        this.id = String(this.effect.id).concat((this.entity.id).capitalize())
        this.start = startTick;
        this.expiration = this.effect.duration + this.start;
        SimpleEffectInstance.set(this.id, this);
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
        return this.effect.duration;
    }
    getStart() {
        return this.start;
    }
    getExpiration() {
        return this.expiration;
    }
    getDurationInterval() {
        return this.effect.durationInterval;
    }
    getIntervalType() {
        return this.effect.intervalType;
    }
    getIntervalNth() {
        return this.effect.intervalNth;
    }
    expiresAtTick(tick = currentTick) {
        return tick >= this.expiration;
    }
    triggersAtTick(tick = currentTick) {
        if (this.expiration > 0 && tick > this.expiration) {
            return false;
        }
        return tick - (this.start + this.effect.duration) % this.effect.intervalNth == 0;
    }
    dispose() {
        if (!this.entity.locked) {
            this.entity.removeInstancedEffect(this, true);
        }
        this.effect.removeInstance(this, true);
        SimpleEffectInstance.remove(this.id);
    }

    static initialize() {
        SimpleEffectInstance.simpleEffectInstanceList = new Map();
    }
    static set(id, simpleEffectInstance) {
        SimpleEffectInstance.simpleEffectInstanceList.set(id, simpleEffectInstance)
        return 0;
    }
    static get(id) {
        return SimpleEffectInstance.simpleEffectInstanceList.get(id);
    }
    static has(id) {
        return SimpleEffectInstance.simpleEffectInstanceList.has(id);
    }
    static list() {
        return SimpleEffectInstance.simpleEffectInstanceList;
    }
    static remove(id) {
        SimpleEffectInstance.simpleEffectInstanceList.delete(id);
    }
}
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
function addScheduledEffect(effectID, abstractEntityID, duration, durationInterval, intervalType, intervalNth) {
    // TODO: have the effect be a sub-index; Map<number, Map<string, Array[{}]>>
    // TODO: ^, and AbstractEntityID
    if (durationInterval == 0) {
        return 0;
    }
    else if (durationInterval == 2) {
        duration = duration * ticksPerTurn;
        durationInterval = 1;
    }
    else if (durationInterval == 3) {
        duration = duration * ticksPerTurn * turnsPerRound;
        durationInterval = 1;
    }

    let effect = null;
    if (!SimpleEffect.has(effectID)) {
        effect = new SimpleEffect(effectID, duration, durationInterval, intervalType, intervalNth);
    }
    else {
        effect = SimpleEffect.get(effectID);
    }

    let entity = null;
    if (!SimpleEntity.has(abstractEntityID)) {
        entity = new SimpleEntity(abstractEntityID);
    }
    else {
        entity = SimpleEntity.get(abstractEntityID);
    }

    let effectInstance = effect.createInstance(entity, currentTick);
    if (!scheduledEffects.has(effectInstance.getExpiration())) {
        scheduledEffects.set(effectInstance.getExpiration(), []);
    }
    scheduledEffects.get(effectInstance.getExpiration()).push(effectInstance);

    if (intervalType == 1) { // IntervalEnum.TICK default
        effectsPerNthTick.set(intervalNth, []);
        effectsPerNthTick.get(intervalNth).push(effectInstance);
    }
    else if (intervalType == 2) { // IntervalEnum.TURN
        effectsPerNthTurn.set(intervalNth, []);
        effectsPerNthTurn.get(intervalNth).push(effectInstance);
    }
    else if (intervalType == 3) { // IntervalEnum.ROUND
        effectsPerNthRound.set(intervalNth, []);
        effectsPerNthRound.get(intervalNth).push(effectInstance);
    }
    return 0;
}
function removeScheduledEffect(effect, entity) {
    if (!(effect instanceof SimpleEffect)) {
        if (SimpleEffect.has(effect)) {
            effect = SimpleEffect.get(effect);
        }
        else {
            return 1;
        }
    }
    if (!(entity instanceof SimpleEntity)) {
        if (SimpleEntity.has(entity)) {
            entity = SimpleEntity.get(entity);
        }
        else {
            entity = null;
        }
    }
    if (entity instanceof SimpleEntity) {
        entity.removeEffect(effect);
    }
    else {
        effect.dispose();
    }
}
function removeScheduledEffectsByTick(tick) {
    if (!scheduledEffects.has(tick)) {
        return 0;
    }
    effectsPerNthTick.forEach((array, intervalNth) => {
        array.forEach(instancedEffect => {
            if (instancedEffect.expiresAtTick(currentTick)) {
                array.remove(instancedEffect);
                instancedEffect.dispose();
            }
        });
    });
    scheduledEffects.get(tick).clear();
    scheduledEffects.delete(tick);
}
function cleanScheduledEffects() {
    scheduledEffects.forEach((array, tick) => {
        if (tick < currentTick - 1) {
            removeScheduledEffectsByTick(tick);
        }
    });
}
function triggerScheduledEffects() {
    effectsPerNthTick.forEach((array, intervalNth) => {
        array.forEach((instancedEffect) => {
            if (instancedEffect.triggersAtTick(currentTick)) {
                sendScheduledEffect(instancedEffect.getID(), instancedEffect.getEntity().getID());
            }
        });
    });
}
function sendScheduledEffect(effectID, abstractEntityID) {
    postMessage({"cmd":"sendScheduledEffect", "msg":{"effectID":effectID, "abstractEntityID":abstractEntityID}});
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