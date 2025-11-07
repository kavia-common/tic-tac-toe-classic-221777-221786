import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

function getSquares() {
  // squares have role button
  return screen.getAllByRole('button').filter(btn => /Row \d+ Column \d+/.test(btn.getAttribute('aria-label') || ''));
}

test('initial status shows Next: X and nine squares', () => {
  render(<App />);
  expect(screen.getByRole('status')).toHaveTextContent(/Next: X/i);
  const squares = getSquares();
  expect(squares).toHaveLength(9);
  squares.forEach(sq => expect(sq).toHaveTextContent(''));
});

test('clicking places marks and prevents overwriting', () => {
  render(<App />);
  const squares = getSquares();

  // X goes first
  fireEvent.click(squares[0]);
  expect(squares[0]).toHaveTextContent('X');
  expect(screen.getByRole('status')).toHaveTextContent(/Next: O/i);

  // O goes second
  fireEvent.click(squares[1]);
  expect(squares[1]).toHaveTextContent('O');
  expect(screen.getByRole('status')).toHaveTextContent(/Next: X/i);

  // Attempt to overwrite should not change
  fireEvent.click(squares[1]);
  expect(squares[1]).toHaveTextContent('O');
});

test('reset clears the board and sets Next: X', () => {
  render(<App />);
  const squares = getSquares();
  fireEvent.click(squares[0]); // X
  fireEvent.click(screen.getByRole('button', { name: /reset the game/i }));
  squares.forEach(sq => expect(sq).toHaveTextContent(''));
  expect(screen.getByRole('status')).toHaveTextContent(/Next: X/i);
});

test('winner updates status to Winner: X', () => {
  render(<App />);
  const squares = getSquares();

  // X wins top row: 0,1,2
  fireEvent.click(squares[0]); // X
  fireEvent.click(squares[3]); // O
  fireEvent.click(squares[1]); // X
  fireEvent.click(squares[4]); // O
  fireEvent.click(squares[2]); // X -> win

  expect(screen.getByRole('status')).toHaveTextContent(/Winner: X/i);

  // After game over, moves should be disabled
  fireEvent.click(squares[5]); // try to click after winner
  expect(squares[5]).toHaveTextContent('');
});
