/**
 * RadialControls
 */
 class RadialControls extends MenuControls {
    static initialize() {
        RadialControls.currentButtonIndex = -1;
        RadialControls.maxScrollSpeed = 100; // ms between scrolls
        RadialControls.lastScrollTime = 0;
        RadialControls.aLastMovements = [];
        RadialControls.iMaxRecordedMovements = 9;
        RadialControls.iMaxMovementSpeed = 50;
    }
    static reset() {
        RadialControls.currentButtonIndex = -1;
    }
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
            case AbstractControls.interfaceTargetedEntityCode : {
                if (Game.gui.radialMenu.isVisible) {
                    Game.gui.radialMenu.hide();
                }
                break;
            }
            case AbstractControls.UIDenyAlt:
            case AbstractControls.UIDeny: {
                Game.gui.radialMenu.hide();
                break;
            }
            case AbstractControls.useTargetedEntityCode : {
                RadialControls.onClick();
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
        // da magic
        if (Object.keys(RadialMenuGameGUI.visibleButtons).hasOwnProperty(RadialControls.currentButtonIndex)) {
            RadialMenuGameGUI.visibleButtons[Object.keys(RadialMenuGameGUI.visibleButtons)[RadialControls.currentButtonIndex]].onPointerClickObservable._observers[0].callback();
        }
        return 0;
    }
    static onContext(mouseEvent) {
        return 0;
    }
    static onMove(mouseEvent) {
        let dateNow = Date.now();
        if (RadialControls.aLastMovements.length > 1) {
            if (RadialControls.aLastMovements[RadialControls.aLastMovements.length - 1][2] == dateNow) {
                return 0;
            }
            else if (RadialControls.aLastMovements[RadialControls.aLastMovements.length - 1][2] + RadialControls.iMaxMovementSpeed >= dateNow) {
                return 0;
            }
        }
        if (RadialControls.aLastMovements.length >= RadialControls.iMaxRecordedMovements) {
            RadialControls.aLastMovements.shift();
        }
        RadialControls.aLastMovements.push([mouseEvent.movementX, mouseEvent.movementY, dateNow]);

        // da magic
        let xTotal = 0;
        let yTotal = 0;
        for (let i = RadialControls.aLastMovements.length - 1; i > 0; i--) {
            xTotal += RadialControls.aLastMovements[i][0];
            yTotal += RadialControls.aLastMovements[i][1];
        }
        let slices = Object.keys(RadialMenuGameGUI.visibleButtons).length;

        // thank you, Joe M. :V - 2022-02-27
        let degrees = (Math.atan2(xTotal, -yTotal) * 180.0 / Math.PI);
        if (degrees < 0) {
            degrees = 360 + degrees;
        }
        let slicesDegrees = 360/slices;
        let nDegrees = (degrees + (slicesDegrees / 2));
        if (nDegrees > 360) {
            nDegrees = nDegrees - 360;
        }

        let tempIndex = Math.floor(nDegrees / slicesDegrees);
        if (tempIndex < 0) { 
            tempIndex = 0;
        }
        else if (tempIndex > slices - 1) {
            tempIndex = slices - 1;
        }

        if (tempIndex != RadialControls.currentButtonIndex) {
            RadialMenuGameGUI.unhighlightButtonIndex(RadialControls.currentButtonIndex);
            RadialControls.currentButtonIndex = tempIndex;
            RadialMenuGameGUI.highlightButtonIndex(RadialControls.currentButtonIndex);
        }
        return 0;
    }
    static onScroll(mouseEvent) {
        let dateNow = Date.now();
        if (dateNow - RadialControls.lastScrollTime < RadialControls.maxScrollSpeed) {
            return 0;
        }
        RadialControls.lastScrollTime = dateNow;
        if (mouseEvent.wheelDelta > 0) {
            RadialControls.selectNextButton(1);
        }
        else if (mouseEvent.wheelDelta < 0) {
            RadialControls.selectNextButton(-1);
        }
        return 0;
    }
    static selectNextButton(increment = 1) {
        if (RadialControls.currentButtonIndex >= 0) {
            RadialMenuGameGUI.unhighlightButtonIndex(RadialControls.currentButtonIndex);
        }
        let maxIndices = Object.keys(RadialMenuGameGUI.visibleButtons).length - 1;
        RadialControls.currentButtonIndex += increment;
        if (RadialControls.currentButtonIndex > maxIndices) {
            RadialControls.currentButtonIndex = 0;
        }
        else if (RadialControls.currentButtonIndex < 0) {
            RadialControls.currentButtonIndex = maxIndices;
        }
        RadialMenuGameGUI.highlightButtonIndex(RadialControls.currentButtonIndex);
        return 0;
    }
 }
 RadialControls.initialize();