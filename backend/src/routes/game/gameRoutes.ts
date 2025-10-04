import express, { Request, Response, Router } from "express"
import { on, WebSocketServer } from "ws";
import { GameManager } from "../../services/game/GameManager";
import { myWebScoketServer } from "../..";
export const router = express.Router();




const gameManager = GameManager.getInstance()
let currentUsers = 0;
myWebScoketServer.on("connection", (webSocket) => {
    console.log("hererer");
    currentUsers++;

    gameManager.addUser(webSocket)
    console.log("one more user connected !", currentUsers)


    webSocket.on("close", () => {
        currentUsers--;
        console.log("user diconeected ", currentUsers);

    })
})

