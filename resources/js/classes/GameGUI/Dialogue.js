class DialogueGameGUI {
    static getClassName() {
        return "DialogueGameGUI";
    }
    static initialize() {
        if (Game.debugMode) BABYLON.Tools.Log("Initializing DialogueGameGUI");
        DialogueGameGUI.initialized = false;
        DialogueGameGUI.controller = null;
        DialogueGameGUI.titleBar = null;
        DialogueGameGUI.closeButton = null;
        DialogueGameGUI.bodyContainer = null;
        DialogueGameGUI.fullScreen = true;
        DialogueGameGUI.defaultWidthInPixels = 0;
        DialogueGameGUI.defaultHeightInPixels = 0;
        DialogueGameGUI.windowWidthInPixels = -1;
        DialogueGameGUI.windowHeightInPixels = -1;
        DialogueGameGUI.posX = 0;
        DialogueGameGUI.posY = 0;

        DialogueGameGUI.body = null;
        DialogueGameGUI.optionsContainer = null;
        DialogueGameGUI.optionsColA = null;
        DialogueGameGUI.optionsColB = null;
        DialogueGameGUI.optionsColC = null;
        DialogueGameGUI.dialogueOptions = new Array();
        DialogueGameGUI.isVisible = false;

        DialogueGameGUI.resetDefaultDimensions();
        DialogueGameGUI.generateController();
        return 0;
    }
    static resetDefaultDimensions() {
        DialogueGameGUI.defaultWidthInPixels = Math.floor(Game.renderWidth / 2);
        DialogueGameGUI.defaultHeightInPixels = Math.floor(Game.renderHeight * 2 / 3);
        return 0;
    }
    static resize() {
        if (DialogueGameGUI.initialized != true) {
            return 1;
        }
        DialogueGameGUI.resetDefaultDimensions();
        if (DialogueGameGUI.fullScreen) {
            DialogueGameGUI.windowWidthInPixels = Game.renderWidth;
            DialogueGameGUI.windowHeightInPixels = Game.renderHeight;
        }

        DialogueGameGUI.controller.widthInPixels = DialogueGameGUI.defaultWidthInPixels;
        DialogueGameGUI.controller.heightInPixels = DialogueGameGUI.defaultHeightInPixels;
        DialogueGameGUI.titleBar.widthInPixels = DialogueGameGUI.controller.widthInPixels;
        DialogueGameGUI.titleBar.heightInPixels = GameGUI.titleBarHeightInPixels;
        DialogueGameGUI.title.widthInPixels = DialogueGameGUI.titleBar.widthInPixels - GameGUI.getFontSizeInPixels(2);
        DialogueGameGUI.closeButton.width = GameGUI.getFontSize(2);
        DialogueGameGUI.closeButton.height = GameGUI.getFontSize(2);
        DialogueGameGUI.bodyContainer.widthInPixels = DialogueGameGUI.controller.widthInPixels;
        DialogueGameGUI.bodyContainer.heightInPixels = DialogueGameGUI.controller.heightInPixels - DialogueGameGUI.titleBar.heightInPixels;

            DialogueGameGUI.body.width = DialogueGameGUI.bodyContainer.width;
            DialogueGameGUI.body.height = DialogueGameGUI.bodyContainer.height;
        DialogueGameGUI.optionsContainer.width = DialogueGameGUI.bodyContainer.width;
        DialogueGameGUI.optionsContainer.height = GameGUI.getFontSize(6);
            DialogueGameGUI.optionsColA.widthInPixels = Math.floor(DialogueGameGUI.optionsContainer.widthInPixels / 3);
            DialogueGameGUI.optionsColA.height = GameGUI.getFontSize(6);
            DialogueGameGUI.optionsColB.widthInPixels = Math.floor(DialogueGameGUI.optionsContainer.widthInPixels / 3);
            DialogueGameGUI.optionsColB.height = GameGUI.getFontSize(6);
            DialogueGameGUI.optionsColC.widthInPixels = Math.floor(DialogueGameGUI.optionsContainer.widthInPixels / 3);
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
        [DialogueGameGUI.controller, DialogueGameGUI.titleBar, DialogueGameGUI.title, DialogueGameGUI.closeButton, DialogueGameGUI.bodyContainer] = GameGUI.createWindow("dialogue", "Dialogue", DialogueGameGUI.defaultWidthInPixels, DialogueGameGUI.defaultHeightInPixels, 0);
        DialogueGameGUI.body = GameGUI.createTextBlock("dialogueBody"); // TODO: Fix text clipping after resizing to larger innerWindow
            DialogueGameGUI.body.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            DialogueGameGUI.body.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            DialogueGameGUI.body.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            DialogueGameGUI.body.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            DialogueGameGUI.body.textWrapping = BABYLON.GUI.TextWrapping.WordWrap;
            DialogueGameGUI.body.resizeToFit = true;
            DialogueGameGUI.body.width = DialogueGameGUI.bodyContainer.width;
            DialogueGameGUI.body.height = DialogueGameGUI.bodyContainer.height;
            DialogueGameGUI.body.paddingTop = "8px";
            DialogueGameGUI.body.paddingRight = "8px";
            DialogueGameGUI.body.paddingBottom = "8px";
            DialogueGameGUI.body.paddingLeft = "8px";
            DialogueGameGUI.body.text = "\"Who draw dis? :v\"";
        DialogueGameGUI.bodyContainer.addControl(DialogueGameGUI.body);

        DialogueGameGUI.optionsContainer = GameGUI.createStackPanel("dialogueOptionsContainer");
            DialogueGameGUI.optionsContainer.isVertical = false;
            DialogueGameGUI.optionsContainer.width = DialogueGameGUI.bodyContainer.width;
            DialogueGameGUI.optionsContainer.height = GameGUI.getFontSize(6);
            DialogueGameGUI.optionsContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            DialogueGameGUI.optionsContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            DialogueGameGUI.optionsColA = GameGUI.createStackPanel();
                DialogueGameGUI.optionsColA.isVertical = true;
                DialogueGameGUI.optionsColA.widthInPixels = Math.floor(DialogueGameGUI.optionsContainer.widthInPixels / 3);
                DialogueGameGUI.optionsColA.height = GameGUI.getFontSize(6);
            DialogueGameGUI.optionsContainer.addControl(DialogueGameGUI.optionsColA);
            DialogueGameGUI.optionsColB = GameGUI.createStackPanel();
                DialogueGameGUI.optionsColB.isVertical = true;
                DialogueGameGUI.optionsColB.widthInPixels = Math.floor(DialogueGameGUI.optionsContainer.widthInPixels / 3);
                DialogueGameGUI.optionsColB.height = GameGUI.getFontSize(6);
            DialogueGameGUI.optionsContainer.addControl(DialogueGameGUI.optionsColB);
            
            DialogueGameGUI.optionsColC = GameGUI.createStackPanel();
                DialogueGameGUI.optionsColC.isVertical = true;
                DialogueGameGUI.optionsColC.widthInPixels = Math.floor(DialogueGameGUI.optionsContainer.widthInPixels / 3);
                DialogueGameGUI.optionsColC.height = GameGUI.getFontSize(6);
            DialogueGameGUI.optionsContainer.addControl(DialogueGameGUI.optionsColC);
        DialogueGameGUI.bodyContainer.addControl(DialogueGameGUI.optionsContainer);
        
        DialogueGameGUI.closeButton.onPointerUpObservable.add(function() {
            DialogueGameGUI.clearOptions();
            DialogueGameGUI.hide();
        });
        
        DialogueGameGUI.controller.zIndex = 15;
        DialogueGameGUI.initialized = true;
        return DialogueGameGUI.controller;
    }
    static getController() {
        return DialogueGameGUI.controller;
    }
    static show() {
        if (Game.debugMode) console.log("Running DialogueGameGUI.show()");
        Game.setInterfaceMode(InterfaceModeEnum.DIALOGUE);
        GameGUI.windowStack.push(DialogueGameGUI);
        DialogueGameGUI.controller.isVisible = true;
        DialogueGameGUI.isVisible = true;
    }
    static hide(updateChildren = true) {
        if (Game.debugMode) console.log("Running DialogueGameGUI.hideDialogueMenu()");
        DialogueGameGUI.controller.isVisible = false;
        DialogueGameGUI.isVisible = false;
        GameGUI.windowStack.remove(DialogueGameGUI);
        if (updateChildren) {
            GameGUI.afterHideMenuChildren();
        }
        return 0;
    }
    static set(dialogue = null, target = Game.playerController.getTarget(), actor = Game.playerController) {
        if (Game.debugMode) console.log("Running DialogueGameGUI.setDialogue()");
        DialogueGameGUI.clear();
        if (typeof dialogue == "string") {
            if (Game.hasCachedDialogue(dialogue)) {
                dialogue = Game.getCachedDialogue(dialogue);
            }
            else {
                return 2;
            }
        }
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
        if (Object.keys(dialogue.options).length > 0) {
            for (let option in dialogue.options) {
                DialogueGameGUI.addOption(dialogue.options[option], target, actor, true);
            }
        }
        return 0;
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
        if (dialogueOption.className != "DialogueOption") {
            return 2;
        }
        if (DialogueGameGUI.dialogueOptions.length > 7 || DialogueGameGUI.dialogueOptions.hasOwnProperty(dialogueOption.dialogue.id)) {
            return 1;
        }
        let button = GameGUI.createSimpleButton(dialogueOption.dialogue.id, dialogueOption.title);
        button.width = GameGUI.getFontSize(13);
        button.height = GameGUI.getFontSize(2);
        button.onPointerUpObservable.add(function() {
            Game.setDialogue(dialogueOption.dialogue, target, actor);
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
        if (dialogueOption.className != "Dialogue") {
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