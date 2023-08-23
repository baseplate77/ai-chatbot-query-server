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
const chatRouter = express_1.default.Router();
chatRouter.get("/chat/:id.js", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (id === undefined || id === "")
        res.status(500).send("not a vaild url");
    const docRef = (0, firestore_1.doc)(firebase_1.db, `/chatbots/${id}`);
    let data;
    try {
        data = (yield (0, firestore_1.getDoc)(docRef)).data();
        if (data === undefined)
            throw "invalid chat id was passed";
        console.log("data :", data);
    }
    catch (error) {
        console.log("error in chat due to :", error);
        res.status(500).send(`error in chat due to : ${error}`);
    }
    let filePath = path_1.default.join(__dirname, "..", "utils", "iframeScript.js");
    const dataTemplate = {
        chatbotId: id,
        welcomeMsg: data.botConfig.welcomeMsg,
        botIcon: data.botConfig.botIcon,
        primaryColor: data.botConfig.primaryColor,
        showToolTip: data.botConfig.showToolTip,
        brightness: data.botConfig.primaryColor.includes("ffffff")
            ? "brightness(0)"
            : "brightness(1)",
    };
    let s = yield (0, template_file_1.renderFile)(filePath, dataTemplate);
    res.set("Content-Type", "application/javascript"); // Set the response content type as JavaScript
    res.send(s);
}));
exports.default = chatRouter;
