import { zobj_checker } from "./zobj_checker";
import fs from 'fs';
import { zzplayas_to_zzconvert } from "./zzplayas_to_zzconvert";
import path from 'path';

let checker: zobj_checker = new zobj_checker();

let buf: Buffer = fs.readFileSync(process.argv[2]);

if (checker.check(buf)) {
    let convert = new zzplayas_to_zzconvert();
    let id: number = buf.readUInt8(0x500B);
    switch (id) {
        case 0:
            buf = convert.convert_adult(buf);
            break;
        case 1:
            buf = convert.convert_child(buf);
            break;
    }

    let out = path.parse(process.argv[2]);
    fs.writeFileSync(path.resolve(out.dir, `${out.base}`), buf);
}