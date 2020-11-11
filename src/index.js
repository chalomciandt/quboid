import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import socketIOClient from "socket.io-client";
import Board from './components/Board';
import Clock from './components/Clock';
import NameForm from './components/NameForm';

const ENDPOINT = "http://localhost:4000";

class PlayerList extends Component {
  render() {
    const { players } = this.props;
    return (
      <div className="playerList">
        <p>You're in the player lobby.</p>
        <p>Click on a player name to challenge them!</p>
        {
          players.map(player => {
            console.log(player);
            return (<div
              key={player}
              className="playerAvatar"
            >
              <i class="fas fa-2x fa-user-circle"></i>
              <span className="playerName">{player}</span>
            </div>);
          })
        }
      </div>
    );
  }
}

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      players: [],
      socket: socketIOClient(ENDPOINT),
      whoami: ''
    }
    this.state.socket.on("clock", time => {
      this.setState({time: time});
    });
    this.state.socket.on("lobbyplayers", players => {
      this.setState({players: players});
    });
  }

  render() {
    return (
      <div className="lobby">
        <Clock
          time={this.state.time}
        />
        <h1>Welcome to Quboid!</h1>
        <PlayerList
          players={this.state.players}
        />
        <NameForm
          socket={this.state.socket}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Lobby />,
  document.getElementById('root')
);
