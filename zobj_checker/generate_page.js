"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var categories = ["Adult", "Child", "Combined", "Failed to parse"];
var directories = [path_1.default.resolve("./oot/pak")];
var paks = [];
function process(game) {
    var _loop_1 = function (i) {
        var dir = directories[i];
        fs_1.default.readdirSync(dir).forEach(function (f) {
            var file = path_1.default.resolve(dir, f);
            if (!fs_1.default.existsSync(file))
                return;
            if (path_1.default.parse(file).ext !== ".pak")
                return;
            var cat = "";
            for (var j = 0; j < categories.length; j++) {
                if (file.indexOf(categories[j]) > -1) {
                    cat = categories[j];
                    break;
                }
            }
            if (cat === "") {
                cat = categories[3];
            }
            paks.push({ name: path_1.default.parse(file).name, game: game, category: cat });
        });
    };
    for (var i = 0; i < directories.length; i++) {
        _loop_1(i);
    }
}
process("Oot");
directories = [path_1.default.resolve("./mm/pak")];
process("MM");
directories = [path_1.default.resolve("./combined/pak")];
process("Oot/MM");
var str = "<html><head><style>\ntable, th, td {\n  border:1px solid black;\n}\n</style></head><body>\n";
str += "<table>\n";
str += "<tr><th>Pak</th><th>Game</th><th>Category</th><th>URL</th></tr>";
function getURL(pak) {
    var g = "";
    if (pak.game === "Oot")
        g = "oot";
    if (pak.game === "MM")
        g = "mm";
    if (pak.game === "Oot/MM")
        g = "combined";
    return "https://github.com/hylian-modding/Z64-CustomPlayerModels/raw/master/" + g + "/pak/" + pak.name + ".pak";
}
for (var i = 0; i < paks.length; i++) {
    str += "<tr><td>" + paks[i].name + "</td><td>" + paks[i].game + "</td><td>" + paks[i].category + "</td><td><a href=\"" + getURL(paks[i]) + "\">Download</a></td></tr>\n";
}
str += "</body></html>";
fs_1.default.writeFileSync("./paks.html", str);
