class BidirectionalMap extends Map {
    constructor(...iterables) {
        super(...iterables);
        this.otherMap = new Map();
        super.forEach(function(val, key) {
            otherMap.set(val, key);
        });
        return super.this;
    }
    set(a, b) {
        super.set(a, b);
        this.otherMap.set(b, a);
        return super.this;
    }
    delete(a) {
        this.otherMap.delete(this.get(a));
        super.delete(a);
        return super.this;
    }
    deleteKey(b) {
        super.delete(this.otherMap.get(b));
        this.otherMap.delete(b);
        return super.this;
    }
    deleteValue(a) {
        return this.delete(a);
    }
    clear() {
        this.otherMap.clear();
        super.clear();
        return undefined;
    }
    getKey(b) {
        return this.otherMap.get(b);
    }
    getValue(a) {
        return super.get(a);
    }
    hasKey(b) {
        return this.otherMap.has(b);
    }
    hasValue(a) {
        return super.has(a);
    }
}