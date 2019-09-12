class DebugGameGUI {
    static initialize() {
        DebugGameGUI.initialized = false;
        DebugGameGUI.locked = false;
        DebugGameGUI.width = Game.engine.getRenderWidth() / 2;
        DebugGameGUI.skyboxController = null;
        DebugGameGUI.skyboxIsEnabled = true;
        DebugGameGUI.skyboxAzimuth = 0;
        DebugGameGUI.skyboxInclination = 0;
        DebugGameGUI.skyboxLuminance = 1;
        DebugGameGUI.skyboxMieDirectionalG = 0.8;
        DebugGameGUI.skyboxMieCoefficient = 0.005;
        DebugGameGUI.skyboxRayleigh = 2;
        DebugGameGUI.generateController();
    }
    static resize() {

    }
    static generateController() {
        DebugGameGUI.skyboxController = DebugGameGUI.generateSkyboxController();
        DebugGameGUI.initialized = true;
    }
    static generateSkyboxController() {
        let controller = new BABYLON.GUI.StackPanel("skyboxController");
        controller.background = GameGUI.background;
        controller.thickness = 0;
        controller.isVertical = true;
        controller.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        controller.alpha = 0.75;
        let titleBar = new BABYLON.GUI.StackPanel("skyboxUITitleBar");
            titleBar.width = String(controller.widthInPixels).concat("px");
            titleBar.height = String(GameGUI.getFontSize(2)).concat("px");
            titleBar.thickness = 0;
            titleBar.isVertical = false;
            titleBar.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            let title = new BABYLON.GUI.TextBlock("skyboxUITitle");
                title.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                title.width = String(titleBar.widthInPixels - GameGUI.getFontSize(2)).concat("px");
                title.color = GameGUI.color;
                title.text = "Skybox UI Controller";
            let closeButton = new BABYLON.GUI.Button.CreateSimpleButton("close", "X");
                closeButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                closeButton.color = GameGUI.color;
                closeButton.width = String(GameGUI.getFontSize(2)).concat("px");
                closeButton.height = String(GameGUI.getFontSize(2)).concat("px");
        if (Game.playerCell instanceof Cell) {
            DebugGameGUI.skyboxIsEnabled = Game.playerCell.getSkybox().isEnabled;
            DebugGameGUI.skyboxAzimuth = Game.playerCell.getSkyboxMaterial().azimuth;
            DebugGameGUI.skyboxInclination = Game.playerCell.getSkyboxMaterial().inclination;
            DebugGameGUI.skyboxLuminance = Game.playerCell.getSkyboxMaterial().luminance;
            DebugGameGUI.skyboxMieDirectionalG = Game.playerCell.getSkyboxMaterial().mieDirectionalG;
            DebugGameGUI.skyboxMieCoefficient = Game.playerCell.getSkyboxMaterial().mieCoefficient;
            DebugGameGUI.skyboxRayleigh = Game.playerCell.getSkyboxMaterial().rayleigh;
        }
        let isEnabledController = DebugGameGUI.createLabelledCheckbox("isEnabled", "Enabled", DebugGameGUI.skyboxIsEnabled, (value) => {if (!(Game.playerCell instanceof Cell) || DebugGameGUI.locked) {return 1;} Game.playerCell.getSkybox().setEnabled(value);});
        controller.addControl(isEnabledController);
        let azimuthController = DebugGameGUI.createLabelledSlider("azimuth", "Azimuth", 0, 1, DebugGameGUI.skyboxAzimuth || 0, (value) => {if (!(Game.playerCell instanceof Cell) || DebugGameGUI.locked) {return 1;} Game.playerCell.getSkyboxMaterial().azimuth = value;})
        controller.addControl(azimuthController);
        let inclinationController = DebugGameGUI.createLabelledSlider("inclination", "Inclination", -0.5, 0.5, DebugGameGUI.skyboxInclination || 0, (value) => {if (!(Game.playerCell instanceof Cell) || DebugGameGUI.locked) {return 1;} Game.playerCell.getSkyboxMaterial().inclination = value;})
        controller.addControl(inclinationController);
        let luminanceController = DebugGameGUI.createLabelledSlider("luminance", "Luminance", 0.000000001, 1.19, DebugGameGUI.skyboxLuminance || 0, (value) => {if (!(Game.playerCell instanceof Cell) || DebugGameGUI.locked) {return 1;} Game.playerCell.getSkyboxMaterial().luminance = value;})
        controller.addControl(luminanceController);
        let mieDirectionalGController = DebugGameGUI.createLabelledSlider("mieDirectionalG", "MieDirectionalG", -0.9999, 0.9999, DebugGameGUI.skyboxMieDirectionalG || 0, (value) => {if (!(Game.playerCell instanceof Cell) || DebugGameGUI.locked) {return 1;} Game.playerCell.getSkyboxMaterial().mieDirectionalG = value;})
        controller.addControl(mieDirectionalGController);
        let mieCoefficientController = DebugGameGUI.createLabelledSlider("mieCoefficient", "MieCoefficient", 0, 4, DebugGameGUI.skyboxMieCoefficient || 0, (value) => {if (!(Game.playerCell instanceof Cell) || DebugGameGUI.locked) {return 1;} Game.playerCell.getSkyboxMaterial().mieCoefficient = value;})
        controller.addControl(mieCoefficientController);
        let rayleighController = DebugGameGUI.createLabelledSlider("rayleigh", "Rayleigh", -111.9, 111.9, DebugGameGUI.skyboxRayleigh || 0, (value) => {if (!(Game.playerCell instanceof Cell) || DebugGameGUI.locked) {return 1;} Game.playerCell.getSkyboxMaterial().rayleigh = value;})
        controller.addControl(rayleighController);
        controller.isVisible = false;
        return controller;
    }
    static getSkyboxController() {
        return DebugGameGUI.skyboxController;
    }
    static show() {
        Game.setInterfaceMode(InterfaceModeEnum.DEBUG);
        GameGUI.pointerRelease();
        DebugGameGUI.updateSkyboxUI();
        DebugGameGUI.skyboxController.isVisible = true;
        return 0;
    }
    static hide() {
        Game.setInterfaceMode(InterfaceModeEnum.CHARACTER);
        GameGUI.pointerLock();
        DebugGameGUI.skyboxController.isVisible = false;
        return 0;
    }
    static updateSkyboxUI() {
        if (Game.playerCell instanceof Cell) {
            DebugGameGUI.skyboxIsEnabled = Game.playerCell.getSkybox().isEnabled;
            DebugGameGUI.skyboxAzimuth = Game.playerCell.getSkyboxMaterial().azimuth;
            DebugGameGUI.skyboxInclination = Game.playerCell.getSkyboxMaterial().inclination;
            DebugGameGUI.skyboxLuminance = Game.playerCell.getSkyboxMaterial().luminance;
            DebugGameGUI.skyboxMieDirectionalG = Game.playerCell.getSkyboxMaterial().mieDirectionalG;
            DebugGameGUI.skyboxMieCoefficient = Game.playerCell.getSkyboxMaterial().mieCoefficient;
            DebugGameGUI.skyboxRayleigh = Game.playerCell.getSkyboxMaterial().rayleigh;
        }
        DebugGameGUI.locked = true;
        DebugGameGUI.getSkyboxController().getChildByName("isEnabledContainer").getChildByName("isEnabledCheckbox").value = DebugGameGUI.skyboxIsEnabled;
        DebugGameGUI.getSkyboxController().getChildByName("azimuthContainer").getChildByName("azimuthSlider").value = DebugGameGUI.skyboxAzimuth;
        DebugGameGUI.getSkyboxController().getChildByName("inclinationContainer").getChildByName("inclinationSlider").value = DebugGameGUI.skyboxInclination;
        DebugGameGUI.getSkyboxController().getChildByName("luminanceContainer").getChildByName("luminanceSlider").value = DebugGameGUI.skyboxLuminance;
        DebugGameGUI.getSkyboxController().getChildByName("mieDirectionalGContainer").getChildByName("mieDirectionalGSlider").value = DebugGameGUI.skyboxMieDirectionalG;
        DebugGameGUI.getSkyboxController().getChildByName("mieCoefficientContainer").getChildByName("mieCoefficientSlider").value = DebugGameGUI.skyboxMieCoefficient;
        DebugGameGUI.getSkyboxController().getChildByName("rayleighContainer").getChildByName("rayleighSlider").value = DebugGameGUI.skyboxRayleigh;
        DebugGameGUI.locked = false;
    }

    static createLabelledCheckbox(id, labelString = "Label", defaultValue = null, checkboxFunction) {
        let controller = new BABYLON.GUI.StackPanel(String(id).concat("Container"));
        let label = new BABYLON.GUI.TextBlock(String(id).concat("Label"));
            label.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            label.width = String((DebugGameGUI.width / 3) * 2).concat("px");
            label.height = String(GameGUI.getFontSize(2)).concat("px");
            label.color = GameGUI.color;
            label.text = String(labelString);
        let checkbox = new BABYLON.GUI.Checkbox(String(id).concat("Checkbox"));
            checkbox.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            checkbox.color = GameGUI.color;
            checkbox.width = String(GameGUI.getFontSize(2)).concat("px");
            checkbox.height = String(GameGUI.getFontSize(2)).concat("px");
            if (defaultValue === true) {
                checkbox.value = true;
            }
            else if (defaultValue === false) {
                checkbox.value = false;
            }
        controller.addControl(label);
        controller.addControl(checkbox);
        checkbox.onIsCheckedChangedObservable.add(checkboxFunction);
        return controller;
    }
    static createLabelledSlider(id, labelString = "Label", minimum = 0, maximum = 1, value = 0.5, sliderFunction) {
        if (typeof minimum != "number") {minimum = Number.parseInt(minimum);}
        else {minimum = minimum}
        if (typeof maximum != "number") {maximum = Number.parseInt(maximum);}
        else {maximum = maximum}
        if (typeof value != "number") {value = Number.parseInt(value);}
        else {value = value}
        let controller = new BABYLON.GUI.StackPanel(String(id).concat("Container"));
        let label = new BABYLON.GUI.TextBlock(String(id).concat("Label"));
            label.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            label.width = String((DebugGameGUI.width / 3) * 2).concat("px");
            label.height = String(GameGUI.getFontSize(2)).concat("px");
            label.color = GameGUI.color;
            label.text = String(labelString);
        let slider = new BABYLON.GUI.Slider(String(id).concat("Slider"));
            slider.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            slider.color = GameGUI.color;
            slider.width = String(DebugGameGUI.width / 3).concat("px");
            slider.height = String(GameGUI.getFontSize(2)).concat("px");
            slider.minimum = minimum;
            slider.maximum = maximum;
            slider.value = value;
        controller.addControl(label);
        controller.addControl(slider);
        slider.onValueChangedObservable.add(sliderFunction);
        return controller;
    }
}