/**
 * EditControls
 */
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
                    Game.gui.chat.appendOutput(`\n    Rotating ${EditControls.pickedMesh.id} by Y:${EditControls.rotationIncrementVector.y}\n`);
                    EditControls.rotating = true;
                    Game.camera.detachControl(Game.canvas);
                }
                break;
            }
            case EditControls.scaleCode : {
                if (EditControls.pickedMesh instanceof BABYLON.AbstractMesh) {
                    Game.gui.chat.appendOutput(`\n    Scaling ${EditControls.pickedMesh.id} by *:${EditControls.rotationIncrementVector.y}\n`);
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
                EditControls.resetTransformations();
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
                EditControls.resetTransformations();
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
                EditControls.resetTransformations();
                break;
            }
            case EditControls.toggleCollisionCode : {
                break;
            }
            case AbstractControls.chatInputFocusCode : {
                if (Game.getInterfaceMode() == InterfaceModeEnum.CHARACTER) {
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
        EditControls.resetControls(true);
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
            let pick = Game.pickMesh();
            if (pick instanceof BABYLON.AbstractMesh && pick.isEnabled()) {
                EditControls.pickMesh(pick);
                if (pick.hasController()) {
                    EditControls.pickController(pick.controller);
                }
                else {
                    EditControls.clearPickedController();
                }
            }
        }
        EditControls.resetControls();
        return 0;
    }
    static onMove(event) {
        if (EditControls.pickedMesh instanceof BABYLON.AbstractMesh) {
            if (EditControls.moving) {
            }
            else if (EditControls.rotating) {
                EditControls.tempIntendedRotation.copyFrom(BABYLON.Vector3.Zero());
                if (EditControls.allowAxisX) {
                    if (xTotal > 0) {
                        EditControls.tempIntendedRotation.addInPlace(BABYLON.Vector3.Right().multiply(EditControls.rotationIncrementVector.multiply(EditControls.transformationIncrementMultiplierVector)));
                    }
                    else if (xTotal < 0) {
                        EditControls.tempIntendedRotation.addInPlace(BABYLON.Vector3.Left().multiply(EditControls.rotationIncrementVector.multiply(EditControls.transformationIncrementMultiplierVector)));
                    }
                }
                if (EditControls.allowAxisY) {
                    if (yTotal > 0) {
                        EditControls.tempIntendedRotation.addInPlace(BABYLON.Vector3.Up().multiply(EditControls.rotationIncrementVector.multiply(EditControls.transformationIncrementMultiplierVector)));
                    }
                    else if (yTotal < 0) {
                        EditControls.tempIntendedRotation.addInPlace(BABYLON.Vector3.Down().multiply(EditControls.rotationIncrementVector.multiply(EditControls.transformationIncrementMultiplierVector)));
                    }
                }
                EditControls.pickedMesh.rotation.addInPlace(EditControls.tempIntendedRotation);
                EditControls.tempIntendedRotation.copyFrom(BABYLON.Vector3.Zero());
            }
            else if (EditControls.scaling) {
                if (yTotal > 0) {
                    EditControls.pickedMesh.scaling.addInPlace(EditControls.scalingIncrementVector.multiply(EditControls.transformationIncrementMultiplierVector));
                }
                else if (yTotal < 0) {
                    EditControls.pickedMesh.scaling.subtractInPlace(EditControls.scalingIncrementVector.multiply(EditControls.transformationIncrementMultiplierVector));
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
        if (abstractController instanceof EntityController) {}
        else if (EntityController.has(abstractController)) {
            abstractController = EntityController.get(abstractController);
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
    static resetControls(clearPicked = false) {
        EditControls.rotating = false;
        EditControls.scaling = false;
        EditControls.moving = false;
        EditControls.allowAxisX = true;
        EditControls.allowAxisY = true;
        EditControls.allowAxisZ = true;
        if (clearPicked) {
            EditControls.clearPickedMesh();
            EditControls.clearPickedController();
        }
        EditControls.tempIntendedPosition.set(BABYLON.Vector3.Zero());
        EditControls.tempIntendedRotation.set(BABYLON.Vector3.Zero());
        //EditControls.tempIntendedScaling.set(BABYLON.Vector3.Zero());
        Game.camera.attachControl(Game.canvas);
        return 0;
    }
    static reset() {
        EditControls.clearPickedMesh();
        EditControls.clearPickedController();
        EditControls.initialize();
        return 0;
    }
    static resetPosition() {
        EditControls.pickedMesh.position = EditControls.pickedMeshOriginalPosition;
        return 0;
    }
    static resetRotation() {
        EditControls.pickedMesh.rotation = EditControls.pickedMeshOriginalPosition;
        return 0;
    }
    static resetScaling() {
        EditControls.pickedMesh.scaling = EditControls.pickedMeshOriginalScaling;
        return 0;
    }
    static resetTransformations() {
        EditControls.resetPosition();
        EditControls.resetRotation();
        EditControls.resetScaling();
        return 0;
    }
    static setMovementIncrement(increment = 0.01) {
        EditControls.movementIncrement = increment;
        EditControls.movementIncrementVector = new BABYLON.Vector3(EditControls.movementIncrement, EditControls.movementIncrement, EditControls.movementIncrement);
        return 0;
    }
    static setRotationIncrement(increment = 0.06283185307179587) {
        EditControls.rotationIncrement = increment;
        EditControls.rotationIncrementVector = new BABYLON.Vector3(EditControls.rotationIncrement, EditControls.rotationIncrement, EditControls.rotationIncrement);
        return 0;
    }
    static setScalingIncrement(increment = 0.01) {
        EditControls.scalingIncrement = increment;
        EditControls.scalingIncrementVector = new BABYLON.Vector3(EditControls.scalingIncrement, EditControls.scalingIncrement, EditControls.scalingIncrement);
        return 0;
    }
    static setTransformationIncrement(increment = 1.0) {
        EditControls.transformationIncrementMultiplier = increment;
        EditControls.transformationIncrementMultiplierVector = new BABYLON.Vector3(EditControls.transformationIncrementMultiplier, EditControls.transformationIncrementMultiplier, EditControls.transformationIncrementMultiplier);
        return 0;
    }
    static resetTransformationIncrements() {
        EditControls.setMovementIncrement(0.01);
        EditControls.setRotationIncrement(BABYLON.Tools.ToRadians(3.6))
        EditControls.setScalingIncrement(0.01);
        EditControls.setTransformationIncrement(1.0);
        return 0;
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
        EditControls.transformationIncrementMultiplier = 1.0;
        EditControls.transformationIncrementMultiplierVector = new BABYLON.Vector3(EditControls.transformationIncrementMultiplier, EditControls.transformationIncrementMultiplier, EditControls.transformationIncrementMultiplier);
        EditControls.movementIncrement = 0.01;
        EditControls.movementIncrementVector = new BABYLON.Vector3(EditControls.movementIncrement, EditControls.movementIncrement, EditControls.movementIncrement);
        EditControls.rotationIncrement = 0.06283185307179587;
        EditControls.rotationIncrementVector = new BABYLON.Vector3(EditControls.rotationIncrement, EditControls.rotationIncrement, EditControls.rotationIncrement);
        EditControls.scalingIncrement = 0.01;
        EditControls.scalingIncrementVector = new BABYLON.Vector3(EditControls.scalingIncrement, EditControls.scalingIncrement, EditControls.scalingIncrement);
        EditControls.scaling = false;
        EditControls.moving = false;
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
        //EditControls.actionHistory = []; // for undo
        return 0;
    }
}
EditControls.initialize();