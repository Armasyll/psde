Game.loadMaterial("stoneMaterial01", "stoneTexture01", "stoneTexture01-NORMAL");
Game.loadMaterial("knife01", "knife01");
Game.setLoadedMaterial("fireMaterial01", new BABYLON.FireMaterial("fireMaterial01", Game.scene));
Game.updateLoadedMaterial("fireMaterial01", {diffuseTexture:"fire", opacityTexture:"fireOpacity", distortionTexture:"fireDistortion", speed:5.0});