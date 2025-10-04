import { WebSocket } from "ws";
import { Game } from "./Game";
import { INIT_GAME, MOVE } from "./Messages";

export class GameManager {

    private games: Game[]
    private pendingUser: WebSocket | null
    private users: WebSocket[]
    private static instance: GameManager | null

    constructor() {
        this.games = []
        this.pendingUser = null
        this.users = []
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new GameManager();
        }
        return this.instance
    }

    addUser(user: WebSocket) {
        this.users.push(user)
        this.addHandler(user)
    }



    private addHandler(userSocket: WebSocket) {
        userSocket.on("message", (data) => {
            const message = JSON.parse(data.toString())
            if (message.type == INIT_GAME) {
                if (this.pendingUser) {
                    const newGame = new Game(this.pendingUser, userSocket)
                    this.games.push(newGame);
                    this.pendingUser = null;
                    newGame.player1?.send(JSON.stringify({ type: "GAME_START", board: newGame.board, symbol: "X" }));
                    newGame.player2?.send(JSON.stringify({ type: "GAME_START", board: newGame.board, symbol: "O" }));
                }
                else {
                    this.pendingUser = userSocket
                }
            }
            else if (message.type == MOVE) {
                const row = message.row
                const col = message.col
                const game = this.games.find(g => g.player1 === userSocket || g.player2 === userSocket);
                if (!game) return;

                const valid = game.makeMove(row, col);
                if (!valid) return;

                // broadcast updated board
                [game.player1, game.player2].forEach(player => {
                    player?.send(JSON.stringify({
                        type: "UPDATE_BOARD",
                        board: game.board,
                        currentTurn: game.currentTurn,
                        winner: game.winner
                    }));
                });
            }
            else {
                userSocket.send(JSON.stringify({ msg: "Unknow Message" }))
            }

        })
    }
}