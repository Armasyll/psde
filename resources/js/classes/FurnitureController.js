class FurnitureController extends EntityController {
    constructor(_id, _mesh, _entity) {
        super (_id, _mesh, _entity);

        Game.setFurnitureController(this.id, this);
    }

    dispose() {
        super.dispose();
        Game.removeFurnitureController(this.id);
        return undefined;
    }
}