import React, { useState } from 'react';
import styles from './index.module.scss';
import Square from 'Components/Square/index';

const Board = (props) => {
  const [isFinish, setFinish] = useState(false);
  const [whoWin, setWhoWin] = useState(null);
  const [squares, setSquares] = useState(props.squares);
  const [xIsNext, setNext] = useState('X');
  const [histories, setHistories] = useState([]);

  const renderBoardRow = (rowId, start, end) => {
    const elements = [];

    for (let j = start; j < end; j++) {
      elements.push(renderSquare(j, squares[j]));
    }

    return (
      <div className={ `${styles['board-row']}` } key={rowId} >
        { elements }
      </div>
    )
  }

  const whoIsWin = (newSquares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) {
        setFinish(true);
        setWhoWin(newSquares[a]);
      }
    }
  }

  const renderSquare = (i, val) => {
    return (
      <Square
        value={val}
        index={i}
        key={i.toString()}
        onClick={() => handleClick(i)}
      />
    );
  }

  const handleClick = (squareIndex) => {
    if (null !== squares[squareIndex] || isFinish) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[squareIndex] = xIsNext;


    const newHistories = histories.slice();
    newHistories.push(newSquares)

    setSquares(newSquares);
    setHistories(newHistories);

    if (xIsNext === 'X') {
      setNext('O');
    } else {
      setNext('X');
    }

    whoIsWin(newSquares);
  }

  const divide = 3;
  const items = [];
  const count = (squares.length / divide);

  for (let rowId = 0; rowId < count; rowId++) {
    items.push(renderBoardRow(rowId, (divide * rowId), (divide * rowId) + divide));
  }

  return (
    <div>
      <div>{ `winner: ${whoWin}` }</div>
      <div className="board">
        { items }
      </div>
      <div class="histories">

      </div>
    </div>
  );
}

export default Board;