/**
 * MenuControls
 */
class MenuControls extends AbstractControls {
    static onKeyDown(keyboardEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(keyboardEvent instanceof KeyboardEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running Game::controlMenuOnKeyDown(${keyboardEvent.keyCode})`);
        if (!Game.hasPlayerController() || !Game.playerController.hasMesh()) {
            return 2;
        }
        switch (keyboardEvent.keyCode) {
            case AbstractControls.showInventoryCode: {
                if (Game.bUseGUI) {
                    if (Game.gui.inventoryMenu.isVisible) {
                        Game.gui.inventoryMenu.hide();
                        Game.gui.hide();
                        Game.gui.hud.show();
                    }
                    else {
                        Game.gui.inventoryMenu.set(Game.playerEntityID);
                        Game.gui.inventoryMenu.show();
                    }
                }
                break;
            }
            case AbstractControls.showCharacterCode : {
                if (Game.bUseGUI) {
                    if (Game.gui.characterStats.isVisible) {
                        Game.gui.characterStats.hide();
                        Game.gui.hide();
                        Game.gui.hud.show();
                    }
                    else {
                        Game.gui.characterStats.set(Game.playerEntityID);
                        Game.gui.characterStats.show();
                    }
                }
                break;
            }
            case AbstractControls.interfaceTargetedEntityCode : {
                if (Game.bUseGUI) {
                    if (Game.gui.radialMenu.isVisible) {
                        Game.gui.radialMenu.hide();
                    }
                }
                break;
            }
            case AbstractControls.UIDenyAlt:
            case AbstractControls.UIDeny: {
                if (Game.bUseGUI) {
                    Game.gui.hide();
                }
                break;
            }
        }
        return 0;
    }
    static onKeyUp(keyboardEvent) {
        return 0;
    }
    static onKeyPress(keyboardEvent) {
        return 0;
    }
    static onMouseDown(mouseEvent) {
        AbstractControls.onMouseDown(mouseEvent);
        return 0;
    }
    static onMouseUp(mouseEvent) {
        AbstractControls.onMouseUp(mouseEvent);
        return 0;
    }
    static onClick(mouseEvent) {
        AbstractControls.onClick(mouseEvent);
        return 0;
    }
    static onContext(mouseEvent) {
        AbstractControls.onContext(mouseEvent);
        return 0;
    }
    static onMove(mouseEvent) {
        AbstractControls.onMove(mouseEvent);
        return 0;
    }
    static onScroll(mouseEvent) {
        AbstractControls.onScroll(mouseEvent);
        return 0;
    }
}