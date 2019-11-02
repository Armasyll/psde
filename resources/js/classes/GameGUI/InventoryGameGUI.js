class InventoryGameGUI {
    static initialize() {
        InventoryGameGUI.initialized = false;
        InventoryGameGUI.controller = null;
        InventoryGameGUI.tabsAndItems = null;
        InventoryGameGUI.tabs = null;
        InventoryGameGUI.items = null;
        InventoryGameGUI.selectedSummary = null;
        InventoryGameGUI.selectedName = null;
        InventoryGameGUI.selectedImage = null;
        InventoryGameGUI.selectedDescription = null;
        InventoryGameGUI.selectedDetails = null;
        InventoryGameGUI.selectedActions = null;
        InventoryGameGUI.controller = null;
        InventoryGameGUI.generateController();
    }
    static resize() {
        if (InventoryGameGUI.initialized != true) {
            return 1;
        }
        InventoryGameGUI.controller.height = String(Game.engine.getRenderHeight()).concat("px");
        InventoryGameGUI.controller.width = String(Game.engine.getRenderWidth()).concat("px");
            InventoryGameGUI.tabsAndItems.height = String(InventoryGameGUI.controller.heightInPixels).concat("px");
            InventoryGameGUI.tabsAndItems.width = String((InventoryGameGUI.controller.widthInPixels / 3) * 2).concat("px");
                InventoryGameGUI.tabs.height = String(GameGUI.getFontSize(4)).concat("px");
                InventoryGameGUI.tabs.width = String(InventoryGameGUI.tabsAndItems.widthInPixels).concat("px");
                InventoryGameGUI.items.height = String(InventoryGameGUI.tabsAndItems.heightInPixels - InventoryGameGUI.tabs.heightInPixels).concat("px");
                InventoryGameGUI.items.width = String(InventoryGameGUI.tabsAndItems.widthInPixels).concat("px");
            InventoryGameGUI.selectedSummary.height = String(InventoryGameGUI.controller.heightInPixels).concat("px");
            InventoryGameGUI.selectedSummary.width = String(InventoryGameGUI.controller.widthInPixels / 3).concat("px");
                InventoryGameGUI.selectedName.width = String(InventoryGameGUI.selectedSummary.widthInPixels).concat("px");
                InventoryGameGUI.selectedName.height = String(GameGUI.getFontSize(2)).concat("px");
                InventoryGameGUI.selectedImage.width = String(InventoryGameGUI.selectedSummary.widthInPixels).concat("px");
                InventoryGameGUI.selectedImage.height = String(InventoryGameGUI.controller.heightInPixels - GameGUI.getFontSize(26)).concat("px");
                InventoryGameGUI.selectedDescription.width = String(InventoryGameGUI.selectedSummary.widthInPixels).concat("px");
                InventoryGameGUI.selectedDescription.height = String(GameGUI.getFontSize(8)).concat("px");
                InventoryGameGUI.selectedDetails.width = String(InventoryGameGUI.selectedSummary.widthInPixels).concat("px");
                InventoryGameGUI.selectedDetails.height = String(GameGUI.getFontSize(4)).concat("px");
                InventoryGameGUI.selectedActions.width = String(InventoryGameGUI.selectedSummary.widthInPixels).concat("px");
                InventoryGameGUI.selectedActions.height = String(GameGUI.getFontSize(12)).concat("px");
        return 0;
    }
    static generateController() {
        var controller = new BABYLON.GUI.StackPanel("inventory");
            controller.height = String(Game.engine.getRenderHeight()).concat("px");
            controller.width = String(Game.engine.getRenderWidth()).concat("px");
            controller.isVertical = false;
            controller.background = GameGUI.background;
            var tabsAndItems = new BABYLON.GUI.StackPanel("tabsAndItems");
                tabsAndItems.height = String(controller.heightInPixels).concat("px");
                tabsAndItems.width = String((controller.widthInPixels / 3) * 2).concat("px");
                tabsAndItems.isVertical = true;
                tabsAndItems.thickness = 0;
                controller.addControl(tabsAndItems);
                var tabs = new BABYLON.GUI.StackPanel("tabs");
                    tabs.height = String(GameGUI.getFontSize(4)).concat("px");
                    tabs.width = String(tabsAndItems.widthInPixels).concat("px");
                    tabs.isVertical = false;
                    tabs.thickness = 0;
                    tabsAndItems.addControl(tabs);
                var items = new BABYLON.GUI.StackPanel("items");
                    items.height = String(tabsAndItems.heightInPixels - tabs.heightInPixels).concat("px");
                    items.width = String(tabsAndItems.widthInPixels).concat("px");
                    items.horizontalAlignment = BABYLON.GUI.HORIZONTAL_ALIGNMENT_LEFT;
                    items.isVertical = true;
                    items.thickness = 0;
                    tabsAndItems.addControl(items);
            var selectedSummary = new BABYLON.GUI.StackPanel("summary");
                selectedSummary.height = String(controller.heightInPixels).concat("px");
                selectedSummary.width = String(controller.widthInPixels / 3).concat("px");
                selectedSummary.isVertical = true;
                selectedSummary.thickness = 0;
                controller.addControl(selectedSummary);
                var selectedName = new BABYLON.GUI.TextBlock("selectedName");
                    selectedName.width = String(selectedSummary.widthInPixels).concat("px");
                    selectedName.height = String(GameGUI.getFontSize(2)).concat("px");
                    selectedName.color = GameGUI.color;
                    selectedName.thickness = 0;
                    selectedSummary.addControl(selectedName);
                var selectedImage = new BABYLON.GUI.Image("selectedImage", "resources/images/blank.svg");
                    selectedImage.width = String(selectedSummary.widthInPixels).concat("px");
                    selectedImage.height = String(controller.heightInPixels - GameGUI.getFontSize(26)).concat("px");
                    selectedImage.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
                    selectedImage.thickness = 0;
                    selectedSummary.addControl(selectedImage);
                var selectedDescription = new BABYLON.GUI.TextBlock("selectedDescription");
                    selectedDescription.width = String(selectedSummary.widthInPixels).concat("px");
                    selectedDescription.height = String(GameGUI.getFontSize(8)).concat("px");
                    selectedDescription.paddingLeft = 0.1;
                    selectedDescription.paddingRight = 0.1;
                    selectedDescription.textWrapping = true;
                    selectedDescription.color = GameGUI.color;
                    selectedDescription.thickness = 0;
                    selectedSummary.addControl(selectedDescription);
                var selectedDetails = new BABYLON.GUI.TextBlock("selectedDetails");
                    selectedDetails.width = String(selectedSummary.widthInPixels).concat("px");
                    selectedDetails.height = String(GameGUI.getFontSize(4)).concat("px");
                    selectedDetails.color = GameGUI.color;
                    selectedDetails.thickness = 0;
                    selectedSummary.addControl(selectedDetails);
                var selectedActions = new BABYLON.GUI.StackPanel("actions");
                    selectedActions.width = String(selectedSummary.widthInPixels).concat("px");
                    selectedActions.height = String(GameGUI.getFontSize(12)).concat("px");
                    selectedActions.thickness = 0;
                    selectedSummary.addControl(selectedActions);
        controller.isVisible = false;
        controller.zIndex = 50;
        InventoryGameGUI.controller = controller;
        InventoryGameGUI.tabsAndItems = tabsAndItems;
        InventoryGameGUI.tabs = tabs;
        InventoryGameGUI.items = items;
        InventoryGameGUI.selectedSummary = selectedSummary;
        InventoryGameGUI.selectedName = selectedName;
        InventoryGameGUI.selectedImage = selectedImage;
        InventoryGameGUI.selectedDescription = selectedDescription;
        InventoryGameGUI.selectedDetails = selectedDetails;
        InventoryGameGUI.selectedActions = selectedActions;
        InventoryGameGUI.initialized = true;
        return controller;
    }
    static getController() {
        return InventoryGameGUI.controller;
    }
    /**
     * Returns whether or not the inventory menu is visible.
     * @return {Boolean} Whether or not the inventory menu is visible.
     */
    static isVisible() {
        return InventoryGameGUI.controller.isVisible;
    }
    static show() {
        InventoryGameGUI.controller.isVisible = true;
    }
    static hide() {
        InventoryGameGUI.controller.isVisible = false;
    }
    /**
     * Sets the inventory menu's content using an entity's inventory.
     * @param {AbstractEntity} entityWithStorage The Entity with the inventory.
     */
    static updateWith(entityWithStorage = Game.player) {
        for (let i = InventoryGameGUI.items.children.length - 1; i > -1; i--) {
            InventoryGameGUI.items.removeControl(InventoryGameGUI.items.children[i]);
        }
        entityWithStorage.getItems().forEach(function(instancedItemEntity, id) {
            var button = GameGUI._generateButton(undefined, instancedItemEntity.getName(), undefined, Game.getIcon(instancedItemEntity.getIcon()));
            button.width = String(InventoryGameGUI.items.widthInPixels).concat("px");
            button.height = String(InventoryGameGUI.items.heightInPixels / 10).concat("px");
            button.children[0].height = String(button.heightInPixels).concat("px");
            button.children[0].width = String(button.heightInPixels).concat("px");
            button.children[0].left = String(0).concat("px");
            button.children[1].width = String(button.widthInPixels - button.children[0].widthInPixels).concat("px");
            button.onPointerUpObservable.add(function() {
                InventoryGameGUI.updateSelectedWith(instancedItemEntity.getID(), entityWithStorage);
            });
            InventoryGameGUI.items.addControl(button);
        });
        InventoryGameGUI.clearSelected();
    }
    /**
     * Sets the inventory menu's selected item section.
     * @param {InstancedItemEntity} instancedItemEntity [description]
     * @param {Entity} targetEntity        The Entity storing the InstancedItemEntity
     * @param {Entity} playerEntity        The Entity viewing the item; the player.
     */
    static updateSelectedWith(instancedItemEntity, targetEntity = undefined, playerEntity = Game.player) {
        if (!(instancedItemEntity instanceof AbstractEntity)) {
            if (instancedItemEntity == undefined) {
                InventoryGameGUI.clearSelected;
                return 0;
            }
            instancedItemEntity = Game.getInstancedItemEntity(instancedItemEntity);
        }
        if (!(targetEntity instanceof AbstractEntity)) {
            targetEntity = Game.getEntity(targetEntity);
        }
        if (!(playerEntity instanceof AbstractEntity)) {
            playerEntity = Game.getEntity(playerEntity);
            if (!(playerEntity instanceof AbstractEntity)) {
                playerEntity = Game.player;
            }
        }

        InventoryGameGUI.selectedName.text = instancedItemEntity.getName();
        InventoryGameGUI.selectedImage.source = Game.getIcon(instancedItemEntity.getIcon());
        InventoryGameGUI.selectedDescription.text = instancedItemEntity.getDescription();
        let weightString = undefined;
        if (instancedItemEntity.getWeight() < 1) {
            weightString = String(instancedItemEntity.getWeight() * 1000) + "g";
        }
        else {
            weightString = String(instancedItemEntity.getWeight()) + "kg";
        }
        InventoryGameGUI.selectedDetails.text = `Price: $${instancedItemEntity.getPrice()}, Weight: ${weightString}`;
        for (var _i = InventoryGameGUI.selectedActions.children.length - 1; _i > -1; _i--) {
            InventoryGameGUI.selectedActions.removeControl(InventoryGameGUI.selectedActions.children[_i]);
        }
        for (let action in instancedItemEntity.getAvailableActions()) {
            action = Tools.filterInt(action);
            let actionButton = undefined;
            switch (action) {
                case ActionEnum.DROP : {
                    actionButton = GameGUI._generateButton(undefined, ActionEnum.properties[action].name);
                    actionButton.onPointerUpObservable.add(function() {Game.actionDropFunction(instancedItemEntity, playerEntity, InventoryGameGUI.updateInventoryMenu);});
                    break;
                }
                case ActionEnum.EQUIP : {
                    if (Game.player.hasEquipment(instancedItemEntity)) {
                        actionButton = GameGUI._generateButton(undefined, ActionEnum.properties[ActionEnum.UNEQUIP].name);
                        actionButton.onPointerUpObservable.add(function() {Game.actionUnequipFunction(instancedItemEntity, playerEntity, InventoryGameGUI.updateSelectedWith);});
                    }
                    else {
                        actionButton = GameGUI._generateButton(undefined, ActionEnum.properties[ActionEnum.EQUIP].name);
                        actionButton.onPointerUpObservable.add(function() {Game.actionEquipFunction(instancedItemEntity, playerEntity, InventoryGameGUI.updateSelectedWith);});
                    }
                    break;
                }
                case ActionEnum.HOLD : {
                    if (Game.player.hasHeldItem(instancedItemEntity)) {
                        actionButton = GameGUI._generateButton(undefined, ActionEnum.properties[ActionEnum.RELEASE].name);
                        actionButton.onPointerUpObservable.add(function() {Game.actionReleaseFunction(instancedItemEntity, playerEntity, InventoryGameGUI.updateSelectedWith);});
                    }
                    else if (!Game.player.hasEquipment(instancedItemEntity)) {
                        actionButton = GameGUI._generateButton(undefined, ActionEnum.properties[ActionEnum.HOLD].name);
                        actionButton.onPointerUpObservable.add(function() {Game.actionHoldFunction(instancedItemEntity, playerEntity, InventoryGameGUI.updateSelectedWith);});
                    }
                    break;
                }
                case ActionEnum.LOOK : {
                    actionButton = GameGUI._generateButton(undefined, ActionEnum.properties[action].name);
                    break;
                }
                case ActionEnum.PUT : {
                    if (playerEntity != Game.player) {
                        break;
                    }
                    else if (targetEntity instanceof Entity && targetEntity.hasInventory()) {
                        actionButton = GameGUI._generateButton(undefined, ActionEnum.properties[action].name);
                    }
                    break;
                }
                case ActionEnum.TAKE : {
                    if (playerEntity == Game.player) {}
                    else {
                        actionButton = GameGUI._generateButton(undefined, ActionEnum.properties[action].name);
                    }
                    break;
                }
            }
            if (actionButton != undefined) {
                InventoryGameGUI.selectedActions.addControl(actionButton);
                actionButton.top = ((InventoryGameGUI.selectedActions.children.length * 10) - 55) + "%";
            }
        }
    }
    /**
     * Clears the inventory menu's selected item section.
     */
    static clearSelected() {
        InventoryGameGUI.selectedName.text = "";
        InventoryGameGUI.selectedImage.source = "";
        InventoryGameGUI.selectedDescription.text = "";
        for (let i = InventoryGameGUI.selectedActions.children.length - 1; i >= 0; i--) {
            InventoryGameGUI.selectedActions.removeControl(InventoryGameGUI.selectedActions.children[i]);
        }
    }
}