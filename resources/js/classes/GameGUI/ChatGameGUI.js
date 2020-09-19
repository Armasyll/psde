class ChatGameGUI {
    static initialize() {
        ChatGameGUI.initialized = false;
        ChatGameGUI.controller = null;
        ChatGameGUI.outputContainer = null;
        ChatGameGUI.output = null;
        ChatGameGUI.input = null;
        ChatGameGUI.focused = false;
        ChatGameGUI.isVisible = false;
        ChatGameGUI.controller = ChatGameGUI.generateController();
        ChatGameGUI.containerAlpha = 0.75;
    }
    static resize() {
        if (ChatGameGUI.initialized != true) {
            return 1;
        }
        return 0;
    }
    static generateController() {
        let controller = GameGUI.createRectangle("chatBox");
        controller.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        controller.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        controller.height = 0.3;
        controller.width = GameGUI.getFontSize(24);
        controller.isVertical = true;
        controller.alpha = ChatGameGUI.containerAlpha;
            let chatOutputContainer = GameGUI.createRectangle("chatOutputContainer");
            chatOutputContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            chatOutputContainer.height = 0.8;
            chatOutputContainer.width = 1.0;
            chatOutputContainer.alpha = ChatGameGUI.containerAlpha;
                let chatOutput = GameGUI.createTextBlock("chatOutput");
                chatOutput.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
                chatOutput.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                chatOutput.height = 1.0;
                chatOutput.width = 1.0;
                chatOutput.textWrapping = true;
            let chatInput = GameGUI.createInputText("chatInput");
            chatInput.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            chatInput.height = 0.2;
            chatInput.width = 1.0;
            chatInput.text = "";
            chatInput.thickness = 1;
            chatInput.alpha = ChatGameGUI.containerAlpha;
        chatOutputContainer.addControl(chatOutput);
        controller.addControl(chatOutputContainer);
        controller.addControl(chatInput);
        // TODO: replace with onKeyboardEventProcessedObservable when it becomes available; until then, out-of-focus enters
        // TODO: add support for escape key; until then, you can only enter :v
        chatInput.onBlurObservable.add(() => {
            Game.sendChatMessage();
        });
        controller.zIndex = 90;
        ChatGameGUI.controller = controller;
        ChatGameGUI.outputContainer = chatOutputContainer;
        ChatGameGUI.output = chatOutput;
        ChatGameGUI.input = chatInput;
        ChatGameGUI.initialized = true;
        return controller;
    }
    static getController() {
        return ChatGameGUI.controller;
    }
    static show() {
        if (Game.debugMode) console.log("Running ChatGameGUI::show");
        ChatGameGUI.controller.isVisible = true;
        ChatGameGUI.isVisible = true;
    }
    static hide() {
        if (Game.debugMode) console.log("Running ChatGameGUI::hide");
        ChatGameGUI.controller.isVisible = false;
        ChatGameGUI.isVisible = false;
    }
    static getOutput() {
        return String(ChatGameGUI.output.text).trim();
    }
    static getInput() {
        return String(ChatGameGUI.input.text).trim();
    }
    static clearInput() {
        ChatGameGUI.input.text = "";
    }
    static clearOutput() {
        ChatGameGUI.output.text = "";
    }
    static appendOutput(string) {
        string = String(string).trim();
        ChatGameGUI.output.text += string + "\n";
    }
    static setOutput(string) {
        string = String(string).trim();
        ChatGameGUI.clearOutput();
        ChatGameGUI.appendOutput(string);
    }
    static disableInput() {
        ChatGameGUI.input.isEnabled = false;
    }
    static enableInput() {
        ChatGameGUI.input.isEnabled = true;
    }
    static isInputEnabled() {
        return ChatGameGUI.input.isEnabled;
    }
    static setFocused(boolean) {
        if (boolean === true) {
            ChatGameGUI.focused = true;
            Game.setInterfaceMode(InterfaceModeEnum.WRITING);
            GameGUI.hud.moveFocusToControl(ChatGameGUI.input);
        }
        else {
            ChatGameGUI.focused = false;
            GameGUI.hud.moveFocusToControl(null);
        }
    }
    static isFocused() {
        if (ChatGameGUI.focused) {
            return true;
        }
        return GameGUI.hud.focusedControl == ChatGameGUI.input;
    }
}