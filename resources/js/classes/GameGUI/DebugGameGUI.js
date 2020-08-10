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
        DebugGameGUI.isVisible = false;
        DebugGameGUI.generateController();
        DebugGameGUI.containerAlpha = 0.75;
    }
    static resize() {

    }
    static generateController() {
        DebugGameGUI.skyboxController = DebugGameGUI.generateSkyboxController();
        DebugGameGUI.selectionMenu = DebugGameGUI.generateSelectionMenu();
        DebugGameGUI.initialized = true;
    }
    static generateSelectionMenu() {
        let controller = GameGUI.createStackPanel("selectionMenu");
        controller.background = GameGUI.background;
        controller.isVertical = true;
        controller.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        controller.height = GameGUI.getFontSize(14);
        controller.width = DebugGameGUI.width;
        controller.alpha = DebugGameGUI.containerAlpha;
        let titleBar = GameGUI.createStackPanel("selectionMenuTitleBar");
            titleBar.width = String(controller.widthInPixels).concat("px");
            titleBar.height = GameGUI.getFontSize(2);
            titleBar.isVertical = false;
            titleBar.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            let title = GameGUI.createTextBlock("selectionMenuTitle");
                title.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                title.width = String(titleBar.widthInPixels - GameGUI.getFontSizeInPixels(2)).concat("px");
                title.text = "Selection Menu";
            titleBar.addControl(title);
            let closeButton = new BABYLON.GUI.Button.CreateSimpleButton("selectionMenuCloseButton", "X");
                closeButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                closeButton.width = GameGUI.getFontSize(2);
                closeButton.height = GameGUI.getFontSize(2);
            titleBar.addControl(closeButton);
        
        controller.isVisible = false;
        return controller;
    }
    static generateSkyboxController() {
        let controller = GameGUI.createStackPanel("skyboxController");
        controller.background = GameGUI.background;
        controller.isVertical = true;
        controller.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        controller.alpha = DebugGameGUI.containerAlpha;
        let titleBar = GameGUI.createStackPanel("skyboxUITitleBar");
            titleBar.width = String(controller.widthInPixels).concat("px");
            titleBar.height = GameGUI.getFontSize(2);
            titleBar.isVertical = false;
            titleBar.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            let title = GameGUI.createTextBlock("skyboxUITitle");
                title.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                title.width = String(titleBar.widthInPixels - GameGUI.getFontSizeInPixels(2)).concat("px");
                title.text = "Skybox UI Controller";
            let closeButton = new BABYLON.GUI.Button.CreateSimpleButton("selectionMenuCloseButton", "X");
                closeButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                closeButton.width = GameGUI.getFontSize(2);
                closeButton.height = GameGUI.getFontSize(2);
        if (Game.skybox.material instanceof BABYLON.SkyMaterial) {
            DebugGameGUI.skyboxIsEnabled = Game.skybox.isEnabled();
            DebugGameGUI.skyboxAzimuth = Game.skybox.material.azimuth;
            DebugGameGUI.skyboxInclination = Game.skybox.material.inclination;
            DebugGameGUI.skyboxLuminance = Game.skybox.material.luminance;
            DebugGameGUI.skyboxMieDirectionalG = Game.skybox.material.mieDirectionalG;
            DebugGameGUI.skyboxMieCoefficient = Game.skybox.material.mieCoefficient;
            DebugGameGUI.skyboxRayleigh = Game.skybox.material.rayleigh;
        }
        if (!(Game.skybox.material instanceof BABYLON.SkyMaterial)) {
            return controller;
        }
        let isEnabledController = DebugGameGUI.createLabelledCheckbox("isEnabled", "Enabled", DebugGameGUI.skyboxIsEnabled, (value) => {if (!(Game.skybox.material instanceof BABYLON.SkyMaterial) || DebugGameGUI.locked) {return 1;} Game.skybox.setEnabled(value);});
        controller.addControl(isEnabledController);
        let azimuthController = DebugGameGUI.createLabelledSlider("azimuth", "Azimuth", 0, 1, DebugGameGUI.skyboxAzimuth || 0, (value) => {if (!(Game.skybox.material instanceof BABYLON.SkyMaterial) || DebugGameGUI.locked) {return 1;} Game.skybox.material.azimuth = value;})
        controller.addControl(azimuthController);
        let inclinationController = DebugGameGUI.createLabelledSlider("inclination", "Inclination", -0.5, 0.5, DebugGameGUI.skyboxInclination || 0, (value) => {if (!(Game.skybox.material instanceof BABYLON.SkyMaterial) || DebugGameGUI.locked) {return 1;} Game.skybox.material.inclination = value;})
        controller.addControl(inclinationController);
        let luminanceController = DebugGameGUI.createLabelledSlider("luminance", "Luminance", 0.000000001, 1.19, DebugGameGUI.skyboxLuminance || 0, (value) => {if (!(Game.skybox.material instanceof BABYLON.SkyMaterial) || DebugGameGUI.locked) {return 1;} Game.skybox.material.luminance = value;})
        controller.addControl(luminanceController);
        let mieDirectionalGController = DebugGameGUI.createLabelledSlider("mieDirectionalG", "MieDirectionalG", -0.9999, 0.9999, DebugGameGUI.skyboxMieDirectionalG || 0, (value) => {if (!(Game.skybox.material instanceof BABYLON.SkyMaterial) || DebugGameGUI.locked) {return 1;} Game.skybox.material.mieDirectionalG = value;})
        controller.addControl(mieDirectionalGController);
        let mieCoefficientController = DebugGameGUI.createLabelledSlider("mieCoefficient", "MieCoefficient", 0, 4, DebugGameGUI.skyboxMieCoefficient || 0, (value) => {if (!(Game.skybox.material instanceof BABYLON.SkyMaterial) || DebugGameGUI.locked) {return 1;} Game.skybox.material.mieCoefficient = value;})
        controller.addControl(mieCoefficientController);
        let rayleighController = DebugGameGUI.createLabelledSlider("rayleigh", "Rayleigh", -111.9, 111.9, DebugGameGUI.skyboxRayleigh || 0, (value) => {if (!(Game.skybox.material instanceof BABYLON.SkyMaterial) || DebugGameGUI.locked) {return 1;} Game.skybox.material.rayleigh = value;})
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
        DebugGameGUI.isVisible = true;
        return 0;
    }
    static hide() {
        Game.setInterfaceMode(InterfaceModeEnum.CHARACTER);
        GameGUI.pointerLock();
        DebugGameGUI.skyboxController.isVisible = false;
        DebugGameGUI.isVisible = false;
        return 0;
    }
    static updateSkyboxUI() {
        if (Game.skybox.material instanceof BABYLON.SkyMaterial) {
            DebugGameGUI.skyboxIsEnabled = Game.skybox.isEnabled();
            DebugGameGUI.skyboxAzimuth = Game.skybox.material.azimuth;
            DebugGameGUI.skyboxInclination = Game.skybox.material.inclination;
            DebugGameGUI.skyboxLuminance = Game.skybox.material.luminance;
            DebugGameGUI.skyboxMieDirectionalG = Game.skybox.material.mieDirectionalG;
            DebugGameGUI.skyboxMieCoefficient = Game.skybox.material.mieCoefficient;
            DebugGameGUI.skyboxRayleigh = Game.skybox.material.rayleigh;
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
        let controller = GameGUI.createStackPanel(String(id).concat("Container"));
        let label = GameGUI.createTextBlock(String(id).concat("Label"));
            label.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            label.width = String((DebugGameGUI.width / 3) * 2).concat("px");
            label.height = GameGUI.getFontSize(2);
            label.text = String(labelString);
        let checkbox = new BABYLON.GUI.Checkbox(String(id).concat("Checkbox"));
            checkbox.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            checkbox.width = GameGUI.getFontSize(2);
            checkbox.height = GameGUI.getFontSize(2);
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
        let controller = GameGUI.createStackPanel(String(id).concat("Container"));
        let label = GameGUI.createTextBlock(String(id).concat("Label"));
            label.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            label.width = String((DebugGameGUI.width / 3) * 2).concat("px");
            label.height = GameGUI.getFontSize(2);
            label.text = String(labelString);
        let slider = new BABYLON.GUI.Slider(String(id).concat("Slider"));
            slider.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            slider.color = GameGUI.color;
            slider.width = String(DebugGameGUI.width / 3).concat("px");
            slider.height = GameGUI.getFontSize(2);
            slider.minimum = minimum;
            slider.maximum = maximum;
            slider.value = value;
        controller.addControl(label);
        controller.addControl(slider);
        slider.onValueChangedObservable.add(sliderFunction);
        return controller;
    }
}