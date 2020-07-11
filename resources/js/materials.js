Game.loadMaterial("stoneMaterial01", "stoneTexture01", "stoneTexture01-NORMAL", {specularColor:new BABYLON.Color3(0.1,0.1,0.1)});
Game.loadMaterial("woodenFloorDark01", "woodenFloorDark01-DIFFUSE", "woodenFloorDark01-NORMAL", {specularColor:new BABYLON.Color3(0.1,0.1,0.1)});
Game.loadMaterial("woodenFloorDark26", "woodenFloorDark26-DIFFUSE", "woodenFloorDark26-NORMAL", {specularColor:new BABYLON.Color3(0.1,0.1,0.1)});
Game.loadMaterial("grass01", "grass01", undefined, {"hasAlpha":true, "backFaceCulling":false});
Game.loadMaterial("knife01", "knife01");
Game.setLoadedMaterial("fireMaterial01", new BABYLON.FireMaterial("fireMaterial01", Game.scene));
Game.updateLoadedMaterial("fireMaterial01", {diffuseTexture:"fire", opacityTexture:"fireOpacity", distortionTexture:"fireDistortion", speed:2.0});