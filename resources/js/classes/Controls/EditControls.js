class EditControls extends AbstractControls {
    static onKeyDown(keyboardEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(keyboardEvent instanceof KeyboardEvent)) {
            return 2;
        }
        switch (keyboardEvent.keyCode) {
            case EditControls.rotateCode : {
                if (EditControls.pickedMesh instanceof BABYLON.AbstractMesh) {
                    EditControls.rotating = true;
                    Game.camera.detachControl(Game.canvas);
                }
                break;
            }
            case EditControls.scaleCode : {
                if (EditControls.pickedMesh instanceof BABYLON.AbstractMesh) {
                    EditControls.scaling = true;
                    Game.camera.detachControl(Game.canvas);
                }
                break;
            }
            case EditControls.moveCode : {
                if (EditControls.pickedMesh instanceof BABYLON.AbstractMesh) {
                    EditControls.moving = true;
                    Game.camera.detachControl(Game.canvas);
                }
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
        if (EditControls.pickedMesh instanceof BABYLON.AbstractMesh) {
            EditControls.pickedMeshOriginalPosition.copyFrom(EditControls.pickedMesh.position);
            EditControls.pickedMeshOriginalRotation.copyFrom(EditControls.pickedMesh.rotation);
            EditControls.pickedMeshOriginalScaling.copyFrom(EditControls.pickedMesh.scaling);
            EditControls.moving = false;
            EditControls.rotating = false;
            EditControls.scaling = false;
            Game.camera.attachControl(Game.canvas);
        }
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
            let pick = Game.scene.pick(window.innerWidth/2, window.innerHeight/2);
            if (pick.pickedMesh instanceof BABYLON.AbstractMesh && pick.pickedMesh.isEnabled()) {
                EditControls.pickMesh(pick.pickedMesh);
            }
        }
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
                if (xTotal > 0) {
                    EditControls.pickedMesh.rotation.y += BABYLON.Tools.ToRadians(1);
                }
                else if (xTotal < 0) {
                    EditControls.pickedMesh.rotation.y -= BABYLON.Tools.ToRadians(1);
                }
            }
            else if (EditControls.scaling) {
                if (xTotal > 0) {
                    EditControls.pickedMesh.scaling.addInPlace(new BABYLON.Vector3(0.0125, 0.0125, 0.0125))
                }
                else if (xTotal < 0) {
                    EditControls.pickedMesh.scaling.subtractInPlace(new BABYLON.Vector3(0.0125, 0.0125, 0.0125))
                }
            }
        }
        return 0;
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
    static pickedController(abstractController) {
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
    static initialize() {
        EditControls.rotateCode = 82;
        EditControls.scaleCode = 83;
        EditControls.moveCode = 71;
        EditControls.toggleCollision = 84;
        EditControls.rotating = false;
        EditControls.scaling = false;
        EditControls.moving = false;
        EditControls.vectorLockX = false;
        EditControls.vectorLockY = false;
        EditControls.vectorLockZ = false;
        EditControls.pickedMeshOriginalPosition = new BABYLON.Vector3();
        EditControls.pickedMeshOriginalRotation = new BABYLON.Vector3();
        EditControls.pickedMeshOriginalScaling = new BABYLON.Vector3();
        EditControls.pickedMesh = null;
        EditControls.previousPickedMesh = null;
        EditControls.pickedController = null;
        EditControls.previousPickedController = null;
        return 0;
    }
}
EditControls.initialize();