"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toPaddedHexString(num, len) {
    let str = num.toString(16);
    return '0'.repeat(len - str.length) + str;
}
exports.toPaddedHexString = toPaddedHexString;
//# sourceMappingURL=toPaddedHexString.js.map