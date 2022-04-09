class InventoryEquipmentGameGUI {
    static getClassName() {
        return "InventoryEquipmentGameGUI";
    }
    static initialize() {
        if (Game.debugMode) BABYLON.Tools.Log("Initializing InventoryEquipmentGameGUI");
        InventoryEquipmentGameGUI.initialized = false;
        InventoryEquipmentGameGUI.controller = null;
        InventoryEquipmentGameGUI.isVisible = false;
        InventoryEquipmentGameGUI.titleBar = null;
        InventoryEquipmentGameGUI.closeButton = null;
        InventoryEquipmentGameGUI.bodyContainer = null;
        InventoryEquipmentGameGUI.fullScreen = true;
        InventoryEquipmentGameGUI.defaultWidthInPixels = 0;
        InventoryEquipmentGameGUI.defaultHeightInPixels = 0;
        InventoryEquipmentGameGUI.windowWidthInPixels = -1;
        InventoryEquipmentGameGUI.windowHeightInPixels = -1;
        InventoryEquipmentGameGUI.posX = 0;
        InventoryEquipmentGameGUI.posY = 0;

        InventoryEquipmentGameGUI.equipmentArea = null;
        InventoryEquipmentGameGUI.equipmentNoneBox = null;
        InventoryEquipmentGameGUI.equipmentNoneBoxImage = null;
        InventoryEquipmentGameGUI.equipmentEarLBox = null;
        InventoryEquipmentGameGUI.equipmentEarLBoxImage = null;
        InventoryEquipmentGameGUI.equipmentEarRBox = null;
        InventoryEquipmentGameGUI.equipmentEarRBoxImage = null;
        InventoryEquipmentGameGUI.equipmentHeadBox = null;
        InventoryEquipmentGameGUI.equipmentHeadBoxImage = null;
        InventoryEquipmentGameGUI.equipmentNeckBox = null;
        InventoryEquipmentGameGUI.equipmentNeckBoxImage = null;
        InventoryEquipmentGameGUI.equipmentShoulderLBox = null;
        InventoryEquipmentGameGUI.equipmentShoulderLBoxImage = null;
        InventoryEquipmentGameGUI.equipmentShoulderRBox = null;
        InventoryEquipmentGameGUI.equipmentShoulderRBoxImage = null;
        InventoryEquipmentGameGUI.equipmentChestBox = null;
        InventoryEquipmentGameGUI.equipmentChestBoxImage = null;
        InventoryEquipmentGameGUI.equipmentArmLBox = null;
        InventoryEquipmentGameGUI.equipmentArmLBoxImage = null;
        InventoryEquipmentGameGUI.equipmentArmRBox = null;
        InventoryEquipmentGameGUI.equipmentArmRBoxImage = null;
        InventoryEquipmentGameGUI.equipmentWaistBox = null;
        InventoryEquipmentGameGUI.equipmentWaistBoxImage = null;
        InventoryEquipmentGameGUI.equipmentHandLBox = null;
        InventoryEquipmentGameGUI.equipmentHandLBoxImage = null;
        InventoryEquipmentGameGUI.equipmentHandRBox = null;
        InventoryEquipmentGameGUI.equipmentHandRBoxImage = null;
        InventoryEquipmentGameGUI.equipmentLegsBox = null;
        InventoryEquipmentGameGUI.equipmentLegsBoxImage = null;
        InventoryEquipmentGameGUI.equipmentFootLBox = null;
        InventoryEquipmentGameGUI.equipmentFootLBoxImage = null;
        InventoryEquipmentGameGUI.equipmentFootRBox = null;
        InventoryEquipmentGameGUI.equipmentFootRBoxImage = null;
        InventoryEquipmentGameGUI.equipmentFinger0LBox = null;
        InventoryEquipmentGameGUI.equipmentFinger0LBoxImage = null;
        InventoryEquipmentGameGUI.equipmentFinger1LBox = null;
        InventoryEquipmentGameGUI.equipmentFinger1LBoxImage = null;
        InventoryEquipmentGameGUI.equipmentFinger2LBox = null;
        InventoryEquipmentGameGUI.equipmentFinger2LBoxImage = null;
        InventoryEquipmentGameGUI.equipmentFinger0RBox = null;
        InventoryEquipmentGameGUI.equipmentFinger0RBoxImage = null;
        InventoryEquipmentGameGUI.equipmentFinger1RBox = null;
        InventoryEquipmentGameGUI.equipmentFinger1RBoxImage = null;
        InventoryEquipmentGameGUI.equipmentFinger2RBox = null;
        InventoryEquipmentGameGUI.equipmentFinger2RBoxImage = null;

        InventoryEquipmentGameGUI.selectedEntity = null;
        InventoryEquipmentGameGUI.targetController = null;
        InventoryEquipmentGameGUI.equipment = null;
        InventoryEquipmentGameGUI.gridColumns = 9;
        InventoryEquipmentGameGUI.gridRows = 11;
        InventoryEquipmentGameGUI.gridCellSize = 64;
        InventoryEquipmentGameGUI.interfaceMode = InterfaceModeEnum.MENU;

        InventoryEquipmentGameGUI.resetDefaultDimensions();
        InventoryEquipmentGameGUI.generateController();
        InventoryEquipmentGameGUI.hide();
        return 0;
    }
    static resetDefaultDimensions() {
        InventoryEquipmentGameGUI.defaultWidthInPixels = GameGUI.renderWidth * 2 / 3;
        InventoryEquipmentGameGUI.defaultHeightInPixels = GameGUI.renderHeight * 3 / 4;
        return 0;
    }
    static resize() {
        if (InventoryEquipmentGameGUI.initialized != true) {
            return 1;
        }
        InventoryEquipmentGameGUI.resetDefaultDimensions();
        if (InventoryEquipmentGameGUI.fullScreen) {
            InventoryEquipmentGameGUI.windowWidthInPixels = GameGUI.renderWidth;
            InventoryEquipmentGameGUI.windowHeightInPixels = GameGUI.renderHeight;
        }

        InventoryEquipmentGameGUI.controller.widthInPixels = InventoryEquipmentGameGUI.defaultWidthInPixels;
        InventoryEquipmentGameGUI.controller.heightInPixels = InventoryEquipmentGameGUI.defaultHeightInPixels;
        InventoryEquipmentGameGUI.titleBar.widthInPixels = InventoryEquipmentGameGUI.controller.widthInPixels;
        InventoryEquipmentGameGUI.titleBar.heightInPixels = GameGUI.titleBarHeightInPixels;
        InventoryEquipmentGameGUI.title.widthInPixels = InventoryEquipmentGameGUI.titleBar.widthInPixels - GameGUI.getFontSizeInPixels(2);
        InventoryEquipmentGameGUI.closeButton.width = GameGUI.getFontSize(2);
        InventoryEquipmentGameGUI.closeButton.height = GameGUI.getFontSize(2);
        InventoryEquipmentGameGUI.bodyContainer.widthInPixels = InventoryEquipmentGameGUI.controller.widthInPixels;
        InventoryEquipmentGameGUI.bodyContainer.heightInPixels = InventoryEquipmentGameGUI.controller.heightInPixels - InventoryEquipmentGameGUI.titleBar.heightInPixels;

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
        InventoryEquipmentGameGUI.equipmentEarLBoxImage = new BABYLON.GUI.Image("earL", "/resources/images/blank.png");
        InventoryEquipmentGameGUI.equipmentEarLBoxImage.width = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentEarLBoxImage.height = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentEarLBoxImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
        InventoryEquipmentGameGUI.equipmentEarLBox.addControl(InventoryEquipmentGameGUI.equipmentEarLBoxImage);
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentEarLBox);
        InventoryEquipmentGameGUI.equipmentEarRBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentEarRBox.background = "green";
        InventoryEquipmentGameGUI.equipmentEarRBoxImage = new BABYLON.GUI.Image("earR", "/resources/images/blank.png");
        InventoryEquipmentGameGUI.equipmentEarRBoxImage.width = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentEarRBoxImage.height = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentEarRBoxImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
        InventoryEquipmentGameGUI.equipmentEarRBox.addControl(InventoryEquipmentGameGUI.equipmentEarRBoxImage);
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentEarRBox);
        InventoryEquipmentGameGUI.equipmentHeadBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentHeadBox.background = "white";
        InventoryEquipmentGameGUI.equipmentHeadBoxImage = new BABYLON.GUI.Image("head", "/resources/images/blank.png");
        InventoryEquipmentGameGUI.equipmentHeadBoxImage.width = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentHeadBoxImage.height = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentHeadBoxImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
        InventoryEquipmentGameGUI.equipmentHeadBox.addControl(InventoryEquipmentGameGUI.equipmentHeadBoxImage);
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentHeadBox);
        InventoryEquipmentGameGUI.equipmentNeckBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentNeckBox.background = "green";
        InventoryEquipmentGameGUI.equipmentNeckBoxImage = new BABYLON.GUI.Image("neck", "/resources/images/blank.png");
        InventoryEquipmentGameGUI.equipmentNeckBoxImage.width = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentNeckBoxImage.height = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentNeckBoxImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
        InventoryEquipmentGameGUI.equipmentNeckBox.addControl(InventoryEquipmentGameGUI.equipmentNeckBoxImage);
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentNeckBox);
        InventoryEquipmentGameGUI.equipmentShoulderLBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentShoulderLBox.background = "white";
        InventoryEquipmentGameGUI.equipmentShoulderLBoxImage = new BABYLON.GUI.Image("shoulderL", "/resources/images/blank.png");
        InventoryEquipmentGameGUI.equipmentShoulderLBoxImage.width = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentShoulderLBoxImage.height = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentShoulderLBoxImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
        InventoryEquipmentGameGUI.equipmentShoulderLBox.addControl(InventoryEquipmentGameGUI.equipmentShoulderLBoxImage);
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentShoulderLBox);
        InventoryEquipmentGameGUI.equipmentShoulderRBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentShoulderRBox.background = "white";
        InventoryEquipmentGameGUI.equipmentShoulderRBoxImage = new BABYLON.GUI.Image("shoulderR", "/resources/images/blank.png");
        InventoryEquipmentGameGUI.equipmentShoulderRBoxImage.width = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentShoulderRBoxImage.height = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentShoulderRBoxImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
        InventoryEquipmentGameGUI.equipmentShoulderRBox.addControl(InventoryEquipmentGameGUI.equipmentShoulderRBoxImage);
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentShoulderRBox);
        InventoryEquipmentGameGUI.equipmentChestBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentChestBox.background = "white";
        InventoryEquipmentGameGUI.equipmentChestBoxImage = new BABYLON.GUI.Image("chest", "/resources/images/blank.png");
        InventoryEquipmentGameGUI.equipmentChestBoxImage.width = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentChestBoxImage.height = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentChestBoxImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
        InventoryEquipmentGameGUI.equipmentChestBox.addControl(InventoryEquipmentGameGUI.equipmentChestBoxImage);
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentChestBox);
        InventoryEquipmentGameGUI.equipmentArmLBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentArmLBox.background = "white";
        InventoryEquipmentGameGUI.equipmentArmLBoxImage = new BABYLON.GUI.Image("armL", "/resources/images/blank.png");
        InventoryEquipmentGameGUI.equipmentArmLBoxImage.width = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentArmLBoxImage.height = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentArmLBoxImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
        InventoryEquipmentGameGUI.equipmentArmLBox.addControl(InventoryEquipmentGameGUI.equipmentArmLBoxImage);
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentArmLBox);
        InventoryEquipmentGameGUI.equipmentArmRBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentArmRBox.background = "white";
        InventoryEquipmentGameGUI.equipmentArmRBoxImage = new BABYLON.GUI.Image("armR", "/resources/images/blank.png");
        InventoryEquipmentGameGUI.equipmentArmRBoxImage.width = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentArmRBoxImage.height = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentArmRBoxImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
        InventoryEquipmentGameGUI.equipmentArmRBox.addControl(InventoryEquipmentGameGUI.equipmentArmRBoxImage);
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentArmRBox);
        InventoryEquipmentGameGUI.equipmentWaistBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentWaistBox.background = "white";
        InventoryEquipmentGameGUI.equipmentWaistBoxImage = new BABYLON.GUI.Image("waist", "/resources/images/blank.png");
        InventoryEquipmentGameGUI.equipmentWaistBoxImage.width = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentWaistBoxImage.height = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentWaistBoxImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
        InventoryEquipmentGameGUI.equipmentWaistBox.addControl(InventoryEquipmentGameGUI.equipmentWaistBoxImage);
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentWaistBox);
        InventoryEquipmentGameGUI.equipmentHandLBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentHandLBox.background = "white";
        InventoryEquipmentGameGUI.equipmentHandLBoxImage = new BABYLON.GUI.Image("handL", "/resources/images/blank.png");
        InventoryEquipmentGameGUI.equipmentHandLBoxImage.width = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentHandLBoxImage.height = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentHandLBoxImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
        InventoryEquipmentGameGUI.equipmentHandLBox.addControl(InventoryEquipmentGameGUI.equipmentHandLBoxImage);
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentHandLBox);
        InventoryEquipmentGameGUI.equipmentHandRBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentHandRBox.background = "white";
        InventoryEquipmentGameGUI.equipmentHandRBoxImage = new BABYLON.GUI.Image("handR", "/resources/images/blank.png");
        InventoryEquipmentGameGUI.equipmentHandRBoxImage.width = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentHandRBoxImage.height = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentHandRBoxImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
        InventoryEquipmentGameGUI.equipmentHandRBox.addControl(InventoryEquipmentGameGUI.equipmentHandRBoxImage);
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentHandRBox);
        InventoryEquipmentGameGUI.equipmentLegsBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentLegsBox.background = "white";
        InventoryEquipmentGameGUI.equipmentLegsBoxImage = new BABYLON.GUI.Image("legs", "/resources/images/blank.png");
        InventoryEquipmentGameGUI.equipmentLegsBoxImage.width = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentLegsBoxImage.height = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentLegsBoxImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
        InventoryEquipmentGameGUI.equipmentLegsBox.addControl(InventoryEquipmentGameGUI.equipmentLegsBoxImage);
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentLegsBox);
        InventoryEquipmentGameGUI.equipmentFootLBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentFootLBox.background = "white";
        InventoryEquipmentGameGUI.equipmentFootLBoxImage = new BABYLON.GUI.Image("footL", "/resources/images/blank.png");
        InventoryEquipmentGameGUI.equipmentFootLBoxImage.width = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentFootLBoxImage.height = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentFootLBoxImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
        InventoryEquipmentGameGUI.equipmentFootLBox.addControl(InventoryEquipmentGameGUI.equipmentFootLBoxImage);
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentFootLBox);
        InventoryEquipmentGameGUI.equipmentFootRBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentFootRBox.background = "white";
        InventoryEquipmentGameGUI.equipmentFootRBoxImage = new BABYLON.GUI.Image("footR", "/resources/images/blank.png");
        InventoryEquipmentGameGUI.equipmentFootRBoxImage.width = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentFootRBoxImage.height = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentFootRBoxImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
        InventoryEquipmentGameGUI.equipmentFootRBox.addControl(InventoryEquipmentGameGUI.equipmentFootRBoxImage);
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentFootRBox);

        InventoryEquipmentGameGUI.equipmentFinger0LBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentFinger0LBox.background = "green";
        InventoryEquipmentGameGUI.equipmentFinger0LBoxImage = new BABYLON.GUI.Image("finger0L", "/resources/images/blank.png");
        InventoryEquipmentGameGUI.equipmentFinger0LBoxImage.width = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentFinger0LBoxImage.height = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentFinger0LBoxImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
        InventoryEquipmentGameGUI.equipmentFinger0LBox.addControl(InventoryEquipmentGameGUI.equipmentFinger0LBoxImage);
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentFinger0LBox);
        InventoryEquipmentGameGUI.equipmentFinger1LBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentFinger1LBox.background = "green";
        InventoryEquipmentGameGUI.equipmentFinger1LBoxImage = new BABYLON.GUI.Image("finger1L", "/resources/images/blank.png");
        InventoryEquipmentGameGUI.equipmentFinger1LBoxImage.width = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentFinger1LBoxImage.height = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentFinger1LBoxImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
        InventoryEquipmentGameGUI.equipmentFinger1LBox.addControl(InventoryEquipmentGameGUI.equipmentFinger1LBoxImage);
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentFinger1LBox);
        InventoryEquipmentGameGUI.equipmentFinger2LBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentFinger2LBox.background = "green";
        InventoryEquipmentGameGUI.equipmentFinger2LBoxImage = new BABYLON.GUI.Image("finger2L", "/resources/images/blank.png");
        InventoryEquipmentGameGUI.equipmentFinger2LBoxImage.width = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentFinger2LBoxImage.height = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentFinger2LBoxImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
        InventoryEquipmentGameGUI.equipmentFinger2LBox.addControl(InventoryEquipmentGameGUI.equipmentFinger2LBoxImage);
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentFinger2LBox);
        InventoryEquipmentGameGUI.equipmentFinger0RBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentFinger0RBox.background = "green";
        InventoryEquipmentGameGUI.equipmentFinger0RBoxImage = new BABYLON.GUI.Image("finger0R", "/resources/images/blank.png");
        InventoryEquipmentGameGUI.equipmentFinger0RBoxImage.width = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentFinger0RBoxImage.height = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentFinger0RBoxImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
        InventoryEquipmentGameGUI.equipmentFinger0RBox.addControl(InventoryEquipmentGameGUI.equipmentFinger0RBoxImage);
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentFinger0RBox);
        InventoryEquipmentGameGUI.equipmentFinger1RBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentFinger1RBox.background = "green";
        InventoryEquipmentGameGUI.equipmentFinger1RBoxImage = new BABYLON.GUI.Image("finger1R", "/resources/images/blank.png");
        InventoryEquipmentGameGUI.equipmentFinger1RBoxImage.width = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentFinger1RBoxImage.height = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentFinger1RBoxImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
        InventoryEquipmentGameGUI.equipmentFinger1RBox.addControl(InventoryEquipmentGameGUI.equipmentFinger1RBoxImage);
        InventoryEquipmentGameGUI.equipmentArea.addControl(InventoryEquipmentGameGUI.equipmentFinger1RBox);
        InventoryEquipmentGameGUI.equipmentFinger2RBox = new BABYLON.GUI.Rectangle(0, 0);
        InventoryEquipmentGameGUI.equipmentFinger2RBox.background = "green";
        InventoryEquipmentGameGUI.equipmentFinger2RBoxImage = new BABYLON.GUI.Image("finger2R", "/resources/images/blank.png");
        InventoryEquipmentGameGUI.equipmentFinger2RBoxImage.width = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentFinger2RBoxImage.height = String(InventoryEquipmentGameGUI.gridCellSize).concat("px");
        InventoryEquipmentGameGUI.equipmentFinger2RBoxImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
        InventoryEquipmentGameGUI.equipmentFinger2RBox.addControl(InventoryEquipmentGameGUI.equipmentFinger2RBoxImage);
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
        GameGUI.windowStack.push(InventoryEquipmentGameGUI);
        GameGUI.afterShow();
        return 0;
    }
    static hide(updateChildren = true) {
        InventoryEquipmentGameGUI.controller.isVisible = false;
        InventoryEquipmentGameGUI.isVisible = false;
        GameGUI.windowStack.remove(InventoryEquipmentGameGUI);
        GameGUI.afterHide();
        return 0;
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
        Callback.create(callbackID, parentCallbackID, [entityController], InventoryEquipmentGameGUI.setResponse);
        Game.entityLogicWorkerPostMessage("getEquipment", 0, {"entityID":entityController.entityID}, callbackID);
        return 0;
    }
    static setResponse(entityController, response, parentCallbackID) {
        InventoryEquipmentGameGUI.targetController = entityController;
        InventoryEquipmentGameGUI.equipment = Object.assign({}, response.equipment);
        InventoryEquipmentGameGUI.applyEquipment();
        return 0;
    }
    /**
     * Sets tooltip contents
     * @param {string} itemID 
     * @param {(string|null)} parentCallbackID 
     */
    static setSelected(itemID, parentCallbackID = null) {
        let callbackID = Tools.genUUIDv4();
        Callback.create(callbackID, parentCallbackID, [itemID], InventoryEquipmentGameGUI.setSelectedResponse);
        Game.entityLogicWorkerPostMessage("getEntity", 0, {"entityID":itemID}, callbackID);
        return 0;
    }
    static setSelectedResponse(itemID, response, parentCallbackID) {
        InventoryEquipmentGameGUI.selectedEntity = Object.assign({}, response);
        return 0;
    }
    static clearSelected() {
        InventoryEquipmentGameGUI.selectedEntity = null;
        return 0;
    }
    static applyEquipment() {
        for (let slot in InventoryEquipmentGameGUI.equipment) {
            InventoryEquipmentGameGUI.setSlot(slot, InventoryEquipmentGameGUI.equipment[slot]);
        }
        return 0;
    }
    static setSlot(slot, entityObject) {
        let targetContainer = InventoryEquipmentGameGUI.equipmentNoneBox;
        switch (slot) {
            case "CHEST": {targetContainer = InventoryEquipmentGameGUI.equipmentChestBox; break;}
            case "EAR_L": {targetContainer = InventoryEquipmentGameGUI.equipmentEarLBox; break;}
            case "EAR_R": {targetContainer = InventoryEquipmentGameGUI.equipmentEarRBox; break;}
            case "FOOT_L": {targetContainer = InventoryEquipmentGameGUI.equipmentFootLBox; break;}
            case "FOOT_R": {targetContainer = InventoryEquipmentGameGUI.equipmentFootRBox; break;}
            case "FOREARM_L": {targetContainer = InventoryEquipmentGameGUI.equipmentArmLBox; break;}
            case "FOREARM_R": {targetContainer = InventoryEquipmentGameGUI.equipmentArmRBox; break;}
            case "HAND_L": {targetContainer = InventoryEquipmentGameGUI.equipmentHandLBox; break;}
            case "HAND_R": {targetContainer = InventoryEquipmentGameGUI.equipmentHandRBox; break;}
            case "HEAD": {targetContainer = InventoryEquipmentGameGUI.equipmentHeadBox; break;}
            case "LEGS": {targetContainer = InventoryEquipmentGameGUI.equipmentLegsBox; break;}
            case "NECK": {targetContainer = InventoryEquipmentGameGUI.equipmentNeckBox; break;}
            case "PELVIS": {targetContainer = InventoryEquipmentGameGUI.equipmentWaistBox; break;}
            case "SHOULDER_L": {targetContainer = InventoryEquipmentGameGUI.equipmentShoulderRBox; break;}
            case "SHOULDER_R": {targetContainer = InventoryEquipmentGameGUI.equipmentShoulderLBox; break;}
        }
        // Maybe there's a better way to do this :v
        if (entityObject == null || !entityObject.hasOwnProperty("iconID")) {
            targetContainer.children[0].domImage.src = Game.getIcon("blankIcon");
        }
        else {
            targetContainer.children[0].domImage.src = Game.getIcon(entityObject.iconID);
        }
        return 0;
    }
    static getSlot(slot) {

    }
}