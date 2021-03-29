"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template_parser = void 0;
var template_parser = /** @class */ (function () {
    function template_parser() {
    }
    template_parser.prototype.parse = function (buf) {
        var index = buf.indexOf("!PlayAsManifest0");
        var start = index + 0x10 + 0x2;
        var current = start;
        while (current <= buf.byteLength) {
            var curStr = "";
            while (buf[current] > 0) {
                curStr += Buffer.from(buf[current].toString(16), 'hex').toString();
                current++;
            }
            current += 0x1;
            console.log("Manifest_Map.set(\"" + curStr + "\", 0x" + current.toString(16).toUpperCase() + ");");
            current += 0x4;
        }
    };
    template_parser.prototype.parse2 = function (buf) {
        var text = buf.toString();
        var split = text.split("\n");
        for (var i = 0; i < split.length; i++) {
            var s2 = split[i].split(" ");
            console.log("LM.set(\"LUT_" + s2[0].trim() + "\", " + s2[2].trim().replace(";", " ") + ");");
        }
    };
    return template_parser;
}());
exports.template_parser = template_parser;
