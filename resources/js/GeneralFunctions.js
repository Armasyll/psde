// General functions
BABYLON.Mesh.prototype.showEllipsoid = function(scene) {

    if (!this.isEnabled()) return;

    this.refreshBoundingInfo();    

    var sphere = BABYLON.MeshBuilder.CreateSphere("elli", { 
        diameterX: this.ellipsoid.x * 2,
        diameterZ: this.ellipsoid.z * 2,
        diameterY: this.ellipsoid.y * 2
        },
    scene);

//    sphere.position = this.position.add(this.ellipsoidOffset);
    sphere.position = this.getAbsolutePosition().add(this.ellipsoidOffset);

    this.ellipsoidMesh = sphere;
    // sphere.showBoundingBox = true;
    sphere.material = new BABYLON.StandardMaterial("collider", scene);
    sphere.material.wireframe = true;
    sphere.material.diffuseColor = BABYLON.Color3.Yellow();

    // special barrel ellipsoid checks
    if (this.name == "barrel" || this.name == "barrel2") {
        sphere.material.diffuseColor = BABYLON.Color3.Green();
        console.log("barrel.ellipsoid: ", this.ellipsoid)
        var sbb = sphere.getBoundingInfo().boundingBox;
        console.log("barrel sphere bb.maximum.scale(2): ", sbb.maximum.scale(2));
    }

    sphere.visibility = .1;
}
if (!String.prototype.format) {
    String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
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
Array.prototype.contains = function() {
    var a = arguments;
    if (a.length == 0 || this.length == 0)
        return false;
    return (this.indexOf(a[0]) !== -1);
}
Array.prototype.getRandom = function() {
    if (this.length == 0)
        return undefined;
    else if (this.length == 1)
        return this[0];
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
Date.prototype.addSeconds = function() {
    var args = arguments;
    if (Number.isInteger(args[0]) && args[0] > 0)
        this.setSeconds(this.getSeconds() + args[0]);
    return this;
};
Date.prototype.addMinutes = function() {
    var args = arguments;
    if (Number.isInteger(args[0]) && args[0] > 0)
        this.setMinutes(this.getMinutes() + args[0]);
    return this;
};
Date.prototype.addHours = function() {
    var args = arguments;
    if (Number.isInteger(args[0]) && args[0] > 0)
        this.setHours(this.getHours() + args[0]);
    return this;
}
Date.prototype.addDate = function() {
    var args = arguments;
    if (Number.isInteger(args[0]) && args[0] > 0)
        this.setDate(this.getDate() + args[0]);
    return this;
}
Map.prototype.flip = function() {
    if (!(this instanceof Map))
        return undefined;
    
    var tmpMap = new Map();
    
    this.forEach(function(val, key) {
        tmpMap.set(val, key);
    });
    
    return tmpMap;
}
Array.prototype.flip = function() {
    if (!(this instanceof Array))
        return undefined;
    
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
    if (this.length != args[0].length) return false;
    var length = args[0].length;
    for (var i = 0; i < length; i++) {
        if (this[i] !== args[0][i]) return false;
    }
    return true;
}

function genUUIDv4() {
    var uuid = "", i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;

        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += "-"
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid.toUpperCase();
}
function colourNameToHex(_colour) {
    var _colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff","beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#42342a","burlywood":"#deb887","cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff","darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f","darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1","darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff","firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff","gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f","honeydew":"#f0fff0","hotpink":"#ff69b4","indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c","lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2","lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de","lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6","magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee","mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5","navajowhite":"#ffdead","navy":"#000080","oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6","palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080","rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1","saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4","tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0","violet":"#ee82ee","wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5","yellow":"#ffff00","yellowgreen":"#9acd32","emperor":"#525252", "cream":"#FFFDD0"};

    if (typeof _colours[_colour.toLowerCase()] != 'undefined')
        return _colours[_colour.toLowerCase()];

    return undefined;
}

function isInt(n){
    return Number(n) === n && n % 1 === 0;
}
function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

/*if(!jQuery) {
    include_jQuery();
    var $ = jQuery.noConflict();
} else {
    var $ = jQuery;
}*/