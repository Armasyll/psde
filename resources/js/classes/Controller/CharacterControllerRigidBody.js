class CharacterControllerRigidBody extends CharacterController {
    constructor(id, mesh, entity) {
        super(id, mesh, entity);
    }

    dispose() {
        super.dispose();
        return undefined;
    }
}