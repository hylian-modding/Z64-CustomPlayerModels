"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zobj_checker = void 0;
var zobj_checker = /** @class */ (function () {
    function zobj_checker() {
    }
    zobj_checker.prototype.check = function (buf) {
        var MLHeaderIndex = buf.indexOf("MODLOADER64");
        var hasMLHeader = MLHeaderIndex > -1;
        var hasPlayasData = buf.indexOf("!PlayAsManifest") > -1;
        console.log("-----------");
        console.log("ZOBJ Report");
        console.log("-----------");
        console.log("is zzplayas: " + hasMLHeader.toString());
        console.log("is zzconvert: " + hasPlayasData.toString());
        console.log("-----------");
        return hasMLHeader && !hasPlayasData;
    };
    return zobj_checker;
}());
exports.zobj_checker = zobj_checker;
