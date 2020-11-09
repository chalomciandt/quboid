import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
      className={`square square-${props.value}`}
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
          console.log(i)
          return this.renderSquare(i)
        })}
      </div>
    );
  }
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(4 * 4 * 4).fill(null),
      xIsNext: true
    }
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
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
              <div className="board-layer">
                  {[0, 1, 2, 3].map(i => {
                    return <BoardRow
                          start={4 * i + 16 * layer}
                          size={4}
                          squares={this.state.squares}
                          onClick={(i) => this.handleClick(i)}
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
    const { squares, xIsNext } = this.state;
    if (calculateWinner(squares) || squares[i] !== null) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    this.setState({squares: squares, xIsNext: !xIsNext});
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

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
