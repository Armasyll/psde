class InventoryEquipmentGameGUI {
    static initialize() {
        if (Game.debugMode) BABYLON.Tools.Log("Initializing InventoryEquipmentGameGUI");
        InventoryEquipmentGameGUI.initialized = false;
        InventoryEquipmentGameGUI.controller = null;
        InventoryEquipmentGameGUI.titleBar = null;
        InventoryEquipmentGameGUI.closeButton = null;
        InventoryEquipmentGameGUI.bodyContainer = null;
        InventoryEquipmentGameGUI.equipmentArea = null;
        InventoryEquipmentGameGUI.equipmentEarLBox = null;
        InventoryEquipmentGameGUI.equipmentEarRBox = null;
        InventoryEquipmentGameGUI.equipmentHeadBox = null;
        InventoryEquipmentGameGUI.equipmentNeckBox = null;
        InventoryEquipmentGameGUI.equipmentShoulderLBox = null;
        InventoryEquipmentGameGUI.equipmentShoulderRBox = null;
        InventoryEquipmentGameGUI.equipmentChestBox = null;
        InventoryEquipmentGameGUI.equipmentArmLBox = null;
        InventoryEquipmentGameGUI.equipmentArmRBox = null;
        InventoryEquipmentGameGUI.equipmentWaistBox = null;
        InventoryEquipmentGameGUI.equipmentHandLBox = null;
        InventoryEquipmentGameGUI.equipmentHandRBox = null;
        InventoryEquipmentGameGUI.equipmentLegsBox = null;
        InventoryEquipmentGameGUI.equipmentFootLBox = null;
        InventoryEquipmentGameGUI.equipmentFootRBox = null;
        InventoryEquipmentGameGUI.equipmentFinger0LBox = null;
        InventoryEquipmentGameGUI.equipmentFinger1LBox = null;
        InventoryEquipmentGameGUI.equipmentFinger2LBox = null;
        InventoryEquipmentGameGUI.equipmentFinger0RBox = null;
        InventoryEquipmentGameGUI.equipmentFinger1RBox = null;
        InventoryEquipmentGameGUI.equipmentFinger2RBox = null;

        InventoryEquipmentGameGUI.selectedEntity = null;
        InventoryEquipmentGameGUI.targetController = null;
        InventoryEquipmentGameGUI.defaultWidthInPixels = Game.renderWidth*2/3;
        InventoryEquipmentGameGUI.defaultHeightInPixels = Game.renderHeight*3/4;
        InventoryEquipmentGameGUI.posX = 0;
        InventoryEquipmentGameGUI.posY = 0;
        InventoryEquipmentGameGUI.gridColumns = 9;
        InventoryEquipmentGameGUI.gridRows = 11;
        InventoryEquipmentGameGUI.gridCellSize = 64;
        InventoryEquipmentGameGUI.generateController();
    }
    static resize() {
        InventoryEquipmentGameGUI.bodyContainer.heightInPixels = InventoryEquipmentGameGUI.controller.heightInPixels - InventoryEquipmentGameGUI.titleBar.heightInPixels;
        InventoryEquipmentGameGUI.bodyContainer.widthInPixels = InventoryEquipmentGameGUI.controller.widthInPixels;
        InventoryEquipmentGameGUI.equipmentArea.heightInPixels = InventoryEquipmentGameGUI.bodyContainer.heightInPixels;
        InventoryEquipmentGameGUI.equipmentArea.widthInPixels = InventoryEquipmentGameGUI.bodyContainer.widthInPixels;

        InventoryEquipmentGameGUI.equipmentEarLBox.widthInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentEarLBox.heightInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentEarLBox.leftInPixels = InventoryEquipmentGameGUI.gridCellSize * 1.125;
        InventoryEquipmentGameGUI.equipmentEarLBox.topInPixels = -InventoryEquipmentGameGUI.gridCellSize * 4.5;

        InventoryEquipmentGameGUI.equipmentEarRBox.widthInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentEarRBox.heightInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentEarRBox.leftInPixels = -InventoryEquipmentGameGUI.gridCellSize * 1.125;
        InventoryEquipmentGameGUI.equipmentEarRBox.topInPixels = -InventoryEquipmentGameGUI.gridCellSize * 4.5;

        InventoryEquipmentGameGUI.equipmentHeadBox.widthInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentHeadBox.heightInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentHeadBox.topInPixels = -InventoryEquipmentGameGUI.gridCellSize * 4.125;

        InventoryEquipmentGameGUI.equipmentNeckBox.widthInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentNeckBox.heightInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentNeckBox.topInPixels = -InventoryEquipmentGameGUI.gridCellSize * 3;

        InventoryEquipmentGameGUI.equipmentShoulderLBox.widthInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentShoulderLBox.heightInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentShoulderLBox.leftInPixels = InventoryEquipmentGameGUI.gridCellSize * 1.125;
        InventoryEquipmentGameGUI.equipmentShoulderLBox.topInPixels = -InventoryEquipmentGameGUI.gridCellSize * 2;

        InventoryEquipmentGameGUI.equipmentShoulderRBox.widthInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentShoulderRBox.heightInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentShoulderRBox.leftInPixels = -InventoryEquipmentGameGUI.gridCellSize * 1.125;
        InventoryEquipmentGameGUI.equipmentShoulderRBox.topInPixels = -InventoryEquipmentGameGUI.gridCellSize * 2;

        InventoryEquipmentGameGUI.equipmentChestBox.widthInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentChestBox.heightInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentChestBox.topInPixels = -InventoryEquipmentGameGUI.gridCellSize * 1.875;

        InventoryEquipmentGameGUI.equipmentArmLBox.widthInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentArmLBox.heightInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentArmLBox.leftInPixels = InventoryEquipmentGameGUI.gridCellSize * 1.25;
        InventoryEquipmentGameGUI.equipmentArmLBox.topInPixels = -InventoryEquipmentGameGUI.gridCellSize * 0.875;

        InventoryEquipmentGameGUI.equipmentArmRBox.widthInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentArmRBox.heightInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentArmRBox.leftInPixels = -InventoryEquipmentGameGUI.gridCellSize * 1.25;
        InventoryEquipmentGameGUI.equipmentArmRBox.topInPixels = -InventoryEquipmentGameGUI.gridCellSize * 0.875;

        InventoryEquipmentGameGUI.equipmentWaistBox.widthInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentWaistBox.heightInPixels = InventoryEquipmentGameGUI.gridCellSize;

        InventoryEquipmentGameGUI.equipmentHandLBox.widthInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentHandLBox.heightInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentHandLBox.leftInPixels = InventoryEquipmentGameGUI.gridCellSize * 1.325;
        InventoryEquipmentGameGUI.equipmentHandLBox.topInPixels = InventoryEquipmentGameGUI.gridCellSize * 0.25;

        InventoryEquipmentGameGUI.equipmentHandRBox.widthInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentHandRBox.heightInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentHandRBox.leftInPixels = -InventoryEquipmentGameGUI.gridCellSize * 1.325;
        InventoryEquipmentGameGUI.equipmentHandRBox.topInPixels = InventoryEquipmentGameGUI.gridCellSize * 0.25;
        
        InventoryEquipmentGameGUI.equipmentLegsBox.widthInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentLegsBox.heightInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentLegsBox.topInPixels = InventoryEquipmentGameGUI.gridCellSize * 1.125;

        InventoryEquipmentGameGUI.equipmentFootLBox.widthInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentFootLBox.heightInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentFootLBox.leftInPixels = InventoryEquipmentGameGUI.gridCellSize * 0.75;
        InventoryEquipmentGameGUI.equipmentFootLBox.topInPixels = InventoryEquipmentGameGUI.gridCellSize * 3;

        InventoryEquipmentGameGUI.equipmentFootRBox.widthInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentFootRBox.heightInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentFootRBox.leftInPixels = -InventoryEquipmentGameGUI.gridCellSize * 0.75;
        InventoryEquipmentGameGUI.equipmentFootRBox.topInPixels = InventoryEquipmentGameGUI.gridCellSize * 3;

        InventoryEquipmentGameGUI.equipmentFinger0LBox.widthInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentFinger0LBox.heightInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentFinger0LBox.leftInPixels = InventoryEquipmentGameGUI.gridCellSize * 2.625;
        InventoryEquipmentGameGUI.equipmentFinger0LBox.topInPixels = -InventoryEquipmentGameGUI.gridCellSize * 0.75;

        InventoryEquipmentGameGUI.equipmentFinger0RBox.widthInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentFinger0RBox.heightInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentFinger0RBox.leftInPixels = -InventoryEquipmentGameGUI.gridCellSize * 2.625;
        InventoryEquipmentGameGUI.equipmentFinger0RBox.topInPixels = -InventoryEquipmentGameGUI.gridCellSize * 0.75;

        InventoryEquipmentGameGUI.equipmentFinger1LBox.widthInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentFinger1LBox.heightInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentFinger1LBox.leftInPixels = InventoryEquipmentGameGUI.gridCellSize * 2.75;
        InventoryEquipmentGameGUI.equipmentFinger1LBox.topInPixels = InventoryEquipmentGameGUI.gridCellSize * 0.375;

        InventoryEquipmentGameGUI.equipmentFinger1RBox.widthInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentFinger1RBox.heightInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentFinger1RBox.leftInPixels = -InventoryEquipmentGameGUI.gridCellSize * 2.75;
        InventoryEquipmentGameGUI.equipmentFinger1RBox.topInPixels = InventoryEquipmentGameGUI.gridCellSize * 0.375;

        InventoryEquipmentGameGUI.equipmentFinger2LBox.widthInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentFinger2LBox.heightInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentFinger2LBox.leftInPixels = InventoryEquipmentGameGUI.gridCellSize * 2.625;
        InventoryEquipmentGameGUI.equipmentFinger2LBox.topInPixels = InventoryEquipmentGameGUI.gridCellSize * 1.5;

        InventoryEquipmentGameGUI.equipmentFinger2RBox.widthInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentFinger2RBox.heightInPixels = InventoryEquipmentGameGUI.gridCellSize;
        InventoryEquipmentGameGUI.equipmentFinger2RBox.leftInPixels = -InventoryEquipmentGameGUI.gridCellSize * 2.625;
        InventoryEquipmentGameGUI.equipmentFinger2RBox.topInPixels = InventoryEquipmentGameGUI.gridCellSize * 1.5;


        let columnWidth = Math.floor(InventoryEquipmentGameGUI.bodyContainer.widthInPixels / InventoryEquipmentGameGUI.gridColumns);
        let columnHeight = Math.floor(InventoryEquipmentGameGUI.bodyContainer.heightInPixels / InventoryEquipmentGameGUI.gridRows);
        if (columnHeight > columnWidth) {
            InventoryEquipmentGameGUI.gridCellSize = columnWidth;
        }
        else {
            InventoryEquipmentGameGUI.gridCellSize = columnHeight;
        }
        return 0;
    }
    static generateController() {
        [InventoryEquipmentGameGUI.controller, InventoryEquipmentGameGUI.titleBar, InventoryEquipmentGameGUI.title, InventoryEquipmentGameGUI.closeButton, InventoryEquipmentGameGUI.bodyContainer] = GameGUI.createWindow("equipment", "Equipment", InventoryEquipmentGameGUI.defaultWidthInPixels, InventoryEquipmentGameGUI.defaultHeightInPixels, 2);

        InventoryEquipmentGameGUI.closeButton.onPointerUpObservable.add(function() {
            InventoryEquipmentGameGUI.hide();
        });
        
        InventoryEquipmentGameGUI.equipmentArea = new BABYLON.GUI.Container();
        InventoryEquipmentGameGUI.bodyContainer.addControl(InventoryEquipmentGameGUI.equipmentArea);
        
        InventoryEquipmentGameGUI.equipmentEarLBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentEarLBox.background = "green";
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentEarLBox);
        InventoryEquipmentGameGUI.equipmentEarRBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentEarRBox.background = "green";
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentEarRBox);
        InventoryEquipmentGameGUI.equipmentHeadBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentHeadBox.background = "white";
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentHeadBox);
        InventoryEquipmentGameGUI.equipmentNeckBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentNeckBox.background = "green";
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentNeckBox);
        InventoryEquipmentGameGUI.equipmentShoulderLBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentShoulderLBox.background = "white";
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentShoulderLBox);
        InventoryEquipmentGameGUI.equipmentShoulderRBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentShoulderRBox.background = "white";
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentShoulderRBox);
        InventoryEquipmentGameGUI.equipmentChestBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentChestBox.background = "white";
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentChestBox);
        InventoryEquipmentGameGUI.equipmentArmLBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentArmLBox.background = "white";
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentArmLBox);
        InventoryEquipmentGameGUI.equipmentArmRBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentArmRBox.background = "white";
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentArmRBox);
        InventoryEquipmentGameGUI.equipmentWaistBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentWaistBox.background = "white";
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentWaistBox);
        InventoryEquipmentGameGUI.equipmentHandLBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentHandLBox.background = "white";
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentHandLBox);
        InventoryEquipmentGameGUI.equipmentHandRBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentHandRBox.background = "white";
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentHandRBox);
        InventoryEquipmentGameGUI.equipmentLegsBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentLegsBox.background = "white";
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentLegsBox);
        InventoryEquipmentGameGUI.equipmentFootLBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentFootLBox.background = "white";
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentFootLBox);
        InventoryEquipmentGameGUI.equipmentFootRBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentFootRBox.background = "white";
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentFootRBox);

        InventoryEquipmentGameGUI.equipmentFinger0LBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentFinger0LBox.background = "green";
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentFinger0LBox);
        InventoryEquipmentGameGUI.equipmentFinger1LBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentFinger1LBox.background = "green";
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentFinger1LBox);
        InventoryEquipmentGameGUI.equipmentFinger2LBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentFinger2LBox.background = "green";
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentFinger2LBox);
        InventoryEquipmentGameGUI.equipmentFinger0RBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentFinger0RBox.background = "green";
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentFinger0RBox);
        InventoryEquipmentGameGUI.equipmentFinger1RBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentFinger1RBox.background = "green";
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentFinger1RBox);
        InventoryEquipmentGameGUI.equipmentFinger2RBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentFinger2RBox.background = "green";
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentFinger2RBox);

        InventoryEquipmentGameGUI.controller.zIndex = 100;
        InventoryEquipmentGameGUI.initialized = true;
        return InventoryEquipmentGameGUI.controller;
    }
    static getController() {
        return InventoryEquipmentGameGUI.controller;
    }
    static show() {
        InventoryEquipmentGameGUI.controller.isVisible = true;
        InventoryEquipmentGameGUI.isVisible = true;
    }
    static hide() {
        InventoryEquipmentGameGUI.controller.isVisible = false;
        InventoryEquipmentGameGUI.isVisible = false;
    }
    static update() {
        return InventoryEquipmentGameGUI.set(InventoryEquipmentGameGUI.targetController);
    }
    static set(entityController = Game.playerController, parentCallbackID = null) {
        if (!(entityController instanceof EntityController)) {
            if (EntityController.has(entityController)) {
                entityController = EntityController.get(entityController);
            }
            else {
                return 2;
            }
        }
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [entityController], InventoryEquipmentGameGUI.setResponse);
        Game.entityLogicWorkerPostMessage("getEquipment", 0, {"entityID":entityController.entityID}, callbackID);
        return 0;
    }
    static setResponse(entityController, response, parentCallbackID) {
        InventoryEquipmentGameGUI.targetController = entityController;
        console.log(response);
        return 0;
    }
    static clearSelected() {
        InventoryEquipmentGameGUI.selectedEntity = null;
    }
    static clearTooltip() {
        InventoryEquipmentGameGUI.tooltipEntity = null;
    }
}