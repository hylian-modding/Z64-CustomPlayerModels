"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var zobj_checker_1 = require("./zobj_checker");
var fs_1 = __importDefault(require("fs"));
var checker = new zobj_checker_1.zobj_checker();
var buf = fs_1.default.readFileSync(process.argv[2]);
checker.check(buf);
