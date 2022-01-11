class CursorGameGUI {
    static getClassName() {
        return "CursorGameGUI";
    }
    static initialize() {
        CursorGameGUI.x = 0;
        CursorGameGUI.y = 0;
        CursorGameGUI.minX = 0;
        CursorGameGUI.maxX = 80;
        CursorGameGUI.minY = 0;
        CursorGameGUI.maxY = 24;
        CursorGameGUI.internalPointerChanging = false;
        CursorGameGUI.controller = CursorGameGUI.generateCursor();
    }
    static generateCursor() {
        if (Game.debugMode) BABYLON.Tools.Log("Running DebugGameGUI.generateCursor");
        let cursor = new BABYLON.GUI.Triangle("cursor");
        cursor.widthInPixels = 16;
        cursor.background = "black";
        cursor.heightInPixels = 16;
        cursor.color = "white";
        cursor.thickness = 1;
        cursor.isVisible = true;
        cursor.zIndex = 127;
        return cursor;
    }
    static getController() {
        return CursorGameGUI.controller;
    }
    static show() {
        CursorGameGUI.controller.isVisible = true;
        return 0;
    }
    static hide() {
        CursorGameGUI.controller.isVisible = false;
        return 0;
    }
    static set(x, y) {
        if (!CursorGameGUI.controller.isVisible) {
            return 1;
        }
        x = Number.parseInt(x);
        y = Number.parseInt(y);
        if (x > CursorGameGUI.maxX) {
            x = CursorGameGUI.maxX;
        }
        else if (x < CursorGameGUI.minX) {
            x = CursorGameGUI.minX;
        }
        if (y > CursorGameGUI.maxY) {
            y = CursorGameGUI.maxY;
        }
        else if (y < CursorGameGUI.minY) {
            y = CursorGameGUI.minY;
        }
        CursorGameGUI.x = x;
        CursorGameGUI.y = y;
        CursorGameGUI.controller.leftInPixels = x + Math.ceil(CursorGameGUI.controller.widthInPixels / 2) + 1;
        CursorGameGUI.controller.topInPixels = y + Math.ceil(CursorGameGUI.controller.heightInPixels / 2) + 1;
        Game.scene.pointerX = Math.floor(x + Game.engine.getRenderWidth() / 2);
        Game.scene.pointerY = Math.floor(y + Game.engine.getRenderHeight() / 2);
        return 0;
    }
    static update(x, y) {
        if (!CursorGameGUI.controller.isVisible) {
            return 1;
        }
        x += CursorGameGUI.x;
        y += CursorGameGUI.y;
        return CursorGameGUI.set(x, y);
    }
    static resize() {
        let tempX = CursorGameGUI.x / Game.renderWidth;
        let tempY = CursorGameGUI.y / Game.renderHeight;
        CursorGameGUI.maxX = Math.floor(Game.renderWidth / 2);
        CursorGameGUI.minX = CursorGameGUI.maxX - Game.renderWidth;
        CursorGameGUI.maxY = Math.floor(Game.renderHeight / 2);
        CursorGameGUI.minY = CursorGameGUI.maxY - Game.renderHeight;
        CursorGameGUI.set(tempX * Game.renderWidth, tempY * Game.renderHeight);
        return 0;
    }
    static click() {
        if (!CursorGameGUI.controller.isVisible) {
            return 1;
        }
        if (CursorGameGUI.internalPointerChanging) {
            return 0;
        }
        CursorGameGUI.internalPointerChanging = true;
        Game.scene.pointerX = Math.floor(CursorGameGUI.x + Game.engine.getRenderWidth() / 2);
        Game.scene.pointerY = Math.floor(CursorGameGUI.y + Game.engine.getRenderHeight() / 2);
        Game.scene.simulatePointerDown();
        Game.scene.simulatePointerUp();
        CursorGameGUI.internalPointerChanging = false;
        return 0;
    }
}