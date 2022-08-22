"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var child_process_1 = __importDefault(require("child_process"));
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
var root = path_1.default.resolve("..", "oot", "PlayAsPackages");
console.log(root);
getAllFiles(root, [], ".zobj").forEach(function (z) {
    //console.log(`node ./index.js "${z}"`);
    child_process_1.default.execSync("node ./index.js \"".concat(z, "\""), { stdio: 'inherit' });
});
