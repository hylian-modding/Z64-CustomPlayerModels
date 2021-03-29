import { SmartBuffer } from 'smart-buffer';
import fs from 'fs';

export class zzplayas_to_zzconvert {

    convert(buf: Buffer) {
        let out: SmartBuffer = new SmartBuffer();
        out.writeBuffer(buf);
        let template = fs.readFileSync("./zobjs/zzconvert_adult_template.zobj");
        out.writeBuffer(template);
        let n = out.toBuffer();
        let start = n.indexOf("!PlayAsManifest0");
        
    }

}