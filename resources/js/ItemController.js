class ItemController extends EntityController {
    constructor(_id, _avatar, _entity) {
        super(_id, _avatar, _entity);

        Game.itemControllers[this.id] = this;
    }
}