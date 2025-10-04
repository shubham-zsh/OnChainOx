"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
        this.moveCount = 0;
        this.currentTurn = "X";
        this.winner = null;
    }
    makeMove(row, col) {
        // ✅ validate move
        if (this.winner || this.board[row][col] !== "")
            return false;
        this.board[row][col] = this.currentTurn;
        // ✅ check for winner
        if (this.checkWinner()) {
            this.winner = this.currentTurn;
        }
        else if (this.isDraw()) {
            this.winner = "draw";
        }
        else {
            // ✅ switch turn
            this.currentTurn = this.currentTurn === "X" ? "O" : "X";
        }
        return true;
    }
    checkWinner() {
        const b = this.board;
        const lines = [
            // rows
            [b[0][0], b[0][1], b[0][2]],
            [b[1][0], b[1][1], b[1][2]],
            [b[2][0], b[2][1], b[2][2]],
            // columns
            [b[0][0], b[1][0], b[2][0]],
            [b[0][1], b[1][1], b[2][1]],
            [b[0][2], b[1][2], b[2][2]],
            // diagonals
            [b[0][0], b[1][1], b[2][2]],
            [b[0][2], b[1][1], b[2][0]],
        ];
        return lines.some((line) => line[0] !== "" && line[0] === line[1] && line[1] === line[2]);
    }
    isDraw() {
        return this.board.flat().every((cell) => cell !== "");
    }
}
exports.Game = Game;
