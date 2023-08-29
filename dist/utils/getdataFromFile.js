"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataFromFile = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getDataFromFile = (chatbotId, currTime) => {
    let filePath = path_1.default.join("chatbots", `${chatbotId}.json`);
    try {
        let cacheData = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        // console.log("cach Data :", cacheData);
        if (cacheData.expriesAt >= currTime) {
            console.log("cached details");
            return cacheData["data"];
        }
    }
    catch (error) {
        console.log("error in getting File");
    }
    return;
};
exports.getDataFromFile = getDataFromFile;
