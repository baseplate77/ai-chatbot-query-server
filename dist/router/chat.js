"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const template_file_1 = require("template-file");
const firebase_1 = require("../services/firebase");
const firestore_1 = require("firebase/firestore");
const fs_1 = __importDefault(require("fs"));
const getdataFromFile_1 = require("../utils/getdataFromFile");
const chatRouter = express_1.default.Router();
chatRouter.get("/invalidate-chatbot-details", (req, res) => {
    const { chatbotId } = req.query;
    console.log("body :", req.query);
    try {
        if (chatbotId === undefined)
            throw "chatbotId is not define";
        let filePath = path_1.default.join("chatbots", `${chatbotId}.json`);
        fs_1.default.unlinkSync(filePath);
        res.send("invalidate");
    }
    catch (error) {
        console.log("unable to remove cache details");
        res.status(500).send(error);
    }
});
chatRouter.get("/chat/:id.js", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    let originUrl = new URL(req.headers.referer).host;
    console.log("origin Url :", originUrl);
    if (id === undefined || id === "")
        res.status(500).send("not a vaild url");
    let currTime = Date.now();
    let data;
    try {
        data = (0, getdataFromFile_1.getDataFromFile)(id, currTime);
        if (data === undefined) {
            console.log("Uncached");
            const docRef = (0, firestore_1.doc)(firebase_1.db, `/chatbots/${id}`);
            data = (yield (0, firestore_1.getDoc)(docRef)).data();
            // console.log("fetch details :", data);
            let d = { data, expriesAt: currTime + 2 * 60 * 60 * 1000 };
            // console.log("cache datails :", d);
            fs_1.default.writeFile(path_1.default.join("chatbots", `${id}.json`), JSON.stringify(d), "utf-8", (err) => {
                if (!err)
                    console.log("error in creating a file", err);
            });
        }
        if (data === undefined)
            throw "invalid chat id was passed";
        // console.log("data :", data);
    }
    catch (error) {
        console.log("error in chat due to :", error);
        res.status(500).send(`error in chat due to : ${error}`);
    }
    let allowedDomains = (_a = data.allowedDomains) !== null && _a !== void 0 ? _a : [];
    allowedDomains.push("http://localhost:3000/");
    allowedDomains.push("https://www.webbotify.com/");
    let index = allowedDomains.findIndex((url) => url.includes(originUrl));
    if (index < 0) {
        throw `ChatBot cannot be integrate on${originUrl}`;
    }
    let filePath = path_1.default.join(__dirname, "..", "utils", "iframeScript.js");
    const dataTemplate = {
        chatbotId: id,
        welcomeMsg: data.botConfig.welcomeMsg,
        botIcon: data.botConfig.botIcon,
        primaryColor: data.botConfig.primaryColor,
        showToolTip: data.botConfig.showToolTip,
        botPosition: data.botConfig.botPosition !== undefined
            ? data.botConfig.botPosition
            : "right",
        brightness: data.botConfig.primaryColor.includes("ffffff")
            ? "brightness(0)"
            : "brightness(1)",
    };
    let s = yield (0, template_file_1.renderFile)(filePath, dataTemplate);
    res.set("Content-Type", "application/javascript"); // Set the response content type as JavaScript
    res.send(s);
}));
exports.default = chatRouter;
