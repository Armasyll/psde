class MenuControls extends AbstractControls {
    static onKeyDown(keyboardEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(keyboardEvent instanceof KeyboardEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running Game::controlMenuOnKeyDown(${keyboardEvent.keyCode})`);
        if (!(Game.player instanceof CharacterEntity) || !Game.player.hasController() || !Game.player.getController().hasMesh()) {
            return 2;
        }
        switch (keyboardEvent.keyCode) {
            case AbstractControls.showInventoryCode: {
                if (GameGUI.inventoryMenu.isVisible()) {
                    GameGUI.inventoryMenu.hide();
                    GameGUI.hideMenu();
                    GameGUI.showHUD();
                }
                else {
                    Game.gui.inventoryMenu.updateWith(Game.player);
                    Game.gui.inventoryMenu.show();
                }
                break;
            }
            case AbstractControls.UIDenyAlt:
            case AbstractControls.UIDeny: {
                GameGUI.hideMenu(true);
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