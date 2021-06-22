"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zzplayas_to_zzconvert = void 0;
var smart_buffer_1 = require("smart-buffer");
var fs_1 = __importDefault(require("fs"));
var adult_map_1 = require("./adult_map");
var child_map_1 = require("./child_map");
var zzplayas_to_zzconvert = /** @class */ (function () {
    function zzplayas_to_zzconvert() {
    }
    zzplayas_to_zzconvert.prototype.convert_adult = function (buf) {
        var out = new smart_buffer_1.SmartBuffer();
        out.writeBuffer(buf);
        var template = fs_1.default.readFileSync("./zobjs/zzconvert_adult_template.zobj");
        out.writeBuffer(template);
        var n = out.toBuffer();
        var start = n.indexOf("!PlayAsManifest0");
        var unwrap = function (buf, start) {
            var cur = buf.readUInt32BE(start + 0x4) - 0x06000000;
            while (cur >= 0x5000 && cur <= 0x5800) {
                cur = buf.readUInt32BE(cur + 0x4) - 0x06000000;
            }
            return cur;
        };
        adult_map_1.TRANSLATION_MAP_ADULT.forEach(function (manifest, lut) {
            var lut_offset = adult_map_1.LUT_MAP_ADULT.get(lut);
            var manifest_offset = adult_map_1.MANIFEST_MAP_ADULT.get(manifest) + start;
            if (buf.readUInt8(lut_offset) === 0xDE) {
                n.writeUInt32BE(unwrap(buf, lut_offset), manifest_offset);
                console.log(unwrap(buf, lut_offset).toString(16) + " to " + manifest);
            }
            else {
                var cur = buf.readUInt8(lut_offset);
                var advance = 0x0;
                while (cur !== 0xDE) {
                    advance += 0x8;
                    cur = buf.readUInt8(lut_offset + advance);
                }
                n.writeUInt32BE(unwrap(buf, (lut_offset + advance)), manifest_offset);
                console.log(manifest);
                console.log(unwrap(buf, lut_offset + advance).toString(16) + " to " + manifest);
            }
        });
        n.writeUInt32BE(0x06005380, 0x500C);
        return n;
    };
    zzplayas_to_zzconvert.prototype.convert_child = function (buf) {
        var out = new smart_buffer_1.SmartBuffer();
        out.writeBuffer(buf);
        var template = fs_1.default.readFileSync("./zobjs/zzconvert_child_template.zobj");
        out.writeBuffer(template);
        var n = out.toBuffer();
        var start = n.indexOf("!PlayAsManifest0");
        var unwrap = function (buf, start) {
            var cur = buf.readUInt32BE(start + 0x4) - 0x06000000;
            while (cur >= 0x5000 && cur <= 0x5800) {
                cur = buf.readUInt32BE(cur + 0x4) - 0x06000000;
            }
            return cur;
        };
        child_map_1.TRANSLATION_MAP_CHILD.forEach(function (manifest, lut) {
            var lut_offset = child_map_1.LUT_MAP_CHILD.get(lut);
            var manifest_offset = child_map_1.MANIFEST_MAP_CHILD.get(manifest) + start;
            if (buf.readUInt8(lut_offset) === 0xDE) {
                n.writeUInt32BE(unwrap(buf, lut_offset), manifest_offset);
                console.log(unwrap(buf, lut_offset).toString(16) + " to " + manifest);
            }
            else {
                var cur = buf.readUInt8(lut_offset);
                var advance = 0x0;
                while (cur !== 0xDE) {
                    advance += 0x8;
                    cur = buf.readUInt8(lut_offset + advance);
                }
                n.writeUInt32BE(unwrap(buf, (lut_offset + advance)), manifest_offset);
                console.log(manifest);
                console.log(unwrap(buf, lut_offset + advance).toString(16) + " to " + manifest);
            }
        });
        n.writeUInt32BE(0x060053A8, 0x500C);
        return n;
    };
    return zzplayas_to_zzconvert;
}());
exports.zzplayas_to_zzconvert = zzplayas_to_zzconvert;
