"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const GameManager_1 = require("../../services/game/GameManager");
const __1 = require("../..");
exports.router = express_1.default.Router();
const gameManager = GameManager_1.GameManager.getInstance();
let currentUsers = 0;
__1.myWebScoketServer.on("connection", (webSocket) => {
    console.log("hererer");
    currentUsers++;
    gameManager.addUser(webSocket);
    console.log("one more user connected !", currentUsers);
    webSocket.on("close", () => {
        currentUsers--;
        console.log("user diconeected ", currentUsers);
    });
});
