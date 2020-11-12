
import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import Lobby from '../Lobby';
import Board from '../Board';
const ENDPOINT = "http://localhost:4000";

export default class GameMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      players: [],
      socket: socketIOClient(ENDPOINT),
      whoami: '',
      x: '',
      o: '',
      showLobby: true,
      squares: Array(4 * 4 * 4).fill(null),
      xIsNext: true,
      last: null
    }
    this.state.socket.on("clock", time => {
      this.setState({ time: time });
    });
    this.state.socket.on("lobbyplayers", players => {
      this.setState({ players: players });
    });
    this.state.socket.on("startmatch", data => {
      const { whoami } = this.state;
      if (data.x !== whoami && data.o !== whoami) {
        return;
      }
      this.setState({ x: data.x, o: data.o, showLobby: false });
    });
    this.state.socket.on("sendmove", data => {
      const { x, o, squares, xIsNext } = this.state;
      if (data.player !== x && data.player !== o) {
        return;
      }
      console.log(data.player + " played " + data.move);
      squares[data.move] = xIsNext ? 'X' : 'O';
      this.setState({
        squares: squares,
        xIsNext: !xIsNext,
        last: data.move
      });
    });
  }

  submitNameForm(name) {
    this.setState({ whoami: name });
    this.state.socket.emit("newplayer", name);
  }

  sendChallenge(name) {
    this.state.socket.emit("sendchallenge", { whoami: this.state.whoami, challenge: name });
  }

  sendMove(move) {
    this.state.socket.emit("sendmove", { whoami: this.state.whoami, move: move });
  }

  render() {
    return (
      <div className="game-master">
        <Lobby
          show={this.state.showLobby}
          submitNameForm={(name) => this.submitNameForm(name)}
          sendChallenge={(name) => this.sendChallenge(name)}
          parentState={this.state}
        />
        <Board
          show={(!this.state.showLobby)}
          parentState={this.state}
          sendMove={(move) => this.sendMove(move)}
        />
      </div>
    );
  }
}
