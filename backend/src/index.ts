import express, { Response, Request } from "express"
const app = express();

import cors from "cors"
app.get("/home", (req: Request, res: Response) => {
    res.send("from home")
})

app.use(cors())

import { createServer } from "http";
import { WebSocketServer } from "ws";


const server = createServer(app);
export const myWebScoketServer = new WebSocketServer({ server })
import "./routes/game/gameRoutes"


server.listen(5100, "0.0.0.0", () => {

    console.log("Server Stared on port number 5100 ")
});