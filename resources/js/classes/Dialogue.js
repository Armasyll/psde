/**
 * Dialogue
 */
class Dialogue {
    /**
     * Creates a Dialogue
     * @param {string} id       Unique ID
     * @param {string} title    Title
     * @param {string} text     String, or Function, with the parameters 'them' and 'you', that returns a String
     * @returns {Dialogue}  Dialogue
     * @example new Dialogue("exampleA", "Example A", "This is a test!")
     * @example new Dialogue("exampleB", "Example B", "This is another test!")
     * @example new Dialogue("exampleC", "Example C", "Yet another test!", ["exampleA", function(){return true;}], exampleB, ["exampleB", "Overrides ExampleB Title", function(){return (1 == 1 ? true : false);}])
     * @example new Dialogue("exampleD", "Example D", function('them', 'you') {return `Last example, ${you.getFullName()}, I swear!`;}, "exampleA", "exampleB", "exampleC")
     */
    constructor(id = "", title = "", text = "") {
        id = Tools.filterID(id);
        if (typeof id != "string") {
            id = Tools.genUUIDv4();
        }
        if (typeof text != "string" && typeof text != "function") {
            return null;
        }

        this.id = id;
        this.title = "";
        this.text = "";
        this.options = {};
        this.parentOptions = {};
        this.enabled = true;

        this.setTitle(title);
        this.setText(text);

        Dialogue.set(this.id, this);
    }
    getID() {
        return this.id;
    }
    setTitle(title = "") {
        title = Tools.filterName(title);
        if (typeof title != "string") {
            title = "";
        }
        this.title = title;
        return 0;
    }
    getTitle() {
        return this.title;
    }
    setText(text = "") {
        if (typeof text == "function") {
            this.text = text;
        }
        else {
            this.text = String(text);
        }
        return 0;
    }
    getText(them = null, you = null) {
        if (typeof this.text == "string") {
            return this.text;
        }
        else if (typeof this.text == "function") {
            if (!(them instanceof AbstractEntity)) {
                if (Entity.has(them)) {
                    them = Entity.get(them);
                }
                else {
                    them = null;
                }
            }
            if (!(you instanceof AbstractEntity)) {
                if (Entity.has(you)) {
                    you = Entity.get(you);
                }
                else {
                    you = null;
                }
            }
            return this.text(them, you);
        }
        return "";
    }
    hasOptions() {
        return Object.keys(this.options).length > 0;
    }
    getOptions() {
        return this.options;
    }
    setOption(id = "", dialogue = null, title = null, condition = null) {
        let dialogueOption = new DialogueOption(id, dialogue, title, condition);
        if (!(dialogueOption instanceof DialogueOption)) {
            return 2;
        }
        this.options[dialogueOption.getID()] = dialogueOption;
        return 0;
    }
    removeOption(dialogueOption = null) {
        if (dialogueOption instanceof DialogueOption) {
            dialogueOption = dialogueOption.getID();
        }
        dialogueOption = Tools.filterID(dialogueOption);
        if (!(this.options.hasOwnProperty(dialogueOption))) {
            return 0;
        }
        if (this.options[dialogueOption].getDialogue() instanceof Dialogue) {
            this.options[dialogueOption].getDialogue().removeParentOption(dialogueOption);
        }
        this.options[dialogueOption].dispose();
        delete this.options[dialogueOption];
        return 0;
    }
    setParentOption(dialogueOption = null) {
        if (!(dialogueOption instanceof DialogueOption)) {
            return 2;
        }
        this.parentOptions[dialogueOption.getID()] = dialogueOption;
        return 0;
    }
    removeParentOption(dialogueOption = null) {
        if (dialogueOption instanceof DialogueOption) {
            dialogueOption = dialogueOption.getID();
        }
        dialogueOption = Tools.filterID(dialogueOption);
        if (!(this.parentOptions.hasOwnProperty(dialogueOption))) {
            return 0;
        }
        this.parentOptions[dialogueOption].dispose();
        delete this.parentOptions[dialogueOption];
        return 0;
    }

    stringify(minify = false, target = null, actor = null) {
        return JSON.stringify(this.objectify(target, actor));
    }
    objectify(target = null, actor = null) {
        let obj = {};
        obj["id"] = this.id;
        obj["title"] = this.title;
        obj["text"] = this.getText(target, actor);
        obj["options"] = {};
        for (let option in this.options) {
            obj["options"][option] = this.options[option].objectify();
        }
        obj["parentOptions"] = {};
        for (let option in this.parentOptions) {
            obj["parentOptions"][option] = this.parentOptions[option].objectify();
        }
        obj["className"] = this.getClassName();
        return obj;
    }
    isEnabled() {
        return this.enabled == true;
    }
    setEnabled(isEnabled = true) {
        this.enabled = (isEnabled == true);
        return 0;
    }
    dispose() {
        this.enabled = false;
        for (let option in this.parentOptions) {
            this.parentOptions[option].dispose();
            delete this.parentOptions[option];
        }
        for (let option in this.options) {
            this.options[option].dispose();
            delete this.options[option];
        }
        Dialogue.remove(this.id);
        return 0;
    }
    getClassName() {
        return "Dialogue";
    }

    static initialize() {
        Dialogue.dialogueList = {};
    }
    static get(id) {
        if (Dialogue.has(id)) {
            return Dialogue.dialogueList[id];
        }
        return 1;
    }
    static has(id) {
        return Dialogue.dialogueList.hasOwnProperty(id);
    }
    static set(id, dialogue) {
        Dialogue.dialogueList[id] = dialogue;
        return 0;
    }
    static remove(id) {
        delete Dialogue.dialogueList[id];
        return 0;
    }
    static list() {
        return Dialogue.dialogueList;
    }
    static clear() {
        for (let i in Dialogue.dialogueList) {
            Dialogue.dialogueList[i].dispose();
        }
        Dialogue.dialogueList = {};
        return 0;
    }
}
Dialogue.initialize();
class DialogueOption {
    constructor(id = "", dialogue = null, title = null, condition = null) {
        id = Tools.filterID(id);
        if (typeof id != "string") {
            id = Tools.genUUIDv4();
        }
        this.id = id;
        this.dialogue = null;
        this.title = null;
        this.condition = null;
        this.setDialogue(dialogue);
        if (typeof title == "string") {
            this.setTitle(title);
        }
        else {
            this.setTitle(this.dialogue.getTitle());
        }
        if (typeof condition == "function") {
            this.setCondition(condition);
        }
        this.enabled = true;
    }
    getID() {
        return this.id;
    }
    setDialogue(dialogue) {
        if (!(dialogue instanceof Dialogue)) {
            if (Dialogue.has(dialogue)) {
                dialogue = Dialogue.get(dialogue);
            }
            else {
                return 2;
            }
        }
        this.dialogue = dialogue;
        this.dialogue.setParentOption(this);
        return 0;
    }
    getDialogue() {
        return this.dialogue;
    }
    setTitle(title) {
        title = Tools.filterName(title);
        if (typeof title == "string") {
            this.title = title;
        }
        else {
            this.title = "";
        }
        return 0;
    }
    getTitle() {
        return this.title;
    }
    setCondition(condition) {
        if (!(this.dialogue instanceof Dialogue)) {
            return 2;
        }
        if (typeof condition == "function") {
            this.condition = condition;
        }
        else {
            this.condition = null;
        }
        return 0;
    }
    getCondition(them = null, you = null) {
        if (typeof this.condition == "function") {
            return this.condition(them, you);
        }
        return true;
    }

    stringify() {
        return JSON.stringify(this.objectify);
    }
    objectify() {
        let obj = {};
        obj["id"] = this.id;
        if (this.dialogue instanceof Dialogue) {
            obj["dialogue"] = this.dialogue.id;
        }
        else {
            obj["dialogue"] = null;
        }
        obj["title"] = this.title;
        obj["condition"] = this.condition;
        obj["className"] = this.getClassName();
        return obj;
    }
    isEnabled() {
        return this.enabled == true;
    }
    setEnabled(isEnabled = true) {
        this.enabled = (isEnabled == true);
        return 0;
    }
    dispose() {
        this.enabled = false;
        delete this.condition;
        this.dialogue.removeOption(this);
        return undefined;
    }
    getClassName() {
        return "DialogueOption";
    }

    static createFromArray(oArray) {
        if (!(oArray instanceof Array)) {
            return;
        }
        if (oArray.length == 0) {
            return;
        }
        if (oArray[0] instanceof Dialogue) {
            var tempDialogue = oArray[0];
        }
        else if (typeof oArray[0] == "string" && Dialogue.has(oArray[0])) {
            var tempDialogue = Dialogue.get(oArray[0]);
        }
        else {
            return 2;
        }
        let tempDialogueOption = new DialogueOption(undefined, tempDialogue);
        if (oArray.length > 2) {
            if (typeof oArray[1] == "string") {
                tempDialogueOption.setTitle(oArray[1]);
            }
            if (typeof oArray[2] == "function") {
                tempDialogueOption.setCondition(oArray[2]);
            }
        }
        else if (oArray.length > 1) {
            if (typeof oArray[1] == "function") {
                tempDialogueOption.setCondition(oArray[1]);
            }
            else if (typeof oArray[1] == "string") {
                tempDialogueOption.setTitle(oArray[1]);
            }
        }
        return tempDialogueOption;
    }
}

__checkDialogue = function() {
    var _exampleA = new Dialogue("exampleA", "Example A", "This is a test!");
    var _exampleB = new Dialogue("exampleB", "Example B", "This is another test!");
    var _exampleC = new Dialogue("exampleC", "Example C", "This is yet another test!", "exampleA", ["exampleB", function(){return true;}]);

    console.log("Checking if the first inserted option's title in Dialogue exampleC is equal to exampleA's title, which it should be.");
    console.log(Dialogue.get("exampleC").getOptions()[0].getTitle() == _exampleA.getTitle() ? "It is." : "It isn't.");
    console.log("Checking if the second inserted option's title in Dialogue exampleC is equal to exampleB's title, which it should be.");
    console.log(Dialogue.get("exampleC").getOptions()[1].getTitle() == _exampleB.getTitle() ? "It is." : "It isn't.");
}