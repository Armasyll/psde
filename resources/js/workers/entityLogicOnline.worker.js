class EntityLogic {
    static initialize() {
        EntityLogic.tickPort = null;
        EntityLogic.callbacks = {};
    }
    static tickOnMessage(event) {
        return 0;
    }
    static gameOnMessage(event) {
        switch (event.data["cmd"]) {
            case "connectTick": {
                EntityLogic.tickPort = event.ports[0];
                EntityLogic.tickPort.onmessage = EntityLogic.tickOnMessage;
                break;
            }
        };
    }
}
EntityLogic.initialize();
addEventListener('message', EntityLogic.gameOnMessage, false);