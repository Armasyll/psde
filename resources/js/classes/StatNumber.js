class StatNumber {
    /**
     * Creates a wrapper for safely incrementing and decrementing a number, with minimum and maximum values.
     * @param  {Number} _val Value, default is 1
     * @param  {Number} _min Minimum value; default is 0
     * @param  {Number} _max Maximum value, default is 100
     */
    constructor(_val = 1, _min = 0, _max = 100) {
        this.value = 1;
        this._value = 1;
        this._min = 0;
        this._max = 100;
        this.setValue(_val);
        this.setMin(_min);
        this.setMax(_max);
    }
    setValue(_int = this._value) {
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
        this._value = _int;
        this.value = _int;
        return this;
    }
    getValue() {
        return this._value;
    }
    incMin(_int) {
        _int = Number.parseInt(_int);
        return this.setMin(this._min + _int);
    }
    decMin(_int) {
        _int = Number.parseInt(_int);
        return this.setMin(this._min - _int);
    }
    setMin(_int = 0) {
        _int = Number.parseInt(_int);
        if (isNaN(_int)) {
            return this;
        }
        if (_int < Number.MIN_SAFE_INTEGER) {
            _int = Number.MIN_SAFE_INTEGER;
        }
        else if (_int >= this._max) {
            _int = this._max - 1;
        }
        this._min = _int;
        return this;
    }
    getMin() {
        return this._min;
    }
    incMax(_int) {
        _int = Number.parseInt(_int);
        return this.setMax(this._max + _int);
    }
    decMax(_int) {
        _int = Number.parseInt(_int);
        return this.setMax(this._max - _int);
    }
    setMax(_int = 100) {
        _int = Number.parseInt(_int);
        if (isNaN(_int)) {
            return this;
        }
        if (_int <= this._min) {
            _int = this._min + 1;
        }
        else if (_int > Number.MAX_SAFE_INTEGER) {
            _int = Number.MAX_SAFE_INTEGER;
        }
        this._max = _int;
        return this;
    }
    getMax() {
        return this._max;
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
    get() {
        return this._value;
    }
    /**
     * Sets the values for value, minimum, and maximum.
     * @param  {Number} _val Value, default is 1
     * @param  {Number} _min Optional minimum value
     * @param  {Number} _max Optional maximum value
     */
    set(_val = 1, _min = undefined, _max = undefined) {
        this.setValue(_val);
        this.setMin(_min);
        this.setMax(_max);
        return this;
    }
    clone() {
        return new StatNumber(this._value, this._min, this._max);
    }
    toString() {
        return new String(this._value);
    }
}