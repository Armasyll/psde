class ItemController extends EntityController {
    constructor(_id, _mesh, _entity) {
        super(_id, _mesh, _entity);

        this.entity.setDefaultAction(ActionEnum.TAKE);

        ItemController.set(this.id, this);
    }

    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        ItemController.remove(this.id);
        super.dispose();
    }

    static initialize() {
        ItemController.itemControllerList = {};
    }
    static get(id) {
        if (ItemController.has(id)) {
            return ItemController.itemControllerList[id];
        }
        return 1;
    }
    static has(id) {
        return ItemController.itemControllerList.hasOwnProperty(id);
    }
    static set(id, itemController) {
        ItemController.itemControllerList[id] = itemController;
        return 0;
    }
    static remove(id) {
        delete ItemController.itemControllerList[id];
        return 0;
    }
    static list() {
        return ItemController.itemControllerList;
    }
    static clear() {
        for (let i in ItemController.itemControllerList) {
            ItemController.itemControllerList[i].dispose();
        }
        ItemController.itemControllerList = {};
        return 0;
    }
}
ItemController.initialize();