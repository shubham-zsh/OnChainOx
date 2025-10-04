import express, { Response, Request } from "express"
import { router as userRouter } from "./routes/user/user"
const app = express();

import cors from "cors";
app.use(cors())
app.use(express.json())
app.use("/user", userRouter)

app.get("/home", (req: Request, res: Response) => {
    res.send("from home")
})



import { createServer } from "http";
import { WebSocketServer } from "ws";


const server = createServer(app);
export const myWebScoketServer = new WebSocketServer({ server })
import "./routes/game/gameRoutes"


server.listen(5100, "0.0.0.0", () => {

    console.log("Server Stared on port number 5100 ")
});