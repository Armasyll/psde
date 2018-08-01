class ItemController extends EntityController {
    constructor(_id, _avatar, _entity) {
        super(_id, _avatar, _entity);

        this.setDefaultAction("take");

        Game.itemControllers[this.id] = this;
    }
}