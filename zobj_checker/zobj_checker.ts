export class zobj_checker{

    check(buf: Buffer){
        let MLHeaderIndex: number = buf.indexOf("MODLOADER64");
        let hasMLHeader: boolean = MLHeaderIndex > -1;
        let hasPlayasData: boolean = buf.indexOf("!PlayAsManifest") > -1;
        console.log("-----------")
        console.log("ZOBJ Report")
        console.log("-----------")
        console.log("is zzplayas: " + hasMLHeader.toString());
        console.log("is zzconvert: " + hasPlayasData.toString());
        console.log("-----------")
        return hasMLHeader && !hasPlayasData;
    }

}