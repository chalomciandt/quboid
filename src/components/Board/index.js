import React, { Component } from 'react';
import './index.css';
import BoardRow from '../BoardRow';
import calculateWinner from './calculateWinner';

export default class Board extends Component {
  nextPlayer() {
    const { x, o, xIsNext } = this.props.parentState;
    if (xIsNext) {
      return x;
    }
    return o;
  }

  renderStatus() {
    const { x, o, whoami, squares, xIsNext, last } = this.props.parentState;
    const winner = calculateWinner(squares, last);
    const whosNext = xIsNext ? 'X' : 'O';
    const played = squares.filter((i) => i !== null).length;
    let status, classComplement;

    if (winner) {
      const winnername = (winner === 'X' ? x : o);
      status = 'Winner: ' + winnername;
      classComplement = winner;
    } else if (played === 4 * 4 * 4) {
      status = 'Draw!';
      classComplement = 'DRAW';
    } else {
      if (this.nextPlayer() === whoami) {
        status = 'Your move!'
      } else {
        const waiting = (whosNext === 'X' ? x : o);
        status = 'Waiting for ' + waiting;
      }
      classComplement = whosNext;
    }

    return { status: status, classComplement: classComplement };
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    const { x, o, squares, last } = this.props.parentState;
    const { status, classComplement } = this.renderStatus();

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
        <p className="players">
          <span className="status-X">{x}</span> vs <span className="status-O">{o}</span>
        </p>
      </div>
    );
  }

  handleClick(i) {
    const { squares, last, whoami } = this.props.parentState;
    if (calculateWinner(squares, last) || squares[i] !== null) {
      return;
    }
    if (this.nextPlayer() !== whoami) {
      return;
    }

    this.props.sendMove(i);
  }
}
