class ActionData {
	constructor(_action, _function, _runOnce = false, _overrideParent = true, _runBeforeParent = true) {
		this.action = null;
		this._function = null;
		this.runOnce = _runOnce == true;
		this.setAction(_action);
		this.setFunction(_function);

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
	setFunction(_function) {
		this._function = _function;
	}
	getFunction() {
		return this._function;
	}
	hasFunction() {
		return this._function instanceof Function;
	}
	execute(..._params) {
		var _result = this._function(_params)
		if (this.runOnce) {
			this.dispose();
		}
		return _result;
	}
	clone() {
		var _tempFunction = undefined;
		if (this._function instanceof Function) {
		    _tempFunction = function temporary() { return this._function.apply(this._function, this._function.arguments); };
		    for(var _key in this._function) {
		        if (this._function.hasOwnProperty(_key)) {
		            _tempFunction[key] = this._function[_key];
		        }
		    }
		}
		return new ActionData(this.action, _tempFunction, this.runOnce, this.overrideParent, this.runBeforeParent);
	}
	createInstance() {
		return new ActionData(this.action, this._function, this.runOnce, this.overrideParent, this.runBeforeParent);
	}
	dispose() {
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
	}
}