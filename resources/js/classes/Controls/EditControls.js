class EditControls extends AbstractControls {
    static onKeyDown(keyboardEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(keyboardEvent instanceof KeyboardEvent)) {
            return 2;
        }
        switch (keyboardEvent.keyCode) {
            case 16 : {
                EditControls.shiftPressed = true;
                break;
            }
            case EditControls.rotateCode : {
                if (EditControls.pickedMesh instanceof BABYLON.AbstractMesh) {
                    Game.gui.chat.appendOutput(`\n    Rotating ${EditControls.pickedMesh.id} by Y:${EditControls.rotationIncrement}\n`);
                    EditControls.rotating = true;
                    Game.camera.detachControl(Game.canvas);
                }
                break;
            }
            case EditControls.scaleCode : {
                if (EditControls.pickedMesh instanceof BABYLON.AbstractMesh) {
                    Game.gui.chat.appendOutput(`\n    Scaling ${EditControls.pickedMesh.id} by *:${EditControls.rotationIncrement}\n`);
                    EditControls.scaling = true;
                    Game.camera.detachControl(Game.canvas);
                }
                break;
            }
            case EditControls.moveCode : {
                if (EditControls.pickedMesh instanceof BABYLON.AbstractMesh) {
                    Game.gui.chat.appendOutput(`\n    Moving ${EditControls.pickedMesh.id}\n`);
                    EditControls.moving = true;
                    Game.camera.detachControl(Game.canvas);
                }
                break;
            }
            case EditControls.axisXCode: {
                if (!EditControls.isEditing()) {
                    break;
                }
                /**
                 * Start of being able to use any axis
                 * Initially hit Shift + X, only use Y and Z axis
                 *  hit Shift + X again, still only use Y and Z axis
                 *  or hit X, use any axis
                 * Initially hit X, only use X axis
                 *  hit X again, still only use X axis
                 *  or hit Shift + X, use any axis
                 */
                if (EditControls.shiftPressed) {
                    if (EditControls.allowAxisX && !EditControls.allowAxisY && !EditControls.allowAxisZ) {
                        EditControls.allowAxisX = true; EditControls.allowAxisY = true; EditControls.allowAxisZ = true; break;
                    }
                    EditControls.allowAxisX = false;
                    EditControls.allowAxisY = true;
                    EditControls.allowAxisZ = true;
                }
                else {
                    if (!EditControls.allowAxisX && EditControls.allowAxisY && EditControls.allowAxisZ) {
                        EditControls.allowAxisX = true; EditControls.allowAxisY = true; EditControls.allowAxisZ = true; break;
                    }
                    EditControls.allowAxisX = true;
                    EditControls.allowAxisY = false;
                    EditControls.allowAxisZ = false;
                }
                break;
            }
            case EditControls.axisYCode: {
                if (!EditControls.isEditing()) {
                    break;
                }
                if (EditControls.shiftPressed) {
                    if (!EditControls.allowAxisX && EditControls.allowAxisY && !EditControls.allowAxisZ) {
                        EditControls.allowAxisX = true; EditControls.allowAxisY = true; EditControls.allowAxisZ = true; break;
                    }
                    EditControls.allowAxisX = true;
                    EditControls.allowAxisY = false;
                    EditControls.allowAxisZ = true;
                }
                else {
                    if (EditControls.allowAxisX && !EditControls.allowAxisY && EditControls.allowAxisZ) {
                        EditControls.allowAxisX = true; EditControls.allowAxisY = true; EditControls.allowAxisZ = true; break;
                    }
                    EditControls.allowAxisX = false;
                    EditControls.allowAxisY = true;
                    EditControls.allowAxisZ = false;
                }
                break;
            }
            case EditControls.axisZCode: {
                if (!EditControls.isEditing()) {
                    break;
                }
                if (EditControls.shiftPressed) {
                    if (!EditControls.allowAxisX && !EditControls.allowAxisY && EditControls.allowAxisZ) {
                        EditControls.allowAxisX = true; EditControls.allowAxisY = true; EditControls.allowAxisZ = true; break;
                    }
                    EditControls.allowAxisX = true;
                    EditControls.allowAxisY = true;
                    EditControls.allowAxisZ = false;
                }
                else {
                    if (EditControls.allowAxisX && EditControls.allowAxisY && !EditControls.allowAxisZ) {
                        EditControls.allowAxisX = true; EditControls.allowAxisY = true; EditControls.allowAxisZ = true; break;
                    }
                    EditControls.allowAxisX = false;
                    EditControls.allowAxisY = false;
                    EditControls.allowAxisZ = true;
                }
                break;
            }
            case EditControls.toggleCollisionCode : {
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
        switch (keyboardEvent.keyCode) {
            case 16 : {
                EditControls.shiftPressed = false;
                break;
            }
        }
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
        if (EditControls.pickedMesh instanceof BABYLON.AbstractMesh) {
            EditControls.pickedMeshOriginalPosition.copyFrom(EditControls.pickedMesh.position);
            EditControls.pickedMeshOriginalRotation.copyFrom(EditControls.pickedMesh.rotation);
            EditControls.pickedMeshOriginalScaling.copyFrom(EditControls.pickedMesh.scaling);
        }
        EditControls.resetControls();
        return 0;
    }
    static onContext(mouseEvent) {
        if (EditControls.pickedMesh instanceof BABYLON.AbstractMesh) {
            EditControls.pickedMesh.position.copyFrom(EditControls.pickedMeshOriginalPosition);
            EditControls.pickedMesh.rotation.copyFrom(EditControls.pickedMeshOriginalRotation);
            EditControls.pickedMesh.scaling.copyFrom(EditControls.pickedMeshOriginalScaling);
            EditControls.clearPickedMesh();
        }
        else {
            let pick = Game.scene.pick(window.innerWidth/2, window.innerHeight/2, (abstractMesh) => {
                if (abstractMesh.isVisible && abstractMesh.isEnabled() && !abstractMesh.isHitbox && abstractMesh.material.id != "collisionMaterial") {
                    return true;
                }
                return false;
            });
            if (pick.pickedMesh instanceof BABYLON.AbstractMesh && pick.pickedMesh.isEnabled()) {
                EditControls.pickMesh(pick.pickedMesh);
            }
        }
        EditControls.resetControls();
        return 0;
    }
    static onMove(event) {
        if (EditControls.pickedMesh instanceof BABYLON.AbstractMesh) {
            let vec2 = new BABYLON.Vector2(event.movementX, event.movementY);
            AbstractControls.mouseMovementVectors.push(vec2);
            if (AbstractControls.mouseMovementVectors.length > 9) {
                AbstractControls.mouseMovementVectors.shift();
            }
            let xTotal = 0;
            let yTotal = 0;
            for (let i = AbstractControls.mouseMovementVectors.length - 1; i > 0; i--) {
                xTotal += AbstractControls.mouseMovementVectors[i].x;
                yTotal += AbstractControls.mouseMovementVectors[i].y;
            }
            if (EditControls.moving) {
            }
            else if (EditControls.rotating) {
                EditControls.tempIntendedRotation.set({"x":0.0,"y":0.0,"z":0.0});
                if (EditControls.allowAxisX) {
                    if (xTotal > 0) {
                        EditControls.tempIntendedRotation.x += EditControls.rotationIncrement;
                    }
                    else if (xTotal < 0) {
                        EditControls.tempIntendedRotation.x -= EditControls.rotationIncrement;
                    }
                }
                if (EditControls.allowAxisY) {
                    if (yTotal > 0) {
                        EditControls.tempIntendedRotation.y += EditControls.rotationIncrement;
                    }
                    else if (yTotal < 0) {
                        EditControls.tempIntendedRotation.y -= EditControls.rotationIncrement;
                    }
                }
                EditControls.pickedMesh.rotation.copyFrom(tempIntendedRotation);
                EditControls.tempIntendedRotation.set({"x":0.0,"y":0.0,"z":0.0});
            }
            else if (EditControls.scaling) {
                if (yTotal > 0) {
                    EditControls.pickedMesh.scaling.addInPlace(new BABYLON.Vector3(EditControls.rotationIncrement, EditControls.rotationIncrement, EditControls.rotationIncrement))
                }
                else if (yTotal < 0) {
                    EditControls.pickedMesh.scaling.subtractInPlace(new BABYLON.Vector3(EditControls.rotationIncrement, EditControls.rotationIncrement, EditControls.rotationIncrement))
                }
            }
        }
        return 0;
    }
    static isEditing() {
        return EditControls.moving || EditControls.rotating || EditControls.scaling;
    }
    static hasPickedMesh() {
        return EditControls.pickedMesh != null;
    }
    static pickMesh(mesh) {
        if (Game.interfaceMode != InterfaceModeEnum.EDIT) {
            EditControls.clearPickedMesh();
            return 1;
        }
        if (mesh instanceof BABYLON.AbstractMesh) {}
        else if (Game.hasClonedMesh(mesh)) {
            mesh = Game.getClonedMesh(mesh);
        }
        else if (Game.hasInstancedMesh(mesh)) {
            mesh = Game.getInstancedMesh(mesh);
        }
        else {
            EditControls.clearPickedMesh();
            return 2;
        }
        if (!mesh.isEnabled()) {
            return 1;
        }
        if (EditControls.pickedMesh == mesh) {
            return 0;
        }
        EditControls.previousPickedMesh = EditControls.pickedMesh;
        EditControls.pickedMesh = mesh;
        EditControls.pickedMeshOriginalPosition.copyFrom(EditControls.pickedMesh.position);
        EditControls.pickedMeshOriginalRotation.copyFrom(EditControls.pickedMesh.rotation);
        EditControls.pickedMeshOriginalScaling.copyFrom(EditControls.pickedMesh.scaling);
        return 0;
    }
    static clearPickedMesh() {
        EditControls.previousPickedMesh = EditControls.pickedMesh;
        EditControls.pickedMesh = null;
        return 0;
    }
    static hasPickedController() {
        return EditControls.pickedController != null;
    }
    static pickController(abstractController) {
        if (Game.interfaceMode != InterfaceModeEnum.EDIT) {
            EditControls.clearPickedController();
            return 1;
        }
        if (abstractController instanceof AbstractController) {}
        else if (AbstractController.has(abstractController)) {
            abstractController = AbstractController.get(abstractController);
        }
        else {
            EditControls.clearPickedController();
            return 2;
        }
        if (!abstractController.isEnabled()) {
            return 1;
        }
        if (EditControls.pickedController == abstractController) {
            return 0;
        }
        EditControls.previousPickedController = EditControls.pickedController;
        EditControls.pickedController = abstractController;
        return 0;
    }
    static clearPickedController() {
        EditControls.previousPickedController = EditControls.pickedController;
        EditControls.pickedController = null;
        return 0;
    }
    static resetControls() {
        EditControls.rotating = false;
        EditControls.scaling = false;
        EditControls.moving = false;
        EditControls.allowAxisX = true;
        EditControls.allowAxisY = true;
        EditControls.allowAxisZ = true;
        EditControls.clearPickedMesh();
        EditControls.clearPickedController();
        EditControls.tempIntendedPosition.set({"x":0.0,"y":0.0,"z":0.0});
        EditControls.tempIntendedRotation.set({"x":0.0,"y":0.0,"z":0.0});
        //EditControls.tempIntendedScaling.set({"x":0.0,"y":0.0,"z":0.0});
        Game.camera.attachControl(Game.canvas);
        return 0;
    }
    static resetIncrements() {
        EditControls.rotatingIncrement = BABYLON.Tools.ToRadians(1);
        EditControls.scalingIncrement = 0.0125;
        EditControls.movingIncrement = 0.0125;
    }
    static reset() {
        EditControls.initialize();
    }
    static initialize() {
        EditControls.rotateCode = 82; // r
        EditControls.scaleCode = 83; // s
        EditControls.moveCode = 71; // g
        EditControls.toggleCollisionCode = 84; // t
        EditControls.axisXCode = 88; // x
        EditControls.axisYCode = 89; // y
        EditControls.axisZCode = 90; // z
        EditControls.rotating = false;
        EditControls.rotatingIncrement = BABYLON.Tools.ToRadians(1);
        EditControls.scaling = false;
        EditControls.scalingIncrement = 0.0125;
        EditControls.moving = false;
        EditControls.movingIncrement = 0.0125;
        EditControls.allowAxisX = true;
        EditControls.allowAxisY = true;
        EditControls.allowAxisZ = true;
        EditControls.localGridLock = false;
        EditControls.globalGridLock = false;
        EditControls.shiftPressed = false;
        EditControls.pickedMeshOriginalPosition = new BABYLON.Vector3();
        EditControls.pickedMeshOriginalRotation = new BABYLON.Vector3();
        EditControls.pickedMeshOriginalScaling = new BABYLON.Vector3();
        EditControls.pickedMesh = null;
        EditControls.previousPickedMesh = null;
        EditControls.pickedController = null;
        EditControls.previousPickedController = null;
        EditControls.tempIntendedPosition = BABYLON.Vector3.Zero();
        EditControls.tempIntendedRotation = BABYLON.Vector3.Zero();
        //EditControls.tempIntendedScaling = BABYLON.Vector3.Zero();
        return 0;
    }
}
EditControls.initialize();