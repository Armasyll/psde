/**
 * Abstract Controls for in-game UI
 */
class AbstractControls {
    static _runBefore(event) {
        return 0;
    }
    static _runAfter(event) {
        return 0;
    }
    static onKeyDown(keyboardEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(keyboardEvent instanceof KeyboardEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running AbstractControl::onKeyDown(${keyboardEvent.button})`);
        switch (Game.interfaceMode) {
            case InterfaceModeEnum.CHARACTER: return CharacterControls.onKeyDown(keyboardEvent);
            case InterfaceModeEnum.DIALOGUE: return DialogueControls.onKeyDown(keyboardEvent);
            case InterfaceModeEnum.MENU: return MenuControls.onKeyDown(keyboardEvent);
            case InterfaceModeEnum.EDIT: return EditControls.onKeyDown(keyboardEvent);
            case InterfaceModeEnum.WRITING: return WritingControls.onKeyDown(keyboardEvent);
            default: return 0;
        }
    }
    static onKeyUp(keyboardEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(keyboardEvent instanceof KeyboardEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running AbstractControl::onKeyUp(${keyboardEvent.button})`);
        switch (Game.interfaceMode) {
            case InterfaceModeEnum.CHARACTER: return CharacterControls.onKeyUp(keyboardEvent);
            case InterfaceModeEnum.DIALOGUE: return DialogueControls.onKeyUp(keyboardEvent);
            case InterfaceModeEnum.MENU: return MenuControls.onKeyUp(keyboardEvent);
            case InterfaceModeEnum.EDIT: return EditControls.onKeyUp(keyboardEvent);
            case InterfaceModeEnum.WRITING: return WritingControls.onKeyUp(keyboardEvent);
            default: return 0;
        }
    }
    static onKeyPress(keyboardEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(keyboardEvent instanceof KeyboardEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running AbstractControl::onKeyPress(${keyboardEvent.button})`);
        switch (Game.interfaceMode) {
            case InterfaceModeEnum.CHARACTER: return CharacterControls.onKeyPress(keyboardEvent);
            case InterfaceModeEnum.DIALOGUE: return DialogueControls.onKeyPress(keyboardEvent);
            case InterfaceModeEnum.MENU: return MenuControls.onKeyPress(keyboardEvent);
            case InterfaceModeEnum.EDIT: return EditControls.onKeyPress(keyboardEvent);
            case InterfaceModeEnum.WRITING: return WritingControls.onKeyPress(keyboardEvent);
            default: return 0;
        }
    }
    static onMouseDown(mouseEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(mouseEvent instanceof MouseEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running AbstractControl::onMouseDown(${mouseEvent.button})`);
        switch (Game.interfaceMode) {
            case InterfaceModeEnum.CHARACTER: return CharacterControls.onMouseDown(mouseEvent);
            case InterfaceModeEnum.DIALOGUE: return DialogueControls.onMouseDown(mouseEvent);
            case InterfaceModeEnum.MENU: return MenuControls.onMouseDown(mouseEvent);
            case InterfaceModeEnum.EDIT: return EditControls.onMouseDown(mouseEvent);
            case InterfaceModeEnum.WRITING: return WritingControls.onMouseDown(mouseEvent);
            default: return 0;
        }
    }
    static onMouseUp(mouseEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(mouseEvent instanceof MouseEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running AbstractControl::onMouseUp(${mouseEvent.button})`);
        switch (Game.interfaceMode) {
            case InterfaceModeEnum.CHARACTER: return CharacterControls.onMouseUp(mouseEvent);
            case InterfaceModeEnum.DIALOGUE: return DialogueControls.onMouseUp(mouseEvent);
            case InterfaceModeEnum.MENU: return MenuControls.onMouseDown(mouseEvent);
            case InterfaceModeEnum.EDIT: return EditControls.onMouseUp(mouseEvent);
            case InterfaceModeEnum.WRITING: return WritingControls.onMouseUp(mouseEvent);
            default: return 0;
        }
    }
    static onClick(mouseEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(mouseEvent instanceof MouseEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running AbstractControl::onClick(${mouseEvent.button})`);
        switch (Game.interfaceMode) {
            case InterfaceModeEnum.CHARACTER: return CharacterControls.onClick(mouseEvent);
            case InterfaceModeEnum.DIALOGUE: return DialogueControls.onClick(mouseEvent);
            case InterfaceModeEnum.MENU: return MenuControls.onClick(mouseEvent);
            case InterfaceModeEnum.EDIT: return EditControls.onClick(mouseEvent);
            case InterfaceModeEnum.WRITING: return WritingControls.onClick(mouseEvent);
            default: return 0;
        }
    }
    static onContext(mouseEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(mouseEvent instanceof MouseEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running AbstractControl::onContext(${mouseEvent.button})`);
        switch (Game.interfaceMode) {
            case InterfaceModeEnum.CHARACTER: return CharacterControls.onContext(mouseEvent);
            case InterfaceModeEnum.DIALOGUE: return DialogueControls.onContext(mouseEvent);
            case InterfaceModeEnum.MENU: return MenuControls.onContext(mouseEvent);
            case InterfaceModeEnum.EDIT: return EditControls.onContext(mouseEvent);
            case InterfaceModeEnum.WRITING: return WritingControls.onContext(mouseEvent);
            default: return 0;
        }
    }
    static onMove(event) {
        let vec2 = new BABYLON.Vector2(event.movementX, event.movementY);
        AbstractControls.mouseMovementVectors.push(vec2);
        if (AbstractControls.mouseMovementVectors.length > 9) {
            AbstractControls.mouseMovementVectors.shift();
        }
        let xTotal = 0;
        let yTotal = 0;
        for (let i = AbstractControls.mouseMovementVectors.length - 1; i > 0; i--) {
            xTotal += AbstractControls.mouseMovementVectors[i].x;
            yTotal += AbstractControls.mouseMovementVectors[i].y;
        }
        /*if (Math.abs(xTotal) > Math.abs(yTotal)) {
            if (xTotal < 0) {
                console.log("-x");
            }
            else {
                console.log("+x");
            }
        }
        else if (Math.abs(xTotal) < Math.abs(yTotal)) {
            if (yTotal < 0) {
                console.log("-y");
            }
            else {
                console.log("+y");
            }
        }*/
        return 0;
    }
    static onScroll(event) {
        if (event.wheelDeltaY > 0) {
            // scroll up
        }
        else if (event.wheelDeltaY < 0) {
            // scroll down
        }
        return 0;
    }
    static initialize() {
        AbstractControls.initialized = false;
        AbstractControls.initQwertyKeyboardControls();
        AbstractControls.keysPressed = {};
        AbstractControls.mouseMovementVectors = new Array();
        AbstractControls.initialized = true;
        return 0;
    }
    static initBaseKeyboardControls() {
        AbstractControls.chatInputFocusCode = 13;
        AbstractControls.chatInputSubmitCode = 13;
        AbstractControls.showMainMenuCode = 27;
        return 0;
    }
    static initQwertyKeyboardControls() {
        AbstractControls.initBaseKeyboardControls();
        AbstractControls.walkCode = 87; // W
        AbstractControls.walkBackCode = 83; // S
        AbstractControls.turnLeftCode = 0;
        AbstractControls.turnRightCode = 0;
        AbstractControls.strafeLeftCode = 65; // A
        AbstractControls.strafeRightCode = 68; // D
        AbstractControls.jumpCode = 32; // Space
        AbstractControls.interfaceTargetedEntityCode = 70; // F
        AbstractControls.useTargetedEntityCode = 69; // E
        AbstractControls.useSelectedItemCode = 82; // R
        AbstractControls.showInventoryCode = 73; // I
        AbstractControls.showCharacterCode = 80; // P
        AbstractControls.UIAccept = 69; // E
        AbstractControls.UIAcceptAlt = 13; // Enter
        AbstractControls.UIDeny = 81; // Q
        AbstractControls.UIDenyAlt = 18; // Alt
        return 0;
    }
    static initDvorakKeyboardControls() {
        AbstractControls.initBaseKeyboardControls();
        AbstractControls.walkCode = 188;
        AbstractControls.walkBackCode = 73;
        AbstractControls.turnLeftCode = 0;
        AbstractControls.turnRightCode = 0;
        AbstractControls.strafeLeftCode = 65;
        AbstractControls.strafeRightCode = 69;
        AbstractControls.jumpCode = 32;
        AbstractControls.interfaceTargetedEntityCode = 85;
        AbstractControls.useTargetedEntityCode = 190;
        AbstractControls.useSelectedItemCode = 80;
        AbstractControls.showInventoryCode = 67; // C
        AbstractControls.showCharacterCode = null;
        AbstractControls.UIAccept = 190; // E
        AbstractControls.UIAcceptAlt = 13; // Enter
        AbstractControls.UIDeny = 222; // Q
        AbstractControls.UIDenyAlt = 18; // Alt
        return 0;
    }
    static initAzertyKeyboardControls() {
        AbstractControls.initBaseKeyboardControls();
        AbstractControls.walkCode = 90;
        AbstractControls.walkBackCode = 83;
        AbstractControls.turnLeftCode = 0;
        AbstractControls.turnRightCode = 0;
        AbstractControls.strafeLeftCode = 81;
        AbstractControls.strafeRightCode = 68;
        AbstractControls.jumpCode = 32;
        AbstractControls.interfaceTargetedEntityCode = 70;
        AbstractControls.useTargetedEntityCode = 69;
        AbstractControls.useSelectedItemCode = 82;
        AbstractControls.showInventoryCode = 73;
        AbstractControls.showCharacterCode = null;
        AbstractControls.UIAccept = 69; // E
        AbstractControls.UIAcceptAlt = 13; // Enter
        AbstractControls.UIDeny = 65; // A
        AbstractControls.UIDenyAlt = 18; // Alt
        return 0;
    }
}
AbstractControls.initialize();