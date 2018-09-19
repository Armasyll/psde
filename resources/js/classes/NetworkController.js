class NetworkController {
    constructor() {
        this.socket = undefined;
        this.initialized = false;
    }
    static initialize(_url = window.location.hostname) {
        this.socket = undefined;
        this.initialized = false;
        NetworkController.connectToServer(_url);
    }

    static connectToServer(_url = window.location.hostname) {
        var _protocol = "";
        if (NetworkController.socket) {
            NetworkController.close(3001);
        }
        else {
            if (window.location.protocol == "https:") {
                _protocol = "wss";
            }
            else {
                _protocol = "ws";
            }
            NetworkController.socket = new WebSocket(_protocol + "://" + _url + "/nickInThighHighSocks/");
            NetworkController.socket.onopen = function(_event) {NetworkController.onOpen(_event);};
            NetworkController.socket.onmessage = function(_event) {NetworkController.onMessage(_event);};
            NetworkController.socket.onerror = function(_event) {NetworkController.onError(_event);};
            NetworkController.socket.onclose = function(_event) {NetworkController.onClose(_event);};
        }
    }

    static onOpen(_event) {
        Client.setOnline(true);
        NetworkController.initialized = true;
    }
    static onClose(_event) {
        if (Client.isOnline()) {
            Client.disconnect(false);
        }
        NetworkController.initialized = false;
        NetworkController.socket = undefined;
        if (_event.code == 3001) {
        }
        else if (_event.code == 1006) {
            console.log('NetworkController : onClose     Socket Server is offline.');
        }
        else {
            console.log('NetworkController : onClose     Socket closed unexpectedly.');
        }
    }
    static onError(_event) {
        if (NetworkController.socket.readyState == 1) {
            console.log('NetworkController : onError     ' + _event.type);
        }
    }
    static onMessage(_event) {
        var _data = JSON.parse(_event.data);
        MessageRouter.incoming(_data);
    }
}