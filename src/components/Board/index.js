import React, { Component } from 'react';
import './index.css';
import BoardRow from '../BoardRow';
import calculateWinner from './calculateWinner';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(4 * 4 * 4).fill(null),
      xIsNext: true,
      last: null
    }
  }

  render() {
    const { squares, xIsNext, last } = this.state;
    const winner = calculateWinner(squares, last);
    const whosNext = xIsNext ? 'X' : 'O';
    const played = squares.filter((i) => i !== null).length;
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
      <div className={"game " + (this.props.show ? 'show' : '')}>
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
                    squares={squares}
                    onClick={(i) => this.handleClick(i)}
                    last={last}
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
