"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myWebScoketServer = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
app.get("/home", (req, res) => {
    res.send("from home");
});
app.use((0, cors_1.default)());
const http_1 = require("http");
const ws_1 = require("ws");
const server = (0, http_1.createServer)(app);
exports.myWebScoketServer = new ws_1.WebSocketServer({ server });
require("./routes/game/gameRoutes");
server.listen(5100, "0.0.0.0", () => {
    console.log("Server Stared on port number 5100 ");
});
