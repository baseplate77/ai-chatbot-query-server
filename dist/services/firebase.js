"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIRE_APIKEY,
    authDomain: process.env.FIRE_AUTHDOMAIN,
    projectId: process.env.FIRE_PROJECTID,
    storageBucket: process.env.FIRE_STORAGEBUCKET,
    messagingSenderId: process.env.FIRE_MESSAGINGSENDERID,
    appId: process.env.FIRE_APPID,
    measurementId: process.env.FIRE_MEASUREMENTID,
};
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.db = (0, firestore_1.getFirestore)(app);
