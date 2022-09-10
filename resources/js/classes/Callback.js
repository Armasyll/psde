/**
 * Callback
 * @class
 * @typedef {Object} Callback
 */
class Callback {
    static initialize() {
        Callback.debugMode = false;
        Callback.groupedCallbacks = [];
        Callback.callbacks = {};
        return 0;
    }
    static createGroup(parentID, callbackID) {
        if (callbackID == null) {
            return 1;
        }
        if (!Callback.hasGroup(parentID)) {
            Callback.groupedCallbacks[parentID] = {"callbackIDs":[], "hasRun": false};
        }
        return Callback.setGroup(parentID, callbackID);
    }
    static setGroup(parentID, callbackID) {
        if (callbackID == null) {
            return 1;
        }
        if (Callback.hasGroup(parentID)) {
            Callback.getGroup(parentID)["callbackIDs"].push(callbackID);
        }
        return 0;
    }
    static getGroup(id) {
        if (Callback.groupedCallbacks.hasOwnProperty(id)) {
            return Callback.groupedCallbacks[id];
        }
        return 1;
    }
    static hasGroup(id) {
        return Callback.groupedCallbacks.hasOwnProperty(id);
    }
    static removeGroup(id) {
        if (!Callback.hasGroup(id)) {
            return 1;
        }
        delete Callback.groupedCallbacks[id]["hasRun"];
        Callback.groupedCallbacks[id]["callbackIDs"].clear();
        delete Callback.groupedCallbacks[id]["callbackIDs"];
        delete Callback.groupedCallbacks[id];
        return 0;
    }
    /**
     * 
     * @param {string} id 
     * @param {(object|null)} [response] 
     */
    static runGroup(id, response = null) {
        if (!Callback.hasGroup(id)) {
            return 1;
        }
        let groupedCallback = Callback.getGroup(id);
        if (groupedCallback["hasRun"]) {
            return 0;
        }
        groupedCallback["hasRun"] = true;
        if (Callback.debugMode) console.group(`Running Callback.runGroupedCallback("${id}", ${response})`);
        if (groupedCallback["callbackIDs"].length > 0) {
            groupedCallback["callbackIDs"].forEach((callbackID) => {
                Callback.run(callbackID, response);
            });
        }
        if (Callback.debugMode) console.groupEnd();
        return 0;
    }
    /**
     * 
     * @param {string} id Callback ID
     * @param {(string|null)} parentID ID of parent callback, if any
     * @param {Array} params Params to pass
     * @param {function} callback Function to call
     */
    static create(id = "", parentID = null, params = [], callback = null) {
        id = Tools.filterID(id, Tools.genUUIDv4());
        if (!(params instanceof Array)) {
            params = [params];
        }
        if (Callback.debugMode) console.log(`Running Callback.create("${id}", ${parentID}, {${params.toString().slice(0,16)}}, {${String(callback).slice(0,16)}})`);
        Callback.callbacks[id] = {"parent":parentID, "params":params, "callback":callback, "hasRun":(callback == null), "status":0};
        return id;
    }
    /**
     * 
     * @param {string} id 
     */
    static remove(id) {
        delete Callback.callbacks[id]["parent"];
        delete Callback.callbacks[id]["params"];
        delete Callback.callbacks[id]["callback"];
        delete Callback.callbacks[id]["hasRun"];
        delete Callback.callbacks[id];
        return 0;
    }
    /**
     * 
     * @param {string} id 
     */
    static get(id) {
        if (Callback.callbacks.hasOwnProperty(id)) {
            return Callback.callbacks[id];
        }
        return null;
    }
    static getNthParent(id, nth) {
        let currentID = id;
        if (!Callback.callbacks.hasOwnProperty(currentID)) {
            return null;
        }
        for (let i = 0; i < nth + 1; i++) {
            if (Callback.callbacks.hasOwnProperty(currentID)) {
                currentID = Callback.get(currentID).parent;
            }
            else {
                currentID = null;
            }
        }
        return currentID;
    }
    static runNthParent(id, nth, response = null, flipRun = true, recursive = false) {
        let callbackID = Callback.getNthParent(id, nth);
        if (callbackID == null) {
            return null;
        }
        return Callback.run(callbackID, response, flipRun, recursive);
    }
    static list() {
        return this.callbacks;
    }
    static getCallbacks(parent = null, callback = null, hasRun = null, status = null) {
        let obj = {};
        for (let entry in Callback.callbacks) {
            if (
                (parent == null || parent == Callback.callbacks[entry]["parent"]) &&
                (callback == null || callback == Callback.callbacks[entry]["callback"]) &&
                (hasRun == null || hasRun == Callback.callbacks[entry]["hasRun"]) &&
                (status == null || status == Callback.callbacks[entry]["status"])
            ) {
                obj[entry] = Callback.callbacks[entry];
            }
        }
        return obj;
    }
    /**
     * 
     * @param {string} id 
     */
    static has(id) {
        return Callback.callbacks.hasOwnProperty(id);
    }
    /**
     * 
     * @param {string} id 
     * @param {(object|null)} [response] 
     * @param {boolean} [flipRun] Check and flip run boolean
     * @param {boolean} [recursive] 
     */
    static run(id, response = null, flipRun = true, recursive = false) {
        if (id == null) {
            return 0;
        }
        if (!Callback.has(id)) {
            return 1;
        }
        if (Callback.debugMode) console.group(`Running Callback.run("${id}", {${String(response).slice(0,16)}})`);
        let callback = Callback.get(id);
        if (!callback["hasRun"]) {
            if (typeof callback["callback"] == "function") {
                callback["callback"](...callback["params"], response, id);
            }
            if (flipRun) {
                callback["hasRun"] = true;
            }
        }
        if (recursive) {
            Callback.run(callback["parent"], response, flipRun, recursive);
        }
        if (Callback.debugMode) console.groupEnd();
        return 0;
    }
    /**
     * 
     * @param {string} id 
     * @param {(object|null)} [response] 
     */
    static runParent(id, response = null, flipRun = true, recursive = false) {
        if (Callback.callbacks.hasOwnProperty(id)) {
            if (Callback.callbacks.hasOwnProperty(Callback.callbacks[id]["parent"])) {
                Callback.run(Callback.callbacks[id]["parent"], response, flipRun, recursive);
            }
        }
        return 0;
    }
    /**
     * 
     * @param {string} id 
     */
    static hasRun(id) {
        return Callback.callbacks.hasOwnProperty(id) && Callback.callbacks[id]["hasRun"] === true;
    }
    /**
     * 
     * @param {string} id 
     * @param {boolean} [hasRun] 
     * @param {number} [status] 
     */
    static setRun(id, hasRun = true, status = 0) {
        if (Callback.has(id)) {
            let callback = Callback.get(id);
            callback["hasRun"] = (hasRun === true);
            callback["status"] = status;
        }
        return 0;
    }
    static purge() { // TODO: this, occasionally
        for (let callbackID in Callback.callbacks) {
            if (Callback.callbacks[callbackID].hasRun) {
                Callback.remove(callbackID);
            }
        }
    }
}
Callback.initialize();