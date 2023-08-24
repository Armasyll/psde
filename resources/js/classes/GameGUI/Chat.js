class ChatGameGUI {
    static getClassName() {
        return "ChatGameGUI";
    }
    static initialize() {
        if (Game.debugMode) BABYLON.Tools.Log("Initializing ChatGameGUI");
        ChatGameGUI.initialized = false;
        ChatGameGUI.isVisible = false;
        ChatGameGUI.controller = null;
        ChatGameGUI.outputContainer = null;
        ChatGameGUI.output = null;
        ChatGameGUI.input = null;
        ChatGameGUI.focused = false;
        ChatGameGUI.containerAlpha = 0.75;
        ChatGameGUI.defaultWidthInPixels = GameGUI.getFontSize(24);
        ChatGameGUI.defaultHeightInPixels = GameGUI.renderHeight / 3;
        ChatGameGUI.posX = 0;
        ChatGameGUI.posY = 0;
        ChatGameGUI.interfaceMode = InterfaceModeEnum.WRITING;

        ChatGameGUI.generateController();
        ChatGameGUI.hide();
        return 0;
    }
    static resize() {
        if (ChatGameGUI.initialized != true) {
            return 1;
        }
        ChatGameGUI.controller.width = String(ChatGameGUI.defaultWidthInPixels).concat("px");
        ChatGameGUI.controller.height = String(ChatGameGUI.defaultHeightInPixels).concat("px");
        return 0;
    }
    /**
     * 
     * @param {number} width Width in pixels
     * @param {number} height Height in pixels
     * @returns {number} Integer status code
     */
    static setDimensions(width = ChatGameGUI.defaultWidthInPixels, height = ChatGameGUI.defaultHeightInPixels) {
        if (typeof width == "number") {
            ChatGameGUI.defaultWidthInPixels = width;
        }
        if (typeof height == "number") {
            ChatGameGUI.defaultHeightInPixels = height;
        }
        ChatGameGUI.resize();
        return 0;
    }
    /**
     * 
     * @param {number} posX Distance from left in pixels
     * @param {number} posY Distance from bottom in pixels
     * @returns {number} Integer status code
     */
    static setPosition(posX = ChatGameGUI.posX, posY = ChatGameGUI.posY) {
        if (typeof posX == "number") {
            ChatGameGUI.posX = left;
        }
        if (typeof posY == "number") {
            ChatGameGUI.posY = bottom;
        }
        return 0;
    }
    static generateController() {
        let controller = GameGUI.createRectangle("chatBox");
        controller.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        controller.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        controller.height = String(ChatGameGUI.defaultHeightInPixels).concat("px");
        controller.width = String(ChatGameGUI.defaultHeightInPixels).concat("px");
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
            ChatGameGUI.sendInput();
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
        return 0;
    }
    static hide(updateChildren = false) {
        if (Game.debugMode) console.log("Running ChatGameGUI::hide");
        ChatGameGUI.controller.isVisible = false;
        ChatGameGUI.isVisible = false;
        return 0;
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
        }
        else {
            ChatGameGUI.focused = false;
        }
    }
    static isFocused() {
        if (ChatGameGUI.focused) {
            return true;
        }
        return GameGUI.hud.focusedControl == ChatGameGUI.input;
    }
    static parseInput(chatString) {
        if (chatString.slice(0, 1) == "/") {
            return ChatGameGUI.inputCommands(chatString.slice(1));
        }
        else {
            return Game.gui.chat.appendOutput(`${new Date().toLocaleTimeString({ hour12: false })} ${Game.getCachedEntity(Game.playerEntityID).name}: ${chatString}`);
        }
        return 0;
    }
    static sendInput() {
        let chatString = Game.gui.chat.getInput();
        if (chatString.length == 0) {
            return 1;
        }
        if (Client.isOnline()) {
            Client.sendChatMessage(chatString);
        }
        else {
            ChatGameGUI.parseInput(chatString);
        }
        Game.gui.chat.clearInput();
        Game.gui.chat.setFocused(false);
        return 0;
    }
    static inputCommands(command, ...parameters) {
        if (command == undefined || typeof command != "string") {
            return 2;
        }
        if (command.slice(0, 1) == "/") {
            command = command.slice(1);
        }
        let commandArray = command.split(" ");
        if (commandArray.length == 0 || typeof commandArray[0] != "string" || commandArray[0].length <= 0) {
            commandArray.push("help");
        }
        switch (commandArray[0].toLowerCase()) {
            case "help": {
                Game.gui.chat.appendOutput("Possible commands are: help, clear, menu, login, logout, quit, save, and load.\n");
                break;
            }
            case "addallarmour":
            case "addallarmor":
            case "addallclothing": {
                let target = Game.playerEntityID;
                if (commandArray.hasOwnProperty(1)) {
                    target = commandArray[1];
                }
                Game.entityLogicWorkerPostMessage("addAllClothing", 0, {"target": target});
                break;
            }
            case "addallitems": {
                let target = Game.playerEntityID;
                if (commandArray.hasOwnProperty(1)) {
                    target = commandArray[1];
                }
                Game.entityLogicWorkerPostMessage("addAllItems", 0, {"target": target});
                break;
            }
            case "addallkeys": {
                let target = Game.playerEntityID;
                if (commandArray.hasOwnProperty(1)) {
                    target = commandArray[1];
                }
                Game.entityLogicWorkerPostMessage("addAllKeys", 0, {"target": target});
                break;
            }
            case "addallweapons": {
                let target = Game.playerEntityID;
                if (commandArray.hasOwnProperty(1)) {
                    target = commandArray[1];
                }
                Game.entityLogicWorkerPostMessage("addAllWeapons", 0, {"target": target});
                break;
            }
            case "additem": {
                let index = 1;
                let item = commandArray[index];
                index++;
                let amount = 1;
                if (commandArray.hasOwnProperty(index) && typeof commandArray[index] == "number") {
                    amount = commandArray[index];
                    index++;
                }
                let target = Game.playerEntityID;
                if (commandArray.hasOwnProperty(index) && typeof commandArray[index] == "string") {
                    target = commandArray[index];
                }
                Game.entityLogicWorkerPostMessage("addItem", 0, {"entityID": item, "amount": amount, "target": target});
                break;
            }
            case "addmoney": {
                let money = Tools.filterInt(commandArray[1]) || 1;
                let target = Game.playerEntityID;
                if (commandArray.hasOwnProperty(2)) {
                    target = commandArray[2];
                }
                Game.entityLogicWorkerPostMessage("addMoney", 0, {"amount": money, "target": target});
                break;
            }
            case "clear": {
                Game.gui.chat.clearOutput();
                break;
            }
            case "exit": {
                break;
            }
            case "getmoney": {
                let target = Game.playerEntityID;
                if (commandArray.hasOwnProperty(1)) {
                    target = commandArray[1];
                }
                Game.entityLogicWorkerPostMessage("getMoney", 0, {"target": target});
                break;
            }
            case "kill": {
                let target = Game.playerEntityID;
                if (commandArray.hasOwnProperty(1)) {
                    target = commandArray[1];
                }
                Game.entityLogicWorkerPostMessage("kill", 0, {"target": target});
                break;
            }
            case "load": {
                break;
            }
            case "loadcell": {
                // TODO: this
                //let cellID = commandArray[1];
                //Game.setPlayerCell(cellID);
                break;
            }
            case "login": {
                break;
            }
            case "logout": {
                Client.disconnect();
                break;
            }
            case "menu": {
                Game.gui.mainMenu.show();
                break;
            }
            case "quit": {
                break;
            }
            case "save": {
                break;
            }
            case "setmoney": {
                let money = Tools.filterInt(commandArray[1]) || 1;
                let target = Game.playerEntityID;
                if (commandArray.hasOwnProperty(2)) {
                    target = commandArray[2];
                }
                Game.entityLogicWorkerPostMessage("setMoney", 0, {"amount": money, "target": target});
                break;
            }
            case "showdebug": {
                Game.gui.debug.show();
                break;
            }
            case "unloadcell": {
                Game.unloadCell(false);
                break;
            }
            default: {
                Game.gui.chat.appendOutput(`Command "${command}" not found.\n`);
                return 0;
            }
        }
        return 0;
    }
}