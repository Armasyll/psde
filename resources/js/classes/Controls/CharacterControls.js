class CharacterControls extends AbstractControls {
    static onKeyDown(keyboardEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(keyboardEvent instanceof KeyboardEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running CharacterControls::onKeyDown(${keyboardEvent.keyCode})`);
        if (!(Game.player instanceof CharacterEntity) || !Game.player.hasController() || !Game.player.getController().hasMesh()) {
            return 2;
        }
        switch (keyboardEvent.keyCode) {
            case AbstractControls.jumpCode : {
                if (CharacterControls.jumpPressTime == 0 && !Game.playerController.jumping) {
                    CharacterControls.jumpPressTime = Date.now();
                    CharacterControls.jumpTimeoutFunction = setTimeout(function() {CharacterControls.triggerJump()}, CharacterControls.jumpTimeout);
                }
                break;
            }
            case 16 : {
                Game.player.getController().keyShift(true);
                break;
            }
            case AbstractControls.walkCode : {
                Game.player.getController().keyMoveForward(true);
                break;
            }
            case AbstractControls.turnLeftCode : {
                Game.player.getController().keyTurnLeft(true);
                break;
            }
            case AbstractControls.turnRightCode : {
                Game.player.getController().keyTurnRight(true);
                break;
            }
            case AbstractControls.walkBackCode : {
                Game.player.getController().keyMoveBackward(true);
                break;
            }
            case AbstractControls.strafeLeftCode : {
                Game.player.getController().keyStrafeLeft(true);
                break;
            }
            case AbstractControls.strafeRightCode : {
                Game.player.getController().keyStrafeRight(true);
                break;
            }
            case AbstractControls.chatInputFocusCode : {
                if (Game.gui.getHudVisible()) {
                    if (!Game.gui.chat.isFocused()) {
                        Game.gui.chat.setFocused(true);
                    }
                    else {
                        Game.sendChatMessage();
                    }
                }
                break;
            }
            case AbstractControls.chatInputSubmitCode : {
                Game.sendChatMessage();
                break;
            }
            case AbstractControls.useTargetedEntityCode : {
                /*
                    TODO: on press (which it's being right now) begin a timeout for 1.5 (or w/e) seconds that opens a radial for additional interfacing;
                        if the key is released before then, which should be handled in controlCharacterOnKeyDown's useTargetedEntityCode, delete the timeout function
                        if the key isn't released before then, run the function, which deletes the timeout function, and opens the radial for additional interface
                        
                        _radialBeginInterval() {
                            Game.setInterval(Game.castRayTarget, Game._radianIntervalFunction);
                        }
                        _radialEndInterval() {}
                        _radianIntervalFunction() {}
                 */
                if (CharacterControls.usePressTime == 0 && !Game.gui.actionsMenu.isVisible && !Game.gui.dialogue.isVisible) {
                    CharacterControls.usePressTime = Date.now();
                    CharacterControls.useTimeoutFunction = setTimeout(function() {CharacterControls.triggerUse()}, CharacterControls.useTimeout);
                }
                break;
            }
            case AbstractControls.interfaceTargetedEntityCode : {
                if (Game.player.hasTarget()) {
                    Game.gui.clearActionsMenu();
                    Game.gui.populateActionsMenuWithTarget();
                    Game.gui.updateActionsMenu();
                    Game.gui.showActionsMenu();
                }
                break;
            }
            case AbstractControls.showInventoryCode : {
                Game.gui.inventoryMenu.updateWith(Game.player);
                Game.gui.showMenu(true);
                Game.gui.inventoryMenu.show();
                Game.gui.pointerRelease();
                break;
            }
            case AbstractControls.showCharacterCode : {
                Game.gui.characterStats.updateWith(Game.player);
                Game.gui.showMenu(true);
                Game.gui.characterStats.show();
                Game.gui.pointerRelease();
                break;
            }
            case AbstractControls.showMainMenuCode : {
                if (Game.gui.getMenuVisible()) {
                    if (Game.debugMode) console.log(`\tShowing HUD`);
                    Game.gui.hideMenu(false);
                    Game.gui.showHUD(false);
                }
                else {
                    if (Game.debugMode) console.log(`\tShowing Main Menu`);
                    Game.gui.hideHUD(false);
                    Game.gui.showCharacterChoiceMenu(false);
                }
                break;
            }
        }
        Game.player.getController().move = Game.player.getController().anyMovement();
        if (!Game.player.getController().key.equals(Game.player.getController().prevKey)) {
            if (Client.isOnline()) {
                Client.updateLocRotScaleSelf();
            }
            Game.player.getController().prevKey.copyFrom(Game.player.getController().key);
        }
        return 0;
    }
    static onKeyUp(keyboardEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(keyboardEvent instanceof KeyboardEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running CharacterControls::onKeyUp(${keyboardEvent.keyCode})`);
        if (!(Game.player instanceof CharacterEntity) || !Game.player.hasController() || !Game.player.getController().hasMesh()) {
            return 2;
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
                Game.player.getController().keyShift(false);
                break;
            }
            case AbstractControls.walkCode : {
                Game.player.getController().keyMoveForward(false);
                break;
            }
            case AbstractControls.turnLeftCode : {
                Game.player.getController().keyTurnLeft(false);
                break;
            }
            case AbstractControls.turnRightCode : {
                Game.player.getController().keyTurnRight(false);
                break;
            }
            case AbstractControls.walkBackCode : {
                Game.player.getController().keyMoveBackward(false);
                break;
            }
            case AbstractControls.strafeLeftCode : {
                Game.player.getController().keyStrafeLeft(false);
                break;
            }
            case AbstractControls.strafeRightCode : {
                Game.player.getController().keyStrafeRight(false);
                break;
            }
            case AbstractControls.useTargetedEntityCode : {
                CharacterControls.triggerUse();
                break;
            }
        }
        Game.player.getController().move = Game.player.getController().anyMovement();
        if (Client.isOnline()) {
            Client.updateLocRotScaleSelf();
        }
        return 0;
    }
    static onKeyPress(keyboardEvent) {
        return 0;
    }
    static onMouseDown(mouseEvent) {
        if (!(Game.player instanceof CharacterEntity) || !Game.player.hasController() || !Game.player.getController().hasMesh()) {
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
        if (!(Game.player instanceof CharacterEntity) || !Game.player.hasController() || !Game.player.getController().hasMesh()) {
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
        if (!(Game.player instanceof CharacterEntity) || !Game.player.hasController() || !Game.player.getController().hasMesh()) {
            return 2;
        }
        if (Game.player.getTarget() instanceof AbstractEntity) {
            Game.gui.clearActionsMenu();
            Game.gui.populateActionsMenuWithTarget();
            Game.gui.updateActionsMenu();
            Game.gui.showActionsMenu();
        }
        return 0;
    }
    static triggerJump() {
        if (CharacterControls.jumpPressTime == 0 || CharacterControls.jumpTriggered || Game.playerController.jumping) {
            return 1;
        }
        CharacterControls.jumpTriggered = true;
        clearTimeout(CharacterControls.jumpTimeoutFunction);
        Game.player.getController().keyJump(true);
        CharacterControls.jumpPressTime = 0;
        CharacterControls.jumpTriggered = false;
        return 0;
    }
    static triggerUse() {
        if (CharacterControls.usePressTime == 0 || CharacterControls.useTriggered || Game.gui.dialogue.isVisible || Game.gui.actionsMenu.isVisible) {
            return 1;
        }
        CharacterControls.useTriggered = true;
        clearTimeout(CharacterControls.useTimeoutFunction);
        if (Date.now() - CharacterControls.usePressTime <= 750) {
            Game.doEntityActionFunction(Game.player.getTarget(), Game.player);
        }
        else {
            Game.gui.clearActionsMenu();
            Game.gui.populateActionsMenuWithTarget();
            Game.gui.updateActionsMenu();
            Game.gui.showActionsMenu();
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
        Game.actionAttackFunction(Game.player.getTarget(), Game.player);
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
        return 0;
    }
}
CharacterControls.initialize();