class DebugGameGUI {
    static initialize() {
        DebugGameGUI.initialized = false;
        DebugGameGUI.locked = false;
        DebugGameGUI.width = Game.renderWidth / 2;
        DebugGameGUI.skyboxController = null;
        DebugGameGUI.skyboxIsEnabled = true;
        DebugGameGUI.skyboxAzimuth = 0;
        DebugGameGUI.skyboxInclination = 0;
        DebugGameGUI.skyboxLuminance = 1;
        DebugGameGUI.skyboxMieDirectionalG = 0.8;
        DebugGameGUI.skyboxMieCoefficient = 0.005;
        DebugGameGUI.skyboxRayleigh = 2;
        DebugGameGUI.selectionMenu = null;
        DebugGameGUI.collisionListController = null;
        DebugGameGUI.infoController = null;
        DebugGameGUI.infoCoordinates = null;
        DebugGameGUI.infoRotation = null;
        DebugGameGUI.infoTargetRay = null;
        DebugGameGUI.isVisible = false;
        DebugGameGUI.generateController();
        DebugGameGUI.containerAlpha = 0.75;
    }
    static resize() {

    }
    static update() {
        if (!DebugGameGUI.initialized) {
            return 1;
        }
        if (DebugGameGUI.skyboxController.isVisible) {
            DebugGameGUI.updateSkyboxUI();
        }
        if (DebugGameGUI.infoController.isVisible) {
            DebugGameGUI.updateInfoController();
        }
    }
    static generateController() {
        DebugGameGUI.skyboxController = DebugGameGUI.generateSkyboxController();
        DebugGameGUI.selectionMenu = DebugGameGUI.generateSelectionMenu();
        DebugGameGUI.collisionListController = DebugGameGUI.generateCollisionListController();
        DebugGameGUI.infoController = DebugGameGUI.generateInfoController();
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
    static generateCollisionListController() {
        let controller = GameGUI.createStackPanel("collisionListController");
        controller.background = GameGUI.background;
        controller.isVertical = true;
        controller.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        controller.alpha = DebugGameGUI.containerAlpha;
        return controller;
    }
    static generateInfoController() {
        let controller = GameGUI.createStackPanel("infoController");
        controller.background = GameGUI.background;
        controller.isVertical = true;
        controller.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        controller.alpha = DebugGameGUI.containerAlpha;
        controller.heightInPixels = GameGUI.fontSizeInPixels * 4;
        controller.widthInPixels = GameGUI.fontSizeInPixels * 32;
        controller.alpha = 0.25;
        controller.isVisible = false;
        let [infoCoordinatesContainer, infoCoordinates] = GameGUI.createContainedTextBlock("infoCoordinates");
        let [infoRotationContainer, infoRotation] = GameGUI.createContainedTextBlock("infoRotation");
        let [infoTargetRayContainer, infoTargetRay] = GameGUI.createContainedTextBlock("infoTargetRay");
        controller.addControl(infoCoordinatesContainer);
        controller.addControl(infoRotationContainer);
        controller.addControl(infoTargetRayContainer);

        DebugGameGUI.infoController = controller;
        DebugGameGUI.infoCoordinates = infoCoordinates;
        DebugGameGUI.infoRotation = infoRotation;
        DebugGameGUI.infoTargetRay = infoTargetRay;
        return controller;
    }
    static updateInfoController() {
        if (!DebugGameGUI.initialized) {
            return 1;
        }
        DebugGameGUI.infoCoordinates.text = String(`Pos X: ${Number(Game.playerController.collisionMesh.position.x).toFixed(8)}, Pos Y: ${Number(Game.playerController.collisionMesh.position.y).toFixed(8)}, Pos Z: ${Number(Game.playerController.collisionMesh.position.z).toFixed(8)}`);
        DebugGameGUI.infoRotation.text = String(`Rot: ${Number(BABYLON.Tools.ToDegrees(Game.playerController.collisionMesh.rotation.y)).toFixed(2)}`);
        let n = Game.rayDirectionToRadians(Game.playerController.targetRay.direction);
        DebugGameGUI.infoTargetRay.text = String(`Dir X: ${BABYLON.Tools.ToDegrees(n.x)}, Dir Y: ${BABYLON.Tools.ToDegrees(n.y)}`);
        return 0;
    }
    static showInfo() {
        DebugGameGUI.infoController.isVisible = true;
    }
    static hideInfo() {
        DebugGameGUI.infoController.isVisible = false;
    }
    static clearCollisionList() {
        if (!DebugGameGUI.initialized) {
            return 1;
        }
        for (let i = DebugGameGUI.collisionListController.children.length - 1; i >= 0; i--) {
            let child = DebugGameGUI.collisionListController.children[i];
            for (let j = child.children.length - 1; j >= 0; j--) {
                let textBlock = child.children[j];
                child.removeControl(textBlock);
                textBlock.dispose();
            }
            DebugGameGUI.collisionListController.removeControl(child);
            child.dispose();
        }
        return 0;
    }
    static addToCollisionList(id = "", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero()) {
        if (!DebugGameGUI.initialized) {
            return 1;
        }
        let controller = GameGUI.createStackPanel(id);
        controller.isVertical = false;
        controller.addControl(GameGUI.createTextBlock(String(id).concat("ID"), id));
        controller.addControl(GameGUI.createTextBlock(String(id).concat("Position"), position.toString()));
        controller.addControl(GameGUI.createTextBlock(String(id).concat("Rotation"), String(rotation.y)));
        DebugGameGUI.collisionListController.addControl(controller);
        return controller;
    }
    static getSkyboxController() {
        return DebugGameGUI.skyboxController;
    }
    static show(overwriteInterface = true) {
        if (overwriteInterface) {
            Game.setInterfaceMode(InterfaceModeEnum.DEBUG);
        }
        DebugGameGUI.isVisible = true;
        return 0;
    }
    static hide(overwriteInterface = true) {
        if (overwriteInterface) {
            Game.setInterfaceMode(InterfaceModeEnum.CHARACTER);
        }
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
    static showSkyboxUI() {
        DebugGameGUI.skyboxController.isVisible = true;
    }
    static hideSkyboxUI() {
        DebugGameGUI.skyboxController.isVisible = false;
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