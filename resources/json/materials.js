Game.loadMaterial("stoneMaterial01", "stoneSeamless01", "stoneSeamless01Normal", {specularColor:new BABYLON.Color3(0.1,0.1,0.1)});
Game.loadMaterial("marbleMaterial01", "marble01", undefined, {specularColor:new BABYLON.Color3(0.1,0.1,0.1)});
Game.loadMaterial("woodenFloorDark01", "woodenFloorDark01-DIFFUSE", "woodenFloorDark01-NORMAL", {specularColor:new BABYLON.Color3(0.1,0.1,0.1)});
Game.loadMaterial("woodenFloorDark26", "woodenFloorDark05BySmeggo");
Game.loadMaterial("grass01", "grass01", undefined, {"hasAlpha":true, "backFaceCulling":false});
Game.loadMaterial("wheat_stage_0", "wheat_stage_0", undefined, {"hasAlpha":true, "backFaceCulling":false});
Game.loadMaterial("wheat_stage_1", "wheat_stage_1", undefined, {"hasAlpha":true, "backFaceCulling":false});
Game.loadMaterial("wheat_stage_2", "wheat_stage_2", undefined, {"hasAlpha":true, "backFaceCulling":false});
Game.loadMaterial("wheat_stage_3", "wheat_stage_3", undefined, {"hasAlpha":true, "backFaceCulling":false});
Game.loadMaterial("wheat_stage_4", "wheat_stage_4", undefined, {"hasAlpha":true, "backFaceCulling":false});
Game.loadMaterial("wheat_stage_5", "wheat_stage_5", undefined, {"hasAlpha":true, "backFaceCulling":false});
Game.loadMaterial("wheat_stage_6", "wheat_stage_6", undefined, {"hasAlpha":true, "backFaceCulling":false});
Game.loadMaterial("wheat_stage_7", "wheat_stage_7", undefined, {"hasAlpha":true, "backFaceCulling":false});
Game.loadMaterial("knife01", "knife01");
Game.setLoadedMaterial("fireMaterial01", new BABYLON.FireMaterial("fireMaterial01", Game.scene));
Game.updateLoadedMaterial("fireMaterial01", {diffuseTexture:"fire", opacityTexture:"fireOpacity", distortionTexture:"fireDistortion", speed:2.0});