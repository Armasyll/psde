class BoundedNumber {
    /**
     * Creates a wrapper for safely incrementing and decrementing a number, with minimum and maximum values.
     * @param  {Number} _value Value, default is 1
     * @param  {Number} _minimum Minimum value; default is 0
     * @param  {Number} _maximum Maximum value, default is 100
     * @param  {Boolean}   _lockValue Whether or no the value is locked in place
     */
    constructor(_value = 1, _minimum = 0, _maximum = 100, _lockValue = false) {
        this._value = 1;
        this._minimum = 0;
        this._maximum = 100;
        this._lockValue = false;
        /**
         * Value; not used in calculation, just for public reading.
         * @type {Number}
         */
        this.value = this._value;
        /**
         * Minimum value; not used in calculation, just for public reading.
         * @type {Number}
         */
        this.minimum = this._minimum;
        /**
         * Maximum value; not used in calculation, just for public reading.
         * @type {Number}
         */
        this.maximum = this._maximum;
        this.setValue(_value);
        this.setMin(_minimum);
        this.setMax(_maximum);
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
        if (_int < this._minimum) {
            _int = this._minimum;
        }
        else if (_int > this._maximum) {
            _int = this._maximum;
        }
        this._value = _int;
        this.value = _int;
        return this;
    }
    inc(_int = 1) {
        _int = Number.parseInt(_int);
        this.setValue(this._value + _int);
        return this._value;
    }
    dec(_int = 1) {
        _int = Number.parseInt(_int);
        this.setValue(this._value - _int);
        return this._value;
    }
    setMin(_int = undefined) {
        _int = Number.parseInt(_int);
        if (isNaN(_int)) {
            return this;
        }
        if (_int < Number.MIN_SAFE_INTEGER) {
            _int = Number.MIN_SAFE_INTEGER;
        }
        else if (_int > this._maximum) {
            _int = this._maximum - 1;
        }
        this._minimum = _int;
        this.minimum = _int;
        return this;
    }
    incMin(_int) {
        _int = Number.parseInt(_int);
        this.setMin(this._minimum + _int);
        return this._minimum;
    }
    decMin(_int) {
        _int = Number.parseInt(_int);
        this.setMin(this._minimum - _int);
        return this._minimum;
    }
    getMin() {
        return this._minimum;
    }
    setMax(_int = undefined) {
        _int = Number.parseInt(_int);
        if (isNaN(_int)) {
            return this;
        }
        if (_int < this._minimum) {
            _int = this._minimum + 1;
        }
        else if (_int > Number.MAX_SAFE_INTEGER) {
            _int = Number.MAX_SAFE_INTEGER;
        }
        this._maximum = _int;
        this.maximum = _int;
        return this;
    }
    incMax(_int) {
        _int = Number.parseInt(_int);
        this.setMax(this._maximum + _int);
        return this._maximum;
    }
    decMax(_int) {
        _int = Number.parseInt(_int);
        this.setMax(this._maximum - _int);
        return this._maximum;
    }
    getMax(_bool = true) {
        return this._maximum;
    }
    /**
     * Sets the values for value, minimum, and maximum.
     * @param  {Number} _value Value, default is 1
     * @param  {Number} _minimum Optional minimum value
     * @param  {Number} _maximum Optional maximum value
     * @param  {Boolean}   _lockValue Whether or not the value is locked in place
     */
    set(_value = undefined, _minimum = undefined, _maximum = undefined, _lockValue = undefined) {
        if (_lockValue == false) { // Unlock then set
            this.unlockValue();
            this.setValue(_value);
            this.setMin(_minimum);
            this.setMax(_maximum);
        }
        else if (_lockValue == true) { // Set then lock
            this.setValue(_value);
            this.setMin(_minimum);
            this.setMax(_maximum);
            this.lockValue();
        }
        else { // Set
            this.setValue(_value);
            this.setMin(_minimum);
            this.setMax(_maximum);
        }
        return this;
    }
    get() {
        return {
            "value":this._value,
            "minimum":this._minimum,
            "maximum":this._maximum,
            "lockValue":this._lockValue
        };
    }
    getValue() {
        return this._value;
    }
    getMinimum() {
        return this._minimum;
    }
    getMaximum() {
        return this._maximum;
    }
    lockValue() {
        this._lockValue = true;
        return this;
    }
    unlockValue() {
        this._lockValue = false;
        return this;
    }
    copyFrom(b) {
        if (b instanceof BoundedNumber) {
            this._value = b._value;
            this._minimum = b._minimum;
            this._maximum = b._maximum;
            this._lockedValue = b._lockedValue;
            this.value = b.value;
            this.minimum = b.minimum;
            this.maximum = b.maximum;
        }
    }
    clone() {
        return new BoundedNumber(this._value, this._minimum, this._maximum, this._lockValue);
    }
    equals(b) {
        if (b instanceof BoundedNumber) {
            return this._value == b._value;
        }
        else if (typeof b == "number") {
            return this._value == b;
        }
        return false;
    }
    toString() {
        if (isNaN(this._value)) {
            return "";
        }
        else {
            return this._value.toString();
        }
    }
    toSource() {
        return `new BoundedNumber(${this._value}, ${this._minimum}, ${this._maximum}, ${this._lockedValue ? "true" : "false"})`;
    }
}