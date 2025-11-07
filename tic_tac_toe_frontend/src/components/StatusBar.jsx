import React from 'react';

/**
 * PUBLIC_INTERFACE
 * StatusBar displays the current game status:
 * - Next: X/O
 * - Winner: X/O
 * - Draw
 * Props:
 * - currentPlayer: 'X' | 'O'
 * - winner: 'X' | 'O' | null
 * - draw: boolean
 */
export default function StatusBar({ currentPlayer, winner, draw }) {
  let text = `Next: ${currentPlayer}`;
  let cls = 'status-info';

  if (winner) {
    text = `Winner: ${winner}`;
    cls = 'status-winner';
  } else if (draw) {
    text = 'Draw';
    cls = 'status-draw';
  }

  return (
    <div className={`status-bar ${cls}`} role="status" aria-live="polite">
      {text}
    </div>
  );
}
