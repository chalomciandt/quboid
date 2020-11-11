import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import socketIOClient from "socket.io-client";
import Board from './components/Board';
import Clock from './components/Clock';
import NameForm from './components/NameForm';

const ENDPOINT = "http://localhost:4000";

class PlayerList extends Component {
  startChallenge(player) {
    const { whoami } = this.props;
    if (!whoami) {
      alert ("You need to choose a username first!");
    }
    if (whoami === player) {
      alert ("You can't challenge yourself!");
    }
    this.props.sendChallenge(player);
  }
  render() {
    const { players } = this.props;
    return (
      <div className="playerList">
        <p>You're in the player lobby.</p>
        <p>Click on a player name to challenge them!</p>
        {
          players.map(player => {
            return (<div
              key={player}
              className="playerAvatar"
              onClick={() => this.startChallenge(player)}
            >
              <i className="fas fa-2x fa-user-circle"></i>
              <span className="playerName">{player}</span>
            </div>);
          })
        }
      </div>
    );
  }
}

class Lobby extends Component {
  render() {
    return (
      <div className="lobby">
        <Clock
          time={this.props.parentState.time}
        />
        <h1>Welcome to Quboid!</h1>
        <PlayerList
          players={this.props.parentState.players}
          whoami={this.props.parentState.whoami}
          sendChallenge={this.props.sendChallenge}
        />
        <NameForm
          handleSubmit={this.props.submitNameForm}
        />
      </div>
    );
  }
}

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
