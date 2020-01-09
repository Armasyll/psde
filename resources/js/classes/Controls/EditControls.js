class EditControls extends AbstractControls {
    static onKeyDown(keyboardEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(keyboardEvent instanceof KeyboardEvent)) {
            return 2;
        }
        switch (keyboardEvent.keyCode) {
            case EditControls.rotate : {
                break;
            }
            case EditControls.scale : {
                break;
            }
            case EditControls.move : {
                break;
            }
            case EditControls.toggleCollision : {
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
    static initialize() {
        EditControls.rotate = 82;
        EditControls.scale = 83;
        EditControls.move = 71;
        EditControls.toggleCollision = 84;
        return 0;
    }
}
EditControls.initialize();