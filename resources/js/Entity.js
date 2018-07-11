/**
 * Class that represents all Entity
 */
class Entity {
    /**
     * Creates an Entity
     * @param  {String} _id          Unique ID
     * @param  {String} _name        Name
     * @param  {String} _description Description
     * @param  {String}  _image      Image path of base64
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined) {
        if (typeof _id == "string") {
            _id = _id.replace(/^[\W\-]+/g, "");
            if (_id.length == 0) {
                return undefined;
            }
        }
        else {
            return undefined;
        }
        /**
         * Identification
         * @type {String} Cannot be undefined!
         */
        this.id = _id;
        /**
         * Name
         * @type {String} Can be undefined
         */
        this.name = _name;
        /**
         * Description
         * @type {String} Can be undefined
         */
        this.description = _description;

        if (typeof _image == 'undefined')
            _image = "resources/images/items/genericItem.svg";
        /**
         * Path to Entity's picture
         * @type {String} Relative path to an image, or base64 encoded String
         */
        this.image = _image;
        /**
         * Entity's mesh
         * @type {BABYLON.Mesh}
         */
        this.avatar = undefined;
        /**
         * Entity's controller
         * @type {CharacterController}
         */
        this.controller = undefined;

        /**
         * Actions available to this Entity
         * @type {Set} <Game.kActionTypes>
         */
        this.availableActions = new Set();
        /**
         * Game.kSpecialProperties
         * @type {Set} <Game.kSpecialProperties>
         */
        this.specialProperties = new Set();

        /**
         * Mass in kilograms
         * @type {Number} 0.001 to Number.MAX_SAFE_INTEGER
         */
        this.defaultMass = 0;

        this.addAvailableAction("look");
        this.addSpecialProperty("exists");
        
        Game.entities[this.id] = this;
    }

    setName(_name) {
        this.name = _name.replace(/[^0-9a-z\-]/gi, '');
    }
    getName() {
        return this.name;
    }
    setDescription(_description) {
        this.description = _description.replace(/[^0-9a-z\-\!\?\,\.\"\'\<\>\/\_]/gi, '');
    }
    getDescription() {
        return this.description;
    }
    setImage(_image) {
        var _subPath = "";
        if (this instanceof Character) {
            _subPath = "characters";
        }
        else if (this instanceof Furniture) {
            _subPath = "furniture";
        }
        else if (this instanceof Item) {
            _subPath = "items";
        }
        else if (this instanceof Location) {
            _subPath = "locations";
        }

        if (typeof _image == "undefined")
            this.image = `resources/images/items/genericItem.svg`; // base64 image, or url
        else if (_image.slice(0, 17) == "resources/images/") {
            _image = _image.slice(17).split('/');
            _image = _image[_image.length];
            _image = _image.split('.');
            _image[0] = _image[0].replace(/[^0-9a-z]/gi, '');
            _image[1] = _image[1].replace(/[^0-9a-z]/gi, '');
            var _fileType = _image[1].toLowerCase();
            if (_fileType !== "png" && _fileType !== "svg" && _fileType !== "jpg" && _fileType !== "jpeg" && _fileType !== "gif")
                this.image = `resources/images/${_subPath}/${this.id}.svg`;
            else if (_image[0].length < 1)
                this.image = `resources/images/${_subPath}/${this.id}.svg`;
            else
                this.image = `resources/images/${_subPath}/${_image[0]}.${_image[1]}`;
            this._fileType = null;
        }
        else if (_image.slice(0, 11) == "data:image/") {
            this.image = _image;
        }
        else
            this.image = "resources/images/items/genericItem.svg"; // base64 image, or url
        return this;
    }
    getImage() {
        return this.image;
    }
    setAvatar(_mesh) {

    }
    getAvatar() {
        return this.avatar;
    }
    setController(_controller) {
        if (!(_controller instanceof EntityController)) {
            if (Game.hasController(_controller)) {
                Game.getController(_controller);
            }
            else {
                return;
            }
        }
        this.controller = _controller;
    }
    getController() {
        return this.controller;
    }

    /**
     * Adds an available Action when interacting with this Entity
     * @param {String} _actions (Game.kActionTypes)
     */
    addAvailableAction(_actions) {
        if (Game.kActionTypes.has(_actions))
            this.availableActions.add(_actions);
        else if (_actions instanceof Array) {
            _actions.forEach(function(_action) {
                Game.kActionTypes.has(_action) && this.availableActions.add(_action);
            }, this);
        }
        return this;
    }
    /**
     * Removes an available Action when interacting with this Entity
     * @param  {String} _actions (Game.kActionTypes)
     * @return {Booealn}          Whether or not the Action was removed
     */
    removeAvailableAction(_actions) {
        if (Game.kActionTypes.has(_actions))
            this.availableActions.delete(_actions);
        else if (_actions instanceof Array) {
            _actions.forEach(function(_action) {
                Game.kActionTypes.has(_action) && this.availableActions.delete(_action);
            }, this);
        }
        return this;
    }
    getAvailableActions() {
        return this.currentActions;
    }

    /**
     * Adds a Game.kSpecialProperties
     * @param {String} _specialProperties (Game.kSpecialProperties)
     */
    addSpecialProperty(_specialProperties) {
        if (Game.kSpecialProperties.has(_specialProperties))
            this.specialProperties.add(_specialProperties);
        else if (_specialProperties instanceof Array) {
            _specialProperties.forEach(function(_specialProperties) {
                Game.kSpecialProperties.has(_specialProperties) && this.specialProperties.add(_specialProperties);
            }, this);
        }
        return this;
    }
    /**
     * Returns this Entity's Game.kSpecialProperties
     * @return {Set} <String (Game.kSpecialProperties)>
     */
    getSpecialProperties() {
        return this.specialProperties;
    }
    /**
     * Returns whether or not this Entity has the specified Game.kSpecialProperties
     * @param  {String}  _specialProperties (Game.kSpecialProperties)
     * @return {Boolean}              Whether or not this Entity has the specified Game.kSpecialProperties
     */
    hasSpecialProperty(_specialProperties) {
        if (Game.kSpecialProperties.has(_specialProperties))
            return this.specialProperties.has(_specialProperties);
        else
            return false;
    }

    dispose() {
        delete Game.entities[this.id];
        return undefined;
    }
}