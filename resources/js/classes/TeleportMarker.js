/**
 * Teleport Marker
 */
class TeleportMarker {
    /**
     * 
     * @param {string} id Teleport Marker ID
     * @param {string} cellID Cell ID
     * @param {array} position Position
     * @param {array} [rotation] Rotation
     */
    constructor(id = "", cellID = "limbo", position = [0,0,0], rotation = [0,0,0]) {
        this.id = "";
        this.cellID = "limbo";
        this.position = null;
        this.rotation = null;
        this._setID(id);
        this._setCellID(cellID);
        this._setPosition(position);
        this._setRotation(rotation);
        TeleportMarker.set(this.id, this);
    }
    /**
     * 
     * @param {string} id 
     */
    _setID(id) {
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
    _setCellID(cellID) {
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
    _setPosition(position) {
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
    _setRotation(rotation) {
        this.rotation = Tools.filterArray3(rotation);
        return 0;
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