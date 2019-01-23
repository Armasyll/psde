class Entity extends AbstractEntity {
    /**
     * Creates an Entity
     * @param  {String} _id          Unique ID
     * @param  {String} _name        Name
     * @param  {String} _description Description
     * @param  {String}  _image      Image path or base64
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined) {
        super(_id, _name, _description, _image);
        Game.setEntity(this.id, this);
    }
    createInstance(_id = undefined) {
        _id = Game.filterID(_id);
        if (typeof _id != "string") {
            _id = genUUIDv4();
        }
        return new InstancedEntity(_id, this);
    }
    dispose() {
        Game.removeEntity(this.id);
        super.dispose();
        return undefined;
    }
}