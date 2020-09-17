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
        DialogueGameGUI.isVisible = false;
        DialogueGameGUI.controller = DialogueGameGUI.generateController();
    }
    static resize() {
        if (DialogueGameGUI.initialized != true) {
            return 1;
        }
        DialogueGameGUI.controller.width = String(Game.renderWidth / 2).concat("px");
        DialogueGameGUI.controller.height = String(Game.renderHeight * 2 / 3).concat("px");
            DialogueGameGUI.titleBar.width = DialogueGameGUI.controller.width;
            DialogueGameGUI.titleBar.height = GameGUI.getFontSize(2);
                DialogueGameGUI.title.width = String(DialogueGameGUI.titleBar.widthInPixels - GameGUI.getFontSizeInPixels(2)).concat("px");
                DialogueGameGUI.closeButton.width = GameGUI.getFontSize(2);
                DialogueGameGUI.closeButton.height = GameGUI.getFontSize(2);
            DialogueGameGUI.bodyContainer.width = DialogueGameGUI.controller.width;
            DialogueGameGUI.bodyContainer.height = String(DialogueGameGUI.controller.heightInPixels - GameGUI.getFontSizeInPixels(8)).concat("px");
                DialogueGameGUI.body.width = DialogueGameGUI.controller.width;
                DialogueGameGUI.body.height = DialogueGameGUI.bodyContainer.height;
            DialogueGameGUI.optionsContainer.width = DialogueGameGUI.controller.width;
            DialogueGameGUI.optionsContainer.height = GameGUI.getFontSize(6);
                DialogueGameGUI.optionsColA.width = String(DialogueGameGUI.optionsContainer.widthInPixels / 3).concat("px");
                DialogueGameGUI.optionsColA.height = GameGUI.getFontSize(6);
                DialogueGameGUI.optionsColB.width = String(DialogueGameGUI.optionsContainer.widthInPixels / 3).concat("px");
                DialogueGameGUI.optionsColB.height = GameGUI.getFontSize(6);
                DialogueGameGUI.optionsColC.width = String(DialogueGameGUI.optionsContainer.widthInPixels / 3).concat("px");
                DialogueGameGUI.optionsColC.height = GameGUI.getFontSize(6);
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
        var controller = GameGUI.createStackPanel("dialogueContainer");
            controller.width = String(Game.renderWidth / 2).concat("px");
            controller.height = String(Game.renderHeight * 2 / 3).concat("px");
            controller.isVertical = true;
            controller.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            var titleBar = GameGUI.createStackPanel("dialogueTitleBar");
                titleBar.width = controller.width;
                titleBar.height = GameGUI.getFontSize(2);
                titleBar.isVertical = false;
                titleBar.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                var title = GameGUI.createTextBlock("dialogueTitle");
                    title.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                    title.width = String(titleBar.widthInPixels - GameGUI.getFontSizeInPixels(2)).concat("px");
                    title.text = "Title :V";
                titleBar.addControl(title);
                var closeButton = GameGUI.createSimpleButton("close", "X");
                    closeButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                    closeButton.width = GameGUI.getFontSize(2);
                    closeButton.height = GameGUI.getFontSize(2);
                titleBar.addControl(closeButton);
            controller.addControl(titleBar);
            var bodyContainer = new BABYLON.GUI.Rectangle("dialogueBodyContainer"); // TODO: Replace with ScrollViewer when it becomes available
                bodyContainer.width = controller.width;
                bodyContainer.height = String(controller.heightInPixels - GameGUI.getFontSizeInPixels(8)).concat("px");
                bodyContainer.thickness = 0;
                bodyContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                var body = GameGUI.createTextBlock("dialogueBody"); // TODO: Fix text clipping after resizing to larger innerWindow
                    body.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                    body.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    body.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                    body.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    body.textWrapping = BABYLON.GUI.TextWrapping.WordWrap;
                    body.resizeToFit = true;
                    body.width = controller.width;
                    body.height = bodyContainer.height;
                    body.paddingTop = "8px";
                    body.paddingRight = "8px";
                    body.paddingBottom = "8px";
                    body.paddingLeft = "8px";
                    body.text = "\"Who draw dis? :v\"";
                bodyContainer.addControl(body);
            controller.addControl(bodyContainer);
            var optionsContainer = GameGUI.createStackPanel("dialogueOptionsContainer");
                optionsContainer.isVertical = false;
                optionsContainer.width = controller.width;
                optionsContainer.height = GameGUI.getFontSize(6);
                optionsContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                optionsContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
                var optionsColA = GameGUI.createStackPanel();
                    optionsColA.isVertical = true;
                    optionsColA.width = String(optionsContainer.widthInPixels / 3).concat("px");
                    optionsColA.height = GameGUI.getFontSize(6);
                optionsContainer.addControl(optionsColA);
                var optionsColB = GameGUI.createStackPanel();
                    optionsColB.isVertical = true;
                    optionsColB.width = String(optionsContainer.widthInPixels / 3).concat("px");
                    optionsColB.height = GameGUI.getFontSize(6);
                optionsContainer.addControl(optionsColB);
                var optionsColC = GameGUI.createStackPanel();
                    optionsColC.isVertical = true;
                    optionsColC.width = String(optionsContainer.widthInPixels / 3).concat("px");
                    optionsColC.height = GameGUI.getFontSize(6);
                optionsContainer.addControl(optionsColC);
            controller.addControl(optionsContainer);
        
        closeButton.onPointerUpObservable.add(function() {
            DialogueGameGUI.clearOptions();
            DialogueGameGUI.hide();
        });
        
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
    static show() {
        if (Game.debugMode) console.log("Running DialogueGameGUI.show()");
        Game.setInterfaceMode(InterfaceModeEnum.DIALOGUE);
        GameGUI.pointerRelease();
        DialogueGameGUI.controller.isVisible = true;
        DialogueGameGUI.isVisible = true;
    }
    static hide() {
        if (Game.debugMode) console.log("Running DialogueGameGUI.hideDialogueMenu()");
        Game.setInterfaceMode(InterfaceModeEnum.CHARACTER);
        GameGUI.pointerLock();
        DialogueGameGUI.controller.isVisible = false;
        DialogueGameGUI.isVisible = false;
    }
    static set(dialogue = null, target = null, actor = Game.playerController) {
        if (Game.debugMode) console.log("Running DialogueGameGUI.setDialogue()");
        DialogueGameGUI.clear();
        if (dialogue.className != "Dialogue") {
            return 2;
        }
        if (!(target instanceof EntityController)) {
            if (EntityController.has(target)) {
                target = EntityController.get(target)
            }
            else {
                return 2;
            }
        }
        if (!(actor instanceof EntityController)) {
            if (EntityController.has(actor)) {
                actor = EntityController.get(actor)
            }
            else {
                return 2;
            }
        }
        DialogueGameGUI.setTitle(dialogue.title);
        let bodyString = dialogue.text;
        if (typeof bodyString == "function") {
            DialogueGameGUI.setBody(bodyString);
        }
        else {
            DialogueGameGUI.setBody(bodyString);
        }
        if (Object.keys(dialogue.options) > 0) {
            for (let option in dialogue.options) {
                DialogueGameGUI.addOption(dialogue.options[option], target, actor, true);
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
    static addOption(dialogueOption = null, target, actor = Game.playerController) {
        if (dialogue.className != "Dialogue") {
            return 2;
        }
        if (DialogueGameGUI.dialogueOptions.length > 7 || DialogueGameGUI.dialogueOptions.hasOwnProperty(dialogueOption.dialogue.id)) {
            return 1;
        }
        let button = GameGUI.createSimpleButton(dialogueOption.dialogue.id, dialogueOption.title);
        button.width = GameGUI.getFontSize(13);
        button.height = GameGUI.getFontSize(2);
        button.onPointerUpObservable.add(function() {
            DialogueGameGUI.set(dialogueOption.dialogue, target, actor);
        });
        if (DialogueGameGUI.dialogueOptions.length > 5) {
            DialogueGameGUI.optionsContainer.children[2].addControl(button);
        }
        else if (DialogueGameGUI.dialogueOptions.length > 2) {
            DialogueGameGUI.optionsContainer.children[1].addControl(button);
        }
        else {
            DialogueGameGUI.optionsContainer.children[0].addControl(button);
        }
        DialogueGameGUI.dialogueOptions.push(dialogueOption);
        return true;
    }
    static removeOption(dialogueOption) {
        if (dialogue.className != "Dialogue") {
            return 2;
        }
        for (let i = 0; i < DialogueGameGUI.optionsContainer.children.length; i++) {
            for (let j = DialogueGameGUI.optionsContainer.children[i].children.length; j >= 0; j--) {
                if (DialogueGameGUI.optionsContainer.children[i].children[j] instanceof BABYLON.GUI.Container) {
                    if (DialogueGameGUI.optionsContainer.children[i].children[j].id == dialogueOption.id) {
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