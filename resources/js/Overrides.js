/* for trinear logic */
maybe = -1;
neither = -1;
// General functions
if (!String.prototype.format) {
    String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
        if (args[number] == undefined) {
            return match;
        }
        else {
            return args[number];
        }
    });
  };
}
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
}
Array.prototype.clear = function() {
    this.splice(0, this.length);
}
Array.prototype.contains = function() {
    var a = arguments;
    if (a.length == 0 || this.length == 0) {
        return false;
    }
    return (this.indexOf(a[0]) !== -1);
}
Array.prototype.getRandom = function() {
    if (this.length == 0) {
        return undefined;
    }
    else if (this.length == 1) {
        return this[0];
    }
    else {
        return this[Math.floor(Math.random() * this.length)];
    }
}
Array.prototype.difference = function(_arr) {
    if (!(_arr instanceof Array) || _arr.length == 0 || this.length == 0) {
        return this;
    }
    return this.filter(function(_index) {return _arr.indexOf(_index) < 0;});
}
Array.prototype.intersect = function() {
    var a = arguments;
    if (!(a[0] instanceof Array) || a.length == 0 || this.length == 0) {
        return this;
    }
    var _arr = [];
    var _cmpArr = a[0].slice(0);
    while (_cmpArr.length != 0) {
        this.some(function(_this) {
            if (_this == _cmpArr[_cmpArr.length - 1]) {
                _arr.push(_this);
                return true;
            }
        });
        _cmpArr.pop();
    }
    return _arr;
}
Map.prototype.flip = function() {
    if (!(this instanceof Map)) {
        return undefined;
    }
    var tmpMap = new Map();
    this.forEach(function(val, key) {
        tmpMap.set(val, key);
    });
    return tmpMap;
}
Array.prototype.flip = function() {
    if (!(this instanceof Array)) {
        return undefined;
    }
    var tmpArr = {};
    for (key in this) {
        if (!this.hasOwnProperty(key)) {
            continue;
        }
        tmpArr[this[parseInt(key)]-1] = (key);
    }
    return tmpArr;
}
Array.prototype.compare = function() {
    var args = arguments;
    if (this.length != args[0].length) {
        return false;
    }
    var length = args[0].length;
    for (var i = 0; i < length; i++) {
        if (this[i] !== args[0][i]) {
            return false;
        }
    }
    return true;
}