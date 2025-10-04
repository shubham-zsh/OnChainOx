import express, { Response, Request } from "express"

const app = express();

app.get("/home", (req: Request, res: Response) => {
    res.send("from home")
})


import { createServer } from "http";
import { WebSocketServer } from "ws";
import { GameManager } from "./services/game/GameManager";

const server = createServer(app);
export const myWebScoketServer = new WebSocketServer({ server })


server.listen(5100, () => {

    console.log("be started..")
});