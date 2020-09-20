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
        InventoryGameGUI.isVisible = false;
        InventoryGameGUI.generateController();
        InventoryGameGUI.containerAlpha = 1.0;
        InventoryGameGUI.selectedEntity = null;
    }
    static resize() {
        if (InventoryGameGUI.initialized != true) {
            return 1;
        }
        InventoryGameGUI.controller.height = String(Game.renderHeight).concat("px");
        InventoryGameGUI.controller.width = String(Game.renderWidth).concat("px");
            InventoryGameGUI.tabsAndItems.height = InventoryGameGUI.controller.height;
            InventoryGameGUI.tabsAndItems.width = String((InventoryGameGUI.controller.widthInPixels / 3) * 2).concat("px");
                InventoryGameGUI.tabs.height = GameGUI.getFontSize(4);
                InventoryGameGUI.tabs.width = InventoryGameGUI.tabsAndItems.width;
                InventoryGameGUI.itemsContainer.height = String(InventoryGameGUI.tabsAndItems.heightInPixels - InventoryGameGUI.tabs.heightInPixels * 2).concat("px");
                InventoryGameGUI.itemsContainer.width = InventoryGameGUI.tabsAndItems.width;
                    InventoryGameGUI.items.height = "900px"
                    InventoryGameGUI.items.width = InventoryGameGUI.itemsContainer.width;
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
        var controller = GameGUI.createStackPanel("inventory");
            controller.height = String(Game.renderHeight).concat("px");
            controller.width = String(Game.renderWidth).concat("px");
            controller.isVertical = false;
            var tabsAndItems = GameGUI.createStackPanel("tabsAndItems");
                tabsAndItems.height = controller.height;
                tabsAndItems.width = String((controller.widthInPixels / 3) * 2).concat("px");
                tabsAndItems.isVertical = true;
                controller.addControl(tabsAndItems);
                var tabs = GameGUI.createStackPanel("tabs");
                    tabs.height = GameGUI.getFontSize(4);
                    tabs.width = tabsAndItems.width;
                    tabs.isVertical = false;
                    tabsAndItems.addControl(tabs);
                var itemsContainer = new BABYLON.GUI.ScrollViewer("itemsContainer");
                    itemsContainer.height = String(tabsAndItems.heightInPixels - tabs.heightInPixels * 2).concat("px");
                    itemsContainer.width = tabsAndItems.width;
                    itemsContainer._horizontalBarSpace.isVisible = false;
                    itemsContainer._horizontalBarSpace.isEnabled = false;
                    var items = GameGUI.createStackPanel("items");
                        items.height = String(tabsAndItems.heightInPixels - tabs.heightInPixels * 2).concat("px"); // multiplied by two for both tabs, and summary
                        items.width = tabsAndItems.width;
                        items.horizontalAlignment = BABYLON.GUI.HORIZONTAL_ALIGNMENT_LEFT;
                        items.isVertical = true;
                        itemsContainer.addControl(items);
                    tabsAndItems.addControl(itemsContainer);
                var tabsAndItemsSummary = GameGUI.createStackPanel("tabsAndItemsSummary");
                    tabsAndItemsSummary.height = GameGUI.getFontSize(4);
                    tabsAndItemsSummary.width = tabsAndItems.width;
                    tabsAndItemsSummary.isVertical = false;
                    tabsAndItems.addControl(tabsAndItemsSummary);
                    var tAISWeightContainer = GameGUI.createStackPanel("tAISWeightContainer");
                        tAISWeightContainer.height = tabsAndItemsSummary.height;
                        tAISWeightContainer.width = String(tabsAndItemsSummary.widthInPixels / 2).concat("px");
                        tAISWeightContainer.isVertical = false;
                        var tAISWeightIcon = new BABYLON.GUI.Image("tAISWeightIcon", Game.getIcon("genericBagIcon"));
                            tAISWeightIcon.height = tAISWeightContainer.height;
                            tAISWeightIcon.width = tAISWeightContainer.height;
                            tAISWeightIcon.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
                        var tAISWeight = GameGUI.createTextBlock("tAISWeight", "0");
                            tAISWeight.height = tAISWeightContainer.height;
                            tAISWeight.width = String(tAISWeightContainer.widthInPixels - tAISWeightIcon.widthInPixels).concat("px");
                            tAISWeight.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                            tAISWeight.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                            tAISWeight.fontSize = tAISWeightContainer.height;
                        tAISWeightContainer.addControl(tAISWeightIcon);
                        tAISWeightContainer.addControl(tAISWeight);
                    tabsAndItemsSummary.addControl(tAISWeightContainer);
                    var tAISMoneyContainer = GameGUI.createStackPanel("tAISMoneyContainer");
                        tAISMoneyContainer.height = tabsAndItemsSummary.height;
                        tAISMoneyContainer.width = String(tabsAndItemsSummary.widthInPixels / 2).concat("px");
                        tAISMoneyContainer.isVertical = false;
                        var tAISMoneyIcon = new BABYLON.GUI.Image("tAISMoneyIcon", Game.getIcon("genericMoneyIcon"));
                            tAISMoneyIcon.height = tAISMoneyContainer.height;
                            tAISMoneyIcon.width = tAISMoneyContainer.height;
                            tAISMoneyIcon.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
                        var tAISMoney = GameGUI.createTextBlock("tAISMoney", "0");
                            tAISMoney.height = tAISMoneyContainer.height;
                            tAISMoney.width = String(tAISMoneyContainer.widthInPixels - tAISMoneyIcon.widthInPixels).concat("px");
                            tAISMoney.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                            tAISMoney.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                            tAISMoney.fontSize = tAISMoneyContainer.height;
                        tAISMoneyContainer.addControl(tAISMoneyIcon);
                        tAISMoneyContainer.addControl(tAISMoney);
                    tabsAndItemsSummary.addControl(tAISMoneyContainer);
            var selectedSummary = GameGUI.createStackPanel("summary");
                selectedSummary.height = controller.height;
                selectedSummary.width = String(controller.widthInPixels / 3).concat("px");
                selectedSummary.isVertical = true;
                controller.addControl(selectedSummary);
                var selectedName = GameGUI.createTextBlock("selectedName");
                    selectedName.width = selectedSummary.width;
                    selectedName.height = GameGUI.getFontSize(2);
                    selectedSummary.addControl(selectedName);
                var selectedImage = new BABYLON.GUI.Image("selectedImage", "resources/images/blank.svg");
                    selectedImage.width = selectedSummary.width;
                    selectedImage.height = String(controller.heightInPixels - GameGUI.getFontSizeInPixels(26)).concat("px");
                    selectedImage.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
                    selectedSummary.addControl(selectedImage);
                var selectedDescription = GameGUI.createTextBlock("selectedDescription");
                    selectedDescription.width = selectedSummary.width;
                    selectedDescription.height = GameGUI.getFontSize(8);
                    selectedDescription.paddingLeft = 0.1;
                    selectedDescription.paddingRight = 0.1;
                    selectedDescription.textWrapping = true;
                    selectedSummary.addControl(selectedDescription);
                var selectedDetails = GameGUI.createTextBlock("selectedDetails");
                    selectedDetails.width = selectedSummary.width;
                    selectedDetails.height = GameGUI.getFontSize(4);
                    selectedSummary.addControl(selectedDetails);
                var selectedActions = GameGUI.createStackPanel("actions");
                    selectedActions.width = selectedSummary.width;
                    selectedActions.height = GameGUI.getFontSize(12);
                    selectedSummary.addControl(selectedActions);
        controller.isVisible = false;
        controller.zIndex = 50;
        InventoryGameGUI.controller = controller;
        InventoryGameGUI.tabsAndItems = tabsAndItems;
        InventoryGameGUI.tabs = tabs;
        InventoryGameGUI.itemsContainer = itemsContainer;
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
    static show() {
        InventoryGameGUI.controller.isVisible = true;
        InventoryGameGUI.isVisible = true;
    }
    static hide() {
        InventoryGameGUI.controller.isVisible = false;
        InventoryGameGUI.isVisible = false;
    }
    /**
     * Sets the inventory menu's content using an entity's inventory.
     * @param {AbstractEntity} entityController The Entity with the inventory.
     */
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
        Game.createCallback(callbackID, parentCallbackID, [entityController], InventoryGameGUI.setResponse);
        Game.entityLogicWorkerPostMessage("getInventory", 0, [entityController.entityID], callbackID);
        return 0;
    }
    static setResponse(entityController, response, parentCallbackID) {
        InventoryGameGUI.resize();
        for (let i = InventoryGameGUI.items.children.length - 1; i > -1; i--) {
            let entry = InventoryGameGUI.items.children[i];
            InventoryGameGUI.items.removeControl(entry);
            entry.dispose();
        }
        InventoryGameGUI.items.clearControls();
        if (Object.keys(response.container.items).length > 0) {
            let itemsHeightInPixels = 0;
            for (let id in response.container.items) {
                let itemEntity = response.container.items[id];
                let button = InventoryGameGUI._generateInventoryItemsButton(itemEntity.id, itemEntity.name, Game.getIcon(itemEntity.iconID));
                button.onPointerUpObservable.add(function() {
                    InventoryGameGUI.setSelected(itemEntity.id, entityController);
                });
                InventoryGameGUI.items.addControl(button);
                itemsHeightInPixels += button.heightInPixels;
            };
            InventoryGameGUI.items.height = String(itemsHeightInPixels).concat("px");
            InventoryGameGUI.tAISWeight.text = String(response.container.size);
            InventoryGameGUI.tAISWeightContainer.isVisible = true;
            InventoryGameGUI.clearSelected();
        }
        else {
            InventoryGameGUI.tAISWeightContainer.isVisible = false;
        }
        if (response.hasOwnProperty("money")) {
            InventoryGameGUI.tAISMoney.text = String(response.money);
            InventoryGameGUI.tAISMoneyContainer.isVisible = true;
        }
        else {
            InventoryGameGUI.tAISMoneyContainer.isVisible = false;
        }
        return 0;
    }
    /**
     * Sets the inventory menu's selected item section.
     * @param {object} itemID 
     * @param {EntityController} targetController The EntityController storing the entityObject
     * @param {EntityController} actorController The EntityController viewing the entityObject; the player controller.
     */
    static setSelected(itemID, targetController = Game.player, actorController = Game.player, parentCallbackID = null) {
        if (typeof itemID == "string") {}
        else if (itemID.hasOwnProperty("id")) {
            itemID = itemID.id;
        }
        else {
            return 2;
        }
        targetController = Game.filterController(targetController);
        actorController = Game.filterController(actorController);
        if (actorController == -1) {
            return 1;
        }
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [itemID, targetController, actorController], InventoryGameGUI.setSelectedResponse);
        Game.entityLogicWorkerPostMessage("getEntity", 0, [itemID], callbackID);
        return 0;
    }
    static setSelectedResponse(itemID, targetController, actorController, response, parentCallbackID) {
        InventoryGameGUI.selectedEntity = response.id;
        InventoryGameGUI.selectedName.text = response.name;
        InventoryGameGUI.selectedImage.source = Game.getIcon(response.iconID);
        InventoryGameGUI.selectedDescription.text = response.description;
        let weightString = "";
        if (response.weight < 1) {
            weightString = String(response.weight * 1000) + "g";
        }
        else {
            weightString = String(response.weight) + "kg";
        }
        InventoryGameGUI.selectedDetails.text = `Price: $${response.price}, Weight: ${weightString}`;
        for (let i = InventoryGameGUI.selectedActions.children.length - 1; i > -1; i--) {
            let child = InventoryGameGUI.selectedActions.children[i];
            InventoryGameGUI.selectedActions.removeControl(child);
            child.dispose();
        }
        for (let action in response.availableActions) {
            action = Tools.filterInt(action);
            let actionButton = null;
            switch (action) {
                case ActionEnum.CONSUME : {
                    actionButton = GameGUI._generateButton("actionConsumeButton", ActionEnum.properties[action].name);
                    actionButton.onPointerUpObservable.add(function() {Game.actionConsumeFunction(response.id, actorController, InventoryGameGUI.updateWith);});
                    break;
                }
                case ActionEnum.DROP : {
                    actionButton = GameGUI._generateButton("actionDropButton", ActionEnum.properties[action].name);
                    actionButton.onPointerUpObservable.add(function() {Game.actionDropFunction(response.id, actorController, InventoryGameGUI.updateWith);});
                    break;
                }
                case ActionEnum.EQUIP : {
                    if (response.equipped) {
                        actionButton = GameGUI._generateButton("actionUnequipButton", ActionEnum.properties[ActionEnum.UNEQUIP].name);
                        actionButton.onPointerUpObservable.add(function() {Game.actionUnequipFunction(response.id, actorController, InventoryGameGUI.setSelected);});
                    }
                    else {
                        actionButton = GameGUI._generateButton("actionEquipButton", ActionEnum.properties[ActionEnum.EQUIP].name);
                        actionButton.onPointerUpObservable.add(function() {Game.actionEquipFunction(response.id, actorController, InventoryGameGUI.setSelected);});
                    }
                    break;
                }
                case ActionEnum.HOLD : {
                    if (response.held) {
                        actionButton = GameGUI._generateButton("actionReleaseButton", ActionEnum.properties[ActionEnum.RELEASE].name);
                        actionButton.onPointerUpObservable.add(function() {Game.actionReleaseFunction(itemID, actorController, InventoryGameGUI.setSelected);});
                    }
                    else {
                        actionButton = GameGUI._generateButton("actionHoldButton", ActionEnum.properties[ActionEnum.HOLD].name);
                        actionButton.onPointerUpObservable.add(function() {Game.actionHoldFunction(itemID, actorController, InventoryGameGUI.setSelected);});
                    }
                    break;
                }
                case ActionEnum.LOOK : {
                    actionButton = GameGUI._generateButton("actionLookButton", ActionEnum.properties[action].name);
                    break;
                }
                case ActionEnum.READ : {
                    actionButton = GameGUI._generateButton("actionReadButton", ActionEnum.properties[action].name);
                    actionButton.onPointerUpObservable.add(function() {Game.actionReadFunction(itemID, actorController);});
                    break;
                }
                case ActionEnum.PUT : {
                    if (actorController != Game.playerController) {
                        break;
                    }
                    else if (targetController.hasInventory) {
                        actionButton = GameGUI._generateButton("actionPutButton", ActionEnum.properties[action].name);
                    }
                    break;
                }
                case ActionEnum.TAKE : {
                    if (actorController == Game.playerController) {}
                    else {
                        actionButton = GameGUI._generateButton("actionTakeButton", ActionEnum.properties[action].name);
                    }
                    break;
                }
            }
            if (actionButton != null) {
                InventoryGameGUI.selectedActions.addControl(actionButton);
                actionButton.top = ((InventoryGameGUI.selectedActions.children.length * 10) - 55) + "%";
            }
        }
    }
    /**
     * Clears the inventory menu's selected item section.
     */
    static clearSelected() {
        InventoryGameGUI.selectedEntity = null;
        InventoryGameGUI.selectedName.text = "";
        InventoryGameGUI.selectedImage.source = "";
        InventoryGameGUI.selectedDescription.text = "";
        for (let i = InventoryGameGUI.selectedActions.children.length - 1; i >= 0; i--) {
            InventoryGameGUI.selectedActions.removeControl(InventoryGameGUI.selectedActions.children[i]);
        }
    }
    static _generateInventoryItemsButton(id = "", title = "", iconPath = null) {
        id = Game.filterID(id);
        let button = new BABYLON.GUI.Button(id);
            button.width = InventoryGameGUI.items.width;
            button.height = String(InventoryGameGUI.items.heightInPixels / 10).concat("px");
            button.thickness = 0;
            let container = GameGUI.createStackPanel(id + "StackPanel");
                container.width = button.width;
                container.height = button.height;
                container.isVertical = false;
                button.addControl(container);
                let image = new BABYLON.GUI.Image(id + "Image", iconPath);
                    image.width = button.height;
                    image.height = button.height;
                    image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
                    image.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    container.addControl(image);
                let text = GameGUI.createTextBlock(id + "TextBlock", title);
                    text.width = String(button.widthInPixels - button.heightInPixels).concat("px");
                    text.text = title;
                    text.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                    text.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    container.addControl(text);
        return button;
    }
}