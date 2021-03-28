import { zobj_checker } from "./zobj_checker";
import fs from 'fs';

let checker: zobj_checker = new zobj_checker();

let buf: Buffer = fs.readFileSync(process.argv[2]);

checker.check(buf);