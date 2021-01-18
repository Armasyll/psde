class InventoryEquipmentGameGUI {
    static initialize() {
        if (Game.debugMode) BABYLON.Tools.Log("Initializing InventoryEquipmentGameGUI");
        InventoryEquipmentGameGUI.initialized = false;
        InventoryEquipmentGameGUI.controller = null;
        InventoryEquipmentGameGUI.titleBar = null;
        InventoryEquipmentGameGUI.closeButton = null;
        InventoryEquipmentGameGUI.bodyContainer = null;

        InventoryEquipmentGameGUI.defaultWidthInPixels = Game.renderWidth;
        InventoryEquipmentGameGUI.defaultHeightInPixels = Game.renderHeight;
        InventoryEquipmentGameGUI.posX = 0;
        InventoryEquipmentGameGUI.posY = 0;
        InventoryEquipmentGameGUI.generateController();
    }
    static resize() {

    }
    static generateController() {
        [InventoryEquipmentGameGUI.controller, InventoryEquipmentGameGUI.titleBar, InventoryEquipmentGameGUI.title, InventoryEquipmentGameGUI.closeButton, InventoryEquipmentGameGUI.bodyContainer] = GameGUI.createWindow("equipment", "Equipment", InventoryEquipmentGameGUI.defaultWidthInPixels, InventoryEquipmentGameGUI.defaultHeightInPixels, 2);

        InventoryEquipmentGameGUI.closeButton.onPointerUpObservable.add(function() {
            InventoryEquipmentGameGUI.clearSelected();
            InventoryEquipmentGameGUI.hide();
        });
        
        InventoryEquipmentGameGUI.controller.zIndex = 50;
        InventoryEquipmentGameGUI.initialized = true;
        return InventoryEquipmentGameGUI.controller;
    }
}