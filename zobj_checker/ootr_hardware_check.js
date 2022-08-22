"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function getAllFiles(dirPath, arrayOfFiles, ext) {
    if (ext === void 0) { ext = "*"; }
    var files = fs_1.default.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
        if (fs_1.default.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles, ext);
        }
        else {
            if (path_1.default.parse(file).ext === ext || ext === "*") {
                arrayOfFiles.push(path_1.default.join(dirPath, "/", file));
            }
        }
    });
    return arrayOfFiles;
}
var ootr_hardware_check = /** @class */ (function () {
    function ootr_hardware_check() {
    }
    ootr_hardware_check.process = function () {
        var root = path_1.default.resolve("..", "oot", "PlayAsPackages");
        var zobjs = getAllFiles(root, [], ".zobj");
        var s = "";
        zobjs.forEach(function (z) {
            var data = fs_1.default.readFileSync(z);
            var age = data.readUInt8(0x500B);
            var size = 0x37800;
            if (age === 1)
                size = 0x2CF80;
            if (data.byteLength > size) {
                console.log("".concat(path_1.default.relative(path_1.default.resolve(".."), z), " is not OotR compatible"));
                s += "".concat(path_1.default.relative(path_1.default.resolve(".."), z), "\n");
            }
        });
        fs_1.default.writeFileSync("./OotR_Incompatible_List.txt", s);
    };
    return ootr_hardware_check;
}());
ootr_hardware_check.process();
