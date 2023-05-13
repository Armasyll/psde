/**
 * CharacterControls
 */
class CharacterControls extends AbstractControls {
    static onKeyDown(keyboardEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (Game.debugMode) console.group(`Running CharacterControls.onKeyDown()`);
        if (!(keyboardEvent instanceof KeyboardEvent)) {
            if (Game.debugMode) {console.error("keyboardEvent wasn't a KeyboardEvent"); console.groupEnd();}
            return 2;
        }
        if (Game.debugMode) console.info(`with ${keyboardEvent.keyCode}`);
        if (!Game.hasPlayerController() || !Game.playerController.hasMesh()) {
            if (Game.debugMode) {console.error("Player, its controller, or its mesh don't exist"); console.groupEnd();}
            return 2;
        }
        if (!AbstractControls.keysPressed.hasOwnProperty(keyboardEvent.keyCode)) {
            AbstractControls.keysPressed[keyboardEvent.keyCode] = Date.now();
        }
        switch (keyboardEvent.keyCode) {
            case AbstractControls.jumpCode : {
                if (CharacterControls.jumpPressTime == 0 && !Game.playerController.jumping) {
                    CharacterControls.jumpPressTime = Date.now();
                    CharacterControls.jumpTimeoutFunction = setTimeout(function() {CharacterControls.triggerJump()}, CharacterControls.jumpTimeout);
                }
                break;
            }
            case 114: {
                if (DebugGameGUI.isVisible) {
                    DebugGameGUI.hide();
                }
                else {
                    DebugGameGUI.show();
                }
                break;
            }
            case 16 : {
                Game.playerController.keyShift(true);
                break;
            }
            case AbstractControls.walkCode : {
                Game.playerController.keyMoveForward(true);
                break;
            }
            case AbstractControls.turnLeftCode : {
                Game.playerController.keyTurnLeft(true);
                break;
            }
            case AbstractControls.turnRightCode : {
                Game.playerController.keyTurnRight(true);
                break;
            }
            case AbstractControls.walkBackCode : {
                Game.playerController.keyMoveBackward(true);
                break;
            }
            case AbstractControls.strafeLeftCode : {
                Game.playerController.keyStrafeLeft(true);
                break;
            }
            case AbstractControls.strafeRightCode : {
                Game.playerController.keyStrafeRight(true);
                break;
            }
            case AbstractControls.chatInputFocusCode : {
                if (Game.getInterfaceMode() == InterfaceModeEnum.CHARACTER) {
                    if (Game.bUseGUI) {
                        if (!Game.gui.chat.isFocused()) {
                            Game.gui.chat.setFocused(true);
                        }
                        else {
                            Game.gui.chat.sendInput();
                        }
                    }
                }
                break;
            }
            case AbstractControls.chatInputSubmitCode : {
                if (Game.bUseGUI) {
                    Game.gui.chat.sendInput();
                }
                break;
            }
            case AbstractControls.useTargetedEntityCode : {
                /*
                    TODO: on press (which it's being right now) begin a timeout for 1.5 (or w/e) seconds that opens a radial for additional interfacing;
                        if the key is released before then, which should be handled in controlCharacterOnKeyDown's useTargetedEntityCode, delete the timeout function
                        if the key isn't released before then, run the function, which deletes the timeout function, and opens the radial for additional interface
                        
                        _radialBeginInterval() {
                            Game.setInterval(Game.castTargetRay, Game._radianIntervalFunction);
                        }
                        _radialEndInterval() {}
                        _radianIntervalFunction() {}
                 */
                if (Game.bUseGUI) {
                    if (Game.gui.radialMenu.isVisible || Game.gui.dialogue.isVisible) {
                        break;
                    }
                }
                if (CharacterControls.usePressTime == 0) {
                    CharacterControls.usePressTime = Date.now();
                    CharacterControls.useTimeoutFunction = setTimeout(function() {CharacterControls.triggerUse()}, CharacterControls.useTimeout);
                }
                break;
            }
            case AbstractControls.interfaceTargetedEntityCode : {
                if (Game.bUseGUI) {
                    if (Game.gui.radialMenu.isVisible) {
                        Game.gui.radialMenu.hide();
                    }
                    else if (Game.playerController.hasTarget()) {
                        Game.gui.radialMenu.setWithTarget();
                        Game.gui.radialMenu.show();
                    }
                }
                break;
            }
            case AbstractControls.showInventoryCode : {
                if (Game.bUseGUI) {
                    if (Game.gui.inventoryMenu.isVisible) {
                        Game.gui.inventoryMenu.hide();
                    }
                    else {
                        Game.gui.inventoryMenu.set(Game.playerEntityID);
                        Game.gui.show();
                        Game.gui.inventoryMenu.show();
                    }
                }
                break;
            }
            case AbstractControls.showCharacterCode : {
                if (Game.bUseGUI) {
                    if (Game.gui.characterStats.isVisible) {
                        Game.gui.characterStats.hide();
                    }
                    else {
                        Game.gui.characterStats.set(Game.playerEntityID);
                        Game.gui.show();
                        Game.gui.characterStats.show();
                    }
                }
                break;
            }
            case AbstractControls.showMainMenuCode : {
                if (Game.bUseGUI) {
                    if (Game.getInterfaceMode() == InterfaceModeEnum.MENU) {
                        if (Game.debugMode) console.log(`\tShowing HUD`);
                        Game.gui.hideLastMenuChild();
                    }
                    else {
                        if (Game.debugMode) console.log(`\tShowing Main Menu`);
                        Game.gui.hud.hide();
                        Game.gui.mainMenu.show();
                    }
                }
                break;
            }
            case CharacterControls.toggleProneCode : {
                if (Game.playerController.stance != StanceEnum.PRONE) {
                    Game.playerController.doProne();
                }
                else {
                    Game.playerController.doStand();
                }
                break;
            }
            case CharacterControls.toggleCrouchCode : {
                if (Game.playerController.stance != StanceEnum.CROUCH) {
                    Game.playerController.doCrouch();
                }
                else {
                    Game.playerController.doStand();
                }
                break;
            }
            default : {
            }
        }
        if (!Game.playerController.key.equals(Game.playerController.prevKey)) {
            if (Client.isOnline()) {
                Client.updateLocRotScaleSelf();
            }
            Game.playerController.prevKey.copyFrom(Game.playerController.key);
        }
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static onKeyUp(keyboardEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (Game.debugMode) console.group(`Running CharacterControls.onKeyUp()`);
        if (!(keyboardEvent instanceof KeyboardEvent)) {
            if (Game.debugMode) {console.error("keyboardEvent wasn't a KeyboardEvent"); console.groupEnd();}
            return 2;
        }
        if (Game.debugMode) console.info(`with ${keyboardEvent.keyCode}`);
        if (!Game.hasPlayerController() || !Game.playerController.hasMesh()) {
            if (Game.debugMode) {console.error("Player, its controller, or its mesh don't exist"); console.groupEnd();}
            return 2;
        }
        if (AbstractControls.keysPressed.hasOwnProperty(keyboardEvent.keyCode)) {
            if (Game.debugMode) console.info(`pressed for ${Date.now() - AbstractControls.keysPressed[keyboardEvent.keyCode]}ms`);
            delete AbstractControls.keysPressed[keyboardEvent.keyCode];
        }
        switch (keyboardEvent.keyCode) {
            case 49: case 50: case 51: case 52: case 53:
            case 54: case 55: case 56: case 57: case 49: {
                break;
            }
            case AbstractControls.jumpCode : {
                CharacterControls.triggerJump();
                break;
            }
            case 16 : {
                Game.playerController.keyShift(false);
                break;
            }
            case AbstractControls.walkCode : {
                Game.playerController.keyMoveForward(false);
                break;
            }
            case AbstractControls.turnLeftCode : {
                Game.playerController.keyTurnLeft(false);
                break;
            }
            case AbstractControls.turnRightCode : {
                Game.playerController.keyTurnRight(false);
                break;
            }
            case AbstractControls.walkBackCode : {
                Game.playerController.keyMoveBackward(false);
                break;
            }
            case AbstractControls.strafeLeftCode : {
                Game.playerController.keyStrafeLeft(false);
                break;
            }
            case AbstractControls.strafeRightCode : {
                Game.playerController.keyStrafeRight(false);
                break;
            }
            case AbstractControls.useTargetedEntityCode : {
                CharacterControls.triggerUse();
                break;
            }
        }
        if (Client.isOnline()) {
            Client.updateLocRotScaleSelf();
        }
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static onKeyPress(keyboardEvent) {
        return 0;
    }
    static onMouseDown(mouseEvent) {
        if (!Game.hasPlayerController() || !Game.playerController.hasMesh()) {
            return 2;
        }
        if (mouseEvent.button == 0) {
            CharacterControls.attackPressed = true;
            if (CharacterControls.attackPressTime == 0 && !Game.playerController.attacking) {
                CharacterControls.attackPressTime = Date.now();
                CharacterControls.attackTimeoutFunction = setTimeout(function() {CharacterControls.triggerAttack()}, CharacterControls.attackTimeout);
            }
        }
        return 0;
    }
    static onMouseUp(mouseEvent) {
        if (!Game.hasPlayerController() || !Game.playerController.hasMesh()) {
            return 2;
        }
        if (mouseEvent.button == 0) {
            CharacterControls.attackPressed = false;
            CharacterControls.triggerAttack();
        }
        else if (mouseEvent.button == 1) {}
        else if (mouseEvent.button == 2) {
            return CharacterControls.onContext(mouseEvent);
        }
        return 0;
    }
    static onClick(mouseEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(mouseEvent instanceof MouseEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running CharacterControls::onClick(${mouseEvent.button})`);
        return 0;
    }
    static onContext(mouseEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(mouseEvent instanceof MouseEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running CharacterControls::onContext(${mouseEvent.button})`);
        if (!Game.hasPlayerController() || !Game.playerController.hasMesh()) {
            return 2;
        }
        if (Game.playerController.hasTarget()) {
            if (Game.bUseGUI) {
                Game.gui.radialMenu.setWithTarget();
                Game.gui.radialMenu.show();
            }
        }
        return 0;
    }
    static triggerJump() {
        if (CharacterControls.jumpPressTime == 0 || CharacterControls.jumpTriggered || Game.playerController.jumping) {
            return 1;
        }
        CharacterControls.jumpTriggered = true;
        clearTimeout(CharacterControls.jumpTimeoutFunction);
        Game.playerController.keyJump(true);
        CharacterControls.jumpPressTime = 0;
        CharacterControls.jumpTriggered = false;
        return 0;
    }
    static triggerUse() {
        if (CharacterControls.usePressTime == 0 || CharacterControls.useTriggered) {
            return 1;
        }
        if (Game.bUseGUI) {
            if (Game.gui.dialogue.isVisible || Game.gui.radialMenu.isVisible) {
                return 1;
            }
        }
        CharacterControls.useTriggered = true;
        clearTimeout(CharacterControls.useTimeoutFunction);
        if (Date.now() - CharacterControls.usePressTime <= 750 && Game.playerController.hasTarget()) {
            Game.doEntityAction(Game.playerController.getTarget(), Game.playerController);
        }
        else if (Game.playerController.hasTarget()) {
            if (Game.bUseGUI) {
                Game.gui.radialMenu.setWithTarget();
                Game.gui.radialMenu.show();
            }
        }
        CharacterControls.usePressTime = 0;
        CharacterControls.useTriggered = false;
        return 0;
    }
    static triggerAttack() {
        if (CharacterControls.attackPressTime < 25 || CharacterControls.attackTriggered || Game.playerController.attacking) {
            return 1;
        }
        CharacterControls.attackTriggered = true;
        if (Game.playerController.hasTarget()) {
            Game.actionAttack(Game.playerController.getTarget(), Game.playerController);
        }
        clearTimeout(CharacterControls.attackTimeoutFunction);
        let pressTime = Date.now() - CharacterControls.attackPressTime;
        CharacterControls.attackPressTime = 0;
        CharacterControls.attackTriggered = false;
        /* Release button immediately after heavy attack does nothing */
        if (CharacterControls.lastAttackWasHeavy && pressTime < 65) {
            CharacterControls.attackPressed = false;
            CharacterControls.lastAttackWasHeavy = false;
        }
        else if (CharacterControls.attackPressed) { /* Consecutive heavy attacks without releasing button */
            CharacterControls.attackPressTime = Date.now() + 200;
            CharacterControls.attackTimeoutFunction = setTimeout(function() {CharacterControls.triggerAttack()}, CharacterControls.attackTimeout + 200);
            if (pressTime > 795) {
                CharacterControls.lastAttackWasHeavy = true;
            }
        }
        else {
            CharacterControls.lastAttackWasHeavy = false;
            if (pressTime > 795) { // Heavy
                CharacterControls.lastAttackWasHeavy = true;
            }
            else if (pressTime > 400) { // Medium
            }
            else if (pressTime > 35) { // Light
            }
            else { // Nothing
            }
        }
        return 0;
    }
    static initialize() {
        CharacterControls.initialized = true;
        CharacterControls.usePressTime = 0;
        CharacterControls.useTriggered = false;
        CharacterControls.useTimeout = 800;
        CharacterControls.useTimeoutFunction = null;
        CharacterControls.jumpPressTime = 0;
        CharacterControls.jumpTriggered = false;
        CharacterControls.jumpTimeout = 800;
        CharacterControls.jumpTimeoutFunction = null;
        CharacterControls.attackPressTime = 0;
        CharacterControls.attackTriggered = false;
        CharacterControls.attackTimeout = 800;
        CharacterControls.attackTimeoutFunction = null;
        CharacterControls.lastAttackWasHeavy = false;
        CharacterControls.toggleProneCode = 90;
        CharacterControls.toggleCrouchCode = 67;
        return 0;
    }
}
CharacterControls.initialize();