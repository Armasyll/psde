class InventoryGameGUI {
    static initialize() {
        InventoryGameGUI.initialized = false;
        InventoryGameGUI.controller = null;
        InventoryGameGUI.tabsAndItems = null;
        InventoryGameGUI.tabs = null;
        InventoryGameGUI.items = null;
        InventoryGameGUI.tabsAndItemsSummary = null;
        InventoryGameGUI.tAISWeightIcon = null;
        InventoryGameGUI.tAISWeight = null;
        InventoryGameGUI.tAISMoneyIcon = null;
        InventoryGameGUI.tAISMoney = null;
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
            InventoryGameGUI.tabsAndItems.height = InventoryGameGUI.controller.height;
            InventoryGameGUI.tabsAndItems.width = String((InventoryGameGUI.controller.widthInPixels / 3) * 2).concat("px");
                InventoryGameGUI.tabs.height = GameGUI.getFontSize(4);
                InventoryGameGUI.tabs.width = InventoryGameGUI.tabsAndItems.width;
                InventoryGameGUI.items.height = String(InventoryGameGUI.tabsAndItems.heightInPixels - InventoryGameGUI.tabs.heightInPixels * 2).concat("px");
                InventoryGameGUI.items.width = InventoryGameGUI.tabsAndItems.width;
                InventoryGameGUI.tabsAndItemsSummary.height = GameGUI.getFontSize(4);
                InventoryGameGUI.tabsAndItemsSummary.width = InventoryGameGUI.tabsAndItems.width;
                    InventoryGameGUI.tAISWeightContainer.height = InventoryGameGUI.tabsAndItemsSummary.height;
                    InventoryGameGUI.tAISWeightContainer.width = String(InventoryGameGUI.tabsAndItemsSummary.widthInPixels / 2).concat("px");
                        InventoryGameGUI.tAISWeightIcon.height = InventoryGameGUI.tAISWeightContainer.height;
                        InventoryGameGUI.tAISWeightIcon.width = InventoryGameGUI.tAISWeightContainer.height;
                        InventoryGameGUI.tAISWeight.height = InventoryGameGUI.tAISWeightContainer.height;
                        InventoryGameGUI.tAISWeight.fontSize = InventoryGameGUI.tAISWeightContainer.height;
                    InventoryGameGUI.tAISMoneyContainer.height = InventoryGameGUI.tabsAndItemsSummary.height;
                    InventoryGameGUI.tAISMoneyContainer.width = String(InventoryGameGUI.tabsAndItemsSummary.widthInPixels / 2).concat("px");
                        InventoryGameGUI.tAISMoneyIcon.height = InventoryGameGUI.tAISMoneyContainer.height;
                        InventoryGameGUI.tAISMoneyIcon.width = InventoryGameGUI.tAISMoneyContainer.height;
                        InventoryGameGUI.tAISMoney.height = InventoryGameGUI.tAISMoneyContainer.height;
                        InventoryGameGUI.tAISMoney.fontSize = InventoryGameGUI.tAISMoneyContainer.height;
            InventoryGameGUI.selectedSummary.height = InventoryGameGUI.controller.height;
            InventoryGameGUI.selectedSummary.width = String(InventoryGameGUI.controller.widthInPixels / 3).concat("px");
                InventoryGameGUI.selectedName.width = InventoryGameGUI.selectedSummary.width;
                InventoryGameGUI.selectedName.height = GameGUI.getFontSize(2);
                InventoryGameGUI.selectedImage.width = InventoryGameGUI.selectedSummary.width;
                InventoryGameGUI.selectedImage.height = String(InventoryGameGUI.controller.heightInPixels - GameGUI.getFontSizeInPixels(26)).concat("px");
                InventoryGameGUI.selectedDescription.width = InventoryGameGUI.selectedSummary.width;
                InventoryGameGUI.selectedDescription.height = GameGUI.getFontSize(8);
                InventoryGameGUI.selectedDetails.width = InventoryGameGUI.selectedSummary.width;
                InventoryGameGUI.selectedDetails.height = GameGUI.getFontSize(4);
                InventoryGameGUI.selectedActions.width = InventoryGameGUI.selectedSummary.width;
                InventoryGameGUI.selectedActions.height = GameGUI.getFontSize(12);
        return 0;
    }
    static generateController() {
        var controller = new BABYLON.GUI.StackPanel("inventory");
            controller.height = String(Game.engine.getRenderHeight()).concat("px");
            controller.width = String(Game.engine.getRenderWidth()).concat("px");
            controller.isVertical = false;
            controller.background = GameGUI.background;
            var tabsAndItems = new BABYLON.GUI.StackPanel("tabsAndItems");
                tabsAndItems.height = controller.height;
                tabsAndItems.width = String((controller.widthInPixels / 3) * 2).concat("px");
                tabsAndItems.isVertical = true;
                tabsAndItems.thickness = 0;
                controller.addControl(tabsAndItems);
                var tabs = new BABYLON.GUI.StackPanel("tabs");
                    tabs.height = GameGUI.getFontSize(4);
                    tabs.width = tabsAndItems.width;
                    tabs.isVertical = false;
                    tabs.thickness = 0;
                    tabsAndItems.addControl(tabs);
                var items = new BABYLON.GUI.StackPanel("items");
                    items.height = String(tabsAndItems.heightInPixels - tabs.heightInPixels * 2).concat("px"); // multiplied by two for both tabs, and summary
                    items.width = tabsAndItems.width;
                    items.horizontalAlignment = BABYLON.GUI.HORIZONTAL_ALIGNMENT_LEFT;
                    items.isVertical = true;
                    items.thickness = 0;
                    tabsAndItems.addControl(items);
                var tabsAndItemsSummary = new BABYLON.GUI.StackPanel("tabsAndItemsSummary");
                    tabsAndItemsSummary.height = GameGUI.getFontSize(4);
                    tabsAndItemsSummary.width = tabsAndItems.width;
                    tabsAndItemsSummary.isVertical = false;
                    tabsAndItemsSummary.thickness = 0;
                    tabsAndItems.addControl(tabsAndItemsSummary);
                    var tAISWeightContainer = new BABYLON.GUI.StackPanel("tAISWeightContainer");
                        tAISWeightContainer.height = tabsAndItemsSummary.height;
                        tAISWeightContainer.width = String(tabsAndItemsSummary.widthInPixels / 2).concat("px");
                        tAISWeightContainer.isVertical = false;
                        tAISWeightContainer.thickness = 0;
                        var tAISWeightIcon = new BABYLON.GUI.Image("tAISWeightIcon", Game.getIcon("genericBagIcon"));
                            tAISWeightIcon.height = tAISWeightContainer.height;
                            tAISWeightIcon.width = tAISWeightContainer.height;
                            tAISWeightIcon.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
                        var tAISWeight = new BABYLON.GUI.TextBlock("tAISWeight", "0");
                            tAISWeight.height = tAISWeightContainer.height;
                            tAISWeight.width = String(tAISWeightContainer.widthInPixels - tAISWeightIcon.widthInPixels).concat("px");
                            tAISWeight.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                            tAISWeight.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                            tAISWeight.fontSize = tAISWeightContainer.height;
                            tAISWeight.color = GameGUI.color;
                        tAISWeightContainer.addControl(tAISWeightIcon);
                        tAISWeightContainer.addControl(tAISWeight);
                    tabsAndItemsSummary.addControl(tAISWeightContainer);
                    var tAISMoneyContainer = new BABYLON.GUI.StackPanel("tAISMoneyContainer");
                        tAISMoneyContainer.height = tabsAndItemsSummary.height;
                        tAISMoneyContainer.width = String(tabsAndItemsSummary.widthInPixels / 2).concat("px");
                        tAISMoneyContainer.isVertical = false;
                        tAISMoneyContainer.thickness = 0;
                        var tAISMoneyIcon = new BABYLON.GUI.Image("tAISMoneyIcon", Game.getIcon("genericMoneyIcon"));
                            tAISMoneyIcon.height = tAISMoneyContainer.height;
                            tAISMoneyIcon.width = tAISMoneyContainer.height;
                            tAISMoneyIcon.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
                        var tAISMoney = new BABYLON.GUI.TextBlock("tAISMoney", "0");
                            tAISMoney.fontSize = GameGUI.getFontSize();
                            tAISMoney.height = tAISMoneyContainer.height;
                            tAISMoney.width = String(tAISMoneyContainer.widthInPixels - tAISMoneyIcon.widthInPixels).concat("px");
                            tAISMoney.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                            tAISMoney.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                            tAISMoney.fontSize = tAISMoneyContainer.height;
                            tAISMoney.color = GameGUI.color;
                        tAISMoneyContainer.addControl(tAISMoneyIcon);
                        tAISMoneyContainer.addControl(tAISMoney);
                    tabsAndItemsSummary.addControl(tAISMoneyContainer);
            var selectedSummary = new BABYLON.GUI.StackPanel("summary");
                selectedSummary.height = controller.height;
                selectedSummary.width = String(controller.widthInPixels / 3).concat("px");
                selectedSummary.isVertical = true;
                selectedSummary.thickness = 0;
                controller.addControl(selectedSummary);
                var selectedName = new BABYLON.GUI.TextBlock("selectedName");
                    selectedName.width = selectedSummary.width;
                    selectedName.height = GameGUI.getFontSize(2);
                    selectedName.color = GameGUI.color;
                    selectedName.thickness = 0;
                    selectedSummary.addControl(selectedName);
                var selectedImage = new BABYLON.GUI.Image("selectedImage", "resources/images/blank.svg");
                    selectedImage.width = selectedSummary.width;
                    selectedImage.height = String(controller.heightInPixels - GameGUI.getFontSizeInPixels(26)).concat("px");
                    selectedImage.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
                    selectedImage.thickness = 0;
                    selectedSummary.addControl(selectedImage);
                var selectedDescription = new BABYLON.GUI.TextBlock("selectedDescription");
                    selectedDescription.width = selectedSummary.width;
                    selectedDescription.height = GameGUI.getFontSize(8);
                    selectedDescription.paddingLeft = 0.1;
                    selectedDescription.paddingRight = 0.1;
                    selectedDescription.textWrapping = true;
                    selectedDescription.color = GameGUI.color;
                    selectedDescription.thickness = 0;
                    selectedSummary.addControl(selectedDescription);
                var selectedDetails = new BABYLON.GUI.TextBlock("selectedDetails");
                    selectedDetails.width = selectedSummary.width;
                    selectedDetails.height = GameGUI.getFontSize(4);
                    selectedDetails.color = GameGUI.color;
                    selectedDetails.thickness = 0;
                    selectedSummary.addControl(selectedDetails);
                var selectedActions = new BABYLON.GUI.StackPanel("actions");
                    selectedActions.width = selectedSummary.width;
                    selectedActions.height = GameGUI.getFontSize(12);
                    selectedActions.thickness = 0;
                    selectedSummary.addControl(selectedActions);
        controller.isVisible = false;
        controller.zIndex = 50;
        InventoryGameGUI.controller = controller;
        InventoryGameGUI.tabsAndItems = tabsAndItems;
        InventoryGameGUI.tabs = tabs;
        InventoryGameGUI.items = items;
        InventoryGameGUI.tabsAndItemsSummary = tabsAndItemsSummary;
        InventoryGameGUI.tAISWeightContainer = tAISWeightContainer;
        InventoryGameGUI.tAISMoneyContainer = tAISMoneyContainer;
        InventoryGameGUI.tAISWeightIcon = tAISWeightIcon;
        InventoryGameGUI.tAISWeight = tAISWeight;
        InventoryGameGUI.tAISMoneyIcon = tAISMoneyIcon;
        InventoryGameGUI.tAISMoney = tAISMoney;
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
            let button = InventoryGameGUI._generateInventoryItemsButton(id, instancedItemEntity.getName(), Game.getIcon(instancedItemEntity.getIcon()));
            button.onPointerUpObservable.add(function() {
                InventoryGameGUI.updateSelectedWith(instancedItemEntity.getID(), entityWithStorage);
            });
            InventoryGameGUI.items.addControl(button);
        });
        InventoryGameGUI.clearSelected();
        if (entityWithStorage.hasInventory()) {
            InventoryGameGUI.tAISWeight.text = String(entityWithStorage.getInventory().getSize());
            InventoryGameGUI.tAISWeightContainer.isVisible = true;
        }
        else {
            InventoryGameGUI.tAISWeightContainer.isVisible = false;
        }
        if (entityWithStorage instanceof CreatureEntity) {
            InventoryGameGUI.tAISMoney.text = String(entityWithStorage.getMoney());
            InventoryGameGUI.tAISMoneyContainer.isVisible = true;
        }
        else {
            InventoryGameGUI.tAISMoneyContainer.isVisible = false;
        }
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
            instancedItemEntity = InstancedItemEntity.get(instancedItemEntity);
        }
        if (!(targetEntity instanceof AbstractEntity)) {
            targetEntity = Entity.get(targetEntity);
        }
        if (!(playerEntity instanceof AbstractEntity)) {
            playerEntity = Entity.get(playerEntity);
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
    static _generateInventoryItemsButton(id = undefined, title = undefined, icon = undefined) {
        let button = new BABYLON.GUI.Button(id);
            button.width = InventoryGameGUI.items.width;
            button.height = String(InventoryGameGUI.items.heightInPixels / 10).concat("px");
            button.thickness = 0;
            let container = new BABYLON.GUI.StackPanel(id + "StackPanel");
                container.width = button.width;
                container.height = button.height;
                container.isVertical = false;
                container.thickness = 0;
                button.addControl(container);
                let image = new BABYLON.GUI.Image(id + "Image", icon);
                    image.width = button.height;
                    image.height = button.height;
                    image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
                    image.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    container.addControl(image);
                let text = new BABYLON.GUI.TextBlock(id + "TextBlock", title);
                    text.width = String(button.widthInPixels - button.heightInPixels).concat("px");
                    text.text = title;
                    text.thickness = 0;
                    text.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                    text.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    text.color = GameGUI.color;
                    container.addControl(text);
        return button;
    }
}