class DialogueGameGUI {
    static initialize() {
        DialogueGameGUI.controller = DialogueGameGUI.generateController();
        DialogueGameGUI.initialized = true;
        DialogueGameGUI.dialogueOptions = new Array();
    }
    static generateController() {
        /*
            [Image        Name          X]
            [----------------------------]
            [Dialogue                    ]
            [spacing                     ]
            [----------------------------]
            [Options                     ]
         */
        var _container = new BABYLON.GUI.Rectangle("dialogueContainer");
            _container.width = 0.5;
            _container.height = 0.4;
            _container.background = GameGUI.background;
            _container.thickness = 0;
            _container.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        var _titleBar = new BABYLON.GUI.Rectangle("dialogueTitleBar");
            _titleBar.width = 1.0;
            _titleBar.height = 0.1;
            _titleBar.thickness = 0;
            _titleBar.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        var _title = new BABYLON.GUI.TextBlock("dialogueTitle");
            _title.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            _title.color = GameGUI.color;
            _title.text = "Title :V";
        var _closeButton = new BABYLON.GUI.Button.CreateSimpleButton("close", "X");
            _closeButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            _closeButton.color = GameGUI.color;
            _closeButton.width = 0.05;
        var _bodyContainer = new BABYLON.GUI.Rectangle("dialogueBodyContainer"); // TODO: Replace with ScrollViewer when it becomes available
            _bodyContainer.width = 1.0;
            _bodyContainer.height = 0.6;
            _bodyContainer.thickness = 0;
            _bodyContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
            _bodyContainer.top = "-10%";
        var _body = new BABYLON.GUI.TextBlock("dialogueBody"); // TODO: Fix text clipping after resizing to larger innerWindow
            _body.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            _body.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            _body.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            _body.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            _body.textWrapping = BABYLON.GUI.TextWrapping.WordWrap;
            _body.resizeToFit = true;
            _body.width = 1.0;
            _body.height = 1.0;
            _body.color = GameGUI.color;
            _body.paddingTop = "8px";
            _body.paddingRight = "8px";
            _body.paddingBottom = "8px";
            _body.paddingLeft = "8px";
            _body.text = "\"Who draw dis? :v\"";
        var _optionsContainer = new BABYLON.GUI.StackPanel("dialogueOptionsContainer");
            _optionsContainer.isVertical = false;
            _optionsContainer.width = 1.0;
            _optionsContainer.height = 0.3;
            _optionsContainer.thickness = 0;
            _optionsContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        var _optionsColA = new BABYLON.GUI.StackPanel();
            _optionsColA.isVertical = true;
            _optionsColA.width = 0.33;
            _optionsColA.height = 1.0;
        var _optionsColB = new BABYLON.GUI.StackPanel();
            _optionsColB.isVertical = true;
            _optionsColB.width = 0.341;
            _optionsColB.height = 1.0;
        var _optionsColC = new BABYLON.GUI.StackPanel();
            _optionsColC.isVertical = true;
            _optionsColC.width = 0.33;
            _optionsColC.height = 1.0;
        
        _closeButton.onPointerUpObservable.add(function() {
            DialogueGameGUI.clearOptions();
            DialogueGameGUI.hide();
        });
        
        _optionsContainer.addControl(_optionsColA);
        _optionsContainer.addControl(_optionsColB);
        _optionsContainer.addControl(_optionsColC);
        _titleBar.addControl(_title);
        _titleBar.addControl(_closeButton);
        _bodyContainer.addControl(_body);
        _container.addControl(_titleBar);
        _container.addControl(_bodyContainer);
        _container.addControl(_optionsContainer);
        _container.isVisible = false;
        _container.zIndex = 15;
        DialogueGameGUI.title = _title;
        DialogueGameGUI.optionsContainer = _optionsContainer;
        DialogueGameGUI.optionsColA = _optionsColA;
        DialogueGameGUI.optionsColB = _optionsColB;
        DialogueGameGUI.optionsColC = _optionsColC;
        DialogueGameGUI.body = _body;
        return _container;
    }
    static getController() {
        return DialogueGameGUI.controller;
    }
    static isVisible() {
        return DialogueGameGUI.controller.isVisible;
    }
    static show() {
        if (Game.debugMode) console.log("Running DialogueGameGUI::show");
        Game.setInterfaceMode(InterfaceModeEnum.DIALOGUE);
        GameGUI.pointerRelease();
        DialogueGameGUI.controller.isVisible = true;
    }
    static hide() {
        if (Game.debugMode) console.log("Running DialogueGameGUI::hideDialogueMenu");
        Game.setInterfaceMode(InterfaceModeEnum.CHARACTER);
        GameGUI.pointerLock();
        DialogueGameGUI.controller.isVisible = false;
    }
    static setDialogue(dialogue, them, you = Game.player) {
        if (Game.debugMode) console.log("Running DialogueGameGUI::setDialogue");
        DialogueGameGUI.clear();
        if (!(dialogue instanceof Dialogue)) {
            dialogue = Game.getDialogue(dialogue);
            if (!(dialogue instanceof Dialogue)) {
                return 2;
            }
        }
        if (!(them instanceof AbstractEntity)) {
            if (Game.hasInstancedEntity(them)) {
                them = Game.getInstancedEntity(them)
            }
            else if (Game.hasEntity(them)) {
                them = Game.getEntity(them);
            }
            else {
                return 2;
            }
        }
        if (!(you instanceof AbstractEntity)) {
            if (Game.hasInstancedEntity(you)) {
                you = Game.getInstancedEntity(you)
            }
            else if (Game.hasEntity(you)) {
                you = Game.getEntity(you);
            }
            else {
                return 2;
            }
        }
        DialogueGameGUI.setTitle(dialogue.getTitle());
        let bodyString = dialogue.getText(them, you);
        if (typeof bodyString == "function") {
            DialogueGameGUI.setBody(bodyString);
        }
        else {
            DialogueGameGUI.setBody(bodyString);
        }
        if (dialogue.hasOptions()) {
            for (let dialogueOption in dialogue.getOptions()) {
                if (dialogue.getOptions()[dialogueOption].getCondition(them, you)) {
                    DialogueGameGUI.addOption(dialogue.getOptions()[dialogueOption], them, you, true);
                }
            }
        }
    }
    static setTitle(titleString) {
        DialogueGameGUI.title.text = new String(titleString);
    }
    static clearTitle() {
        DialogueGameGUI.setTitle("");
    }
    static setBody(bodyString) {
        DialogueGameGUI.body.text = new String(bodyString);
    }
    static appendDialogue(appendedString) {
        DialogueGameGUI.body.text += appendedString;
    }
    static clearBody() {
        DialogueGameGUI.setBody("");
    }
    static addOption(dialogueOption, them, you = Game.player) {
        if (!(dialogueOption instanceof DialogueOption)) {
            return undefined;
        }
        if (DialogueGameGUI.dialogueOptions.length > 7 || DialogueGameGUI.dialogueOptions.hasOwnProperty(dialogueOption.getDialogue().getID())) {
            return false;
        }
        var _button = new BABYLON.GUI.Button.CreateSimpleButton(dialogueOption.getDialogue().getID(), dialogueOption.getTitle());
        _button.color = GameGUI.color;
        _button.width = 1.0;
        _button.height = 0.33;
        _button.onPointerUpObservable.add(function() {
            DialogueGameGUI.setDialogue(dialogueOption.getDialogue(), them, you);
        });
        if (DialogueGameGUI.dialogueOptions.length > 5) {
            DialogueGameGUI.optionsContainer.children[2].addControl(_button);
        }
        else if (DialogueGameGUI.dialogueOptions.length > 2) {
            DialogueGameGUI.optionsContainer.children[1].addControl(_button);
        }
        else {
            DialogueGameGUI.optionsContainer.children[0].addControl(_button);
        }
        DialogueGameGUI.dialogueOptions.push(dialogueOption);
        return true;
    }
    static removeOption(dialogueOption) {
        if (!(dialogueOption instanceof DialogueOption)) {
            return false;
        }
        for (let i = 0; i < DialogueGameGUI.optionsContainer.children.length; i++) {
            for (let j = DialogueGameGUI.optionsContainer.children[i].children.length; j >= 0; j--) {
                if (DialogueGameGUI.optionsContainer.children[i].children[j] instanceof BABYLON.GUI.Container) {
                    if (DialogueGameGUI.optionsContainer.children[i].children[j].id == dialogueOption.getID()) {
                        DialogueGameGUI.optionsContainer.children[i].children[j].dispose();
                    }
                }
            }
        }
        if (DialogueGameGUI.dialogueOptions.indexOf(dialogueOption) > -1) {
            DialogueGameGUI.dialogueOptions.remove(dialogueOption);
        }
    }
    static clearOptions() {
        for (let i = 0; i < DialogueGameGUI.optionsContainer.children.length; i++) {
            for (let j = DialogueGameGUI.optionsContainer.children[i].children.length; j >= 0; j--) {
                if (DialogueGameGUI.optionsContainer.children[i].children[j] instanceof BABYLON.GUI.Container) {
                    DialogueGameGUI.optionsContainer.children[i].children[j].dispose();
                }
            }
        }
        DialogueGameGUI.dialogueOptions.clear();
    }
    static clear() {
        DialogueGameGUI.clearTitle();
        DialogueGameGUI.clearBody();
        DialogueGameGUI.clearOptions();
    }
}