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
                if (Game.gui.inventoryMenu.isVisible) {
                    Game.gui.inventoryMenu.hide();
                    Game.gui.hideMenu();
                    Game.gui.showHUD();
                }
                else {
                    Game.gui.inventoryMenu.set(Game.playerEntityID);
                    Game.gui.inventoryMenu.show();
                }
                break;
            }
            case AbstractControls.showCharacterCode : {
                if (Game.gui.characterStats.isVisible) {
                    Game.gui.characterStats.hide();
                    Game.gui.hideMenu();
                    Game.gui.showHUD();
                }
                else {
                    Game.gui.characterStats.set(Game.playerEntityID);
                    Game.gui.characterStats.show();
                }
                break;
            }
            case AbstractControls.UIDenyAlt:
            case AbstractControls.UIDeny: {
                Game.gui.hideMenu(true);
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
        return 0;
    }
    static onMouseUp(mouseEvent) {
        return 0;
    }
    static onClick(mouseEvent) {
        return 0;
    }
    static onContext(mouseEvent) {
        return 0;
    }
}