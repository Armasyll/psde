Game.setLoadedMesh("floor16x16", BABYLON.MeshBuilder.CreateTiledGround("floor16x16", {xmin:0, zmin:0, xmax: 16, zmax: 16, subdivisions: {w:16, h:16}}, Game.scene));
Game.setLoadedMesh("billboard", BABYLON.Mesh.CreatePlane("billboard", 1, Game.scene));
