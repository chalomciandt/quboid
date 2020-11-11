import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from "socket.io-client";
import Board from './components/Board';
import Lobby from './components/Lobby';
import './index.css';

const ENDPOINT = "http://localhost:4000";

class GameMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      players: [],
      socket: socketIOClient(ENDPOINT),
      whoami: '',
      showLobby: true
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
      this.setState({ showLobby: false });
    });
  }

  submitNameForm(name) {
    this.setState({ whoami: name });
    this.state.socket.emit("newplayer", name);
  }

  sendChallenge(name) {
    this.state.socket.emit("sendchallenge", {whoami: this.state.whoami, challenge: name});
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
          show={(! this.state.showLobby)}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <GameMaster />,
  document.getElementById('root')
);
