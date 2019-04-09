class ActionData {
	constructor(_action, _function = null, _runOnce = false, _overrideParent = true, _runBeforeParent = true) {
		this.action = null;
		this._function = null;
		this.runOnce = _runOnce == true;
		this.setAction(_action);

		/**
		 * Used only if applied to an InstancedEntity
		 * @type {Boolean} Whether or not to override parent ActionData
		 */
		this.overrideParent = _overrideParent == true;
		/**
		 * Used only if applied to an InstancedEntity
		 * @type {Boolean} Whether or not to run before parent ActionData
		 */
		this.runBeforeParent = _runBeforeParent == true;
	}
	setAction(_action) {
        if (ActionEnum.hasOwnProperty(_action)) {}
        else if (ActionEnum.properties.hasOwnProperty(_action)) {
        	_action = ActionEnum.properties[_action].value;
        }
        else {
        	_action = 0;
        }
        this.action = _action;
	}
	getAction() {
		return this.action;
	}
	hasFunction() {
		return false;
	}
	dispose() {
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
	}
}