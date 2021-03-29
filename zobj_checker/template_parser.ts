export class template_parser {

    parse(buf: Buffer): void {
        let index = buf.indexOf("!PlayAsManifest0");
        let start = index + 0x10 + 0x2;
        let current = start;
        while (current <= buf.byteLength) {
            let curStr = "";
            while (buf[current] > 0) {
                curStr += Buffer.from(buf[current].toString(16), 'hex').toString();
                current++;
            }
            current += 0x1;
            console.log("Manifest_Map.set(\"" + curStr + "\", 0x" + current.toString(16).toUpperCase() + ");");
            current += 0x4;
        }
    }

    parse2(buf: Buffer) {
        let text = buf.toString();
        let split = text.split("\n");
        for (let i = 0; i < split.length; i++) {
            let s2 = split[i].split(" ");
            console.log("LM.set(\"LUT_" + s2[0].trim() + "\", " + s2[2].trim().replace(";", " ") + ");");
        }
    }

}