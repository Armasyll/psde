class BoundedNumber {
    /**
     * Creates a wrapper for safely incrementing and decrementing a number, with minimum and maximum values.
     * @param  {Number} _val Value, default is 1
     * @param  {Number} _min Minimum value; default is 0
     * @param  {Number} _max Maximum value, default is 100
     * @param  {bool}   _lockValue Whether or no the value is locked in place
     */
    constructor(_val = 1, _min = 0, _max = 100, _lockValue = false) {
        this.val = 1;
        this._val = 1;
        this._min = 0;
        this._max = 100;
        this._lockValue = false;
        this.setValue(_val);
        this.setMin(_min);
        this.setMax(_max);
        if (_lockValue == true) {
            this.lockValue();
        }
    }
    setValue(_int = undefined) {
        if (this._lockValue) {
            return this;
        }
        _int = Number.parseInt(_int);
        if (isNaN(_int)) {
            return this;
        }
        if (_int < this._min) {
            _int = this._min;
        }
        else if (_int > this._max) {
            _int = this._max;
        }
        this._val = _int;
        this.val = _int;
        return this;
    }
    inc(_int = 1) {
        _int = Number.parseInt(_int);
        this.setValue(this._val + _int);
        return this._val;
    }
    dec(_int = 1) {
        _int = Number.parseInt(_int);
        this.setValue(this._val - _int);
        return this._val;
    }
    get() {
        return this._val;
    }
    getValue() {
        return this._val;
    }
    setMin(_int = undefined) {
        _int = Number.parseInt(_int);
        if (isNaN(_int)) {
            return this;
        }
        if (_int < Number.MIN_SAFE_INTEGER) {
            _int = Number.MIN_SAFE_INTEGER;
        }
        else if (_int > this._max) {
            _int = this._max - 1;
        }
        this._min = _int;
        return this;
    }
    incMin(_int) {
        _int = Number.parseInt(_int);
        this.setMin(this._min + _int);
        return this._min;
    }
    decMin(_int) {
        _int = Number.parseInt(_int);
        this.setMin(this._min - _int);
        return this._min;
    }
    getMin() {
        return this._min;
    }
    setMax(_int = undefined) {
        _int = Number.parseInt(_int);
        if (isNaN(_int)) {
            return this;
        }
        if (_int < this._min) {
            _int = this._min + 1;
        }
        else if (_int > Number.MAX_SAFE_INTEGER) {
            _int = Number.MAX_SAFE_INTEGER;
        }
        this._max = _int;
        return this;
    }
    incMax(_int) {
        _int = Number.parseInt(_int);
        this.setMax(this._max + _int);
        return this._max;
    }
    decMax(_int) {
        _int = Number.parseInt(_int);
        this.setMax(this._max - _int);
        return this._max;
    }
    getMax() {
        return this._max;
    }
    /**
     * Sets the values for value, minimum, and maximum.
     * @param  {Number} _val Value, default is 1
     * @param  {Number} _min Optional minimum value
     * @param  {Number} _max Optional maximum value
     * @param  {bool}   _lockValue Whether or not the value is locked in place
     */
    set(_val = undefined, _min = undefined, _max = undefined, _lockValue = false) {
        this.setValue(_val);
        this.setMin(_min);
        this.setMax(_max);
        if (_lockValue == true) {
            this.lockValue();
        }
        return this;
    }
    lockValue() {
        this._lockValue = true;
        return this;
    }
    unlockValue() {
        this._lockValue = false;
        return this;
    }
    clone() {
        return new BoundedNumber(this._val, this._min, this._max, this._lockValue);
    }
    toString() {
        if (isNaN(this._val)) {
            return "";
        }
        else {
            return this._val.toString();
        }
    }
    toSource() {
        return "new BoundedNumber(" + this._val + ", " + this._min + ", " + this._max + ", " + (this._lockedValue ? "true" : "false") + ")";
    }
}