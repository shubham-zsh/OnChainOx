"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Game_1 = require("./Game");
const Messages_1 = require("./Messages");
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new GameManager();
        }
        return this.instance;
    }
    addUser(user) {
        this.users.push(user);
        this.addHandler(user);
    }
    addHandler(userSocket) {
        userSocket.on("message", (data) => {
            var _a, _b;
            const message = JSON.parse(data.toString());
            console.log("new message recived : ", message);
            if (message.type == Messages_1.INIT_GAME) {
                if (this.pendingUser) {
                    const newGame = new Game_1.Game(this.pendingUser, userSocket);
                    this.games.push(newGame);
                    this.pendingUser = null;
                    (_a = newGame.player1) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ type: "GAME_START", board: newGame.board, symbol: "X", currentTurn: "X" }));
                    (_b = newGame.player2) === null || _b === void 0 ? void 0 : _b.send(JSON.stringify({ type: "GAME_START", board: newGame.board, symbol: "O", currentTurn: "X" }));
                }
                else {
                    this.pendingUser = userSocket;
                    userSocket === null || userSocket === void 0 ? void 0 : userSocket.send(JSON.stringify({ type: "WAIT" }));
                }
            }
            else if (message.type == Messages_1.MOVE) {
                const row = message.row;
                const col = message.col;
                const game = this.games.find(g => g.player1 === userSocket || g.player2 === userSocket);
                if (!game)
                    return;
                const valid = game.makeMove(row, col);
                if (!valid) {
                    userSocket.send(JSON.stringify({ msg: "Not  valid move" }));
                    return;
                }
                // broadcast updated board
                [game.player1, game.player2].forEach(player => {
                    player === null || player === void 0 ? void 0 : player.send(JSON.stringify({
                        type: "UPDATE_BOARD",
                        board: game.board,
                        currentTurn: game.currentTurn,
                        winner: game.winner
                    }));
                });
            }
            else {
                userSocket.send(JSON.stringify({ msg: "Unknow Message" }));
            }
        });
    }
}
exports.GameManager = GameManager;
