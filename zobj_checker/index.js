"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var zobj_checker_1 = require("./zobj_checker");
var fs_1 = __importDefault(require("fs"));
var zzplayas_to_zzconvert_1 = require("./zzplayas_to_zzconvert");
var path_1 = __importDefault(require("path"));
var checker = new zobj_checker_1.zobj_checker();
var buf = fs_1.default.readFileSync(process.argv[2]);
if (checker.check(buf)) {
    var convert = new zzplayas_to_zzconvert_1.zzplayas_to_zzconvert();
    var id = buf.readUInt8(0x500B);
    switch (id) {
        case 0:
            buf = convert.convert_adult(buf);
            break;
        case 1:
            buf = convert.convert_child(buf);
            break;
    }
    var out = path_1.default.parse(process.argv[2]);
    fs_1.default.writeFileSync(path_1.default.resolve(out.dir, "".concat(out.base)), buf);
}
