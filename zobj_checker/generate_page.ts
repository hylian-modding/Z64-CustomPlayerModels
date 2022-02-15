import fs from 'fs';
import path from 'path';

let categories: string[] = ["Adult", "Child", "Combined", "Failed to parse"];

let directories: string[] = [path.resolve("./oot/pak")];

interface Pak{
    name: string;
    game: string;
    category: string;
}

let paks: Pak[] = [];

function process(game: string){
    for (let i = 0; i < directories.length; i++){
        let dir = directories[i];
        fs.readdirSync(dir).forEach((f: string)=>{
            let file: string = path.resolve(dir, f);
            if (!fs.existsSync(file)) return;
            if (path.parse(file).ext !== ".pak") return;
            let cat = "";
            for (let j = 0; j < categories.length; j++){
                if (file.indexOf(categories[j]) > -1){
                    cat = categories[j];
                    break;
                }
            }
            if (cat === ""){
                cat = categories[3];
            }
            paks.push({name: path.parse(file).name, game, category: cat});
        });
    }
}

process("Oot");
directories = [path.resolve("./mm/pak")];
process("MM");
directories = [path.resolve("./combined/pak")];
process("Oot/MM");

let str = `<html><head><style>
table, th, td {
  border:1px solid black;
}
</style></head><body>\n`;
str += "<table>\n";
str += "<tr><th>Pak</th><th>Game</th><th>Category</th><th>URL</th></tr>";

function getURL(pak: Pak){
    let g = "";
    if (pak.game === "Oot") g = "oot";
    if (pak.game === "MM") g = "mm";
    if (pak.game === "Oot/MM") g = "combined";
    return `https://github.com/hylian-modding/Z64-CustomPlayerModels/raw/master/${g}/pak/${pak.name}.pak`;
}

for (let i = 0; i < paks.length; i++){
    str += `<tr><td>${paks[i].name}</td><td>${paks[i].game}</td><td>${paks[i].category}</td><td><a href="${getURL(paks[i])}">Download</a></td></tr>\n`;
}
str += `</body></html>`;

fs.writeFileSync("./paks.html", str);