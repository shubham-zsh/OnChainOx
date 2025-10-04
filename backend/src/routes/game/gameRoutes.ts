import express, { Request, Response, Router } from "express"
import { on, WebSocketServer } from "ws";
import { GameManager } from "../../services/game/GameManager";
export const router = express.Router();


const wss = new WebSocketServer

const gameManager = GameManager.getInstance()
wss.on("connection", (webSocket) => {
    let currentUsers = 0;
    gameManager.addUser(webSocket)
    currentUsers++;
    console.log("one more user connected !", currentUsers)


    webSocket.on("close", () => {
        currentUsers--;
        console.log("user diconeected ", currentUsers);

    })
})

