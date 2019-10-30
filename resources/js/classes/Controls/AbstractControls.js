class AbstractControls {
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
            case InterfaceModeEnum.WRITING: return WritingControl.onKeyDown(keyboardEvent);
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
            case InterfaceModeEnum.WRITING: return WritingControl.onKeyUp(keyboardEvent);
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
            case InterfaceModeEnum.WRITING: return WritingControl.onKeyPress(keyboardEvent);
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
            case InterfaceModeEnum.WRITING: return WritingControl.onMouseDown(mouseEvent);
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
            case InterfaceModeEnum.WRITING: return WritingControl.onMouseUp(mouseEvent);
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
            case InterfaceModeEnum.WRITING: return WritingControl.onClick(mouseEvent);
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
            case InterfaceModeEnum.WRITING: return WritingControl.onContext(mouseEvent);
            default: return 0;
        }
    }
}