/**
 * Bounded Number
 */
class BoundedNumber {
    /**
     * Creates a wrapper for safely incrementing and decrementing a number, with minimum and maximum values.
     * @param  {number} value Value, default is 1
     * @param  {number} minimum Minimum value; default is 0
     * @param  {number}  maximum Maximum value, default is 100
     * @param  {boolean} lockValue Whether or no the value is locked in place
     */
    constructor(value = 1, minimum = 0, maximum = 100, lockValue = false) {
        this._value = 1;
        this._minimum = 0;
        this._maximum = 100;
        this._lockValue = false;
        this.setValue(value);
        this.setMin(minimum);
        this.setMax(maximum);
        this.lockValue(lockValue);
    }
    setValue(value = undefined) {
        if (this._lockValue) {
            return this;
        }
        if (isNaN(value)) {
            return this._value;
        }
        else {
            value = value|0;
        }
        if (value < this._minimum) {
            value = this._minimum;
        }
        else if (value > this._maximum) {
            value = this._maximum;
        }
        this._value = value;
        return this._value;
    }
    inc(int = 1) {
        int = Number.parseInt(int);
        return this.setValue(this._value + int);
    }
    dec(int = 1) {
        int = Number.parseInt(int);
        return this.setValue(this._value - int);
    }
    setMin(minimum = 0) {
        if (isNaN(minimum)) {
            return this._minimum;
        }
        else {
            minimum = minimum|0;
        }
        if (minimum <= Number.MIN_SAFE_INTEGER) {
            minimum = Number.MIN_SAFE_INTEGER + 1;
        }
        else if (minimum > this._maximum) {
            minimum = this._maximum - 1;
        }
        this._minimum = minimum;
        return this._minimum;
    }
    incMin(int = 1) {
        int = Number.parseInt(int);
        return this.setMin(this._minimum + int);
    }
    decMin(int = 1) {
        int = Number.parseInt(int);
        return this.setMin(this._minimum - int);
    }
    getMin() {
        return this._minimum;
    }
    setMax(maximum = 100) {
        if (isNaN(maximum)) {
            return this._maximum;
        }
        else {
            maximum = maximum|0;
        }
        if (maximum < this._minimum) {
            maximum = this._minimum + 1;
        }
        else if (maximum >= Number.MAX_SAFE_INTEGER) {
            maximum = Number.MAX_SAFE_INTEGER - 1;
        }
        this._maximum = maximum;
        return this._maximum;
    }
    incMax(int = 1) {
        int = Number.parseInt(int);
        return this.setMax(this._maximum + int);
    }
    decMax(int = 1) {
        int = Number.parseInt(int);
        return this.setMax(this._maximum - int);
    }
    getMax() {
        return this._maximum;
    }
    /**
     * Sets the values for value, minimum, and maximum.
     * @param  {number} value Value, default is 1
     * @param  {number} minimum Optional minimum value
     * @param  {number} maximum Optional maximum value
     * @param  {boolean} lockValue Whether or not the value is locked in place
     */
    set(value = undefined, minimum = undefined, maximum = undefined, lockValue = false) {
        if (lockValue == false) { // Unlock then set
            this.unlockValue();
            this.setValue(value);
            this.setMin(minimum);
            this.setMax(maximum);
        }
        else if (lockValue == true) { // Set then lock
            this.setValue(value);
            this.setMin(minimum);
            this.setMax(maximum);
            this.lockValue();
        }
        else { // Set
            this.setValue(value);
            this.setMin(minimum);
            this.setMax(maximum);
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
    lockValue(lockValue = true) {
        this._lockValue = lockValue == true;
        return 0;
    }
    unlockValue() {
        this._lockValue = false;
        return 0;
    }
    copyFrom(b) {
        if (b instanceof BoundedNumber) {
            this._value = b._value;
            this._minimum = b._minimum;
            this._maximum = b._maximum;
            this._lockedValue = b._lockedValue;
        }
        return 0;
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