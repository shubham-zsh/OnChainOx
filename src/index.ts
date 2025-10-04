import express, { Response, Request } from "express"

const app = express();

app.get("/home", (req: Request, res: Response) => {
    res.send("from home")
})

app.listen(5100, () => {
    console.log("be started..")
});