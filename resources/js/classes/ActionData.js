class ActionData {
	constructor(action, _function = null, runOnce = false, overrideParent = true, runBeforeParent = true) {
		this.action = null;
		this._function = null;
		this.runOnce = runOnce == true;
		this.setAction(action);

		/**
		 * Used only if applied to an InstancedEntity
		 * @type {Boolean} Whether or not to override parent ActionData
		 */
		this.overrideParent = overrideParent == true;
		/**
		 * Used only if applied to an InstancedEntity
		 * @type {Boolean} Whether or not to run before parent ActionData
		 */
		this.runBeforeParent = runBeforeParent == true;
	}
	setAction(action) {
        if (ActionEnum.properties.hasOwnProperty(action)) {}
        else if (ActionEnum.hasOwnProperty(action)) {
        	action = ActionEnum[action];
        }
        else {
        	action = ActionEnum.NONE;
        }
		this.action = action;
		return 0;
	}
	getAction() {
		return this.action;
	}
	hasFunction() {
		return (typeof this._function == "function");
	}
	dispose() {
		this.action = ActionEnum.NONE;
		this._function = null;
		this.runOnce = true;
		this.overrideParent = false;
		this.runBeforeParent = false;
        return undefined;
	}
}