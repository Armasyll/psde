class InventoryGameGUI {
    static initialize() {
        InventoryGameGUI.initialized = false;
        InventoryGameGUI.controller = null;
        InventoryGameGUI.tabsAndItems = null;
        InventoryGameGUI.tabs = null;
        InventoryGameGUI.tabsAll = null;
        InventoryGameGUI.tabsClothing = null;
        InventoryGameGUI.tabsWeapons = null;
        InventoryGameGUI.tabsShields = null;
        InventoryGameGUI.tabsConsumables = null;
        InventoryGameGUI.tabsBooks = null;
        InventoryGameGUI.tabsKeys = null;
        InventoryGameGUI.tabsMisc = null;
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
        InventoryGameGUI.selectedTarget = null;
        InventoryGameGUI.selectedActor = null;
        InventoryGameGUI.selectedTab = null;
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
                    InventoryGameGUI._resizeTabButton(InventoryGameGUI.tabsAll);
                    InventoryGameGUI._resizeTabButton(InventoryGameGUI.tabsClothing);
                    InventoryGameGUI._resizeTabButton(InventoryGameGUI.tabsWeapons);
                    InventoryGameGUI._resizeTabButton(InventoryGameGUI.tabsShields);
                    InventoryGameGUI._resizeTabButton(InventoryGameGUI.tabsConsumables);
                    InventoryGameGUI._resizeTabButton(InventoryGameGUI.tabsBooks);
                    InventoryGameGUI._resizeTabButton(InventoryGameGUI.tabsKeys);
                    InventoryGameGUI._resizeTabButton(InventoryGameGUI.tabsMisc);
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
        InventoryGameGUI.controller = GameGUI.createStackPanel("inventory");
            InventoryGameGUI.controller.height = String(Game.renderHeight).concat("px");
            InventoryGameGUI.controller.width = String(Game.renderWidth).concat("px");
            InventoryGameGUI.controller.isVertical = false;
            InventoryGameGUI.tabsAndItems = GameGUI.createStackPanel("tabsAndItems");
                InventoryGameGUI.tabsAndItems.height = InventoryGameGUI.controller.height;
                InventoryGameGUI.tabsAndItems.width = String((InventoryGameGUI.controller.widthInPixels / 3) * 2).concat("px");
                InventoryGameGUI.tabsAndItems.isVertical = true;
                InventoryGameGUI.controller.addControl(InventoryGameGUI.tabsAndItems);
                InventoryGameGUI.tabs = GameGUI.createStackPanel("tabs");
                    InventoryGameGUI.tabs.height = GameGUI.getFontSize(4);
                    InventoryGameGUI.tabs.width = InventoryGameGUI.tabsAndItems.width;
                    InventoryGameGUI.tabs.isVertical = false;
                        InventoryGameGUI.tabsAll = InventoryGameGUI._generateTabButton("tabsAll", "All", Game.getIcon("genericBagIcon"));
                        InventoryGameGUI.tabs.addControl(InventoryGameGUI.tabsAll);
                        InventoryGameGUI.tabsClothing = InventoryGameGUI._generateTabButton("tabsClothing", "Clothing", Game.getIcon("genericShirtIcon"));
                        InventoryGameGUI.tabs.addControl(InventoryGameGUI.tabsClothing);
                        InventoryGameGUI.tabsWeapons = InventoryGameGUI._generateTabButton("tabsWeapons", "Weapons", Game.getIcon("genericSwordIcon"));
                        InventoryGameGUI.tabs.addControl(InventoryGameGUI.tabsWeapons);
                        InventoryGameGUI.tabsShields = InventoryGameGUI._generateTabButton("tabsShields", "Shields", Game.getIcon("genericShieldIcon"));
                        InventoryGameGUI.tabs.addControl(InventoryGameGUI.tabsShields);
                        InventoryGameGUI.tabsConsumables = InventoryGameGUI._generateTabButton("tabsConsumables", "Consumables", Game.getIcon("genericBagIcon"));
                        InventoryGameGUI.tabs.addControl(InventoryGameGUI.tabsConsumables);
                        InventoryGameGUI.tabsBooks = InventoryGameGUI._generateTabButton("tabsBooks", "Books", Game.getIcon("genericBagIcon"));
                        InventoryGameGUI.tabs.addControl(InventoryGameGUI.tabsBooks);
                        InventoryGameGUI.tabsKeys = InventoryGameGUI._generateTabButton("tabsKeys", "Keys", Game.getIcon("genericBagIcon"));
                        InventoryGameGUI.tabs.addControl(InventoryGameGUI.tabsKeys);
                        InventoryGameGUI.tabsMisc = InventoryGameGUI._generateTabButton("tabsMisc", "Misc", Game.getIcon("genericBagIcon"));
                        InventoryGameGUI.tabs.addControl(InventoryGameGUI.tabsMisc);
                    InventoryGameGUI.tabsAndItems.addControl(InventoryGameGUI.tabs);
                InventoryGameGUI.itemsContainer = new BABYLON.GUI.ScrollViewer("itemsContainer");
                    InventoryGameGUI.itemsContainer.height = String(InventoryGameGUI.tabsAndItems.heightInPixels - InventoryGameGUI.tabs.heightInPixels * 2).concat("px");
                    InventoryGameGUI.itemsContainer.width = InventoryGameGUI.tabsAndItems.width;
                    InventoryGameGUI.itemsContainer._horizontalBarSpace.isVisible = false;
                    InventoryGameGUI.itemsContainer._horizontalBarSpace.isEnabled = false;
                    InventoryGameGUI.items = GameGUI.createStackPanel("items");
                        InventoryGameGUI.items.height = String(InventoryGameGUI.tabsAndItems.heightInPixels - InventoryGameGUI.tabs.heightInPixels * 2).concat("px"); // multiplied by two for both tabs, and summary
                        InventoryGameGUI.items.width = InventoryGameGUI.tabsAndItems.width;
                        InventoryGameGUI.items.horizontalAlignment = BABYLON.GUI.HORIZONTAL_ALIGNMENT_LEFT;
                        InventoryGameGUI.items.isVertical = true;
                        InventoryGameGUI.itemsContainer.addControl(InventoryGameGUI.items);
                    InventoryGameGUI.tabsAndItems.addControl(InventoryGameGUI.itemsContainer);
                InventoryGameGUI.tabsAndItemsSummary = GameGUI.createStackPanel("tabsAndItemsSummary");
                    InventoryGameGUI.tabsAndItemsSummary.height = GameGUI.getFontSize(4);
                    InventoryGameGUI.tabsAndItemsSummary.width = InventoryGameGUI.tabsAndItems.width;
                    InventoryGameGUI.tabsAndItemsSummary.isVertical = false;
                    InventoryGameGUI.tabsAndItems.addControl(InventoryGameGUI.tabsAndItemsSummary);
                    InventoryGameGUI.tAISWeightContainer = GameGUI.createStackPanel("tAISWeightContainer");
                        InventoryGameGUI.tAISWeightContainer.height = InventoryGameGUI.tabsAndItemsSummary.height;
                        InventoryGameGUI.tAISWeightContainer.width = String(InventoryGameGUI.tabsAndItemsSummary.widthInPixels / 2).concat("px");
                        InventoryGameGUI.tAISWeightContainer.isVertical = false;
                        InventoryGameGUI.tAISWeightIcon = new BABYLON.GUI.Image("tAISWeightIcon", Game.getIcon("genericBagIcon"));
                            InventoryGameGUI.tAISWeightIcon.height = InventoryGameGUI.tAISWeightContainer.height;
                            InventoryGameGUI.tAISWeightIcon.width = InventoryGameGUI.tAISWeightContainer.height;
                            InventoryGameGUI.tAISWeightIcon.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
                        InventoryGameGUI.tAISWeight = GameGUI.createTextBlock("tAISWeight", "0");
                            InventoryGameGUI.tAISWeight.height = InventoryGameGUI.tAISWeightContainer.height;
                            InventoryGameGUI.tAISWeight.width = String(InventoryGameGUI.tAISWeightContainer.widthInPixels - InventoryGameGUI.tAISWeightIcon.widthInPixels).concat("px");
                            InventoryGameGUI.tAISWeight.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                            InventoryGameGUI.tAISWeight.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                            InventoryGameGUI.tAISWeight.fontSize = InventoryGameGUI.tAISWeightContainer.height;
                        InventoryGameGUI.tAISWeightContainer.addControl(InventoryGameGUI.tAISWeightIcon);
                        InventoryGameGUI.tAISWeightContainer.addControl(InventoryGameGUI.tAISWeight);
                    InventoryGameGUI.tabsAndItemsSummary.addControl(InventoryGameGUI.tAISWeightContainer);
                    InventoryGameGUI.tAISMoneyContainer = GameGUI.createStackPanel("tAISMoneyContainer");
                        InventoryGameGUI.tAISMoneyContainer.height = InventoryGameGUI.tabsAndItemsSummary.height;
                        InventoryGameGUI.tAISMoneyContainer.width = String(InventoryGameGUI.tabsAndItemsSummary.widthInPixels / 2).concat("px");
                        InventoryGameGUI.tAISMoneyContainer.isVertical = false;
                        InventoryGameGUI.tAISMoneyIcon = new BABYLON.GUI.Image("tAISMoneyIcon", Game.getIcon("genericMoneyIcon"));
                            InventoryGameGUI.tAISMoneyIcon.height = InventoryGameGUI.tAISMoneyContainer.height;
                            InventoryGameGUI.tAISMoneyIcon.width = InventoryGameGUI.tAISMoneyContainer.height;
                            InventoryGameGUI.tAISMoneyIcon.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
                        InventoryGameGUI.tAISMoney = GameGUI.createTextBlock("tAISMoney", "0");
                            InventoryGameGUI.tAISMoney.height = InventoryGameGUI.tAISMoneyContainer.height;
                            InventoryGameGUI.tAISMoney.width = String(InventoryGameGUI.tAISMoneyContainer.widthInPixels - InventoryGameGUI.tAISMoneyIcon.widthInPixels).concat("px");
                            InventoryGameGUI.tAISMoney.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                            InventoryGameGUI.tAISMoney.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                            InventoryGameGUI.tAISMoney.fontSize = InventoryGameGUI.tAISMoneyContainer.height;
                        InventoryGameGUI.tAISMoneyContainer.addControl(InventoryGameGUI.tAISMoneyIcon);
                        InventoryGameGUI.tAISMoneyContainer.addControl(InventoryGameGUI.tAISMoney);
                    InventoryGameGUI.tabsAndItemsSummary.addControl(InventoryGameGUI.tAISMoneyContainer);
            InventoryGameGUI.selectedSummary = GameGUI.createStackPanel("summary");
                InventoryGameGUI.selectedSummary.height = InventoryGameGUI.controller.height;
                InventoryGameGUI.selectedSummary.width = String(InventoryGameGUI.controller.widthInPixels / 3).concat("px");
                InventoryGameGUI.selectedSummary.isVertical = true;
                InventoryGameGUI.controller.addControl(InventoryGameGUI.selectedSummary);
                InventoryGameGUI.selectedName = GameGUI.createTextBlock("selectedName");
                    InventoryGameGUI.selectedName.width = InventoryGameGUI.selectedSummary.width;
                    InventoryGameGUI.selectedName.height = GameGUI.getFontSize(2);
                    InventoryGameGUI.selectedSummary.addControl(InventoryGameGUI.selectedName);
                InventoryGameGUI.selectedImage = new BABYLON.GUI.Image("selectedImage", "resources/images/blank.svg");
                    InventoryGameGUI.selectedImage.width = InventoryGameGUI.selectedSummary.width;
                    InventoryGameGUI.selectedImage.height = String(InventoryGameGUI.controller.heightInPixels - GameGUI.getFontSizeInPixels(26)).concat("px");
                    InventoryGameGUI.selectedImage.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
                    InventoryGameGUI.selectedSummary.addControl(InventoryGameGUI.selectedImage);
                InventoryGameGUI.selectedDescription = GameGUI.createTextBlock("selectedDescription");
                    InventoryGameGUI.selectedDescription.width = InventoryGameGUI.selectedSummary.width;
                    InventoryGameGUI.selectedDescription.height = GameGUI.getFontSize(8);
                    InventoryGameGUI.selectedDescription.paddingLeft = 0.1;
                    InventoryGameGUI.selectedDescription.paddingRight = 0.1;
                    InventoryGameGUI.selectedDescription.textWrapping = true;
                    InventoryGameGUI.selectedSummary.addControl(InventoryGameGUI.selectedDescription);
                InventoryGameGUI.selectedDetails = GameGUI.createTextBlock("selectedDetails");
                    InventoryGameGUI.selectedDetails.width = InventoryGameGUI.selectedSummary.width;
                    InventoryGameGUI.selectedDetails.height = GameGUI.getFontSize(4);
                    InventoryGameGUI.selectedSummary.addControl(InventoryGameGUI.selectedDetails);
                InventoryGameGUI.selectedActions = GameGUI.createStackPanel("actions");
                    InventoryGameGUI.selectedActions.width = InventoryGameGUI.selectedSummary.width;
                    InventoryGameGUI.selectedActions.height = GameGUI.getFontSize(12);
                    InventoryGameGUI.selectedSummary.addControl(InventoryGameGUI.selectedActions);
        InventoryGameGUI.controller.isVisible = false;
        InventoryGameGUI.controller.zIndex = 50;
        InventoryGameGUI.initialized = true;
        return InventoryGameGUI.controller;
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
                    InventoryGameGUI.setSelected(itemEntity.id, entityController, entityController);
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
    static setSelected(itemID, targetController = Game.playerController, actorController = Game.playerController, parentCallbackID = null) {
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
    static hasSelected() {
        return InventoryGameGUI.selectedEntity instanceof Object && InventoryGameGUI.selectedEntity.hasOwnProperty("id");
    }
    static updateSelected(useCachedEntity = false) {
        if (InventoryGameGUI.hasSelected()) {
            let itemID = InventoryGameGUI.selectedEntity.id;
            let targetController = InventoryGameGUI.targetController;
            let actorController = InventoryGameGUI.actorController;
            InventoryGameGUI.clearSelected();
            InventoryGameGUI.setSelected(itemID, targetController, actorController);
        }
        return 0;
    }
    static setSelectedResponse(itemID, targetController, actorController, response, parentCallbackID) {
        InventoryGameGUI.selectedEntity = response;
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
                    actionButton.onPointerUpObservable.add(function() {Game.actionConsume(response.id, actorController, InventoryGameGUI.updateWith);});
                    break;
                }
                case ActionEnum.DROP : {
                    actionButton = GameGUI._generateButton("actionDropButton", ActionEnum.properties[action].name);
                    actionButton.onPointerUpObservable.add(function() {Game.actionDrop(response.id, actorController, InventoryGameGUI.updateWith);});
                    break;
                }
                case ActionEnum.EQUIP : {
                    if (response.equipped) {
                        actionButton = GameGUI._generateButton("actionUnequipButton", ActionEnum.properties[ActionEnum.UNEQUIP].name);
                        actionButton.onPointerUpObservable.add(function() {Game.actionUnequip(response.id, actorController, InventoryGameGUI.setSelected);});
                    }
                    else {
                        actionButton = GameGUI._generateButton("actionEquipButton", ActionEnum.properties[ActionEnum.EQUIP].name);
                        actionButton.onPointerUpObservable.add(function() {Game.actionEquip(response.id, actorController, InventoryGameGUI.setSelected);});
                    }
                    break;
                }
                case ActionEnum.HOLD : {
                    if (response.held) {
                        actionButton = GameGUI._generateButton("actionReleaseButton", ActionEnum.properties[ActionEnum.RELEASE].name);
                        actionButton.onPointerUpObservable.add(function() {Game.actionRelease(itemID, actorController, InventoryGameGUI.setSelected);});
                    }
                    else {
                        actionButton = GameGUI._generateButton("actionHoldButton", ActionEnum.properties[ActionEnum.HOLD].name);
                        actionButton.onPointerUpObservable.add(function() {Game.actionHold(itemID, actorController, InventoryGameGUI.setSelected);});
                    }
                    break;
                }
                case ActionEnum.LOOK : {
                    actionButton = GameGUI._generateButton("actionLookButton", ActionEnum.properties[action].name);
                    break;
                }
                case ActionEnum.READ : {
                    actionButton = GameGUI._generateButton("actionReadButton", ActionEnum.properties[action].name);
                    actionButton.onPointerUpObservable.add(function() {Game.actionRead(itemID, actorController);});
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
                actionButton.onPointerUpObservable.add(InventoryGameGUI.updateSelected);
                InventoryGameGUI.selectedActions.addControl(actionButton);
                actionButton.top = ((InventoryGameGUI.selectedActions.children.length * 10) - 55) + "%";
            }
        }
    }
    /**
     * Clears the inventory menu's selected item section.
     */
    static clearSelected() {
        InventoryGameGUI.selectedTarget = null;
        InventoryGameGUI.selectedActor = null;
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
    static _generateTabButton(id = "", title = "", iconPath = null, onClick = null) {
        id = Game.filterID(id);
        let button = new BABYLON.GUI.Button(id);
            button.width = String(InventoryGameGUI.tabs.widthInPixels / 8).concat("px");
            button.height = InventoryGameGUI.tabs.height;
            button.thickness = 0;
            let container = GameGUI.createStackPanel(id + "StackPanel");
                container.width = button.width;
                container.height = button.height;
                container.isVertical = false;
                button.addControl(container);
                if (typeof iconPath == "string") {
                    let image = new BABYLON.GUI.Image(id + "Image", iconPath);
                    image.width = button.height;
                    image.height = button.height;
                    image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
                    image.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    container.addControl(image);
                }
                let text = GameGUI.createTextBlock(id + "TextBlock", title);
                    text.width = String(button.widthInPixels - button.heightInPixels).concat("px");
                    text.text = title;
                    text.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    text.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    container.addControl(text);
        if (onClick != null && typeof onClick == "function") {
            button.onPointerUpObservable.add(onClick);
        }
        return button;
    }
    static _resizeTabButton(tabButton) {
        tabButton.width = String(InventoryGameGUI.tabs.widthInPixels / 8).concat("px");
        tabButton.height = String(InventoryGameGUI.tabs.heightInPixels).concat("px");
        if (tabButton.children[0].children.length == 1) {
            tabButton.children[0].children[0].width = String(tabButton.widthInPixels).concat("px");
            tabButton.children[0].children[0].height = String(tabButton.heightInPixels).concat("px");
        }
        else if (tabButton.children[0].children.length == 2) {
            tabButton.children[0].children[0].width = String(tabButton.heightInPixels).concat("px");
            tabButton.children[0].children[0].height = String(tabButton.heightInPixels).concat("px");
            tabButton.children[0].children[1].width = String(tabButton.widthInPixels - tabButton.heightInPixels).concat("px");
            tabButton.children[0].children[1].height = String(tabButton.heightInPixels).concat("px");
        }
        return 0;
    }
}