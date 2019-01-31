class Dialogue {
    /**
     * Creates a Dialogue
     * @param  {String}    _id       Unique ID
     * @param  {String}    _title    Title
     * @param  {String}    _text     String, or Function, with the parameters _them and _you, that returns a String
     * @param  {...Dialogue} _options  Dialogue, Dialogue and Function array, or a Dialogue, Title, and Function array, with the function returning true or false deciding whether or not the Dialogue is shown.
     * @return {Dialogue}  Dialogue
     * @example new Dialogue("exampleA", "Example A", "This is a test!")
     * @example new Dialogue("exampleB", "Example B", "This is another test!")
     * @example new Dialogue("exampleC", "Example C", "Yet another test!", ["exampleA", function(){return true;}], exampleB, ["exampleB", "Overrides ExampleB Title", function(){return (1 == 1 ? true : false);}])
     * @example new Dialogue("exampleD", "Example D", function(_them, _you) {return `Last example, ${_you.getFullName()}, I swear!`;}, "exampleA", "exampleB", "exampleC")
     */
    constructor(_id, _title, _text) {
        _id = Game.filterID(_id);
        if (typeof _id != "string") {
            _id = genUUIDv4();
        }
        if (typeof _text != "string" && typeof _text != "function") {
            return undefined;
        }

        this.id = _id;
        this.title = undefined;
        this.text = undefined;
        this.textType = 0;
        this.options = {};
        this.optionsCount = 0;
        this.parentOptions = {};
        this.parentOptionsCount = 0;
        this._isEnabled = true;

        this.setTitle(_title);
        this.setText(_text);

        Game.setDialogue(this.id, this);
    }
    getID() {
        return this.id;
    }
    setTitle(_title) {
        _title = Game.filterName(_title);
        if (typeof _title != "string") {
            _title = "";
        }
        this.title = _title;
        return this;
    }
    getTitle() {
        return this.title;
    }
    setText(_blob) {
        if (typeof _blob == "string") {
            this.text = _blob;
            this.textType = 0;
        }
        else if (typeof _blob == "function") {
            this.text = _blob;
            this.textType = 1;
        }
        else {
            this.text = "";
            this.textType = 0;
        }
        return this;
    }
    getText(_them = undefined, _you = Game.player.getEntity()) {
        _them = Game.getEntity(_them);
        _you = Game.getEntity(_you);
        if (typeof this.text == "string") {
            return this.text;
        }
        else if (typeof this.text == "function") {
            return this.text(_them, _you);
        }
        else {
            return "";
        }
    }
    /**
     * Returns a numerical value representing this dialogue's type of text.
     * @return {number} 0: String, 1: Function.
     */
    getTextType() {
        return this.textType || 0;
    }
    hasOptions() {
        return this.optionsCount > 0;
    }
    getOptions() {
        return this.options;
    }
    setOption(_id = undefined, _dialogue, _title, _condition) {
        var _dialogueOption = new DialogueOption(_id, _dialogue, _title, _condition);
        if (!(_dialogueOption instanceof DialogueOption)) {
            return undefined;
        }
        this.options[_dialogueOption.getID()] = _dialogueOption;
        this.optionsCount += 1;
        return _dialogueOption;
    }
    removeOption(_dialogueOption) {
        if (_dialogueOption instanceof DialogueOption) {
            _dialogueOption = _dialogueOption.getID();
        }
        _dialogueOption = Game.filterID(_dialogueOption);
        if (!(this.options.hasOwnProperty(_dialogueOption))) {
            return true;
        }
        if (this.options[_dialogueOption].getDialogue() instanceof Dialogue) {
            this.options[_dialogueOption].getDialogue().removeParentOption(_dialogueOption);
        }
        this.options[_dialogueOption].dispose();
        delete this.options[_dialogueOption];
        this.optionsCount -= 1;
        return true;
    }
    setParentOption(_dialogueOption) {
        if (!(_dialogueOption instanceof DialogueOption)) {
            return undefined;
        }
        this.parentOptions[_dialogueOption.getID()] = _dialogueOption;
        this.parentOptionsCount += 1;
    }
    removeParentOption(_dialogueOption) {
        if (_dialogueOption instanceof DialogueOption) {
            _dialogueOption = _dialogueOption.getID();
        }
        _dialogueOption = Game.filterID(_dialogueOption);
        if (!(this.parentOptions.hasOwnProperty(_dialogueOption))) {
            return true;
        }
        this.parentOptions[_dialogueOption].dispose();
        delete this.parentOptions[_dialogueOption];
        this.parentOptionsCount -= 1;
        return true;
    }
    isEnabled() {
        return this._isEnabled == true;
    }
    setEnabled(_isEnabled = true) {
        this._isEnabled = (_isEnabled == true);
        return this;
    }
    dispose() {
        this._isEnabled = false;
        for (var _var in this.parentOptions) {
            this.parentOptions[_var].dispose();
            delete this.parentOptions[_var];
        }
        for (var _var in this.options) {
            this.options[_var].dispose();
            delete this.options[_var];
        }
        Game.removeDialogue(this.id);
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}
class DialogueOption {
    constructor(_id = undefined, _dialogue, _title = undefined, _condition = undefined) {
        _id = Game.filterID(_id);
        if (typeof _id != "string") {
            _id = genUUIDv4();
        }
        this.id = _id;
        this.dialogue = undefined;
        this.title = undefined;
        this.condition = undefined;
        this.setDialogue(_dialogue);
        if (typeof _title == "string") {
            this.setTitle(_title);
        }
        else {
            this.setTitle(this.dialogue.getTitle());
        }
        if (typeof _condition == "function") {
            this.setCondition(_condition);
        }
        this._isEnabled = true;
    }
    getID() {
        return this.id;
    }
    setDialogue(_dialogue) {
        _dialogue = Game.getDialogue(_dialogue);
        if (_dialogue instanceof Dialogue) {
            this.dialogue = _dialogue;
            this.dialogue.setParentOption(this);
        }
        return this;
    }
    getDialogue() {
        return this.dialogue;
    }
    setTitle(_title) {
        _title = Game.filterName(_title);
        if (typeof _title == "string") {
            this.title = _title;
        }
        else {
            this.title = "";
        }
        return this;
    }
    getTitle() {
        return this.title;
    }
    setCondition(_function) {
        if (!(this.dialogue instanceof Dialogue)) {
            return this;
        }
        if (typeof _function == "function") {
            this.condition = _function;
        }
        else {
            this.condition = undefined;
        }
        return this;
    }
    getCondition(_them = undefined, _you = undefined) {
        if (typeof this.condition == "function") {
            return this.condition(_them, _you);
        }
        else {
            return true;
        }
    }
    isEnabled() {
        return this._isEnabled == true;
    }
    setEnabled(_isEnabled = true) {
        this._isEnabled = (_isEnabled == true);
        return this;
    }
    dispose() {
        this._isEnabled = false;
        delete this.condition;
        for (var _var in this) {
            this[_var] = null;
        }
    }
    static createFromArray(_array) {
        if (!(_array instanceof Array)) {
            return;
        }
        if (_array.length == 0) {
            return;
        }
        var _tempDialogue = Game.getDialogue(_array[0]);
        if (!(_tempDialogue instanceof Dialogue)) {
            return;
        }
        var _tempDialogueOption = new DialogueOption(_tempDialogue);
        if (_array.length > 2) {
            if (typeof _array[1] == "string") {
                _tempDialogueOption.setTitle(_array[1]);
            }
            if (typeof _array[2] == "function") {
                _tempDialogueOption.setCondition(_array[2]);
            }
        }
        else if (_array.length > 1) {
            if (typeof _array[1] == "function") {
                _tempDialogueOption.setCondition(_array[1]);
            }
            else if (typeof _array[1] == "string") {
                _tempDialogueOption.setTitle(_array[1]);
            }
        }
        return _tempDialogueOption;
    }
}
__checkDialogue = function() {
    var _exampleA = new Dialogue("exampleA", "Example A", "This is a test!");
    var _exampleB = new Dialogue("exampleB", "Example B", "This is another test!");
    var _exampleC = new Dialogue("exampleC", "Example C", "This is yet another test!", "exampleA", ["exampleB", function(){return true;}]);

    console.log("Checking if the first inserted option's title in Dialogue exampleC is equal to exampleA's title, which it should be.");
    console.log(Game.getDialogue("exampleC").getOptions()[0].getTitle() == _exampleA.getTitle() ? "It is." : "It isn't.");
    console.log("Checking if the second inserted option's title in Dialogue exampleC is equal to exampleB's title, which it should be.");
    console.log(Game.getDialogue("exampleC").getOptions()[1].getTitle() == _exampleB.getTitle() ? "It is." : "It isn't.");
}