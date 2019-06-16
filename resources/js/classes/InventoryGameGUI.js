class InventoryGameGUI {
    static initialize() {
        InventoryGameGUI.controller = InventoryGameGUI.generateController();
        InventoryGameGUI.initialized = true;
    }
    static generateController() {
        var inventory = new BABYLON.GUI.Rectangle("inventory");
            inventory.height = 1.0;
            inventory.width = 0.6;
            inventory.background = GameGUI.background;
        var items = new BABYLON.GUI.StackPanel("items");
            items.height = 1.0;
            items.width = 0.475;
            items.left = 0;
            items.horizontalAlignment = BABYLON.GUI.HORIZONTAL_ALIGNMENT_LEFT;
            inventory.addControl(items);
        var scrollbar = new BABYLON.GUI.Rectangle("slider");
            scrollbar.isVertical = true;
            scrollbar.height = 1.0;
            scrollbar.width = 0.025;
            scrollbar.left = "47.5%";
            scrollbar.horizontalAlignment = BABYLON.GUI.HORIZONTAL_ALIGNMENT_LEFT;
            inventory.addControl(scrollbar);
        var summary = new BABYLON.GUI.Rectangle("summary");
            summary.height = 0.6;
            summary.width = 0.5;
            summary.top = "-20%";
            summary.left = "25%";
            summary.isVertical = true;
            inventory.addControl(summary);
            var selectedName = new BABYLON.GUI.TextBlock("selectedName");
                selectedName.width = 1.0;
                selectedName.height = 0.1;
                selectedName.top = "-45%";
                selectedName.left = 0;
                selectedName.color = GameGUI.color;
                summary.addControl(selectedName);
            var selectedImage = new BABYLON.GUI.Image("selectedImage", "resources/images/blank.svg");
                selectedImage.width = 1.0;
                selectedImage.height = 0.4;
                selectedImage.top = "-20%";
                selectedImage.left = 0;
                selectedImage.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
                summary.addControl(selectedImage);
            var selectedDescription = new BABYLON.GUI.TextBlock("selectedDescription");
                selectedDescription.width = 1.0;
                selectedDescription.height = 0.3;
                selectedDescription.top = "5%";
                selectedDescription.left = 0;
                selectedDescription.paddingLeft = 0.1;
                selectedDescription.paddingRight = 0.1;
                selectedDescription.textWrapping = true;
                selectedDescription.color = GameGUI.color;
                summary.addControl(selectedDescription);
            var selectedDetails = new BABYLON.GUI.TextBlock("selectedDetails");
                selectedDetails.width = 1.0;
                selectedDetails.height = 0.2;
                selectedDetails.top = "45%";
                selectedDetails.left = 0;
                selectedDetails.color = GameGUI.color;
                summary.addControl(selectedDetails);
        var actions = new BABYLON.GUI.Rectangle("actions");
            actions.height = 0.4;
            actions.width = 0.5;
            actions.top = "30%";
            actions.left = "25%";
            inventory.addControl(actions);
        inventory.isVisible = false;
        inventory.zIndex = 50;
        InventoryGameGUI.items = items;
        InventoryGameGUI.summary = summary;
        InventoryGameGUI.selectedName = selectedName;
        InventoryGameGUI.selectedImage = selectedImage;
        InventoryGameGUI.selectedDescription = selectedDescription;
        InventoryGameGUI.selectedDetails = selectedDetails;
        InventoryGameGUI.selectedActions = actions;
        return inventory;
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
     * @param {EntityWithStorage} entityWithStorage The Entity with the inventory.
     */
    static updateWith(entityWithStorage = Game.player) {
        for (let i = InventoryGameGUI.items.children.length - 1; i > -1; i--) {
            InventoryGameGUI.items.removeControl(InventoryGameGUI.items.children[i]);
        }
        entityWithStorage.getItems().forEach(function(instancedItemEntity, id) {
            var button = GameGUI._generateButton(undefined, instancedItemEntity.getName(), undefined, Game.getIcon(instancedItemEntity.getIcon()));
            button.width = 1.0;
            button.height = 0.1;
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
                    if (Game.player.hasEquipment(instancedItemEntity) && !Game.player.hasHeldItem(instancedItemEntity)) {
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
                    else if (targetEntity instanceof EntityWithStorage) {
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