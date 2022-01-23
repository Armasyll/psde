class MainMenuGameGUI {
    static getClassName() {
        return "MainMenuGameGUI";
    }
    static initialize() {
        MainMenuGameGUI.nameContainer = null;
        MainMenuGameGUI.nameInput = null;
        MainMenuGameGUI.ageContainer = null;
        MainMenuGameGUI.ageInput = null;
        MainMenuGameGUI.controller = null;
        MainMenuGameGUI.isVisible = false;
        MainMenuGameGUI.interfaceMode = InterfaceModeEnum.MENU;

        MainMenuGameGUI.generateController();
        return 0;
    }
    static generateController() {
        MainMenuGameGUI.controller = new BABYLON.GUI.Grid("mainMenu");
        let buttonKBLayoutLabel = GameGUI.createTextBlock("kbLayoutLabel");
        let buttonKBLayoutContainer = new BABYLON.GUI.Grid("kbLayoutContainer");
        let buttonKBLayoutQwerty = GameGUI.createSimpleButton("kbLayoutQwerty", "QWERTY");
        let buttonKBLayoutDvorak = GameGUI.createSimpleButton("kbLayoutDvorak", "Dvorak");
        let buttonKBLayoutAzerty = GameGUI.createSimpleButton("kbLayoutAzerty", "AZERTY");
        let submitOnline = GameGUI.createSimpleButton("submitOnline", "Online");
        let submitOffline = GameGUI.createSimpleButton("submitOffline", "Offline");
        let urlLabel = GameGUI.createTextBlock("urlLabel");
        let urlButton = GameGUI.createSimpleButton("urlButton", "https://github.com/armasyll/psde");
        
        MainMenuGameGUI.controller.zIndex = 90;
        MainMenuGameGUI.controller.height = 0.75;
        MainMenuGameGUI.controller.width = 0.75;
        MainMenuGameGUI.controller.background = GameGUI.background;
        MainMenuGameGUI.controller.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        MainMenuGameGUI.controller.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        MainMenuGameGUI.controller.addColumnDefinition(0.5, false);
        MainMenuGameGUI.controller.addColumnDefinition(0.5, false);
        MainMenuGameGUI.controller.addRowDefinition(GameGUI.fontSizeInPixels * 2, true);
        MainMenuGameGUI.controller.addRowDefinition(GameGUI.fontSizeInPixels * 2, true);
        MainMenuGameGUI.controller.addRowDefinition(GameGUI.fontSizeInPixels * 2, true);
        MainMenuGameGUI.controller.addRowDefinition(GameGUI.fontSizeInPixels * 2, true);
        MainMenuGameGUI.controller.addRowDefinition(GameGUI.fontSizeInPixels * 2, true);
        buttonKBLayoutContainer.addColumnDefinition(0.3, false);
        buttonKBLayoutContainer.addColumnDefinition(0.3, false);
        buttonKBLayoutContainer.addColumnDefinition(0.3, false);
        buttonKBLayoutContainer.addRowDefinition(1.0, false);

        urlLabel.text = "GitHub: ";
        urlLabel.width = 1.0;

        urlButton.width = 1.0;

        [MainMenuGameGUI.nameContainer, MainMenuGameGUI.nameInput] = GameGUI.createContainedTextBlock("nameInput", "Player");
        [MainMenuGameGUI.ageContainer, MainMenuGameGUI.ageInput] = GameGUI.createContainedTextBlock("ageInput", "18")

        buttonKBLayoutLabel.text = "Keyboard Layout: ";
        buttonKBLayoutLabel.height = 1.0;
        buttonKBLayoutLabel.width = 1.0;

        buttonKBLayoutQwerty.height = 1.0;
        buttonKBLayoutQwerty.width = 1.0;
        buttonKBLayoutDvorak.height = 1.0;
        buttonKBLayoutDvorak.width = 1.0;
        buttonKBLayoutAzerty.height = 1.0;
        buttonKBLayoutAzerty.width = 1.0;

        submitOffline.width = 1.0;

        submitOnline.width = 1.0;

        MainMenuGameGUI.nameInput.onTextChangedObservable.add(function() {
            MainMenuGameGUI.nameInput.text = Tools.filterID(MainMenuGameGUI.nameInput.text);
        });
        MainMenuGameGUI.ageInput.onTextChangedObservable.add(function() {
            MainMenuGameGUI.ageInput.text = String(Tools.filterInt(MainMenuGameGUI.ageInput.text));
        });
        buttonKBLayoutQwerty.onPointerUpObservable.add(function() {
            AbstractControls.initQwertyKeyboardControls();
            Game.updateMenuKeyboardDisplayKeys();
        });
        buttonKBLayoutDvorak.onPointerUpObservable.add(function() {
            AbstractControls.initDvorakKeyboardControls();
            Game.updateMenuKeyboardDisplayKeys();
        });
        buttonKBLayoutAzerty.onPointerUpObservable.add(function() {
            AbstractControls.initAzertyKeyboardControls();
            Game.updateMenuKeyboardDisplayKeys();
        });
        urlButton.onPointerUpObservable.add(function() {
            window.open('https://github.com/armasyll/psde', '_blank');
        });
        submitOnline.onPointerClickObservable.add(function() {
            let doNotPassGo = false;
            MainMenuGameGUI.nameInput.text = Tools.filterID(MainMenuGameGUI.nameInput.text);
            MainMenuGameGUI.ageInput.text = Tools.filterInt(MainMenuGameGUI.ageInput.text)
            if (MainMenuGameGUI.nameInput.text.length < 1) {
                MainMenuGameGUI.nameInput.color = GameGUI.colorDanger;
                MainMenuGameGUI.nameInput.background = GameGUI.backgroundDanger;
                doNotPassGo = true;
            }
            else {
                MainMenuGameGUI.nameInput.color = GameGUI.color;
                MainMenuGameGUI.nameInput.background = GameGUI.background;
            }
            if (Number.parseInt(MainMenuGameGUI.ageInput.text) <= 0) {
                MainMenuGameGUI.ageInput.color = GameGUI.colorDanger;
                MainMenuGameGUI.ageInput.background = GameGUI.backgroundDanger;
                doNotPassGo = true;
            }
            else {
                MainMenuGameGUI.ageInput.color = GameGUI.color;
                MainMenuGameGUI.ageInput.background = GameGUI.background;
            }
            /*if (!doNotPassGo) {
                if (!Game.hasPlayerController()) {
                    Game.entityLogicWorkerPostMessage("loadCellAndSetPlayerAt", 0, { "cellID": Game.selectedCellID, "position": [0,0,0] });
                }
                if (!Client.isOnline()) {
                    Client.connect();
                }
                GameGUI.mainMenu.show();
                GameGUI.hud.show();
            }*/
        });
        submitOffline.onPointerClickObservable.add(function() {
            let doNotPassGo = false;
            MainMenuGameGUI.nameInput.text = Tools.filterID(MainMenuGameGUI.nameInput.text);
            MainMenuGameGUI.ageInput.text = Tools.filterInt(MainMenuGameGUI.ageInput.text)
            if (MainMenuGameGUI.nameInput.text.length < 1) {
                MainMenuGameGUI.nameInput.color = GameGUI.colorDanger;
                MainMenuGameGUI.nameInput.background = GameGUI.backgroundDanger;
                doNotPassGo = true;
            }
            else {
                MainMenuGameGUI.nameInput.color = GameGUI.color;
                MainMenuGameGUI.nameInput.background = GameGUI.background;
            }
            if (Number.parseInt(MainMenuGameGUI.ageInput.text) <= 0) {
                MainMenuGameGUI.ageInput.color = GameGUI.colorDanger;
                MainMenuGameGUI.ageInput.background = GameGUI.backgroundDanger;
                doNotPassGo = true;
            }
            else {
                MainMenuGameGUI.ageInput.color = GameGUI.color;
                MainMenuGameGUI.ageInput.background = GameGUI.background;
            }
            if (!doNotPassGo) {
                if (!(Game.hasPlayerController())) {
                    Game.loadCellAndSetPlayerAt();
                }
                if (Client.isOnline()) {
                    Client.disconnect();
                }
                MainMenuGameGUI.hide();
            }
        });

        MainMenuGameGUI.controller.addControl(MainMenuGameGUI.nameContainer, 0, 1);
        MainMenuGameGUI.controller.addControl(MainMenuGameGUI.ageContainer, 1, 1);
        MainMenuGameGUI.controller.addControl(buttonKBLayoutLabel, 2, 0);
        MainMenuGameGUI.controller.addControl(buttonKBLayoutContainer, 2, 1);
            buttonKBLayoutContainer.addControl(buttonKBLayoutQwerty, 0, 0);
            buttonKBLayoutContainer.addControl(buttonKBLayoutDvorak, 0, 1);
            buttonKBLayoutContainer.addControl(buttonKBLayoutAzerty, 0, 2);
        MainMenuGameGUI.controller.addControl(submitOffline, 3, 0);
        MainMenuGameGUI.controller.addControl(submitOnline, 3, 1);
        MainMenuGameGUI.controller.addControl(urlLabel, 4, 0);
        MainMenuGameGUI.controller.addControl(urlButton, 4, 1);
        MainMenuGameGUI.controller.isVisible = false;
        return MainMenuGameGUI.controller;
    }
    static getController() {
        return MainMenuGameGUI.controller;
    }
    static resize() {
        return 0;
    }
    static show() {
        if (MainMenuGameGUI.locked) {
            return 0;
        }
        GameGUI.windowStack.push(MainMenuGameGUI);
        MainMenuGameGUI.controller.isVisible = true;
        MainMenuGameGUI.isVisible = true;
        GameGUI.afterShow();
    }
    static hide() {
        if (MainMenuGameGUI.locked) {
            return 0;
        }
        MainMenuGameGUI.controller.isVisible = false;
        MainMenuGameGUI.isVisible = false;
        GameGUI.windowStack.remove(MainMenuGameGUI);
        GameGUI.afterHide();
        return 0;
    }
}