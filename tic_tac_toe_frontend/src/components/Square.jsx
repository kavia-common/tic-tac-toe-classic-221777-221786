import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Square represents a single cell on the Tic Tac Toe board.
 * Props:
 * - value: 'X' | 'O' | null
 * - index: number (0..8)
 * - disabled: boolean
 * - onClick: (index:number) => void
 */
export default function Square({ value, index, onClick, disabled }) {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;

  const handleClick = () => {
    if (disabled) return;
    onClick(index);
  };

  const ariaLabel = value
    ? `Row ${row} Column ${col}, ${value}`
    : `Row ${row} Column ${col}, empty`;

  return (
    <button
      type="button"
      className={`square ${value === 'X' ? 'x' : value === 'O' ? 'o' : ''}`}
      aria-label={ariaLabel}
      aria-disabled={disabled ? 'true' : 'false'}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {value ?? ''}
    </button>
  );
}
