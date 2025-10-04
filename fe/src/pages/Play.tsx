import React, { useEffect, useState } from "react";

const Play: React.FC = () => {
  const [currentTurn, setCurrentTurn] = useState<"X" | "O">("X");
  const [symbol, setSymbol] = useState<"X" | "O" | null>(null); // your symbol
  const [socket, setSocket] = useState<WebSocket | null>(null);
  // 3x3 board state, initially empty
  const [board, setBoard] = useState<string[][]>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  useEffect(() => {
    console.log("herere");

    const ws = new WebSocket("wss://172.20.10.2:5100");

    ws.onopen = () => {
      console.log("Connected to server");
      ws.send(JSON.stringify({ type: "init_game" })); // tell backend you want to play
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Message from server:", message);

      if (message.type === "GAME_START") {
        setBoard(message.board);
        setSymbol(message.symbol); // assign "X" or "O" to this player
        setCurrentTurn(message.c); // X always starts
      }

      if (message.type === "UPDATE_BOARD") {
        message.winner == "X" ? alert("X WINS !") : alert(" O Wins !");
        setBoard(message.board);

        setCurrentTurn(message.currentTurn);
      }

      if (message.type === "WAIT") {
        alert("wait a moment , we'r finding opponent !");
      }

      // if (message.type === "OPPONENT_LEFT") {
      //   alert("Your opponent left the game!");
      // }
    };

    ws.onclose = () => {
      console.log("Disconnected from server");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  // Handle cell click
  const handleClick = (row: number, col: number) => {
    if (board[row][col] !== "") return; // ignore if already filled
    if (currentTurn != symbol) return;

    socket?.send(JSON.stringify({ type: "move", row, col }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-2xl mb-4">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-2">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleClick(rowIndex, colIndex)}
              className="w-24 h-24 flex items-center justify-center text-4xl bg-gray-700 hover:bg-gray-600 cursor-pointer border border-gray-500"
            >
              {cell}
            </div>
          ))
        )}
      </div>
      <p className="mt-4">Current Turn: {currentTurn}</p>
    </div>
  );
};

export default Play;
