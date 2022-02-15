import fs from 'fs';
import path from 'path';
import child_process from 'child_process';

let categories: string[] = ["adult", "child", "combined", "Failed to parse"];

let directories: string[] = [path.resolve("./oot/pak")];

interface Pak{
    name: string;
    game: string;
    author: string;
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
                let f = file.toLowerCase();
                if (f.indexOf(categories[j]) > -1){
                    cat = categories[j];
                    break;
                }
            }
            if (cat === ""){
                cat = categories[3];
                console.log(`Failed to parse ${file} correctly.`);
            }
            try{
                fs.mkdirSync("./temp");
            }catch(err){}
            child_process.execSync(`paker -i "${file}" -o ./temp`);
            let _dir = fs.readdirSync("./temp")[0];
            let p = path.resolve("./temp", _dir, "package.json");
            let meta = JSON.parse(fs.readFileSync(p).toString());
            if (meta.author === "Team-Ooto") meta.author = "";
            paks.push({name: meta.name, game, category: cat, author: meta.author});
            fs.rmdirSync("./temp", {recursive: true});
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
str += "<tr><th>Pak</th><th>Author</th><th>Game</th><th>Category</th><th>URL</th></tr>";

function getURL(pak: Pak){
    let g = "";
    if (pak.game === "Oot") g = "oot";
    if (pak.game === "MM") g = "mm";
    if (pak.game === "Oot/MM") g = "combined";
    return `https://github.com/hylian-modding/Z64-CustomPlayerModels/raw/master/${g}/pak/${pak.name}.pak`;
}

for (let i = 0; i < paks.length; i++){
    str += `<tr><td>${paks[i].name}</td><td>${paks[i].author}</td><td>${paks[i].game}</td><td>${paks[i].category}</td><td><a href="${getURL(paks[i])}">Download</a></td></tr>\n`;
}
str += `</body></html>`;

fs.writeFileSync("./paks.html", str);