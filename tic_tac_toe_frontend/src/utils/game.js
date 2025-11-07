const LINES = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

/**
 * PUBLIC_INTERFACE
 * calculateWinner checks the board and returns 'X' | 'O' | null.
 * @param {Array<('X'|'O'|null)>} board
 * @returns {'X'|'O'|null}
 */
function calculateWinner(board) {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

/**
 * PUBLIC_INTERFACE
 * isDraw returns true when the board is full and no winner exists.
 * @param {Array<('X'|'O'|null)>} board
 * @returns {boolean}
 */
function isDraw(board) {
  return board.every((cell) => cell !== null) && !calculateWinner(board);
}

export { calculateWinner, isDraw, LINES as lines };
