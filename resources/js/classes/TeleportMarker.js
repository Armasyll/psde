/**
 * Teleport Marker
 * @class
 * @typedef {Object} TeleportMarker
 * @property {string} id
 * @property {string} cellID
 * @property {Array.<number>} position
 * @property {Array.<number>} rotation
 */
class TeleportMarker {
    /**
     * 
     * @param {string} id Teleport Marker ID
     * @param {string} cellID Cell ID
     * @param {Array.<number>} position Position
     * @param {Array.<number>} [rotation] Rotation
     */
    constructor(id = "", cellID = "limbo", position = [0,0,0], rotation = [0,0,0]) {
        this.id = "";
        this.cellID = "limbo";
        this.position = null;
        this.rotation = null;
        this.setID(id);
        this.setCellID(cellID);
        this.setPosition(position);
        this.setRotation(rotation);
        TeleportMarker.set(this.id, this);
    }
    /**
     * 
     * @param {string} id 
     */
    setID(id) {
        this.id = Tools.filterID(id);
        return 0;
    }
    /**
     * @returns {string} 
     */
    getID() {
        return this.id;
    }
    /**
     * 
     * @param {string} cellID 
     */
    setCellID(cellID) {
        this.cellID = Tools.filterID(cellID);
        return 0;
    }
    /**
     * 
     * @param {(string|Cell)} cell 
     */
    _setCell(cell) {
        cell = Tools.filterClass(cell, Cell, null);
        if (cell instanceof Cell) {
            this.cellID = cell.id;
        }
        return 0;
    }
    /**
     * @returns {string} 
     */
    getCellID() {
        return this.cellID;
    }
    /**
     * @returns {(Cell|null)} 
     */
    getCell() {
        let cell = Tools.filterClass(this.cellID, Cell, null);
        if (cell instanceof Cell) {
            return cell;
        }
        return Cell.get("limbo");
    }
    /**
     * 
     * @param {array} rotation 
     */
    setPosition(position) {
        this.position = Tools.filterArray3(position);
        return 0;
    }
    /**
     * @returns {array} 
     */
    getPosition() {
        return this.position;
    }
    /**
     * 
     * @param {array} rotation 
     */
    setRotation(rotation) {
        this.rotation = Tools.filterArray3(rotation);
        return 0;
    }
    objectify() {
        return {
            "id":this.id,
            "cellID":this.cellID,
            "position":this.position,
            "rotation":this.rotation
        }
    }
    /**
     * @returns {array} 
     */
    getRotation() {
        return this.rotation;
    }

    static initialize() {
        TeleportMarker.teleportMarkerList = {};
        new TeleportMarker("limbo", "limbo", [0,1.25,0], [0,0,0]);
    }
    static get(id) {
        if (TeleportMarker.has(id)) {
            return TeleportMarker.teleportMarkerList[id];
        }
        return 1;
    }
    static has(id) {
        return TeleportMarker.teleportMarkerList.hasOwnProperty(id);
    }
    static set(id, teleportMarker) {
        TeleportMarker.teleportMarkerList[id] = teleportMarker;
        return 0;
    }
    static remove(id) {
        delete TeleportMarker.teleportMarkerList[id];
        return 0;
    }
    static list() {
        return TeleportMarker.teleportMarkerList;
    }
    static clear() {
        for (let i in TeleportMarker.teleportMarkerList) {
            TeleportMarker.teleportMarkerList[i].dispose();
        }
        TeleportMarker.teleportMarkerList = {};
        return 0;
    }
}
TeleportMarker.initialize();