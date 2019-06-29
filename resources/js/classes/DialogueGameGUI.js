class DialogueGameGUI {
    static initialize() {
        DialogueGameGUI.initialized = false;
        DialogueGameGUI.controller = null;
        DialogueGameGUI.titleBar = null;
        DialogueGameGUI.closeButton = null;
        DialogueGameGUI.bodyContainer = null;
        DialogueGameGUI.body = null;
        DialogueGameGUI.optionsContainer = null;
        DialogueGameGUI.optionsColA = null;
        DialogueGameGUI.optionsColB = null;
        DialogueGameGUI.optionsColC = null;
        DialogueGameGUI.dialogueOptions = new Array();
        DialogueGameGUI.controller = DialogueGameGUI.generateController();
    }
    static resize() {
        if (DialogueGameGUI.initialized != true) {
            return 1;
        }
        DialogueGameGUI.controller.width = String(Game.engine.getRenderWidth() / 2).concat("px");
        DialogueGameGUI.controller.height = String(Game.engine.getRenderHeight() * 2 / 3).concat("px");
            DialogueGameGUI.titleBar.width = String(DialogueGameGUI.controller.widthInPixels).concat("px");
            DialogueGameGUI.titleBar.height = String(GameGUI.getFontSize(2)).concat("px");
                DialogueGameGUI.closeButton.width = String(GameGUI.getFontSize(2)).concat("px");
                DialogueGameGUI.closeButton.height = String(GameGUI.getFontSize(2)).concat("px");
            DialogueGameGUI.bodyContainer.width = String(DialogueGameGUI.controller.widthInPixels).concat("px");
            DialogueGameGUI.bodyContainer.height = String(DialogueGameGUI.controller.heightInPixels - GameGUI.getFontSize(8)).concat("px");
                DialogueGameGUI.body.width = String(DialogueGameGUI.controller.widthInPixels).concat("px");
                DialogueGameGUI.body.height = String(DialogueGameGUI.bodyContainer.heightInPixels).concat("px");
            DialogueGameGUI.optionsContainer.width = String(DialogueGameGUI.controller.widthInPixels).concat("px");
            DialogueGameGUI.optionsContainer.height = String(GameGUI.getFontSize(6)).concat("px");
                DialogueGameGUI.optionsColA.width = String(DialogueGameGUI.controller.widthInPixels/3).concat("px");
                DialogueGameGUI.optionsColA.height = String(GameGUI.getFontSize(6)).concat("px");
                DialogueGameGUI.optionsColB.width = String(DialogueGameGUI.controller.widthInPixels/3).concat("px");
                DialogueGameGUI.optionsColB.height = String(GameGUI.getFontSize(6)).concat("px");
                DialogueGameGUI.optionsColC.width = String(DialogueGameGUI.controller.widthInPixels/3).concat("px");
                DialogueGameGUI.optionsColC.height = String(GameGUI.getFontSize(6)).concat("px");
        return 0;
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
        var controller = new BABYLON.GUI.Rectangle("dialogueContainer");
            controller.width = String(Game.engine.getRenderWidth() / 2).concat("px");
            controller.height = String(Game.engine.getRenderHeight() * 2 / 3).concat("px");
            controller.background = GameGUI.background;
            controller.thickness = 0;
            controller.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            var titleBar = new BABYLON.GUI.Rectangle("dialogueTitleBar");
                titleBar.width = String(controller.widthInPixels).concat("px");
                titleBar.height = String(GameGUI.getFontSize(2)).concat("px");
                titleBar.thickness = 0;
                titleBar.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                var title = new BABYLON.GUI.TextBlock("dialogueTitle");
                    title.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                    title.color = GameGUI.color;
                    title.text = "Title :V";
                var closeButton = new BABYLON.GUI.Button.CreateSimpleButton("close", "X");
                    closeButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                    closeButton.color = GameGUI.color;
                    closeButton.width = String(GameGUI.getFontSize(2)).concat("px");
                    closeButton.height = String(GameGUI.getFontSize(2)).concat("px");
            var bodyContainer = new BABYLON.GUI.Rectangle("dialogueBodyContainer"); // TODO: Replace with ScrollViewer when it becomes available
                bodyContainer.width = String(controller.widthInPixels).concat("px");
                bodyContainer.height = String(controller.heightInPixels - GameGUI.getFontSize(8)).concat("px");
                bodyContainer.thickness = 0;
                bodyContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                bodyContainer.top = "-10%";
                var body = new BABYLON.GUI.TextBlock("dialogueBody"); // TODO: Fix text clipping after resizing to larger innerWindow
                    body.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                    body.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    body.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                    body.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    body.textWrapping = BABYLON.GUI.TextWrapping.WordWrap;
                    body.resizeToFit = true;
                    body.width = String(controller.widthInPixels).concat("px");
                    body.height = String(bodyContainer.heightInPixels).concat("px");
                    body.color = GameGUI.color;
                    body.paddingTop = "8px";
                    body.paddingRight = "8px";
                    body.paddingBottom = "8px";
                    body.paddingLeft = "8px";
                    body.text = "\"Who draw dis? :v\"";
            var optionsContainer = new BABYLON.GUI.StackPanel("dialogueOptionsContainer");
                optionsContainer.isVertical = false;
                optionsContainer.width = String(controller.widthInPixels).concat("px");
                optionsContainer.height = String(GameGUI.getFontSize(6)).concat("px");
                optionsContainer.thickness = 0;
                optionsContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                optionsContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
                var optionsColA = new BABYLON.GUI.StackPanel();
                    optionsColA.isVertical = true;
                    optionsColA.width = String(controller.widthInPixels/3).concat("px");
                    optionsColA.height = String(GameGUI.getFontSize(6)).concat("px");
                var optionsColB = new BABYLON.GUI.StackPanel();
                    optionsColB.isVertical = true;
                    optionsColB.width = String(controller.widthInPixels/3).concat("px");
                    optionsColB.height = String(GameGUI.getFontSize(6)).concat("px");
                var optionsColC = new BABYLON.GUI.StackPanel();
                    optionsColC.isVertical = true;
                    optionsColC.width = String(controller.widthInPixels/3).concat("px");
                    optionsColC.height = String(GameGUI.getFontSize(6)).concat("px");
        
        closeButton.onPointerUpObservable.add(function() {
            DialogueGameGUI.clearOptions();
            DialogueGameGUI.hide();
        });
        
        optionsContainer.addControl(optionsColA);
        optionsContainer.addControl(optionsColB);
        optionsContainer.addControl(optionsColC);
        titleBar.addControl(title);
        titleBar.addControl(closeButton);
        bodyContainer.addControl(body);
        controller.addControl(titleBar);
        controller.addControl(bodyContainer);
        controller.addControl(optionsContainer);
        controller.isVisible = false;
        controller.zIndex = 15;
        DialogueGameGUI.controller = controller;
        DialogueGameGUI.titleBar = titleBar;
        DialogueGameGUI.title = title;
        DialogueGameGUI.closeButton = closeButton;
        DialogueGameGUI.bodyContainer = bodyContainer;
        DialogueGameGUI.body = body;
        DialogueGameGUI.optionsContainer = optionsContainer;
        DialogueGameGUI.optionsColA = optionsColA;
        DialogueGameGUI.optionsColB = optionsColB;
        DialogueGameGUI.optionsColC = optionsColC;
        DialogueGameGUI.initialized = true;
        return controller;
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
        _button.width = GameGUI.getFontSizePx(13);
        _button.height = GameGUI.getFontSizePx(2);
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