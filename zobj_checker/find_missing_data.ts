import fs from 'fs';
import path from 'path';
import child_process from 'child_process';

function getAllFiles(dirPath: string, arrayOfFiles: Array<string>, ext: string = "*") {
    let files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach((file) => {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles, ext);
        }
        else {
            if (path.parse(file).ext === ext || ext === "*") {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

const root = path.resolve("..", "oot", "PlayAsPackages");

console.log(root);

getAllFiles(root, [], ".zobj").forEach((z: string) => {
    //console.log(`node ./index.js "${z}"`);
    child_process.execSync(`node ./index.js "${z}"`, { stdio: 'inherit' });
});