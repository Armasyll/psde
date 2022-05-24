class CursorGameGUI {
    static getClassName() {
        return "CursorGameGUI";
    }
    static initialize() {
        CursorGameGUI.initialized = false;
        CursorGameGUI.isVisible = false;
        CursorGameGUI.x = 0;
        CursorGameGUI.y = 0;
        CursorGameGUI.minX = 0;
        CursorGameGUI.maxX = 80;
        CursorGameGUI.minY = 0;
        CursorGameGUI.maxY = 24;
        CursorGameGUI.internalPointerChanging = false;
        CursorGameGUI.locked = false;
        CursorGameGUI.lastActionTime = 200;
        CursorGameGUI.controller = CursorGameGUI.generateController();
        return 0;
    }
    static generateController() {
        if (Game.debugMode) BABYLON.Tools.Log("Running DebugGameGUI.generateController");
        let cursor = new BABYLON.GUI.Triangle("cursor");
        cursor.widthInPixels = 16;
        cursor.background = "black";
        cursor.heightInPixels = 16;
        cursor.color = "white";
        cursor.thickness = 1;
        cursor.zIndex = 127;
        CursorGameGUI.initialized = true;
        return cursor;
    }
    static getController() {
        return CursorGameGUI.controller;
    }
    static show() {
        CursorGameGUI.controller.isVisible = true;
        CursorGameGUI.isVisible = true;
        return 0;
    }
    static hide() {
        CursorGameGUI.controller.isVisible = false;
        CursorGameGUI.isVisible = false;
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
        CursorGameGUI._setPointer();
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
        let tempX = CursorGameGUI.x / Game.engine.getHostWindow().innerWidth;
        let tempY = CursorGameGUI.y / Game.engine.getHostWindow().innerHeight;
        CursorGameGUI.maxX = Math.floor(Game.engine.getHostWindow().innerWidth / 2);
        CursorGameGUI.minX = CursorGameGUI.maxX - Game.engine.getHostWindow().innerWidth;
        CursorGameGUI.maxY = Math.floor(Game.engine.getHostWindow().innerHeight / 2);
        CursorGameGUI.minY = CursorGameGUI.maxY - Game.engine.getHostWindow().innerHeight;
        CursorGameGUI.set(tempX * Game.engine.getHostWindow().innerWidth, tempY * Game.engine.getHostWindow().innerHeight);
        return 0;
    }
    static click() {
        if (!CursorGameGUI.controller.isVisible) {
            return 1;
        }
        return 0;
    }
    static pointerDown(event) {
        if (!CursorGameGUI.controller.isVisible) {
            return 1;
        }
        if (CursorGameGUI.locked) {
            return 0;
        }
        CursorGameGUI.locked = true;
        CursorGameGUI._setPointer();
        Game.scene.simulatePointerDown();
        CursorGameGUI.locked = false;
        return 0;
    }
    static pointerUp(event) {
        if (!CursorGameGUI.controller.isVisible) {
            return 1;
        }
        if (CursorGameGUI.locked) {
            return 0;
        }
        CursorGameGUI.locked = true;
        CursorGameGUI._setPointer();
        Game.scene.simulatePointerUp();
        CursorGameGUI.locked = false;
        return 0;
    }
    static context() {
        if (!CursorGameGUI.controller.isVisible) {
            return 1;
        }
        if (CursorGameGUI.locked) {
            return 0;
        }
        if (!CursorGameGUI.controller.isVisible) {
            return 1;
        }
        if (CursorGameGUI.internalPointerChanging) {
            return 0;
        }
        return 0;
    }
    static lock() {
        CursorGameGUI.locked = true;
        return 0;
    }
    static unlock() {
        CursorGameGUI.locked = false;
        return 0;
    }
    // when renderWidth (and renderHeight) isn't equal to innerWidth (and innerHeight), pointing doesn't align :v
    static _setPointer() {
        Game.scene.pointerX = Math.floor(CursorGameGUI.x + Game.engine.getHostWindow().innerWidth  / 2);
        Game.scene.pointerY = Math.floor(CursorGameGUI.y + Game.engine.getHostWindow().innerHeight / 2);
        return 0;
    }
}