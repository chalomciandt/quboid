import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
      className={`square square-${props.value} ${props.last ? 'square-last' : ''} `}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class BoardRow extends Component {
  range(start, size) {
    return Array(size).fill().map((_, idx) => start + idx)
  }
  render() {
    const { start, size} = this.props;
    return (
      <div className="board-row">
        {this.range(start, size).map(i => {
          return this.renderSquare(i)
        })}
      </div>
    );
  }
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        last={this.props.last === i}
      />
    );
  }

}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(4 * 4 * 4).fill(null),
      xIsNext: true,
      last: null
    }
  }

  render() {
    const winner = calculateWinner(this.state.squares, this.state.last);
    const whosNext = this.state.xIsNext ? 'X' : 'O';
    const played = this.state.squares.filter((i) => i !== null).length;
    let status, classComplement;

    if (winner) {
      status = 'Winner: ' + winner;
      classComplement = winner;
    } else if (played === 4 * 4 * 4) {
      status = 'Draw!';
      classComplement = 'DRAW';
    } else {
      status = 'Next player: ' + whosNext;
      classComplement = whosNext;
    }

    return (
      <div>
        <div className={`status status-${classComplement}`}>{status}</div>
          {
            [0, 1, 2, 3].map(layer => {
              return (
              <div key={layer} className="board-layer">
                  {[0, 1, 2, 3].map(i => {
                    return <BoardRow
                          key={i}
                          start={4 * i + 16 * layer}
                          size={4}
                          squares={this.state.squares}
                          onClick={(i) => this.handleClick(i)}
                          last={this.state.last}
                        />;
                  })}
              </div>
              );
            })
          }
      </div>
    );
  }

  handleClick(i) {
    const { squares, xIsNext, last } = this.state;
    if (calculateWinner(squares, last) || squares[i] !== null) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !xIsNext,
      last: i
    });
  }
}

class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

function toXYZ(i) {
  const z = Math.floor(i / 16);
  const rem = i % 16;
  const y = Math.floor(rem / 4);
  const x = rem % 4;
  return {x:x, y:y, z:z};
}

function toI(x, y, z) {
  return 16 * z + 4 * y + x;
}

function calculateWinner(squares, last) {
  const {x, y, z} = toXYZ(last);
  console.log(last);

  // has anyone won in lines?
  let matching = 0;
  for (let j = 0; j < 4; j++) {
    if(squares[toI(j, y, z)] === squares[last]) {
      matching++;
    }
  }
  if (matching === 4) {
    return squares[last];
  }
  // has anyone won in columns?
  matching = 0;
  for (let j = 0; j < 4; j++) {
    if (squares[toI(x, j, z)] === squares[last]) {
      matching++;
    }
  }
  if (matching === 4) {
    return squares[last];
  }
  // has anyone won in layers?
  matching = 0;
  for (let j = 0; j < 4; j++) {
    if (squares[toI(x, y, j)] === squares[last]) {
      matching++;
    }
  }
  if (matching === 4) {
    return squares[last];
  }
  // has anyone won in xy diag?
  matching = 0;
  if (x === y) {
    for (let j = 0; j < 4; j++) {
      if (squares[toI(j, j, z)] === squares[last]) {
        matching++;
      }
    }
    if (matching === 4) {
      return squares[last];
    }
  }
  // counter-diag...
  if (x === 3 - y) {
    for (let j = 0; j < 4; j++) {
      if (squares[toI(j, 3 - j, z)] === squares[last]) {
        matching++;
      }
    }
    if (matching === 4) {
      return squares[last];
    }
  }
  // has anyone won in xz diag?
  matching = 0;
  if (x === z) {
    for (let j = 0; j < 4; j++) {
      if (squares[toI(j, y, j)] === squares[last]) {
        matching++;
      }
    }
    if (matching === 4) {
      return squares[last];
    }
  }
  // counter-diag...
  if (x === 3 - z) {
    for (let j = 0; j < 4; j++) {
      if (squares[toI(j, y, 3 - j)] === squares[last]) {
        matching++;
      }
    }
    if (matching === 4) {
      return squares[last];
    }
  }
  // has anyone won in yz diag?
  matching = 0;
  if (y === z) {
    for (let j = 0; j < 4; j++) {
      if (squares[toI(x, j, j)] === squares[last]) {
        matching++;
      }
    }
    if (matching === 4) {
      return squares[last];
    }
  }
  // counter-diag...
  if (y === 3 - z) {
    for (let j = 0; j < 4; j++) {
      if (squares[toI(x, j, 3 - j)] === squares[last]) {
        matching++;
      }
    }
    if (matching === 4) {
      return squares[last];
    }
  }
  // FINALLY, x = y = z, x = y = -z, etc...
  matching = 0;
  if (x === y && x === z) {
    for (let j = 0; j < 4; j++) {
      if (squares[toI(j, j, j)] === squares[last]) {
        matching++;
      }
    }
    if (matching === 4) {
      return squares[last];
    }
  }
  if (x === y && x === 3 - z) {
    for (let j = 0; j < 4; j++) {
      if (squares[toI(j, j, 3 - j)] === squares[last]) {
        matching++;
      }
    }
    if (matching === 4) {
      return squares[last];
    }
  }
  if (x === 3 - y && x === z) {
    for (let j = 0; j < 4; j++) {
      if (squares[toI(j, 3 - j, j)] === squares[last]) {
        matching++;
      }
    }
    if (matching === 4) {
      return squares[last];
    }
  }
  if (x === 3 - y && x === 3 - z) {
    for (let j = 0; j < 4; j++) {
      if (squares[toI(j, 3 - j, 3 - j)] === squares[last]) {
        matching++;
      }
    }
    if (matching === 4) {
      return squares[last];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
