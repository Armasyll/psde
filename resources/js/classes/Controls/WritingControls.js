/**
 * WritingControls
 */
class WritingControls extends AbstractControls {
    static onKeyDown(keyboardEvent) {
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
        Game.pointerLock();
        return 0;
    }
    static onContext(mouseEvent) {
        return 0;
    }
}