"use client";

import React from "react";

type Player = "X" | "O";
type SquareValue = Player | null;

type Move = {
  index: number;
  player: Player;
};

function calculateWinner(squares: SquareValue[]): {
  winner: Player | null;
  line: number[] | null;
} {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

function getStatusText(
  squares: SquareValue[],
  xIsNext: boolean,
  winner: Player | null
): string {
  if (winner) return `Winner: ${winner}`;
  if (squares.every((s) => s !== null)) return "Draw";
  return `Next player: ${xIsNext ? "X" : "O"}`;
}

function Play() {
  // Board state
  const [squares, setSquares] = React.useState<SquareValue[]>(
    Array(9).fill(null)
  );
  // Track player turn
  const [xIsNext, setXIsNext] = React.useState<boolean>(true);
  const [moves, setMoves] = React.useState<Move[]>([]);
  // Winner state
  const { winner, line } = React.useMemo(
    () => calculateWinner(squares),
    [squares]
  );

  const isDraw = !winner && squares.every((s) => s !== null);
  const status = getStatusText(squares, xIsNext, winner);

  function handleSquareClick(index: number) {
    if (winner || squares[index] !== null) return;
    setSquares((prev) => {
      const next = prev.slice();
      const player: Player = xIsNext ? "X" : "O";
      next[index] = player;
      return next;
    });
    setMoves((prev) => [...prev, { index, player: xIsNext ? "X" : "O" }]);
    setXIsNext((prev) => !prev);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setMoves([]);
  }

  function handleUndoLast() {
    if (moves.length === 0 || winner) {
      // Allow undo even if there is a winner? We'll allow it for flexibility.
      if (moves.length === 0) return;
    }
    setMoves((prev) => {
      const next = prev.slice(0, -1);
      // Rebuild board from remaining moves to keep logic consistent
      const rebuilt = Array<SquareValue>(9).fill(null);
      for (const m of next) rebuilt[m.index] = m.player;
      setSquares(rebuilt);
      setXIsNext(next.length % 2 === 0); // X starts, so even count => X's turn
      return next;
    });
  }

  return (
    <main className="min-h-svh bg-background text-foreground flex items-center justify-center p-6">
      <section className="w-full max-w-xl" aria-labelledby="tictactoe-heading">
        <header className="mb-6">
          <h1
            id="tictactoe-heading"
            className="text-pretty text-2xl font-semibold tracking-tight"
          >
            Tic-Tac-Toe
          </h1>
          <p className="mt-2 text-sm">{status}</p>
        </header>

        <div className="grid md:grid-cols-[2fr_1fr] gap-6">
          {/* Board */}
          <div>
            <div
              role="grid"
              aria-label="Tic-Tac-Toe board"
              className="grid grid-cols-3 gap-0 border border-border rounded-md overflow-hidden"
            >
              {squares.map((value, i) => {
                const isWinning = line?.includes(i) ?? false;
                return (
                  <button
                    key={i}
                    role="gridcell"
                    aria-label={`Square ${i + 1} ${
                      value ? `with ${value}` : "empty"
                    }`}
                    aria-pressed={Boolean(value)}
                    onClick={() => handleSquareClick(i)}
                    className={[
                      "aspect-square",
                      "flex items-center justify-center",
                      "text-3xl font-mono",
                      "transition-colors",
                      // borders to create the classic grid (already have outer border)
                      i % 3 !== 2 ? "border-r border-border" : "",
                      i < 6 ? "border-b border-border" : "",
                      // theme: pure black/white via tokens
                      "bg-background text-foreground",
                      "hover:bg-foreground hover:text-background",
                      isWinning ? "outline outline-2 outline-foreground" : "",
                    ].join(" ")}
                  >
                    {value}
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={handleReset}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground hover:bg-foreground hover:text-background transition-colors"
                aria-label="Reset game"
              >
                Reset
              </button>
              <button
                onClick={handleUndoLast}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
                aria-label="Undo last move"
                disabled={moves.length === 0}
              >
                Undo Last
              </button>
              <span className="ml-auto text-sm">
                {winner
                  ? `Game Over${isDraw ? " (Draw)" : ""}`
                  : `Turn: ${xIsNext ? "X" : "O"}`}
              </span>
            </div>
          </div>

          {/* Move History (logic array visualization) */}
          <aside className="border border-border rounded-md p-4 bg-background">
            <h2 className="text-base font-semibold mb-2">Moves</h2>
            {moves.length === 0 ? (
              <p className="text-sm">No moves yet.</p>
            ) : (
              <ol className="list-decimal list-inside space-y-1">
                {moves.map((m, idx) => (
                  <li key={`${m.player}-${m.index}-${idx}`} className="text-sm">
                    Move {idx + 1}: {m.player} to square {m.index + 1}
                  </li>
                ))}
              </ol>
            )}
            {winner && (
              <div className="mt-3 text-sm">
                Winning line: {line?.map((n) => n + 1).join(" – ")}
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}

export default Play;
