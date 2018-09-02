class Dialogue {
	/**
	 * Creates a Dialogue
	 * @param  {String}    _id       Unique ID
	 * @param  {String}    _title    Title
	 * @param  {String}    _dialogue String, or Function that returns a String
	 * @param  {...Dialogue} _options  Dialogue, Dialogue and Function array, or a Dialogue, Title, and Function array, with the function returning true or false deciding whether or not the Dialogue is shown.
	 * @return {Dialogue}  Dialogue
	 * @example new Dialogue("exampleA", "Example A", "This is a test!")
	 * @example new Dialogue("exampleB", "Example B", "This is another test!")
	 * @example new Dialogue("exampleC", "Example C", "Yet another test!", ["exampleA", function(){return true;}], exampleB, ["exampleB", "Overrides ExampleB Title", function(){return (1 == 1 ? true : false);}])
	 * @example new Dialogue("exampleD", "Example D", function() {return "Last example, I swear!";}, "exampleA", "exampleB", "exampleC")
	 */
	constructor(_id, _title, _dialogue, ..._options) {
        if (typeof _id != "string") {_id = genUUIDv4();}
        if (typeof _title != "string") {_title = "";}
        if (typeof _dialogue != "string" && typeof _dialogue != "function") {
        	return;
        }
        this.id = Game.filterID(_id);
        this.title = Game.filterName(_title) || "";
        this.dialogue = _dialogue;
        this.options = [];
        if (_options.length > 0) {
        	for (var _i = 0; _i < _options.length; _i++) {
        		if (_options[_i] instanceof Dialogue) {
        			this.options.push(new DialogueOption(_options[_i]));
        		}
        		else if (typeof _options[_i] == "string") {
        			var _tempDialogue = Game.getDialogue(_options[_i]);
        			if (_tempDialogue instanceof Dialogue) {
        				this.options.push(new DialogueOption(_tempDialogue));
        			}
        		}
        		else if (_options[_i] instanceof Array) {
        			var _tempDialogueOption = DialogueOption.createFromArray(_options[_i]);
        			if (_tempDialogueOption instanceof DialogueOption) {
        				this.options.push(_tempDialogueOption);
        			}
        		}
        	}
        }
        Game.dialogues[this.id] = this;
	}
	getID() {
		return this.id;
	}
	getTitle() {
		return this.title;
	}
	getDialogue() {
		if (typeof this.dialogue == "string") {
			return this.dialogue;
		}
		else if (typeof this.dialogue == "function") {
			return this.dialogue();
		}
		else {
			return "";
		}
	}
	getOptions() {
		return this.options;
	}
}
class DialogueOption {
	constructor(_dialogue, _title = undefined, _condition = undefined) {
		this.dialogue = undefined;
		this.title = undefined;
		this.condition = undefined;
		this.setDialogue(_dialogue);
		if (typeof _title == "string") {
			this.setTitle(_title);
		}
		if (typeof _condition == "function") {
			this.setCondition(_condition);
		}
	}
	setDialogue(_dialogue) {
		_dialogue = Game.getDialogue(_dialogue);
		if (_dialogue instanceof Dialogue) {
			this.dialogue = _dialogue;
			this.setTitle(this.title);
		}
		return this;
	}
	getDialogue() {
		return this.dialogue;
	}
	setTitle(_title) {
		if (!(this.dialogue instanceof Dialogue)) {
			return this;
		}
		this.title = Game.filterName(_title) || this.dialogue.getTitle();
		return this;
	}
	getTitle() {
		return this.title || this.dialogue.getTitle();
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
	getCondition() {
		if (typeof this.condition == "function") {
			return this.condition();
		}
		else {
			return true;
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