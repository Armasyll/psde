class FurnitureController extends EntityController {
    constructor(_id, _mesh, _entity) {
        super (_id, _mesh, _entity);

        Game.furnitureControllers[this.id] = this;
    }
}