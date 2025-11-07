import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Controls renders game control buttons like Reset.
 * Props:
 * - onReset: () => void
 */
export default function Controls({ onReset }) {
  return (
    <div className="controls">
      <button
        type="button"
        className="btn"
        onClick={onReset}
        aria-label="Reset the game"
      >
        Reset
      </button>
    </div>
  );
}
