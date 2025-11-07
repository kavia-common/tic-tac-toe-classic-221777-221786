import React from 'react';
import Square from './Square';

/**
 * PUBLIC_INTERFACE
 * Board renders a 3x3 grid of Squares.
 * Props:
 * - board: Array(9) of 'X' | 'O' | null
 * - onSquareClick: (index:number) => void
 * - disabled: boolean (disable interaction when true)
 */
export default function Board({ board, onSquareClick, disabled }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {board.map((val, idx) => (
        <Square
          key={idx}
          value={val}
          index={idx}
          onClick={onSquareClick}
          disabled={disabled || Boolean(val)}
        />
      ))}
    </div>
  );
}
