class ItemController extends EntityController {
    constructor(_id, _mesh, _entity) {
        super(_id, _mesh, _entity);

        this.entity.setDefaultAction(ActionEnum.TAKE);

        Game.itemControllers[this.id] = this;
    }
}