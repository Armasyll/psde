var Tools = /** @class */ (function () {
    function Tools() {
    }
    Tools.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };
    Tools.isFloat = function (n) {
        return Number(n) === n && n % 1 !== 0;
    };
    Tools.genUUIDv4 = function () {
        var uuid = "";
        var i = 0;
        var random = 0;
        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i == 8 || i == 12 || i == 16 || i == 20) {
                uuid += "-";
            }
            uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
        }
        return uuid.toUpperCase();
    };
    Tools.toFixed = function (n, decimals) {
        if (decimals === void 0) { decimals = 8; }
        decimals = Math.pow(10, decimals);
        return Math.round(n * decimals) / decimals;
    };
    Tools.moduloDegrees = function (f) {
        if (f > 359.9999) {
            return Tools.toFixed(f % 360, 8);
        }
        else if (f < 0) {
            return Tools.toFixed(f % 360 + 360, 8);
        }
        return f;
    };
    Tools.moduloRadians = function (f) {
        if (f > this.RAD_360) {
            return Tools.toFixed(f % Tools.RAD_360p1, 8);
        }
        else if (f < 0) {
            return Tools.toFixed(f % Tools.RAD_360p1 + Tools.RAD_360p1, 8);
        }
        return f;
    };
    Tools.arePointsEqual = function (p1, p2, p) {
        return Math.abs(p1 - p2) < p;
    };
    Tools.verticalSlope = function (v) {
        return Math.atan(Math.abs(v.y / Math.sqrt(v.x * v.x + v.z * v.z)));
    };
    /**
     *
     * @param {string} s
     * @param {(string|null)} returnOnFail
     * @returns {string}
     */
    Tools.filterID = function (s, returnOnFail = Tools.genUUIDv4()) {
        if (s == undefined) {
            return returnOnFail;
        }
        if (returnOnFail === void 0) { returnOnFail = null; }
        s = String(s);
        if (typeof s == "string") {
            s = s.replace(/[^a-zA-Z0-9_\-\.]/g, "");
        }
        if (s.length == 0 && returnOnFail != null) {
            return returnOnFail;
        }
        return s;
    };
    Tools.filterName = function (s) {
        if (typeof s != "string") {
            return "";
        }
        return s.replace(/[^a-zA-Z0-9_\-\ \'\,\"]/g, '');
    };
    Tools.filterFloat = function (f) {
        if (isNaN(f)) {
            f = Number.parseFloat(f);
            if (isNaN(f)) {
                return 0;
            }
        }
        else if (f > Number.MAX_SAFE_INTEGER) {
            f = Number.MAX_SAFE_INTEGER;
        }
        else if (f < Number.MIN_SAFE_INTEGER) {
            f = Number.MIN_SAFE_INTEGER;
        }
        return Number(f.toFixed(8));
    };
    Tools.filterInt = function (i) {
        if (isNaN(i)) {
            i = Number.parseInt(i);
            if (isNaN(i)) {
                return 0;
            }
        }
        else if (i > Number.MAX_SAFE_INTEGER) {
            i = Number.MAX_SAFE_INTEGER;
        }
        else if (i < Number.MIN_SAFE_INTEGER) {
            i = Number.MIN_SAFE_INTEGER;
        }
        return (i | 0);
    };
    /**
     *
     * @param {(number|string|object)} value
     * @param {object} theClass
     * @param {any} returnOnFail
     */
    Tools.filterClass = function (value, theClass, returnOnFail) {
        if (returnOnFail === void 0) { returnOnFail = null; }
        if (typeof theClass != "function") {
            return returnOnFail;
        }
        if (!theClass.hasOwnProperty("has") || !theClass.hasOwnProperty("get")) {
            return returnOnFail;
        }
        if (value instanceof theClass) {
            return value;
        }
        if (theClass.has(value)) {
            return theClass.get(value);
        }
        return returnOnFail;
    };
    /**
     *
     * @param {(number|string)} value
     * @param {Enum} theEnumerator
     * @param {boolean} returnValue Return value, otherwise return key
     */
    Tools.filterEnum = function (value, theEnumerator, returnValue) {
        if (returnValue === void 0) { returnValue = true; }
        if (typeof theEnumerator != "object") {
            return -1;
        }
        var tempValue = Number.parseInt(value);
        if (!isNaN(tempValue)) {
            value = tempValue;
        }
        if (returnValue) {
            if (typeof value == "number" && theEnumerator["properties"].hasOwnProperty(value)) {
                return value;
            }
            if (typeof value == "string") {
                if (theEnumerator.hasOwnProperty(value)) {
                    return theEnumerator[value];
                }
                value = value.toUpperCase();
                if (theEnumerator.hasOwnProperty(value)) {
                    return theEnumerator[value];
                }
            }
        }
        else {
            if (typeof value == "number" && theEnumerator["properties"].hasOwnProperty(value)) {
                return theEnumerator["properties"][value].key;
            }
            if (typeof value == "string") {
                if (theEnumerator.hasOwnProperty(value)) {
                    return value;
                }
                value = value.toUpperCase();
                if (theEnumerator.hasOwnProperty(value)) {
                    return value;
                }
            }
        }
        return -1;
    };
    Tools.filterArray3 = function (array) {
        var nArray = [0, 0, 0];
        if (array.hasOwnProperty("x")) {
            nArray[0] = Number.parseFloat(array["x"]) || 0;
            nArray[1] = Number.parseFloat(array["y"]) || 0;
            nArray[2] = Number.parseFloat(array["z"]) || 0;
        }
        else if (array.hasOwnProperty("_x")) {
            nArray[0] = Number.parseFloat(array["_x"]) || 0;
            nArray[1] = Number.parseFloat(array["_y"]) || 0;
            nArray[2] = Number.parseFloat(array["_z"]) || 0;
        }
        else {
            nArray[0] = Number.parseFloat(array[0]) || 0;
            nArray[1] = Number.parseFloat(array[1]) || 0;
            nArray[2] = Number.parseFloat(array[2]) || 0;
        }
        return nArray;
    };
    Tools.colourNameToHex = function (colour) {
        if (typeof Tools.colours[colour.toLowerCase()] != 'undefined') {
            return Tools.colours[colour.toLowerCase()];
        }
        return "#000000";
    };
    Tools.mapToObj = function (m) {
        var obj = {};
        m.forEach(function (val, key) { obj[key] = val; });
        return obj;
    };
    Tools.fresponse = function (status, msg, response, stringify) {
        if (status === void 0) { status = 200; }
        if (msg === void 0) { msg = "OK"; }
        if (response === void 0) { response = null; }
        if (stringify === void 0) { stringify = false; }
        var result = null;
        if (response) {
            result = { "meta": { "status": status, "msg": msg }, "response": response };
        }
        else {
            result = { "meta": { "status": status, "msg": msg } };
        }
        if (stringify) {
            return JSON.stringify(result);
        }
        else {
            return result;
        }
    };
    Tools.RAD_0 = 0.00000000;
    Tools.RAD_1_HALF = 0.00872665;
    Tools.RAD_1_3RD = 0.00581776;
    Tools.RAD_1_4TH = 0.00436332;
    Tools.RAD_1 = 0.01745329;
    Tools.RAD_45 = 0.78539816;
    Tools.RAD_90 = 1.57079633;
    Tools.RAD_135 = 2.35619449;
    Tools.RAD_180 = 3.14159265;
    Tools.RAD_225 = 3.92699082;
    Tools.RAD_270 = 4.71238898;
    Tools.RAD_315 = 5.49778714;
    Tools.RAD_360 = 6.28318529;
    Tools.RAD_360p1 = 6.28318530;
    Tools.colours = { "aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff", "beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2", "brown": "#42342a", "burlywood": "#deb887", "cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff", "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f", "darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1", "darkviolet": "#9400d3", "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dodgerblue": "#1e90ff", "firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22", "fuchsia": "#ff00ff", "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700", "goldenrod": "#daa520", "gray": "#808080", "green": "#008000", "greenyellow": "#adff2f", "honeydew": "#f0fff0", "hotpink": "#ff69b4", "indianred ": "#cd5c5c", "indigo": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c", "lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2", "lightgray": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightsteelblue": "#b0c4de", "lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6", "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee", "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5", "navajowhite": "#ffdead", "navy": "#000080", "oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23", "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6", "palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#d87093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080", "rebeccapurple": "#663399", "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1", "saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f", "steelblue": "#4682b4", "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347", "turquoise": "#40e0d0", "violet": "#ee82ee", "wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5", "yellow": "#ffff00", "yellowgreen": "#9acd32", "emperor": "#525252", "cream": "#FFFDD0" };
    return Tools;
}());
