import React, { Component } from 'react';
import Square from '../Square';
import './index.css'

export default class BoardRow extends Component {
  range(start, size) {
    return Array(size).fill().map((_, idx) => start + idx)
  }
  render() {
    const { start, size } = this.props;
    return (
      <div className="board-row">
        {this.range(start, size).map(i => {
          return this.renderSquare(i)
        })}
      </div>
    );
  }
  renderSquare(i) {
    const { squares, onClick, last } = this.props;
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        last={last === i}
      />
    );
  }
}
