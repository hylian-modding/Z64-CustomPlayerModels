import fs from 'fs';
import path from 'path';

function getAllFiles(dirPath: string, arrayOfFiles: Array<string>, ext: string = "*") {
    let files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach((file) => {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles, ext);
        }
        else {
            if (path.parse(file).ext === ext || ext === "*"){
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}


class ootr_hardware_check{
    static process(){

        const root = path.resolve("..", "oot", "PlayAsPackages");
        let zobjs = getAllFiles(root, [], ".zobj");
        let s = "";
        zobjs.forEach((z: string)=>{
            let data = fs.readFileSync(z);
            let age = data.readUInt8(0x500B);
            let size = 0x37800;
            if (age === 1) size = 0x2CF80;
            if (data.byteLength > size){
                console.log(`${path.relative(path.resolve(".."), z)} is not OotR compatible`);
                s += `${path.relative(path.resolve(".."), z)}\n`;
            } 
        });
        fs.writeFileSync("./OotR_Incompatible_List.txt", s);

    }
}

ootr_hardware_check.process();