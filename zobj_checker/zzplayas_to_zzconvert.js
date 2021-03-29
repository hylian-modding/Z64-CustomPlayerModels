"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zzplayas_to_zzconvert = void 0;
var smart_buffer_1 = require("smart-buffer");
var fs_1 = __importDefault(require("fs"));
var zzplayas_to_zzconvert = /** @class */ (function () {
    function zzplayas_to_zzconvert() {
    }
    zzplayas_to_zzconvert.prototype.convert = function (buf) {
        var out = new smart_buffer_1.SmartBuffer();
        out.writeBuffer(buf);
        var template = fs_1.default.readFileSync("./zobjs/zzconvert_adult_template.zobj");
        out.writeBuffer(template);
        var n = out.toBuffer();
        var start = n.indexOf("!PlayAsManifest0");
    };
    return zzplayas_to_zzconvert;
}());
exports.zzplayas_to_zzconvert = zzplayas_to_zzconvert;
