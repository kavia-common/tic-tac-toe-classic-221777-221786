import React, { useMemo, useState } from 'react';
import './App.css';
import './index.css';
import StatusBar from './components/StatusBar';
import Board from './components/Board';
import Controls from './components/Controls';
import { calculateWinner, isDraw } from './utils/game';

/**
 * PUBLIC_INTERFACE
 * App is the root component for the Tic Tac Toe game.
 * Manages board state, current player, winner/draw status, and reset logic.
 */
function App() {
  // Board is an array of 9 values: 'X' | 'O' | null
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');

  // Winner is computed from the current board
  const winner = useMemo(() => calculateWinner(board), [board]);
  const draw = useMemo(() => !winner && isDraw(board), [board, winner]);

  // Optional feature flags (default off)
  const featureFlags = useMemo(() => {
    try {
      const raw = process.env.REACT_APP_FEATURE_FLAGS;
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }, []);

  /**
   * Handle click on a square.
   * - Ignore if there is already a value in the cell or the game is over.
   */
  const handleSquareClick = (index) => {
    if (board[index] || winner) return;
    setBoard((prev) => {
      const next = [...prev];
      next[index] = currentPlayer;
      return next;
    });
    setCurrentPlayer((p) => (p === 'X' ? 'O' : 'X'));
  };

  /**
   * PUBLIC_INTERFACE
   * Reset the game to initial state.
   */
  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
  };

  return (
    <div className="app-root">
      <div className="game-container" role="application" aria-label="Tic Tac Toe game">
        <StatusBar currentPlayer={currentPlayer} winner={winner} draw={draw} />
        <Board
          board={board}
          onSquareClick={handleSquareClick}
          disabled={Boolean(winner) || draw}
        />
        <Controls onReset={handleReset} />
        {featureFlags?.showFooterNote ? (
          <p className="footer-note" aria-hidden="true">
            Local two-player mode • No network calls
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default App;
